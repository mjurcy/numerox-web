document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const res  = document.getElementById('result');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    res.textContent = 'Validando...'; res.style.color = '';

    const email = document.getElementById('email').value.trim();
    const key   = document.getElementById('key').value.trim();
    const baseUrl = 'https://script.google.com/macros/s/AKfycbwCr9uRAcqodDCr4MfYAZtLCHZc8uxjeCDTLLRfumFFngd_skYwO8FJeGPO9J5Y6i2d_Q/exec'; 
    const url = `${baseUrl}?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;

    try {
      const r = await fetch(url, { mode: 'cors' });
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      if (d.success) {
        res.textContent = `✅ ${d.message}`; res.style.color = 'green';
      } else {
        res.textContent = `❌ ${d.message}`; res.style.color = 'red';
      }
    } catch {
      res.textContent = '❌ Error de conexión'; res.style.color = 'red';
    }
  });
});
