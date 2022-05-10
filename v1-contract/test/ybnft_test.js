const { ethers } = require("hardhat");
const { expect } = require("chai");
const { utils } = require("ethers");

describe("YBNFT contract test", () => {
    // accounts
    let deployer, account1, account2;
    let ybnftContract;
    let investorContract;
    let mockToken;

    // constants
    const pancakeswapRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"
    const wbnb = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"

    // random pair 
    const pancakeswapPair = "0x6f097f1B46ED92aF59f84c37b177927b6176B959"

    before(async () => {
        [deployer, account1, account2] = await ethers.getSigners();

        // ybnft contract prepare
        const YBNftContract = await ethers.getContractFactory("YBNFT");
        ybnftContract = await YBNftContract.deploy();
        await ybnftContract.deployed();
        console.log(`ybnft Contract deployed to: ${ybnftContract.address}`);

        // prepare investor contract
        const InvestorContract = await ethers.getContractFactory("HedgepieInvestor");
        investorContract = await InvestorContract.deploy(
            pancakeswapRouter,
            wbnb
        );
        await investorContract.deployed();
        console.log(`investor contract deployed to: ${investorContract.address}`);

        // prepare mock token
        const MockToken = await ethers.getContractFactory("MockBEP20");
        mockToken = await MockToken.deploy("Mock Token", "mTT", utils.parseUnits("1000000"));
        await mockToken.deployed();
        console.log(`mock token is deployed to ${mockToken.address}`);

        // mint mock token to user
        await mockToken.connect(deployer).mint(utils.parseUnits("10000"));
        await mockToken.connect(deployer).approve(ybnftContract.address, utils.parseUnits("10000000"));
        await mockToken.connect(deployer).approve(investorContract.address, utils.parseUnits("10000000"));
    });

    describe("set investor and treasury", () => {
        it("this can be done only owner", async() => {
            await expect(ybnftContract.connect(account1).setInvestor(investorContract.address)).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });

        it("this should be successed", async() => {
            await ybnftContract.connect(deployer).setInvestor(investorContract.address);
            await ybnftContract.connect(deployer).setTreasury(deployer.address);
        });

        it("check investor and treasury address", async() => {
            const investorAddr = await ybnftContract.investor();
            const treasuryAddr = await ybnftContract.treasury();

            expect(investorAddr).to.be.equal(investorContract.address);
            expect(treasuryAddr).to.be.equal(deployer.address);
        });
    });

    describe("test mint ybnft", () => {
        it("mint can be done by only owner", async() => {
            await expect(ybnftContract.connect(account1).mint(
                [10000],
                [wbnb],
                [pancakeswapPair],
                100
            )).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });

        it("this should be successed", async() => {
            await ybnftContract.connect(deployer).mint(
                [10000],
                [wbnb],
                [pancakeswapPair],
                100
            );
        });

        it("check token owner", async() => {
            const ownerAddr = await ybnftContract.ownerOf(1);
            expect(ownerAddr).to.be.equal(deployer.address);
        });
    });

    describe("test deposit function", () => {
        it("token needs to be allowed", async() => {
            await expect(ybnftContract.connect(deployer).deposit(1, mockToken.address, utils.parseUnits("100"))).to.be.revertedWith(
                'Error: token is not allowed'
            );
        });

        it("add token to allowed list", async() => {
            await ybnftContract.connect(deployer).manageToken([mockToken.address], true);
        });

        it("token should be mint already", async() => {
            await expect(ybnftContract.connect(deployer).deposit(2, mockToken.address, utils.parseUnits("100"))).to.be.revertedWith(
                'BEP721: NFT not exist'
            ); 
        });

        it("nft should be whitelisted on investor contract", async() => {
            await investorContract.connect(deployer).listNft(ybnftContract.address);
        });

        it("this deposit should be successed", async() => {
            await ybnftContract.connect(deployer).deposit(1, mockToken.address, utils.parseUnits("100"));
        });
    });

    describe("withdraw function test", () => {
        it("withdraw can be done for minted token", async() => {
            await expect(ybnftContract.connect(deployer).callStatic['withdraw(uint256,address)'](2, mockToken.address)).to.be.revertedWith(
                'BEP721: NFT not exist'
            );
        });

        it("withdraw can be done when amount is bigger than zero", async() => {
            await expect(ybnftContract.connect(deployer).callStatic['withdraw(uint256,address)'](1, mockToken.address)).to.be.revertedWith(
                'Withdraw: amount is 0'
            );
        });
    });
});
