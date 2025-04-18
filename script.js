document.addEventListener('DOMContentLoaded', () => {
  const licenseForm = document.getElementById('licenseForm');
  const resultDiv = document.getElementById('result');
  const loginScreen = document.getElementById('loginScreen');
  const mainApp = document.getElementById('mainApp');
  const muteBtn = document.getElementById('muteBtn');
  const music = document.getElementById('bgMusic');
  const baseUrl = 'https://script.google.com/macros/s/AKfycbysGQopzfrmwPaoDyDfgh9GlwMZPLfg1V-KUDeJxp_mFQ5X0zAZMYuR8d_6WjeM47h83g/exec';

  music.volume = 0.2;
  music.play();

  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.textContent = music.muted ? '🔇' : '🔊';
  });

  licenseForm.addEventListener('submit', e => {
    e.preventDefault();
    resultDiv.textContent = 'Validando...';
    const email = document.getElementById('email').value.trim();
    const key = document.getElementById('key').value.trim();
    const cb = 'cb_' + Date.now();

    window[cb] = data => {
      if (data.success) {
        loginScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
      } else {
        resultDiv.textContent = `❌ ${data.message}`;
        resultDiv.style.color = 'red';
      }
      delete window[cb];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `${baseUrl}?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&callback=${cb}`;
    document.head.appendChild(script);
  });

  const inputText = document.getElementById('inputText');
  const calcButton = document.getElementById('calcButton');
  const results = document.getElementById('results');

  const numerologyValue = letter => {
    const table = { A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
                    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
                    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8 };
    return table[letter.toUpperCase()] || 0;
  };

  const calculateNumerology = (input) => {
    const words = input.split(' ');
    let total = 0;
    let breakdown = '';
    words.forEach(word => {
      let sum = 0;
      for (let ch of word) sum += numerologyValue(ch);
      breakdown += `${word.toUpperCase()}: ${sum}
`;
      total += sum;
    });
    breakdown += `
TOTAL: ${total}`;
    return breakdown;
  };

  const handleCalculation = () => {
    const value = inputText.value.trim();
    if (!value) {
      alert("Por favor, escribí un nombre.");
      return;
    }
    results.textContent = calculateNumerology(value);
  };

  calcButton.addEventListener('click', handleCalculation);
  inputText.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculation();
    }
  });
});
