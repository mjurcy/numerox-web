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
      const response = await fetch("https://script.google.com/macros/s/AKfycbwUSISqOuAE-lqO7HBRf2KNp25rJa5dv-YMRM9WhPrDoQEEdPpcS1-CQ41hJRF0QetGgQ/exec", {
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
