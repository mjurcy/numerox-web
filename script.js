
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const numerologyForm = document.getElementById('numerologyForm');
  const resultDiv = document.getElementById('result');
  const output = document.getElementById('output');
  const loginContainer = document.getElementById('login-container');
  const appContainer = document.getElementById('app-container');
  const audio = document.getElementById('bg-music');
  const toggleAudio = document.getElementById('toggleAudio');

  let audioPlaying = false;
  toggleAudio.addEventListener('click', () => {
    if (audioPlaying) {
      audio.pause();
      toggleAudio.textContent = '🔇';
    } else {
      audio.play().catch(() => {});
      toggleAudio.textContent = '🔊';
    }
    audioPlaying = !audioPlaying;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const key = document.getElementById('key').value.trim();
    resultDiv.textContent = 'Validando...';

    const cb = 'cb_' + Date.now();
    window[cb] = data => {
      if (data.success) {
        loginContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
      }
      resultDiv.textContent = data.success ? `✅ ${data.message}` : `❌ ${data.message}`;
      delete window[cb];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&callback=${cb}`;
    document.head.appendChild(script);
  });

  numerologyForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) return;

    const values = {
      'A': 1, 'Á': 1, 'B': 2, 'C': 3, 'D': 5, 'E': 6, 'É': 6, 'F': 7, 'G': 8, 'H': 9,
      'I': 1, 'Í': 1, 'J': 2, 'K': 3, 'L': 4, 'LL': 5, 'M': 6, 'N': 7, 'Ñ': 8, 'O': 9, 'Ó': 9,
      'P': 1, 'Q': 2, 'R': 3, 'S': 4, 'T': 5, 'U': 6, 'Ú': 6, 'V': 7, 'X': 8, 'Y': 9, 'Z': 1, 'CH': 4
    };

    const parts = name.toUpperCase().split(" ");
    let result = "";
    let total = 0;

    parts.forEach(word => {
      let sum = 0;
      let i = 0;
      while (i < word.length) {
        const duo = word[i] + (word[i+1] || '');
        if (values[duo]) {
          sum += values[duo];
          i += 2;
        } else if (values[word[i]]) {
          sum += values[word[i]];
          i++;
        } else {
          i++;
        }
      }
      total += sum;
      result += `${word}: ${sum}\n`;
    });

    result += `\nTOTAL: ${total}`;
    output.value = result;
  });

  // Enter para submit en ambas pantallas
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (!loginContainer.classList.contains('hidden')) {
        form.dispatchEvent(new Event('submit'));
      } else {
        numerologyForm.dispatchEvent(new Event('submit'));
      }
    }
  });
});
