document.getElementById("licenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const key = document.getElementById("key").value.trim();
  const result = document.getElementById("result");

  result.innerHTML = "Validando...";
  result.style.color = "#000";

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzWc136X6RQ3dc-LspqBJiP6upHWkV2DXMrE9OiDg03__oX1Lzx-zRFuSMXe7TtI9WVkg/exec', {
      method: 'POST',
      body: new URLSearchParams({ email, key })
    });

    const data = await response.json();

    if (data.ok) {
      result.innerHTML = `✔ ${data.message}`;
      result.style.color = "green";
    } else {
      result.innerHTML = `✗ ${data.message}`;
      result.style.color = "red";
    }

  } catch (error) {
    result.innerHTML = `✗ Error del servidor: ${error}`;
    result.style.color = "red";
  }
});
