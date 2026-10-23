from html.parser import HTMLParser
from pathlib import Path


class ShopChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.scripts = []
        self.headings = 0

    def handle_starttag(self, tag, attributes):
        values = dict(attributes)
        self.headings += tag == "h1"
        if tag == "script":
            assert values.get("src") == "/src/main.ts", "Use the separate app.ts file"
            assert values.get("type") == "module", "Load TypeScript as a module"
            self.scripts.append(values["src"])
        for name, value in attributes:
            assert not name.startswith("on"), "Inline event handlers are not allowed"
            if value:
                assert not value.strip().lower().startswith("javascript:"), "JavaScript URLs are not allowed"
            if name == "id":
                self.ids.append(value)
            if name == "href" and value and value.startswith("#"):
                self.links.append(value[1:])


folder = Path(__file__).parent
html = (folder / "index.html").read_text(encoding="utf-8")
script = (folder / "src/main.ts").read_text(encoding="utf-8")
checker = ShopChecker()
checker.feed(html)
assert checker.headings == 1, "Use one h1"
assert checker.scripts == ["/src/main.ts"], "Load app.ts once"
assert len(checker.ids) == len(set(checker.ids)), "Duplicate IDs found"
assert all(link in checker.ids or link in ["dairy-1", "dairy-end", "offers-1", "offers-end"] for link in checker.links), "Internal link destination missing"
assert "innerHTML" not in script, "Do not render API data with innerHTML"
assert 'id="dairy-1"' not in html, "Dairy cards must be generated from the API"
assert 'id="offers-1"' not in html, "Offer cards must be generated from the API"
assert not (folder / "app.js").exists(), "Remove the old JavaScript source"
print("Week 3 page rules passed")
