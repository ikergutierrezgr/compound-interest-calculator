let chart;

function formatCurrency(value) {
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' €';
}


function calculate() {

  const principal = parseFloat(document.getElementById('principal').value);
  const monthly = parseFloat(document.getElementById('monthly').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const years = parseInt(document.getElementById('years').value);

  const errorMessage = document.getElementById('errorMessage');

  errorMessage.classList.add('hidden');
  errorMessage.innerText = '';

  if (
    principal < 0 ||
    monthly < 0 ||
    rate < 0 ||
    years < 0
  ) {
    errorMessage.innerText =
      'No se pueden introducir números negativos.';
      
    errorMessage.classList.remove('hidden');
    return;
  }

  const monthlyRate = rate / 12;

  let total = principal;
  let totalInvested = principal;

  const tbody = document.querySelector('#resultsTable tbody');
  const table = document.getElementById('resultsTable');
  table.classList.remove('hidden');
  tbody.innerHTML = '';

  const labels = [];
  const investedData = [];
  const benefitsData = [];
  const totalData = [];

  for (let year = 1; year <= years; year++) {

    let investedThisYear = 0;

    for (let month = 0; month < 12; month++) {

      total *= (1 + monthlyRate);

      total += monthly;

      investedThisYear += monthly;
      totalInvested += monthly;
    }

    const benefits = total - totalInvested;

    labels.push(`Año ${year}`);
    investedData.push(totalInvested.toFixed(2));
    benefitsData.push(benefits.toFixed(2));
    totalData.push(total.toFixed(2));

    const row = `
    <tr>
      <td>${year}</td>
      <td>${formatCurrency(investedThisYear)}</td>
      <td>${formatCurrency(totalInvested)}</td>
      <td class="profit">+${formatCurrency(benefits)}</td>
      <td class="total-column">${formatCurrency(total)}</td>
    </tr>
  `;

    tbody.innerHTML += row;
  }

  document.getElementById('result').innerText =
  `Resultado final: ${formatCurrency(total)}`;

  const chartContainer = document.getElementById('chartContainer');
  chartContainer.classList.remove('hidden');

  const ctx = document.getElementById('growthChart');

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total invertido',
          data: investedData,
          borderWidth: 3
        },
        {
          label: 'Beneficios',
          data: benefitsData,
          borderWidth: 3
        },
        {
          label: 'Patrimonio total',
          data: totalData,
          borderWidth: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}