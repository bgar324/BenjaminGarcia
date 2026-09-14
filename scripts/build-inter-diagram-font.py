#!/usr/bin/env python3
"""Build the deterministic Inter subset embedded in SVG image assets."""

from __future__ import annotations

import hashlib
import tempfile
from pathlib import Path
from xml.etree import ElementTree

try:
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError as error:  # pragma: no cover - depends on the local toolchain
    raise SystemExit(
        "Install the pinned font tooling first: "
        "python3 -m pip install -r scripts/requirements.txt"
    ) from error

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "static"
SOURCE_FONT = STATIC / "inter-variable.woff2"
OUTPUT_FONT = STATIC / "inter-diagrams.woff2"
UNICODE_MANIFEST = STATIC / "inter-diagrams.unicodes"
CHECKSUMS = STATIC / "inter-diagrams.sha256"
SOURCE_FONT_SHA256 = "693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3"


def _visible_svg_codepoints() -> set[int]:
    codepoints: set[int] = set()
    for path in sorted(STATIC.glob("*.svg")):
        source = path.read_text(encoding="utf-8")
        if "<text" not in source:
            continue
        root = ElementTree.fromstring(source)
        for element in root.iter():
            if element.tag.rsplit("}", 1)[-1] == "text":
                codepoints.update(ord(char) for char in "".join(element.itertext()))
    return codepoints


def _font_codepoints(font: TTFont) -> set[int]:
    return set().union(*(table.cmap.keys() for table in font["cmap"].tables))


def main() -> None:
    source_sha256 = hashlib.sha256(SOURCE_FONT.read_bytes()).hexdigest()
    if source_sha256 != SOURCE_FONT_SHA256:
        raise SystemExit(
            f"{SOURCE_FONT.name} changed; update SOURCE_FONT_SHA256 after reviewing the new bundled font"
        )

    requested = {
        int(line, 16)
        for line in UNICODE_MANIFEST.read_text(encoding="utf-8").splitlines()
        if line.strip()
    }
    with tempfile.TemporaryDirectory() as workdir:
        source = TTFont(str(SOURCE_FONT))
        source.recalcTimestamp = False
        source.flavor = None
        source_ttf = Path(workdir) / "inter-variable.ttf"
        source.save(source_ttf)

        font = TTFont(str(source_ttf))
        font.recalcTimestamp = False
        options = subset.Options()
        options.layout_features = ["*"]
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=requested)
        subsetter.subset(font)
        font.flavor = "woff2"
        font.save(OUTPUT_FONT)

    available = _font_codepoints(TTFont(str(OUTPUT_FONT)))
    missing = sorted(requested - available)
    unexpected = sorted(available - requested)
    if missing or unexpected:
        details = []
        if missing:
            details.append("missing " + ", ".join(f"U+{value:04X}" for value in missing))
        if unexpected:
            details.append("unexpected " + ", ".join(f"U+{value:04X}" for value in unexpected))
        raise RuntimeError("subset cmap does not equal inter-diagrams.unicodes: " + "; ".join(details))

    rendered_missing = sorted(_visible_svg_codepoints() - available)
    if rendered_missing:
        values = ", ".join(f"U+{value:04X}" for value in rendered_missing)
        raise RuntimeError(
            f"SVG text uses glyphs absent from {UNICODE_MANIFEST.name}; add {values} and rebuild"
        )

    CHECKSUMS.write_text(
        "\n".join(
            [
                f"{hashlib.sha256(OUTPUT_FONT.read_bytes()).hexdigest()}  {OUTPUT_FONT.name}",
                f"{hashlib.sha256(UNICODE_MANIFEST.read_bytes()).hexdigest()}  {UNICODE_MANIFEST.name}",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    print(
        f"wrote {OUTPUT_FONT.relative_to(ROOT)} ({OUTPUT_FONT.stat().st_size} bytes) "
        f"with {len(available)} cmap codepoints"
    )


if __name__ == "__main__":
    main()
