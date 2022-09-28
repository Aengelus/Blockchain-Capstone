const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/SolnSquareVerifier.json', 'utf8'));
console.log(JSON.stringify(contract.abi));