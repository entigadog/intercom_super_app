<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Intercom Super App</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script defer src="index.js"></script>

  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: radial-gradient(circle at top, #111827, #000);
      color: white;
      text-align: center;
      overflow-x: hidden;
    }

    h1 {
      margin-top: 30px;
      font-size: 32px;
      background: linear-gradient(90deg,#00f5ff,#ff00c8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-top: 40px;
    }

    .card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
      padding: 20px;
      width: 330px;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(0,255,255,0.15);
      transition: 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 25px rgba(255,0,200,0.4);
    }

    input {
      padding: 10px;
      border-radius: 8px;
      border: none;
      width: 200px;
      text-align: center;
    }

    button {
      margin-top: 10px;
      padding: 8px 18px;
      border: none;
      border-radius: 8px;
      background: linear-gradient(90deg,#00f5ff,#ff00c8);
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .green { color:#00ff88 }
    .red { color:#ff4d4d }

    canvas {
      margin-top: 15px;
    }

  </style>
</head>
<body>

<h1>🚀 Intercom Super App</h1>

<div class="container">

  <div class="card">
    <h3>💰 Token Price</h3>
    <input id="tokenInput" placeholder="bitcoin / ethereum / trac"/>
    <br/>
    <button onclick="getPrice()">Check</button>
    <p id="priceResult"></p>
  </div>

  <div class="card">
    <h3>📊 Live Chart (7 Days)</h3>
    <canvas id="chartCanvas"></canvas>
  </div>

  <div class="card">
    <h3>🤖 AI Market Insight</h3>
    <p id="aiOutput">AI waiting for input...</p>
  </div>

  <div class="card">
    <h3>⛽ Ethereum Gas</h3>
    <p id="gasResult">Loading...</p>
  </div>

</div>

</body>
</html>
