document.addEventListener('DOMContentLoaded', () => {
  const licenseForm = document.getElementById('licenseForm');
  const calcForm = document.getElementById('calcForm');
  const resultDiv = document.getElementById('result');
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const licenseContainer = document.getElementById('license-container');
  const mainApp = document.getElementById('main-app');
  const muteToggle = document.getElementById('mute-toggle');
  const music = document.getElementById('bg-music');

  music.volume = 0.3;
  music.play();

  muteToggle.addEventListener('click', () => {
    music.muted = !music.muted;
    muteToggle.textContent = music.muted ? '🔇' : '🔊';
  });

  licenseForm.addEventListener('submit', e => {
    e.preventDefault();
    resultDiv.textContent = 'Validando...';
    resultDiv.style.color = '';

    const email = document.getElementById('email').value.trim();
    const key = document.getElementById('key').value.trim();
    const cb = 'cb_' + Date.now();

    window[cb] = data => {
      if (data.success) {
        licenseContainer.style.display = 'none';
        mainApp.style.display = 'block';
        music.play();
      } else {
        resultDiv.textContent = `❌ ${data.message}`;
        resultDiv.style.color = 'red';
      }
      delete window[cb];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec`
               + `?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&callback=${cb}`;
    document.head.appendChild(script);
  });

  calcForm.addEventListener('submit', e => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    const words = value.toUpperCase().split(/\s+/);
    let total = 0;
    let result = "";

    const map = {
      A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
    };

    for (const word of words) {
      let sum = 0;
      for (const char of word) {
        if (map[char]) sum += map[char];
      }
      result += `${word}: ${sum}\n`;
      total += sum;
    }
    result += `\nTOTAL: ${total}`;
    output.value = result;
  });
});
