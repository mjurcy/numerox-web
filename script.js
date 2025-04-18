document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("licenseForm");
  const emailInput = document.getElementById("email");
  const keyInput = document.getElementById("key");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const key = keyInput.value.trim();

    result.textContent = "Validando...";
    result.style.color = "#333";

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwx1-n_rv5Vdf3TjI3WBKkbC_o8SW2b4iBrvfczGWrjn1umgtqr3h3FU46qG3UNgWSIBQ/exec", {
        method: "POST",
        body: new URLSearchParams({ email, key }),
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
});
