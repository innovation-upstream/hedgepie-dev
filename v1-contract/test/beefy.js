const hre = require("hardhat");
const { ethers } = hre;
const { expect } = require("chai");

describe.only("Beefy adapter test", () => {
    let deployer;
    let ybnftContract, beefyAdapter, beefyVault, hedgepieInvestor;

    const whaleWallet = "0xf35A6bD6E0459A4B53A27862c51A2A7292b383d1";
    let whaleUser, cakeToken;

    // constants
    const cakeVault = "0x97e5d50Fe0632A95b9cf1853E744E02f7D816677";
    const cakeAddr = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";

    const swapRouter = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
    const wBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

    before(async () => {
        [deployer] = await ethers.getSigners();

        const HedgepieInvestor = await ethers.getContractFactory("HedgepieInvestor");
        hedgepieInvestor = await HedgepieInvestor.deploy(swapRouter, wBNB);
        await hedgepieInvestor.deployed();
        console.log(`hedgepie investor deployed to ${hedgepieInvestor.address}`);

        const StrategyManager = await ethers.getContractFactory("HedgepieStrategyManager");
        const strategyManager = await StrategyManager.deploy();
        await strategyManager.deployed();
        console.log(`strategy manager deployed to ${strategyManager.address}`);

        const BeefyAdapter = await ethers.getContractFactory("StrategyBeefySingle");
        beefyAdapter = await BeefyAdapter.deploy(cakeVault);
        await beefyAdapter.deployed();
        console.log(`Beefy adapter deployed to ${beefyAdapter.address}`);

        // ybnft contract prepare
        const YBNftContract = await ethers.getContractFactory("YBNFT");
        ybnftContract = await YBNftContract.deploy();
        await ybnftContract.deployed();
        console.log(`ybnft Contract deployed to: ${ybnftContract.address}`);

        beefyVault = await ethers.getContractAt("BeefyVaultV6", cakeVault);

        cakeToken = await ethers.getContractAt("CakeToken", cakeAddr);

        // set strategy manager in investor contract
        await hedgepieInvestor.setStrategyManager(strategyManager.address);
        await hedgepieInvestor.listNft(ybnftContract.address);

        await hre.network.provider.send("hardhat_impersonateAccount", [whaleWallet]);
        whaleUser = ethers.provider.getSigner(whaleWallet);

        // set investor
        await beefyAdapter.setInvestor(strategyManager.address);

        await ybnftContract.connect(deployer).setInvestor(hedgepieInvestor.address);
        await ybnftContract.connect(deployer).setTreasury(deployer.address);

        // allow token to depsit
        await ybnftContract.connect(deployer).manageToken([cakeAddr, wBNB], true);

        // list strategy on strategy manager
        await strategyManager.addStrategy(beefyAdapter.address);
        await strategyManager.setInvestor(hedgepieInvestor.address);
    });

    describe("deposit function test", () => {
        it("create strategy", async() => {
            await ybnftContract.connect(deployer).mint(
                [10000],
                [cakeAddr],
                [beefyAdapter.address],
                100
            );
        });

        it("testing deposit", async() => {
            // approve tokens first
            await cakeToken.connect(whaleUser).approve(ybnftContract.address, ethers.utils.parseUnits("100"));

            await ybnftContract.connect(whaleUser).deposit(
                1, // tokenid
                cakeAddr, // cake token
                ethers.utils.parseUnits("100") // amount
            );
            
            // deposit amount should be 100
            const depositAmount = Number(await hedgepieInvestor.userInfo(whaleWallet, ybnftContract.address, 1)) / Math.pow(10, 18);
            expect(depositAmount).to.be.equal(100);
        }).timeout(100000);
    });

    describe("withdraw function test", () => {
        it("withdraw request requires vault token", async() => {
            await expect(ybnftContract.connect(deployer).callStatic['withdraw(uint256,address,uint256)'](
                1,
                cakeAddr,
                ethers.utils.parseUnits("50")
            )).to.be.revertedWith("Withdraw: exceeded amount");
        });

        it("withdraw amount should be smaller than token balance", async() => {
            await expect(ybnftContract.connect(whaleUser).callStatic['withdraw(uint256,address,uint256)'](
                1,
                cakeAddr,
                ethers.utils.parseUnits("150")
            )).to.be.revertedWith("Withdraw: exceeded amount");
        })

        it("withdraw will be successed", async() => {
            // change investor address - this should be fixed
            await beefyAdapter.setInvestor(hedgepieInvestor.address);

            await ybnftContract.connect(whaleUser).callStatic['withdraw(uint256,address,uint256)'](
                1,
                cakeAddr,
                ethers.utils.parseUnits("50")
            );
        }).timeout(100000);
    })
});