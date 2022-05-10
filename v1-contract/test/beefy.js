const hre = require("hardhat");
const { ethers } = hre;
const { expect } = require("chai");

describe.only("Beefy adapter test", () => {
    let deployer;
    let beefyAdapter, hedgepieInvestor, strategyManager;

    const whaleWallet = "0xf35A6bD6E0459A4B53A27862c51A2A7292b383d1";
    let whaleUser, cakeToken;

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
        strategyManager = await StrategyManager.deploy();
        await strategyManager.deployed();
        console.log(`strategy manager deployed to ${strategyManager.address}`);

        const BeefyAdapter = await ethers.getContractFactory("StrategyBeefySingle");
        beefyAdapter = await BeefyAdapter.deploy(cakeVault);
        await beefyAdapter.deployed();
        console.log(`Beefy adapter deployed to ${beefyAdapter.address}`);

        cakeToken = await ethers.getContractAt("CakeToken", cakeAddr);

        // set strategy manager in investor contract
        await hedgepieInvestor.setStrategyManager(strategyManager.address);

        await hre.network.provider.send("hardhat_impersonateAccount", [whaleWallet]);
        whaleUser = ethers.provider.getSigner(whaleWallet);

        // set investor
        await beefyAdapter.setInvestor(whaleWallet);
    });

    describe("setting test", () => {
        it("testing", async() => {
            // send tokens first
            await cakeToken.connect(whaleUser).transfer(beefyAdapter.address, ethers.utils.parseUnits("100"));

            const cakeBalance = Number(await cakeToken.balanceOf(beefyAdapter.address)) / Math.pow(10, 18);
            expect(cakeBalance).to.be.equal(100);

            const tx = await beefyAdapter.connect(whaleUser).invest(ethers.utils.parseUnits("100"));
            await tx.wait();
        });
    });
});