from html.parser import HTMLParser
from pathlib import Path

class ShopChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.root = 0
        self.scripts = []

    def handle_starttag(self, tag, attributes):
        values = dict(attributes)
        if values.get('id') == 'root':
            self.root += 1
        if tag == 'script':
            assert values.get('type') == 'module'
            self.scripts.append(values.get('src'))

folder = Path(__file__).parent
checker = ShopChecker()
checker.feed((folder / 'index.html').read_text(encoding='utf-8'))
assert checker.root == 1
assert checker.scripts == ['/src/main.tsx']
assert not (folder / 'src/main.ts').exists()
assert not (folder / 'src/ui').exists()
for file in (folder / 'src').rglob('*'):
    if file.suffix not in ['.ts', '.tsx']:
        continue
    source = file.read_text(encoding='utf-8')
    assert len(source.splitlines()) <= 70, str(file)
    assert 'innerHTML' not in source and 'dangerouslySetInnerHTML' not in source
print('Week 5 local page checks passed; academy check-shop is a separate check.')
