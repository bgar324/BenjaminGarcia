#!/usr/bin/env python3
"""Refresh the homepage's static GitHub calendar from the public profile."""

import argparse
from datetime import date, datetime, timedelta, timezone
from html import unescape
from pathlib import Path
import re
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
START = "      <!-- contributions:start -->"
END = "      <!-- contributions:end -->"
LEVELS = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"]
CONTRIBUTIONS_URL = "https://github.com/users/bgar324/contributions"
DAY_PATTERN = re.compile(
    r'<td\b(?=[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})")'
    r'[^>]*\bdata-level="(\d)"[^>]*></td>\s*'
    r'<tool-tip\b[^>]*>(.*?)</tool-tip>',
    re.DOTALL,
)


def parse_contribution_count(text):
    text = re.sub(r"\s+", " ", unescape(text)).strip()
    if text.startswith("No contributions"):
        return 0
    match = re.match(r"([\d,]+) contribution", text)
    if not match:
        raise ValueError(f"Unrecognized GitHub contribution label: {text!r}")
    return int(match.group(1).replace(",", ""))


def fetch_days(end):
    start = end - timedelta(days=364)
    request = Request(
        CONTRIBUTIONS_URL,
        headers={"Accept": "text/html", "User-Agent": "BenjaminGarcia-contribution-calendar/1.0"},
    )
    with urlopen(request, timeout=30) as response:
        markup = response.read().decode("utf-8")
    rows = DAY_PATTERN.findall(markup)
    if not rows:
        raise ValueError("GitHub public profile returned no contribution cells")

    days_by_date = {}
    for date_text, level_text, tooltip in rows:
        current = date.fromisoformat(date_text)
        level = int(level_text)
        if not 0 <= level < len(LEVELS):
            raise ValueError(f"Unknown GitHub contribution level: {level}")
        day = {
            "date": date_text,
            "contributionCount": parse_contribution_count(tooltip),
            "contributionLevel": LEVELS[level],
        }
        if current in days_by_date and days_by_date[current] != day:
            raise ValueError(f"Conflicting GitHub contribution cells for {date_text}")
        days_by_date[current] = day

    expected_dates = [start + timedelta(days=i) for i in range(365)]
    missing = [str(current) for current in expected_dates if current not in days_by_date]
    if missing:
        raise ValueError(f"GitHub public profile is missing contribution dates: {missing[:3]}")
    return [days_by_date[current] for current in expected_dates]




def render(days):
    first = date.fromisoformat(days[0]["date"])
    sunday = first - timedelta(days=(first.weekday() + 1) % 7)
    total = sum(day["contributionCount"] for day in days)
    summary = f"{total:,} contributions in the past year"
    lines = [
        '      <section class="content-section contributions" aria-labelledby="contributions-heading">',
        '        <div class="section-heading">',
        f'          <h2 id="contributions-heading">{summary}</h2>',
        '        </div>',
        '        <div class="contribution-region" tabindex="0" role="region" aria-label="Contribution calendar, recent months first; scroll horizontally on small screens">',
        '          <div class="contribution-calendar">',
    ]
    # Skip the initial partial month so adjacent labels never overlap.
    for day in days:
        current = date.fromisoformat(day["date"])
        if current.day == 1:
            column = (current - sunday).days // 7
            if column <= 50:
                lines.append(f'            <span class="contribution-month" style="grid-column: {column + 2}; grid-row: 1" aria-hidden="true">{current:%b}</span>')
    for label, row in [("Mon", 1), ("Wed", 3), ("Fri", 5)]:
        lines.append(f'            <span class="contribution-weekday" style="grid-column: 1; grid-row: {row + 2}" aria-hidden="true">{label}</span>')
    for day in days:
        current = date.fromisoformat(day["date"])
        column, row = divmod((current - sunday).days, 7)
        level = LEVELS.index(day["contributionLevel"])
        count = day["contributionCount"]
        unit = "contribution" if count == 1 else "contributions"
        suffix = "th" if 10 < current.day < 14 else {1: "st", 2: "nd", 3: "rd"}.get(current.day % 10, "th")
        label = f"{count if count else 'No'} {unit} on {current:%B} {current.day}{suffix}."
        lines.append(
            f'            <span class="contribution-day contribution-level-{level}" '
            f'style="grid-column: {column + 2}; grid-row: {row + 2}" '
            f'data-date="{current}" data-count="{count}" tabindex="0" role="img" aria-label="{label}">'
            f'<span class="contribution-tooltip" aria-hidden="true">{label}</span></span>'
        )
    lines.extend([
        '          </div>',
        '          <div class="contribution-legend" aria-hidden="true">',
        '            <span>Less</span>',
        *[f'            <span class="contribution-swatch contribution-level-{level}"></span>' for level in range(5)],
        '            <span>More</span>',
        '          </div>',
        '        </div>',
        '      </section>',
    ])
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--through", type=date.fromisoformat, default=datetime.now(timezone.utc).date())
    args = parser.parse_args()
    homepage = ROOT / "index.html"
    source = homepage.read_text()
    if source.count(START) != 1 or source.count(END) != 1:
        raise ValueError("Expected exactly one contribution calendar marker pair")
    before, rest = source.split(START)
    _, after = rest.split(END)
    days = fetch_days(args.through)
    updated = before + START + "\n" + render(days) + "\n" + END + after
    if updated != source:
        homepage.write_text(updated)
    print(f'{sum(day["contributionCount"] for day in days):,} contributions; '
          f'{days[0]["date"]} through {days[-1]["date"]}; '
          f'{"updated" if updated != source else "unchanged"}')


if __name__ == "__main__":
    main()
