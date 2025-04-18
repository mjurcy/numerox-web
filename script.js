document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('licenseForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    resultDiv.textContent = 'Validando...';

    const email = document.getElementById('email').value.trim();
    const key = document.getElementById('key').value.trim();

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyO-eKVhpO4m33MObMTj4QfWXtlef-qMSdPVeYyw2BraJHKtQvwOUtdsfVeyPfqG1JiTA/exec', {
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
