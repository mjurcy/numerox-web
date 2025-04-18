document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const res = document.getElementById('result');
  const baseUrl = 'https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec';

  const licenseContainer = document.getElementById('license-container');
  const calcContainer = document.getElementById('calc-container');
  const nameInput = document.getElementById('nameInput');
  const output = document.getElementById('output');
  const calcBtn = document.getElementById('calcBtn');

  const music = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-btn');
  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.textContent = music.muted ? '🔇' : '🔊';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const key = document.getElementById('key').value.trim();
    const cb = 'cb_' + Date.now();

    res.textContent = 'Validando...';
    res.style.color = '';

    window[cb] = data => {
      if (data.success) {
        licenseContainer.classList.add('hidden');
        calcContainer.classList.remove('hidden');
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

  function calcularValorNombre(nombre) {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const valores = {};
    letras.split('').forEach((l, i) => valores[l] = (i % 9) + 1);

    const palabras = nombre.toLowerCase().split(/\s+/);
    let resultado = '';
    let total = 0;

    for (let palabra of palabras) {
      let suma = 0;
      for (let letra of palabra) {
        suma += valores[letra] || 0;
      }
      resultado += `${palabra.toUpperCase()}: ${suma}\n`;
      total += suma;
    }

    resultado += `\nTOTAL: ${total}`;
    return resultado;
  }

  calcBtn.addEventListener('click', () => {
    const nombre = nameInput.value.trim();
    if (!nombre) return;
    output.textContent = calcularValorNombre(nombre);
  });

  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calcBtn.click();
    }
  });
});
