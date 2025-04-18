
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const emailField = document.getElementById('email');
  const keyField = document.getElementById('key');
  const result = document.getElementById('result');
  const containerLicense = document.getElementById('license-container');
  const containerMain = document.getElementById('main-app');
  const bgMusic = document.getElementById('bg-music');
  const muteButton = document.getElementById('mute-toggle');

  let musicStarted = false;

  document.addEventListener('click', () => {
    if (!musicStarted) {
      bgMusic.play().catch(err => console.warn(err));
      musicStarted = true;
    }
  }, { once: true });

  muteButton.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteButton.textContent = bgMusic.muted ? '🔇' : '🔊';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailField.value.trim();
    const key = keyField.value.trim();
    result.textContent = "Validando...";

    const cb = 'cb_' + Date.now();
    window[cb] = (data) => {
      if (data.success) {
        containerLicense.style.display = 'none';
        containerMain.style.display = 'block';
      }
      result.textContent = data.message;
      delete window[cb];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&callback=${cb}`;
    document.head.appendChild(script);
  });

  const btnCalc = document.getElementById("calcular");
  const input = document.getElementById("nombre");
  const output = document.getElementById("resultado");

  function calculate(name) {
    const map = {
      'A': 1, 'Á': 1, 'B': 2, 'C': 3, 'D': 5, 'E': 6, 'É': 6,
      'F': 7, 'G': 8, 'H': 9, 'I': 1, 'Í': 1, 'J': 2, 'K': 3,
      'L': 4, 'LL': 5, 'M': 6, 'N': 7, 'Ñ': 8, 'O': 9, 'Ó': 9,
      'P': 1, 'Q': 2, 'R': 3, 'S': 4, 'T': 5, 'U': 6, 'Ú': 6,
      'V': 7, 'X': 8, 'Y': 9, 'Z': 1, 'CH': 4
    };
    let words = name.trim().toUpperCase().split(/\s+/);
    let result = '';
    let total = 0;

    for (let word of words) {
      let sum = 0;
      for (let i = 0; i < word.length; i++) {
        let two = word.slice(i, i+2);
        if (map[two]) {
          sum += map[two];
          i++;
        } else if (map[word[i]]) {
          sum += map[word[i]];
        }
      }
      result += `${word}: ${sum}\n`;
      total += sum;
    }
    result += `\nTOTAL: ${total}`;
    output.value = result;
  }

  btnCalc.addEventListener("click", () => {
    calculate(input.value);
  });

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate(input.value);
    }
  });
});
