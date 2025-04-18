document.getElementById("licenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const key = document.getElementById("key").value.trim();
  const result = document.getElementById("result");
  result.innerText = "Validando...";

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwJXaeI4jutqUXXfzhJfcfMizY33htUdO9TNNfME09Cp4TqqoDI7HDV9WK-yOTEYMDa4Q/exec', {
      method: 'POST',
      body: new URLSearchParams({ email, key })
    });

    const data = await response.json();
    result.innerText = data.message;
  } catch (error) {
    result.innerText = "Error al conectar con el servidor.";
    console.error("Error de conexión:", error);
  }
});
