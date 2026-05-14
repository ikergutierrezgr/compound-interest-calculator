function calculate() {

  const principal = parseFloat(document.getElementById('principal').value);
  const monthly = parseFloat(document.getElementById('monthly').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const years = parseFloat(document.getElementById('years').value);

  const months = years * 12;
  const monthlyRate = rate / 12;

  let total = principal;

  for (let i = 0; i < months; i++) {
    total = total * (1 + monthlyRate);
    total += monthly;
  }

  document.getElementById('result').innerText =
    `Resultado final: €${total.toFixed(2)}`;
}