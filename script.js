document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('licenseForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    resultDiv.textContent = 'Validando...';

    const email = document.getElementById('email').value.trim();
    const key = document.getElementById('key').value.trim();

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyq1gP6o06D48YBjM5RECxv1YE5HN8o-X1gDIy-jZoMyfo4GdpUDARu3zAH6R_b7onsqg/exec', {
        method: 'POST',
        body: new URLSearchParams({ email, key })
      });

      const data = await response.json();

      if (data.success) {
        resultDiv.textContent = `✅ ${data.message}`;
        resultDiv.style.color = "green";
      } else {
        resultDiv.textContent = `❌ ${data.message}`;
        resultDiv.style.color = "red";
      }

    } catch (err) {
      resultDiv.textContent = '❌ Error de conexión';
      resultDiv.style.color = "red";
    }
  });
});
