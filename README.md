# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

# Information

Udacity Blockchain Developer Nanodegree Program Capstone project.  

## Install

To install, download or clone the repo, then:

`npm install`

Move to contracts directory, install dependencies and compile contracts:

```
cd eth-contracts
npm install
truffle compile
``` 

## Tests

Start ganache:
Using the cli with the parameter let you use the same public and private keys for testing when restarting.  
```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
truffle test
```

To run individual tests:
```
truffle test ./test/TestERC721Mintable.js
truffle test ./test/TestSquareVerifier.js
truffle test ./test/TestSolnSquareVerifier.js
```

## ZoKrates Setup

Install and instantiate a Zokrates zkSnarks development environment using Docker. Completes the Zokrates proof in `square.code` by adding the variable names in `square.code`.

Preequisite: Install Docker using instructions from [here](https://docs.docker.com/install/).

```
# Run ZoKrates
**On a Mac with a M1 or M2 chip use this line of code (Here you need to add --platform linux/amd64). The used zokrates version is 0.3.0**  
docker run --platform linux/amd64 -v ${pwd}:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash  

# Change path to code/square
cd code/square

# Compile the program
~/zokrates compile -i square.code

# Generate the Trusted Setup
~/zokrates setup

# Compute Witness
~/zokrates compute-witness -a 3 9

# Generate Proof
~/zokrates generate-proof

# Export Verifier
~/zokrates export-verifier
```

When finished, move the Verifier.sol file to the contracts folder.

## Contracts Deployment on Rinkeby

Run the following command to deploy contracts on Rinkeby netwrok:
1. Configure your truffle-config.js like:
```
     const HDWalletProvider = require("@truffle/hdwallet-provider");

    const fs = require('fs');
    const mnemonic = fs.readFileSync(".secret").toString().trim();
    const apiKey = fs.readFileSync(".apiKey").toString().trim();
    
    networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     rinkeby: {
       provider: function () {
         return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/"+apiKey)
       },
       network_id: 4,
       gas: 5500000,
       gasprice: 20000000000,
     }
```
2. Store your secret and apiKey in a seperate file called '.secret' and '.apiKey'
3. Run
    ```truffle migrate --network rinkeby```
## OpenSea Storefront
[OpenSea Storefront](https://testnets.opensea.io/collection/untitled-collection-13641064)
## ADDRESS
Contract Address](https://rinkeby.etherscan.io/address/0xd4e0ee7f86c8418c4885d065c530a67686521661)
```
Deploying 'ERC721Mintable'
   --------------------------
   > transaction hash:    0xc183a4f26ab87a2f074eda67f2e0a04e4494303829eef4e890bf8714eb0dbcbf
   > [Contract Address](https://rinkeby.etherscan.io/address/0xd4e0ee7f86c8418c4885d065c530a67686521661)  0xd4e0ee7f86c8418C4885d065c530A67686521661
   > block number:        11460780
   > block timestamp:     1664394240
   > account:             0x132BedcDF79c329F72E9Bc22F11547222bE95b13

Deploying 'Verifier'
   --------------------
   > transaction hash:    0xf05be594afb72146baa99ff8676d1aaace631ef0746edebe7ba800ebf43b162e
   > [Contract Address](https://rinkeby.etherscan.io/address/0xfed2E4eE9FB595970d427546b7127789ccB4E902)  0xfed2E4eE9FB595970d427546b7127789ccB4E902
   > block number:        11460781
   > block timestamp:     1664394255
   > account:             0x132BedcDF79c329F72E9Bc22F11547222bE95b13

Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x4d22ad1b4a623bdfe260a21fdb28bd20f8fb3f33376775a4f2590a9851653e92
   > [Contract Address](https://rinkeby.etherscan.io/address/0x88adeCc0c3B2F905732A073Eb097d96081fEeDF8)  0x88adeCc0c3B2F905732A073Eb097d96081fEeDF8
   > block number:        11460782
   > block timestamp:     1664394270
   > account:             0x132BedcDF79c329F72E9Bc22F11547222bE95b13
```
## ABI
[{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"},{"name":"_proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"baseTokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256[2]"},{"name":"a_p","type":"uint256[2]"},{"name":"b","type":"uint256[2][2]"},{"name":"b_p","type":"uint256[2]"},{"name":"c","type":"uint256[2]"},{"name":"c_p","type":"uint256[2]"},{"name":"h","type":"uint256[2]"},{"name":"k","type":"uint256[2]"},{"name":"input","type":"uint256[2]"}],"name":"verifyTx","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"verifierAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"solution","type":"address"}],"name":"SolutionAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"}],"name":"Verified","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnershipTransfered","type":"event"},{"constant":false,"inputs":[{"name":"a","type":"uint256[2]"},{"name":"a_p","type":"uint256[2]"},{"name":"b","type":"uint256[2][2]"},{"name":"b_p","type":"uint256[2]"},{"name":"c","type":"uint256[2]"},{"name":"c_p","type":"uint256[2]"},{"name":"h","type":"uint256[2]"},{"name":"k","type":"uint256[2]"},{"name":"input","type":"uint256[2]"},{"name":"solutionAddress","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"addSolution","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"solutionAddress","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"mintNewNFT","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]