async function getPrice() {
  const token = document.getElementById("tokenInput").value.toLowerCase();
  const result = document.getElementById("priceResult");

  if (!token) {
    result.innerText = "Enter token id (example: bitcoin)";
    return;
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await res.json();

    if (!data[token]) {
      result.innerText = "Token not found.";
      return;
    }

    const change = data[token].usd_24h_change;
    const colorClass = change >= 0 ? "green" : "red";

    result.innerHTML =
      `<strong>${token.toUpperCase()}</strong><br>
      $${data[token].usd}<br>
      <span class="${colorClass}">
      24h: ${change.toFixed(2)}%
      </span>`;
  } catch {
    result.innerText = "Error fetching price.";
  }
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
    result.innerText = "Error fetching gas.";
  }
}

async function getTrending() {
  const list = document.getElementById("trendingList");
  list.innerHTML = "";

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    const data = await res.json();

    data.coins.slice(0, 5).forEach((coin) => {
      const li = document.createElement("li");
      li.innerHTML = `🚀 ${coin.item.name} (${coin.item.symbol.toUpperCase()})`;
      list.appendChild(li);
    });
  } catch {
    list.innerHTML = "<li>Error fetching trending</li>";
  }
}

/* Auto refresh every 30 seconds */
setInterval(() => {
  getGas();
  getTrending();
}, 30000);

window.getPrice = getPrice;
window.getGas = getGas;
window.getTrending = getTrending;
