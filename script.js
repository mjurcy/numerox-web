document.getElementById('licenseForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const key = document.getElementById('key').value.trim();

  const response = await fetch('https://script.google.com/macros/s/AKfycbyxL-zJg1LWcTMMi7d85bf-QfWOrR1NcZ3oXVETGj-o7Ej2vL5aMuEQsFTkfqedMKbsWQ/exec', {
    method: 'POST',
    body: new URLSearchParams({ email, key })
  });

  const result = await response.json();
  const output = document.getElementById('result');
  if (result.ok) {
    output.innerHTML = `<span style="color: green;">✔ ${result.message}</span>`;
  } else {
    output.innerHTML = `<span style="color: red;">✖ ${result.message}</span>`;
  }
});
servidor.";
    }
  }  servidor.";
    }
  }  