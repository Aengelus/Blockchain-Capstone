var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const TOTAL_SUPPLY = 10;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
            for(let i = 0; i < TOTAL_SUPPLY; i++) {
                await this.contract.mint(accounts[i], i, {from: account_one})
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert(totalSupply == TOTAL_SUPPLY);
        })
        
        it('should get token balance', async function () { 
            let totalSupply = await this.contract.balanceOf.call(account_one);
            assert(totalSupply == TOTAL_SUPPLY/2);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            let result = await this.contract.baseTokenURI.call({from: account_one});
            assert(result == tokenURI);
        })

        it('should transfer token from one owner to another', async function () { 
            let result = await this.contract.approve(account_two, 1, {from: account_one});
            result = await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            result = await this.contract.ownerOf.call(1);
            assert(result == account_two);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let result = false;
            try {
                await this.contract.mint(account_two, 11, {from: account_two});
            } catch (e) {
                result = true;
            }
            assert(result == true, "Non contract owner shouldn't be able to mint a new token")
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.owner.call();
            assert(result == account_one, "Account_one shouldn't be the owner!")
        })

    });
})