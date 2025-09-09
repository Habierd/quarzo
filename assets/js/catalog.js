(() => {
  const grid = document.getElementById('grid');
  const tallaSel = document.getElementById('filtro-talla');
  const colorSel = document.getElementById('filtro-color');

  const applyFilters = () => {
    const talla = tallaSel.value;
    const color = colorSel.value;
    grid.querySelectorAll('.card').forEach(card => {
      const tallas = (card.dataset.tallas || '').split(',');
      const okTalla = !talla || tallas.includes(talla);
      const okColor = !color || (card.dataset.color === color);
      card.style.display = (okTalla && okColor) ? '' : 'none';
    });
  };

  tallaSel.addEventListener('change', applyFilters);
  colorSel.addEventListener('change', applyFilters);
})();
