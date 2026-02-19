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

    result.innerText =
      `${token.toUpperCase()} Price: $${data[token].usd} | 24h: ${data[token].usd_24h_change.toFixed(2)}%`;
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

    result.innerText =
      `Low: ${data.result.SafeGasPrice} Gwei | ` +
      `Average: ${data.result.ProposeGasPrice} Gwei | ` +
      `High: ${data.result.FastGasPrice} Gwei`;
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
      li.innerText = `${coin.item.name} (${coin.item.symbol.toUpperCase()})`;
      list.appendChild(li);
    });
  } catch {
    list.innerHTML = "<li>Error fetching trending tokens</li>";
  }
}
