<!DOCTYPE html>
<html>
<head>
  <title>IntercomX Super App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="container">
    <h1>IntercomX 🚀</h1>
    <p>AI-Powered Web3 Super App</p>

    <div class="card">
      <h2>Token Swap</h2>
      <input id="fromToken" placeholder="From Token (ETH)">
      <input id="toToken" placeholder="To Token (USDC)">
      <input id="amount" placeholder="Amount">
      <button onclick="executeSwap()">Swap Now</button>
    </div>

    <div class="card">
      <h2>AI Agent Command</h2>
      <input id="aiInput" placeholder="Type: swap 1 ETH to USDC">
      <button onclick="runAI()">Execute AI</button>
    </div>

    <div class="card">
      <h2>Execution Log</h2>
      <div id="output"></div>
    </div>

  </div>

<script src="app.js"></script>
</body>
</html>
