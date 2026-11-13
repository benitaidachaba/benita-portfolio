"""Check rendered HTML structure and brand contrast after `npm run build`.

These checks do not replace browser layout, keyboard or screen-reader testing.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids = set()
        self.links = []
        self.references = []
        self.h1_count = 0
        self.main_count = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs["id"])
        if tag == "a":
            assert attrs.get("href") not in (None, "", "#"), "Empty link"
            self.links.append(attrs["href"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        if tag == "img":
            assert "alt" in attrs, "Image without alt attribute"
        for attr in ("aria-labelledby", "aria-describedby", "aria-controls"):
            self.references += attrs.get(attr, "").split()


build = Path(".next/server/app")
pages = {"/": Page((build / "index.html").read_text()), "/resume": Page((build / "resume.html").read_text())}
for route, page in pages.items():
    assert page.h1_count == 1, (route, "Expected one h1")
    assert page.main_count == 1, (route, "Expected one main")
    assert all(reference in page.ids for reference in page.references), (route, "Unresolved ARIA reference")
    for href in page.links:
        parts = urlsplit(href)
        if parts.scheme or parts.netloc:
            continue
        target = parts.path or route
        assert target in pages or (Path("public") / target.lstrip("/")).is_file(), (route, href, "Unimplemented destination")
        if parts.fragment and target in pages:
            assert parts.fragment in pages[target].ids, (route, href, "Missing section")
    print(f"PASS {route}: one main/h1, unique IDs, ARIA references and internal links resolve")


def luminance(color):
    values = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in values]
    return sum(value * weight for value, weight in zip(linear, (0.2126, 0.7152, 0.0722)))


for fg, bg in [("#072D50", "#DBF2FC"), ("#072D50", "#FE5C80"), ("#35546C", "#DBF2FC"), ("#35546C", "#FFFFFF"), ("#35546C", "#C7E4F2"), ("#BDD6E5", "#072D50"), ("#FFFFFF", "#072D50")]:
    a, b = sorted((luminance(fg), luminance(bg)))
    ratio = (b + .05) / (a + .05)
    assert ratio >= 4.5, (fg, bg, ratio)
    print(f"PASS contrast {fg} on {bg}: {ratio:.2f}:1")
print("Structural and specified-pair contrast checks passed. Browser checks remain separate.")
