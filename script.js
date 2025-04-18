document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const key = document.getElementById("key").value.trim();
  const output = document.getElementById("output");

  if (!email || !key) {
    output.innerHTML = `<span style="color: red;">Completá ambos campos.</span>`;
    return;
  }

  output.innerHTML = "Validando...";

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzWc136X6RQ3dc-LspqBJiP6upHWkV2DXMrE9OiDg03__oX1Lzx-zRFuSMXe7TtI9WVkg/exec", {
      method: 'POST',
      body: new URLSearchParams({ email, key })
    });

    const result = await response.json();

    if (result.ok) {
      output.innerHTML = `<span style="color: green;">✅ ${result.message}</span>`;
    } else {
      output.innerHTML = `<span style="color: red;">❌ ${result.message}</span>`;
    }
  } catch (err) {
    output.innerHTML = `<span style="color: red;">Error de conexión con el servidor.</span>`;
  }
});
