document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const res  = document.getElementById('result');
  // pegá acá tu URL del web app
  const baseUrl = 'https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec';

  form.addEventListener('submit', e => {
    e.preventDefault();
    res.textContent = 'Validando...'; 
    res.style.color = '';

    const email = document.getElementById('email').value.trim();
    const key   = document.getElementById('key').value.trim();
    const cb    = 'cb_' + Date.now();

    // callback global
    window[cb] = data => {
      if (data.success) {
        res.textContent = `✅ ${data.message}`;
        res.style.color   = 'green';
      } else {
        res.textContent = `❌ ${data.message}`;
        res.style.color   = 'red';
      }
      // cleanup
      delete window[cb];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `${baseUrl}`
                + `?email=${encodeURIComponent(email)}`
                + `&key=${encodeURIComponent(key)}`
                + `&callback=${cb}`;
    document.head.appendChild(script);
  });
});
