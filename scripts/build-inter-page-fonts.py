#!/usr/bin/env python3
"""Subset page fonts without changing the full Inter sources used by image builders."""

from __future__ import annotations

import hashlib
import os
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

try:
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError as error:
    raise SystemExit(
        "Install the pinned font tooling first: "
        "python3 -m pip install -r scripts/requirements.txt"
    ) from error

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "static"
FONTS = (
    ("inter-variable.woff2", "inter-page.woff2", "693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3"),
    ("inter-variable-italic.woff2", "inter-page-italic.woff2", "e564f652916db6c139570fefb9524a77c4d48f30c92928de9db19b6b5c7a262a"),
)
# Latin letters and accents, combining marks, punctuation and currencies.
# Current HTML adds any symbols outside these ranges.
UNICODE_RANGES = (
    (0x0020, 0x024F),
    (0x0300, 0x036F),
    (0x2000, 0x206F),
    (0x20A0, 0x20CF),
    (0x2122, 0x2122),
    (0xFEFF, 0xFEFF),
    (0xFFFD, 0xFFFD),
)


class PageText(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.codepoints: set[int] = set()
        self.hidden_tag: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"script", "style"}:
            self.hidden_tag = tag
        for name, value in attrs:
            if name in {"alt", "title", "aria-label", "placeholder", "value"} and value:
                self.codepoints.update(map(ord, value))

    def handle_endtag(self, tag: str) -> None:
        if tag == self.hidden_tag:
            self.hidden_tag = None

    def handle_data(self, data: str) -> None:
        if self.hidden_tag is None:
            self.codepoints.update(map(ord, data))


def page_codepoints() -> set[int]:
    parser = PageText()
    for directory, children, filenames in os.walk(ROOT):
        children[:] = sorted(
            name for name in children
            if not name.startswith(".") and name not in {"node_modules", "__pycache__"}
        )
        for filename in sorted(filenames):
            if filename.endswith(".html"):
                parser.feed((Path(directory) / filename).read_text(encoding="utf-8"))
                parser.close()
                parser.reset()
    return parser.codepoints - {ord(char) for char in "\t\n\r"}


def validate(source: TTFont, result: TTFont, requested: set[int]) -> None:
    original_cmap = source.getBestCmap()
    result_cmap = result.getBestCmap()
    if set(result_cmap) != requested:
        raise RuntimeError("Generated font does not contain exactly the requested codepoints")
    # Preserve variable axes, named instances and font-wide line/optical metrics.
    for tag in ("fvar", "avar", "MVAR", "head", "hhea", "OS/2"):
        if tag not in source:
            continue
        if tag not in result:
            raise RuntimeError(f"Generated font lost {tag}")
        if tag in {"fvar", "avar", "MVAR"}:
            if source[tag].compile(source) != result[tag].compile(result):
                raise RuntimeError(f"Generated font changed {tag}")
    for tag, fields in {
        "head": ("unitsPerEm",),
        "hhea": ("ascent", "descent", "lineGap"),
        "OS/2": (
            "sTypoAscender", "sTypoDescender", "sTypoLineGap",
            "usWinAscent", "usWinDescent", "sxHeight", "sCapHeight", "fsSelection",
        ),
    }.items():
        for field in fields:
            if getattr(source[tag], field) != getattr(result[tag], field):
                raise RuntimeError(f"Generated font changed {tag}.{field}")
    for codepoint, glyph in result_cmap.items():
        if source["hmtx"][original_cmap[codepoint]] != result["hmtx"][glyph]:
            raise RuntimeError(f"Generated font changed metrics for U+{codepoint:04X}")
    for tag in ("gvar", "HVAR", "GDEF", "GSUB", "GPOS"):
        if tag in source and tag not in result:
            raise RuntimeError(f"Generated font lost {tag}")


def main() -> None:
    visible = page_codepoints()
    broad = {value for start, end in UNICODE_RANGES for value in range(start, end + 1)}
    for source_name, output_name, expected_hash in FONTS:
        source_path = STATIC / source_name
        if hashlib.sha256(source_path.read_bytes()).hexdigest() != expected_hash:
            raise SystemExit(f"{source_name} changed; review the source and update its pinned hash")
        with TTFont(source_path, recalcTimestamp=False) as source:
            available = set(source.getBestCmap())
            requested = (broad | visible) & available
            unsupported = sorted(visible - available)
            if unsupported:
                print(f"{source_name}: existing source lacks " + ", ".join(f"U+{value:04X}" for value in unsupported))
            with TTFont(source_path, recalcTimestamp=False) as font:
                options = subset.Options()
                options.layout_features = ["*"]
                options.name_IDs = ["*"]
                options.name_languages = ["*"]
                options.name_legacy = True
                options.glyph_names = True
                options.recalc_bounds = False
                options.recalc_timestamp = False
                options.prune_unicode_ranges = False
                options.prune_codepage_ranges = False
                worker = subset.Subsetter(options=options)
                worker.populate(unicodes=requested)
                worker.subset(font)
                font.flavor = "woff2"
                with tempfile.TemporaryDirectory() as directory:
                    generated = Path(directory) / output_name
                    font.save(generated)
                    with TTFont(generated, recalcTimestamp=False) as result:
                        validate(source, result, requested)
                    data = generated.read_bytes()
                    (STATIC / output_name).write_bytes(data)
            original_size = source_path.stat().st_size
            print(
                f"static/{output_name}: {original_size:,} -> {len(data):,} bytes "
                f"({100 * (1 - len(data) / original_size):.1f}% smaller), "
                f"{len(requested)} codepoints; SHA-256 {hashlib.sha256(data).hexdigest()}"
            )
    subprocess.run([sys.executable, str(ROOT / "scripts" / "embed-page-fonts.py")], check=True)


if __name__ == "__main__":
    main()
