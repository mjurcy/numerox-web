document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('licenseForm');
  const nameForm = document.getElementById('numerologyForm');
  const result = document.getElementById('result');
  const output = document.getElementById('output');
  const loginContainer = document.getElementById('login-container');
  const appContainer = document.getElementById('app-container');

  const audio = document.getElementById('bg-music');
  const toggleAudio = document.getElementById('toggleAudio');
  let muted = false;

  // 🔊 Intentar reproducir con volumen bajo
  audio.volume = 0.3;
  document.body.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
  }, { once: true });

  toggleAudio.addEventListener('click', () => {
    muted = !muted;
    audio.muted = muted;
    toggleAudio.textContent = muted ? '🔇' : '🔊';
  });

  const baseUrl = 'https://script.google.com/macros/s/AKfycbxN8x7yN459T5RNfY7kRMNNDpGPoQSizQFMNEnQ--otlngiuhgCsPi_UHG0ocWYrchR4Q/exec';

  form.addEventListener('submit', e => {
    e.preventDefault();
    result.textContent = 'Validando…';
  
    const email = document.getElementById('email').value.trim();
    const key   = document.getElementById('key').value.trim();
    const cb    = 'cb_' + Date.now();
  
    // creás el <script>
    const script = document.createElement('script');
    script.src = `${baseUrl}?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&callback=${cb}`;
    document.head.appendChild(script);
  
    // si no responde en 10s, limpias igual
    const cleanupTimeout = setTimeout(() => {
      delete window[cb];
      script.remove();
    }, 10000);
  
    window[cb] = data => {
      clearTimeout(cleanupTimeout);
      if (data.success) {
        // …
      } else {
        // …
      }
      delete window[cb];
      script.remove();
    };
  });

  nameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) return;

    const values = {
      'A': 1, 'Á': 1, 'B': 2, 'C': 3, 'D': 5, 'E': 6, 'É': 6, 'F': 7, 'G': 8, 'H': 9,
      'I': 1, 'Í': 1, 'J': 2, 'K': 3, 'L': 4, 'LL': 5, 'M': 6, 'N': 7, 'Ñ': 8, 'O': 9, 'Ó': 9,
      'P': 1, 'Q': 2, 'R': 3, 'S': 4, 'T': 5, 'U': 6, 'Ú': 6, 'V': 7, 'X': 8, 'Y': 9, 'Z': 1,
      'CH': 4
    };

    const words = name.toUpperCase().split(/\s+/);
    let outputText = '';
    let total = 0;

    words.forEach(word => {
      let sum = 0;
      let i = 0;
      while (i < word.length) {
        const pair = word.slice(i, i + 2);
        if (values[pair]) {
          sum += values[pair];
          i += 2;
        } else if (values[word[i]]) {
          sum += values[word[i]];
          i++;
        } else {
          i++;
        }
      }
      total += sum;
      outputText += `${word}: ${sum}\n`;
    });

    outputText += `\nTOTAL: ${total}`;
    output.value = outputText;
    output.scrollTop = output.scrollHeight;
  });
});
