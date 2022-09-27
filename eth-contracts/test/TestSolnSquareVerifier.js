const Verifier = artifacts.require('./Verifier.sol');
const SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol');
const { assert } = require('console');
const fs = require('fs');
const proofTree = JSON.parse(fs.readFileSync('../zokrates/code/square/proof.json'));

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    before('contract setup', async () => {
        proof = proofTree['proof'];
        verifier = await Verifier.new();
        solnSquareVerifier = await SolnSquareVerifier.new(verifier.address);
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('', async () => {
        let result = await solnSquareVerifier.addSolution(proof.A, proof.A_p, proof.B, proof.B_p, proof.C, proof.C_p, proof.H, proof.K, proofTree["input"], account_two, 20, {from: account_one});
        let event = result.logs[0].event;
        assert(event == 'SolutionAdded');
    })
    
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('', async () => {
        let result = await solnSquareVerifier.mint(account_two, 20, {from: account_one});
        let event = result.logs[0].event;
        assert(event == 'TokenMinted');        
        
    })

})