(() => {
  const btn = document.getElementById('btn-wompi');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const precio = parseInt(document.querySelector('.price').textContent.replace(/[^\d]/g, ''), 10);
    const slugMeta = document.querySelector('link[rel="canonical"]')?.href || location.pathname;
    const slug = slugMeta.split('/').filter(Boolean).pop();
    const talla = document.getElementById('talla')?.value || '';
    const ref = `QZR-${slug}-${Date.now()}`;

    const form = document.createElement('form');
    form.method = 'GET';
    form.action = 'https://checkout.wompi.co/p/';

    const fields = {
      'public-key': 'PUB_KEY_AQUI', // Reemplazar por llave pública de Wompi
      'currency': 'COP',
      'amount-in-cents': (precio * 100).toString(),
      'reference': ref,
      'redirect-url': location.origin + '/gracias.html',
      'customer-data:email': 'cliente@example.com',
      'customer-data:full-name': 'Cliente Quarzo',
      'shipping-address:address-line-1': 'Colombia',
      'shipping-address:admin-area-1': 'Antioquia',
      'shipping-address:country': 'CO'
    };

    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = k; input.value = v;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  });
})();
