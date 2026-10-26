#!/usr/bin/env python3
"""Preview static pages with direct clean URLs, as on Vercel."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PreviewHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        resolved = Path(super().translate_path(path))
        if resolved.is_dir():
            index = resolved / "index.html"
            if index.is_file():
                return str(index)
        elif not resolved.suffix:
            html = resolved.with_suffix(".html")
            if html.is_file():
                return str(html)
        return str(resolved)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    handler = partial(PreviewHandler, directory=str(ROOT))
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print(f"Serving clean URLs at http://127.0.0.1:{server.server_port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
