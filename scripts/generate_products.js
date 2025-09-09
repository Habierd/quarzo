// Genera archivos Markdown en _products/ a partir de _data/products.json
// Uso: node scripts/generate_products.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', '_data', 'products.json');
const outDir = path.join(__dirname, '..', '_products');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
products.forEach(p => {
  const fm = [
    '---',
    'layout: product',
    `title: "${p.nombre.replace(/"/g, '\\"')}"`,
    `permalink: /productos/${p.slug}/`,
    `id: "${p.id}"`,
    `nombre: "${p.nombre.replace(/"/g, '\\"')}"`,
    `precio: ${p.precio}`,
    `tallas: [${p.tallas.map(t => `"${t}"`).join(', ')}]`,
    `color: "${p.color}"`,
    `imagen: "${p.imagen}"`,
    `slug: "${p.slug}"`,
    '---',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(outDir, `${p.slug}.md`), fm, 'utf8');
  console.log(`Producto generado: ${p.slug}`);
});
