pragma solidity >=0.5.0 <=0.8.17;

import './ERC721Mintable.sol';
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './Verifier.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable, Verifier {

    Verifier verifierContract;

    constructor(address verifierAddress) ERC721Mintable() public {
        verifierContract = Verifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint[2] a;
        uint[2] a_p;
        uint[2][2] b;
        uint[2] b_p;
        uint[2] c;
        uint[2] c_p;
        uint[2] h;
        uint[2] k;
        uint[2] input;
        address solutionAddress;
        uint256 tokenId;
        bytes32 key;
    }

    // TODO define an array of the above struct
    mapping(uint256 => Solution) solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) submittedSolutions;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address solution);


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint[2] memory a, uint[2] memory a_p, uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c, uint[2] memory c_p, uint[2] memory h, uint[2] memory k, uint[2] memory input, address solutionAddress, uint256 tokenId) public returns (bool) {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input, solutionAddress, tokenId));
        Solution memory solution = Solution(a, a_p, b, b_p, c, c_p, h, k, input, solutionAddress, tokenId, key);
        solutions[tokenId] = solution;
        emit SolutionAdded(msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mint(address solutionAddress, uint256 tokenId) public returns (bool) {
        require(solutions[tokenId].solutionAddress != address(0));
        Solution memory solution = solutions[tokenId];
        bool verification = verifierContract.verifyTx(solution.a, solution.a_p, solution.b, solution.b_p, solution.c, solution.c_p, solution.h, solution.k, solution.input);
        if(verification) {
            submittedSolutions[solution.key] = true;
            super.mint(solutionAddress, tokenId);
            return true;
        } else {
            submittedSolutions[solution.key] = true;
            return false;
        }
    }

}