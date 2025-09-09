(async () => {
  const q = document.getElementById('q');
  const res = document.getElementById('res');
  const data = await fetch('/assets/search.json').then(r => r.json());
  const idx = lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('color');
    data.docs.forEach(doc => this.add(doc));
  });

  const render = (items) => {
    res.innerHTML = items.map(d =>
      `<li><a href="${d.url}">${d.title} · ${d.color}</a></li>`
    ).join('');
  };

  q.addEventListener('input', () => {
    const term = q.value.trim();
    if (!term) { res.innerHTML = ''; return; }
    const refs = idx.search(term).map(r => r.ref);
    const items = data.docs.filter(d => refs.includes(d.id));
    render(items);
  });
})();
