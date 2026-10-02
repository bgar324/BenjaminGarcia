import contextlib
from datetime import date, timedelta
import importlib.util
import io
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError


spec = importlib.util.spec_from_file_location(
    "generate_contributions", Path(__file__).with_name("generate-contributions.py")
)
calendar = importlib.util.module_from_spec(spec)
spec.loader.exec_module(calendar)

END = date(2026, 10, 2)
MARKUP = "".join(
    f'<td data-date="{END - timedelta(days=364 - i)}" data-level="1"></td>'
    '<tool-tip>1 contribution</tool-tip>'
    for i in range(365)
).encode()


class ContributionFetchTests(unittest.TestCase):
    def setUp(self):
        directory = self.enterContext(tempfile.TemporaryDirectory())
        root = Path(directory)
        self.homepage = root / "index.html"
        self.original = f"before\n{calendar.START}\nold calendar\n{calendar.END}\nafter\n"
        self.homepage.write_text(self.original)
        self.enterContext(patch.object(calendar, "ROOT", root))
        self.enterContext(patch("sys.argv", ["generate-contributions.py", "--through", str(END)]))
        self.urlopen = self.enterContext(patch.object(calendar, "urlopen"))
        self.sleep = self.enterContext(patch.object(calendar, "sleep"))
        self.enterContext(contextlib.redirect_stdout(io.StringIO()))
        self.enterContext(contextlib.redirect_stderr(io.StringIO()))

    def test_transient_errors_recover_and_publish_complete_calendar(self):
        errors = [
            HTTPError(calendar.CONTRIBUTIONS_URL, code, "upstream failure", {}, None)
            for code in (500, 502, 503, 504)
        ] + [TimeoutError("read timed out"), URLError(TimeoutError("connect timed out"))]
        for error in errors:
            with self.subTest(error=error):
                self.homepage.write_text(self.original)
                self.sleep.reset_mock()
                self.urlopen.reset_mock()
                self.urlopen.side_effect = [error, io.BytesIO(MARKUP)]
                calendar.main()
                days = [
                    {"date": str(END - timedelta(days=364 - i)),
                     "contributionCount": 1, "contributionLevel": "FIRST_QUARTILE"}
                    for i in range(365)
                ]
                expected = f"before\n{calendar.START}\n{calendar.render(days)}\n{calendar.END}\nafter\n"
                self.assertEqual(self.homepage.read_text(), expected)
                self.assertEqual(self.urlopen.call_count, 2)
                self.sleep.assert_called_once_with(5)

    def test_third_attempt_can_succeed(self):
        self.urlopen.side_effect = [TimeoutError(), TimeoutError(), io.BytesIO(MARKUP)]
        days = calendar.fetch_days(END)
        self.assertEqual(sum(day["contributionCount"] for day in days), 365)
        self.assertEqual([call.args for call in self.sleep.call_args_list], [(5,), (10,)])

    def test_exhausted_retries_preserve_previous_calendar(self):
        self.urlopen.side_effect = HTTPError(calendar.CONTRIBUTIONS_URL, 504, "timeout", {}, None)
        with self.assertRaises(HTTPError):
            calendar.main()
        self.assertEqual(self.urlopen.call_count, 3)
        self.assertEqual([call.args for call in self.sleep.call_args_list], [(5,), (10,)])
        self.assertEqual(self.homepage.read_text(), self.original)

    def test_non_transient_errors_fail_without_retry(self):
        errors = [
            HTTPError(calendar.CONTRIBUTIONS_URL, code, "client error", {}, None)
            for code in (401, 403, 404, 429)
        ] + [URLError("certificate verification failed")]
        for error in errors:
            with self.subTest(error=error):
                self.urlopen.reset_mock()
                self.urlopen.side_effect = error
                with self.assertRaises(type(error)):
                    calendar.main()
                self.assertEqual(self.urlopen.call_count, 1)
                self.sleep.assert_not_called()
                self.assertEqual(self.homepage.read_text(), self.original)

    def test_invalid_responses_fail_without_retry_or_overwrite(self):
        for markup in (
            b"no cells",
            MARKUP.replace(b'data-level="1"', b'data-level="9"', 1),
            MARKUP.replace(b"1 contribution", b"unknown label", 1),
            MARKUP.replace(b"2025-10-03", b"2025-10-02", 1),
            b"\xff",
        ):
            with self.subTest(markup=markup[:80]):
                self.urlopen.reset_mock()
                self.urlopen.side_effect = [io.BytesIO(markup)]
                with self.assertRaises(ValueError):
                    calendar.main()
                self.assertEqual(self.urlopen.call_count, 1)
                self.sleep.assert_not_called()
                self.assertEqual(self.homepage.read_text(), self.original)

    def test_response_read_timeout_is_retried(self):
        class TimedOutResponse(io.BytesIO):
            def read(self):
                raise TimeoutError("read timed out")

        response = TimedOutResponse()
        self.urlopen.side_effect = [response, io.BytesIO(MARKUP)]
        days = calendar.fetch_days(END)
        self.assertTrue(response.closed)
        self.assertEqual(sum(day["contributionCount"] for day in days), 365)
        self.sleep.assert_called_once_with(5)


if __name__ == "__main__":
    unittest.main()
