#!/usr/bin/env python3
"""Embed the bundled Inter subset in SVG image assets."""

from __future__ import annotations

import base64
import hashlib
import re
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "static"
FONT_PATH = STATIC / "inter-diagrams.woff2"
UNICODE_PATH = STATIC / "inter-diagrams.unicodes"
CHECKSUMS_PATH = STATIC / "inter-diagrams.sha256"
FONT_FAMILY = "PortfolioEmbeddedInter"
LEGACY_FONT_FAMILY = "Inter"
LEGACY_FONT_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"


def _load_supported_codepoints() -> frozenset[int]:
    return frozenset(
        int(line, 16)
        for line in UNICODE_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    )


def _load_checksums() -> dict[str, str]:
    return {
        name: digest
        for line in CHECKSUMS_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
        for digest, name in [line.split("  ", 1)]
    }


def _validate_font_assets() -> None:
    expected = _load_checksums()
    for path in (FONT_PATH, UNICODE_PATH):
        actual = hashlib.sha256(path.read_bytes()).hexdigest()
        if expected.get(path.name) != actual:
            raise RuntimeError(
                f"{path.name} changed; run scripts/build-inter-diagram-font.py"
            )


SUPPORTED_CODEPOINTS = _load_supported_codepoints()
_validate_font_assets()
FONT_DATA_URI = "data:font/woff2;base64," + base64.b64encode(FONT_PATH.read_bytes()).decode("ascii")

EMBEDDED_STYLE = f'''  <style id="embedded-inter-font">
    @font-face {{
      font-family: "{FONT_FAMILY}";
      src: url("{FONT_DATA_URI}") format("woff2");
      font-style: normal;
      font-weight: 100 900;
      font-display: block;
    }}
  </style>'''


def svg_text_codepoints(svg: str) -> set[int]:
    """Return Unicode codepoints used by visible SVG text nodes."""
    root = ElementTree.fromstring(svg)
    return {
        ord(char)
        for element in root.iter()
        if element.tag.rsplit("}", 1)[-1] == "text"
        for char in "".join(element.itertext())
    }


def assert_svg_font_coverage(svg: str) -> None:
    """Fail before emission when a visible SVG glyph is absent from the subset."""
    missing = sorted(svg_text_codepoints(svg) - SUPPORTED_CODEPOINTS)
    if missing:
        values = ", ".join(f"U+{value:04X}" for value in missing)
        raise ValueError(f"SVG text uses glyphs absent from {UNICODE_PATH.name}: {values}")


def embed_inter_font(svg: str) -> str:
    """Embed Inter and replace legacy system or local-font references."""
    assert_svg_font_coverage(svg)
    if '<style id="embedded-inter-font">' in svg:
        svg = re.sub(
            r'  <style id="embedded-inter-font">.*?</style>\n',
            EMBEDDED_STYLE + "\n",
            svg,
            count=1,
            flags=re.DOTALL,
        )
    else:
        marker = "  <rect "
        if marker not in svg:
            raise ValueError("SVG has no insertion point before its first rect")
        svg = svg.replace(marker, EMBEDDED_STYLE + "\n" + marker, 1)
    return (
        svg.replace(
            f'font-family="{LEGACY_FONT_STACK}"',
            f'font-family="{FONT_FAMILY}"',
        )
        .replace(
            f'font-family="{LEGACY_FONT_FAMILY}"',
            f'font-family="{FONT_FAMILY}"',
        )
    )


def bump_svg_cache_versions(changed: set[str]) -> None:
    """Advance every changed SVG reference outside ignored worktrees."""
    if not changed:
        return
    names = "|".join(re.escape(name) for name in sorted(changed))
    pattern = re.compile(rf"(static/(?:{names})\?v=)(\d+)")
    pages = (
        path
        for path in ROOT.glob("**/*.html")
        if ".worktrees" not in path.parts
    )
    for page in pages:
        source = page.read_text(encoding="utf-8")
        updated = pattern.sub(
            lambda match: f"{match.group(1)}{int(match.group(2)) + 1}",
            source,
        )
        if updated != source:
            page.write_text(updated, encoding="utf-8")
    print(f"bumped cache versions for {len(changed)} SVG files")


def main() -> None:
    changed = set[str]()
    for path in sorted(STATIC.glob("*.svg")):
        source = path.read_text(encoding="utf-8")
        if "<text" not in source:
            continue
        updated = embed_inter_font(source)
        if updated != source:
            path.write_text(updated, encoding="utf-8")
            changed.add(path.name)
    print(f"embedded {FONT_FAMILY} in {len(changed)} SVG files")
    bump_svg_cache_versions(changed)


if __name__ == "__main__":
    main()
