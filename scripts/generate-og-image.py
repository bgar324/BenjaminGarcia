#!/usr/bin/env python3
"""Publish the approved 1200×630 social card with consistent cache versions.

Default: copy scripts/assets/og-approved.png byte-exactly to static/og.png.
The approved raster is the source of truth; browser/font rasterization can differ.

Use --render to recompose a future candidate from current homepage copy and the
bundled font/artwork. Review that candidate before replacing the approved source.
Changed bytes advance every static/og.png?v=N HTML reference.
"""

from __future__ import annotations

import base64
import html
import re
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOMEPAGE = ROOT / "index.html"
OUTPUT = ROOT / "static" / "og.png"

WIDTH = 1200
HEIGHT = 630
RENDER_TIMEOUT = 90

# Approved Snoopy card palette and bundled artwork.
BACKGROUND = "#eeeade"
FOREGROUND = "#233e91"
ACCENT = "#a04413"
ARTWORK = ROOT / "static" / "snoopy" / "og-laptop.png"
ARTWORK_DATA_URI = "data:image/png;base64," + base64.b64encode(ARTWORK.read_bytes()).decode("ascii")
INTER_FONT = ROOT / "static" / "inter-page.woff2"
INTER_FONT_DATA_URI = "data:font/woff2;base64," + base64.b64encode(INTER_FONT.read_bytes()).decode("ascii")
EMBEDDED_FONT_FAMILY = "PortfolioEmbeddedInter"
FONT_FACE = f"""@font-face {{
  font-family: "{EMBEDDED_FONT_FAMILY}";
  src: url("{INTER_FONT_DATA_URI}") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: block;
}}"""
FONT = f'"{EMBEDDED_FONT_FAMILY}", sans-serif'

CHROME_CANDIDATES = (
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
)


def find_chrome() -> str:
    for name in ("google-chrome", "chromium", "chromium-browser"):
        found = shutil.which(name)
        if found:
            return found
    for path in CHROME_CANDIDATES:
        if Path(path).is_file():
            return path
    sys.exit("no Chrome/Chromium binary found; install Chrome to render the card")


def text_of(markup: str) -> str:
    """Strip inline tags, decode entities, collapse whitespace."""
    stripped = re.sub(r"<[^>]+>", "", markup)
    return re.sub(r"\s+", " ", html.unescape(stripped).replace("\u00a0", " ")).strip()


def capture(pattern: str, source: str, label: str) -> str:
    match = re.search(pattern, source, re.DOTALL)
    if not match:
        sys.exit(f"could not read the {label} out of {HOMEPAGE.name}")
    return text_of(match.group(1))


def read_copy() -> dict[str, str]:
    source = HOMEPAGE.read_text(encoding="utf-8")
    canonical = capture(
        r'<link rel="canonical" href="([^"]+)"', source, "canonical URL"
    )
    host = canonical.split("//", 1)[-1].strip("/")
    return {
        "eyebrow": capture(
            r'<h1>(.*?)</h1>', source.replace("</span>", "</span> "), "display name"
        ),
        "headline": capture(
            r'<p class="lead">(.*?)</p>', source, "homepage headline"
        ),
        "lead": capture(
            r'<div class="intro-copy">.*?<p class="lead">.*?</p>\s*<p>(.*?)</p>',
            source, "intro paragraph"
        ),
        # The card prints the bare domain even though the canonical host is www.
        "domain": host.removeprefix("www."),
    }


def build_document(copy: dict[str, str]) -> str:
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
{FONT_FACE}
* {{ box-sizing: border-box; }}
body {{ margin: 0; width: {WIDTH}px; height: {HEIGHT}px; background: {BACKGROUND}; color: {FOREGROUND}; font-family: {FONT}; }}
h1, p {{ margin: 0; }}
h1 {{ position: absolute; left: 76px; top: 140px; font-size: 108px; font-weight: 700; line-height: .98; letter-spacing: -.055em; white-space: nowrap; }}
.headline {{ position: absolute; left: 80px; top: 278px; width: 660px; font-size: 29px; font-weight: 600; line-height: 1.25; letter-spacing: -.025em; }}
.subtitle {{ position: absolute; left: 80px; top: 379px; width: 650px; font-size: 22px; line-height: 1.4; letter-spacing: -.01em; }}
.snoopy {{ position: absolute; right: 68px; top: 163px; width: 330px; height: 330px; object-fit: contain; }}
.url {{ position: absolute; right: 76px; bottom: 45px; font: 20px 'Courier New', monospace; color: {ACCENT}; }}
</style></head><body>
<h1>{html.escape(copy["eyebrow"])}</h1>
<p class="headline">{html.escape(copy["headline"])}</p>
<p class="subtitle">{html.escape(copy["lead"])}</p>
<img class="snoopy" src="{ARTWORK_DATA_URI}" alt="Snoopy typing on a laptop">
<p class="url">{html.escape(copy["domain"])}</p>
</body></html>"""


def render(document: str) -> bytes:
    chrome = find_chrome()
    with tempfile.TemporaryDirectory() as workdir:
        work = Path(workdir)
        page = work / "card.html"
        page.write_text(document, encoding="utf-8")
        shot = work / "og.png"
        log = work / "chrome.log"
        # Chrome writes the screenshot and then keeps running (and its updater
        # outlives the browser), so its output goes to a file rather than an
        # inherited pipe, and the process is stopped once the image settles.
        with log.open("wb") as sink:
            browser = subprocess.Popen(
                [
                    chrome,
                    "--headless=new",
                    "--disable-gpu",
                    "--hide-scrollbars",
                    "--force-device-scale-factor=1",
                    "--virtual-time-budget=2000",
                    f"--window-size={WIDTH},{HEIGHT}",
                    f"--screenshot={shot}",
                    f"--user-data-dir={work / 'profile'}",
                    "--no-first-run",
                    "--no-default-browser-check",
                    page.as_uri(),
                ],
                stdout=sink,
                stderr=subprocess.STDOUT,
            )
            try:
                deadline = time.monotonic() + RENDER_TIMEOUT
                settled = -1
                while time.monotonic() < deadline:
                    if browser.poll() is not None:
                        break
                    size = shot.stat().st_size if shot.is_file() else 0
                    if size and size == settled:
                        break
                    settled = size
                    time.sleep(0.25)
            finally:
                if browser.poll() is None:
                    browser.terminate()
                    try:
                        browser.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        browser.kill()
        if not shot.is_file():
            tail = log.read_text(encoding="utf-8", errors="replace").strip()[-2000:]
            sys.exit(f"chrome failed to render the card:\n{tail}")
        return shot.read_bytes()


def bump_cache_version() -> int | None:
    """Advance every `static/og.png?v=N` reference; returns the new version."""
    pattern = re.compile(r"(static/og\.png\?v=)(\d+)")
    pages = sorted(
        path for path in ROOT.glob("**/*.html") if ".worktrees" not in path.parts
    )
    versions = {
        int(match.group(2))
        for page in pages
        for match in pattern.finditer(page.read_text(encoding="utf-8"))
    }
    if not versions:
        return None
    new_version = max(versions) + 1
    for page in pages:
        source = page.read_text(encoding="utf-8")
        updated = pattern.sub(rf"\g<1>{new_version}", source)
        if updated != source:
            page.write_text(updated, encoding="utf-8")
    return new_version


def main() -> None:
    copy = read_copy()
    for label in ("eyebrow", "headline", "lead", "domain"):
        print(f"{label:9} {copy[label]}")

    if "--render" in sys.argv:
        candidate = Path(tempfile.gettempdir()) / "ben-og-candidate.png"
        candidate.write_bytes(render(build_document(copy)))
        print(f"\nwrote review candidate {candidate}; published image and metadata unchanged")
        return
    image = (ROOT / "scripts/assets/og-approved.png").read_bytes()
    if OUTPUT.is_file() and OUTPUT.read_bytes() == image:
        print(f"\n{OUTPUT.relative_to(ROOT)} already current ({len(image)} bytes)")
        return

    OUTPUT.write_bytes(image)
    version = bump_cache_version()
    print(f"\nwrote {OUTPUT.relative_to(ROOT)} ({len(image)} bytes)")
    if version is not None:
        print(f"bumped share-image references to static/og.png?v={version}")


if __name__ == "__main__":
    main()
