document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultDiv.textContent = 'Validando...';
    resultDiv.style.color = '';

    const email = document.getElementById('email').value.trim();
    const key   = document.getElementById('key').value.trim();

    try {
      const baseUrl = 'https://script.google.com/macros/s/AKfycbzLplw0E4OLOaomeIUuO6NUGIReTt1CxzvlpoU_PlSKwb8P0vqm6fkywrq-mk80yXu0KQ/exec';
      const url = `${baseUrl}?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;

      const response = await fetch(url); // GET por defecto, sin body

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();

      if (data.success) {
        resultDiv.textContent = `✅ ${data.message}`;
        resultDiv.style.color = 'green';
      } else {
        resultDiv.textContent = `❌ ${data.message}`;
        resultDiv.style.color = 'red';
      }

    } catch (err) {
      console.error(err);
      resultDiv.textContent = '❌ Error de conexión';
      resultDiv.style.color = 'red';
    }
  });
});
