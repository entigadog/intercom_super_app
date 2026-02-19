let provider, signer, address;

const ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const TRAC = "0xaa7a9ca887a21a0f3d2a8f7a8b5d5b96f6a0a7c5";

const routerABI = [
  "function exactInputSingle(tuple(address,address,uint24,address,uint256,uint256,uint160)) payable returns (uint256)"
];

const erc20ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

function log(msg){
  document.getElementById("log").innerHTML += "<p>"+msg+"</p>";
}

async function connect(){
  if(!window.ethereum) return alert("Install MetaMask");

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts",[]);
  signer = provider.getSigner();
  address = await signer.getAddress();

  const network = await provider.getNetwork();
  if(network.chainId !== 1){
    alert("Switch to Ethereum Mainnet");
    return;
  }

  document.getElementById("wallet").innerText="Connected: "+address;
}

async function getBalances(){
  const ethBal = await provider.getBalance(address);
  log("ETH: "+ethers.utils.formatEther(ethBal));

  const trac = new ethers.Contract(TRAC, erc20ABI, provider);
  const bal = await trac.balanceOf(address);
  const decimals = await trac.decimals();
  log("TRAC: "+ethers.utils.formatUnits(bal, decimals));
}

async function swap(){
  const amount = document.getElementById("amount").value;
  if(!amount) return alert("Enter amount");

  const router = new ethers.Contract(ROUTER, routerABI, signer);
  const amountIn = ethers.utils.parseEther(amount);

  const params = {
    tokenIn: ethers.constants.AddressZero,
    tokenOut: TRAC,
    fee: 3000,
    recipient: address,
    deadline: Math.floor(Date.now()/1000)+600,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0
  };

  try{
    log("Sending transaction...");
    const tx = await router.exactInputSingle(params,{ value: amountIn });
    log("Tx Hash: "+tx.hash);
    await tx.wait();
    log("Swap completed successfully ✅");
  }catch(e){
    log("Error: "+e.message);
  }
}

function runAI(){
  const input = document.getElementById("ai").value.toLowerCase();
  if(input.includes("swap")){
    const words = input.split(" ");
    document.getElementById("amount").value = words[1];
    log("AI detected swap command");
    swap();
  } else if(input.includes("balance")){
    getBalances();
  } else {
    log("Command not recognized");
  }
}
