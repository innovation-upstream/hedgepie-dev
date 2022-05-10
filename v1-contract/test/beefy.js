const hre = require("hardhat");
const { ethers } = hre;
const { expect } = require("chai");

describe.only("Beefy adapter test", () => {
    let deployer;
    let ybnftContract;

    const whaleWallet = "0xf35A6bD6E0459A4B53A27862c51A2A7292b383d1";
    let whaleUser, cakeToken;

    // constants
    const pancakeswapRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"

    const cakeVault = "0x97e5d50Fe0632A95b9cf1853E744E02f7D816677";
    const cakeAddr = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";

    const swapRouter = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
    const wBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

    before(async () => {
        [deployer] = await ethers.getSigners();

        const HedgepieInvestor = await ethers.getContractFactory("HedgepieInvestor");
        const hedgepieInvestor = await HedgepieInvestor.deploy(swapRouter, wBNB);
        await hedgepieInvestor.deployed();
        console.log(`hedgepie investor deployed to ${hedgepieInvestor.address}`);

        const StrategyManager = await ethers.getContractFactory("HedgepieStrategyManager");
        const strategyManager = await StrategyManager.deploy();
        await strategyManager.deployed();
        console.log(`strategy manager deployed to ${strategyManager.address}`);

        const BeefyAdapter = await ethers.getContractFactory("StrategyBeefySingle");
        const beefyAdapter = await BeefyAdapter.deploy(cakeVault);
        await beefyAdapter.deployed();
        console.log(`Beefy adapter deployed to ${beefyAdapter.address}`);

        // ybnft contract prepare
        const YBNftContract = await ethers.getContractFactory("YBNFT");
        ybnftContract = await YBNftContract.deploy();
        await ybnftContract.deployed();
        console.log(`ybnft Contract deployed to: ${ybnftContract.address}`);

        cakeToken = await ethers.getContractAt("CakeToken", cakeAddr);

        // set strategy manager in investor contract
        await hedgepieInvestor.setStrategyManager(strategyManager.address);

        await hre.network.provider.send("hardhat_impersonateAccount", [whaleWallet]);
        whaleUser = ethers.provider.getSigner(whaleWallet);

        // set investor
        await beefyAdapter.setInvestor(whaleWallet);

        await ybnftContract.connect(deployer).setInvestor(hedgepieInvestor.address);
        await ybnftContract.connect(deployer).setTreasury(deployer.address);

        // allow token to depsit
        await ybnftContract.connect(deployer).manageToken([cakeAddr], true);
    });

    describe("setting test", () => {
        it("create strategy", async() => {
            await ybnftContract.connect(deployer).mint(
                [10000],
                [cakeAddr],
                [pancakeswapRouter],
                100
            );
        });

        it("testing", async() => {
            // // send tokens first
            // await cakeToken.connect(whaleUser).transfer(beefyAdapter.address, ethers.utils.parseUnits("100"));

            // const cakeBalance = Number(await cakeToken.balanceOf(beefyAdapter.address)) / Math.pow(10, 18);
            // expect(cakeBalance).to.be.equal(100);

            // const tx = await beefyAdapter.connect(whaleUser).invest(ethers.utils.parseUnits("100"));
            // await tx.wait();

            await ybnftContract.connect(deployer).deposit(
                1, // tokenid
                cakeAddr, // cake token
                ethers.utils.parseUnits("100") // amount
            );
        });
    });
});