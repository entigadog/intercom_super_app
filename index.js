let chart;

async function getPrice() {
  const token = document.getElementById("tokenInput").value.toLowerCase();
  const result = document.getElementById("priceResult");
  const aiOutput = document.getElementById("aiOutput");

  if (!token) {
    result.innerText = "Enter token id (example: bitcoin)";
    return;
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${token}`
    );
    const data = await res.json();

    const price = data.market_data.current_price.usd;
    const change = data.market_data.price_change_percentage_24h;

    const color = change >= 0 ? "green" : "red";

    result.innerHTML = `
      <strong>${data.name}</strong><br>
      $${price}<br>
      <span class="${color}">
      24h: ${change.toFixed(2)}%
      </span>
    `;

    generateAIInsight(change);
    loadChart(token);

  } catch {
    result.innerText = "Token not found.";
  }
}

function generateAIInsight(change) {
  const aiOutput = document.getElementById("aiOutput");

  if (change > 5) {
    aiOutput.innerHTML = "🟢 Strong momentum detected. Trend: Bullish.";
  } else if (change > 0) {
    aiOutput.innerHTML = "🟡 Mild positive movement. Trend: Stable.";
  } else if (change < -5) {
    aiOutput.innerHTML = "🔴 High volatility. Risk: Elevated.";
  } else {
    aiOutput.innerHTML = "🟠 Slight correction. Monitor closely.";
  }
}

async function loadChart(token) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=7`
  );
  const data = await res.json();

  const prices = data.prices.map(p => p[1]);
  const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());

  const ctx = document.getElementById("chartCanvas");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Price (USD)",
        data: prices,
        borderColor: "#00f5ff",
        backgroundColor: "rgba(0,245,255,0.1)",
        tension: 0.3
      }]
    }
  });
}

async function getGas() {
  const result = document.getElementById("gasResult");

  try {
    const res = await fetch(
      "https://api.etherscan.io/api?module=gastracker&action=gasoracle"
    );
    const data = await res.json();

    if (data.status !== "1") {
      result.innerText = "Gas API error.";
      return;
    }

    result.innerHTML =
      `Low: ${data.result.SafeGasPrice} Gwei<br>
       Avg: ${data.result.ProposeGasPrice} Gwei<br>
       High: ${data.result.FastGasPrice} Gwei`;

  } catch {
    result.innerText = "Gas fetch error.";
  }
}

getGas();
setInterval(getGas, 30000);
