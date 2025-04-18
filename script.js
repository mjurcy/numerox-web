
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const res  = document.getElementById('result');
  const baseUrl = 'https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec';

  form.addEventListener('submit', e => {
    e.preventDefault();
    res.textContent = 'Validando...';
    res.style.color = '';
    const email = document.getElementById('email').value.trim();
    const key   = document.getElementById('key').value.trim();
    const cb    = 'cb_' + Date.now();

    window[cb] = data => {
      if (data.success) {
        res.textContent = `✅ ${data.message}`;
        res.style.color = 'green';
        mostrarCalculadora();
      } else {
        res.textContent = `❌ ${data.message}`;
        res.style.color = 'red';
      }
      delete window[cb];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `${baseUrl}?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&callback=${cb}`;
    document.head.appendChild(script);
  });
});

function mostrarCalculadora() {
  document.getElementById('calculator').style.display = 'block';
}

function calcularNumerologia() {
  const nombre = document.getElementById('nameInput').value.toUpperCase();
  const valores = {
    'A': 1, 'Á': 1, 'B': 2, 'C': 3, 'D': 5, 'E': 6, 'É': 6, 'F': 7, 'G': 8, 'H': 9,
    'I': 1, 'Í': 1, 'J': 2, 'K': 3, 'L': 4, 'LL': 5, 'M': 6, 'N': 7, 'Ñ': 8, 'O': 9, 'Ó': 9,
    'P': 1, 'Q': 2, 'R': 3, 'S': 4, 'T': 5, 'U': 6, 'Ú': 6, 'V': 7, 'X': 8, 'Y': 9, 'Z': 1,
    'CH': 4
  };
  let total = 0;
  let i = 0;
  while (i < nombre.length) {
    if (i + 1 < nombre.length && valores[nombre.substring(i, i+2)]) {
      total += valores[nombre.substring(i, i+2)];
      i += 2;
    } else if (valores[nombre[i]]) {
      total += valores[nombre[i]];
      i++;
    } else {
      i++;
    }
  }
  document.getElementById('calcResult').textContent = `Resultado: ${total}`;
}
