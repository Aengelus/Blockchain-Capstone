const Web3 = require('web3');
const fs = require('fs');
const apiKey = fs.readFileSync(".apiKey").toString().trim();
let web3 = new Web3('https://rinkeby.infura.io/v3/'+apiKey);

const contract = require("./build/contracts/SolnSquareVerifier.json");
const contractAddress = "0x88adeCc0c3B2F905732A073Eb097d96081fEeDF8";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const privateKey = "";
const publicKey = "";

nftContract.methods.symbol().call().then(console.log);

web3.eth.defaultAccount = publicKey;
console.log(web3.eth.defaultAccount);

async function mintToken() {
  const nonce = await web3.eth.getTransactionCount(publicKey, 'latest'); //get latest nonce
  console.log(nonce);
  //the transaction
  const tx = {
    'from': publicKey,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 50000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNewNFT(publicKey, 1).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mintToken();