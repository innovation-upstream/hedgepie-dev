const hre = require("hardhat");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
const cakeVault = "0x97e5d50Fe0632A95b9cf1853E744E02f7D816677";
const cakeAddr = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
const swapRouter = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
const wBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

const unlockAccount = async (address) => {
  await hre.network.provider.send("hardhat_impersonateAccount", [address]);
  return ethers.provider.getSigner(address);
};

describe("Beefy Vault Adapter Unit Test", function () {
  let beefyAdapter, hedgepieInvestor, ybnftContract;
  let deployer, whaleUser, cakeToken;

  before("Deploy contract", async function () {
    [deployer] = await ethers.getSigners();

    whaleUser = await unlockAccount(WHALE);

    // TODO: should generate contract interface of invester, ybnft, adapterManager and adapter contract
    const BeefyAdapter = await ethers.getContractFactory("BeefyVaultAdapter");
    beefyAdapter = await BeefyAdapter.deploy(cakeVault, "BeefyCakeAdapter");
    await beefyAdapter.deployed();
    console.log(`Beefy Cake vault adapter deployed to: ${beefyAdapter.address}`);

    const YBNftContract = await ethers.getContractFactory("YBNFT");
    ybnftContract = await YBNftContract.deploy();
    await ybnftContract.deployed();
    console.log(`ybnft Contract deployed to: ${ybnftContract.address}`);

    const HedgepieInvestor = await ethers.getContractFactory("HedgepieInvestor");
    hedgepieInvestor = await HedgepieInvestor.deploy(ybnftContract.address, swapRouter, wBNB);
    await hedgepieInvestor.deployed();
    console.log(`hedgepie investor deployed to: ${hedgepieInvestor.address}`);

    const AdapterManager = await ethers.getContractFactory("HedgepieAdapterManager");
    const adapterManager = await AdapterManager.deploy();
    await adapterManager.deployed();
    console.log(`adapter manager deployed to ${adapterManager.address}`);

    // do setting
    cakeToken = await ethers.getContractAt("CakeToken", cakeAddr);

    // set adapter manager in investor contract
    await hedgepieInvestor.setAdapterManager(adapterManager.address);

    // set investor
    await beefyAdapter.setInvestor(adapterManager.address);

    // list strategy on strategy manager
    await adapterManager.addAdapter(beefyAdapter.address);
    await adapterManager.setInvestor(hedgepieInvestor.address);
  });

  describe("create new nft", async() => {
    it("create new nft token", async() => {
      await ybnftContract.connect(deployer).mint(
        [10000],
        [cakeAddr],
        [beefyAdapter.address],
        100
      );
    });
  });

  describe("deposit function testing", () => {
    it("deposit testing", async() => {
      // approve tokens first
      await cakeToken.connect(whaleUser).approve(hedgepieInvestor.address, ethers.utils.parseUnits("100"));

      await hedgepieInvestor.connect(whaleUser).deposit(
        WHALE,
        1, // tokenid
        cakeAddr, // cake token
        ethers.utils.parseUnits("100") // amount
      );
      
      // deposit amount should be 100
      const depositAmount = Number(await hedgepieInvestor.userInfo(WHALE, ybnftContract.address, 1)) / Math.pow(10, 18);
      expect(depositAmount).to.be.equal(100);
    }).timeout(100000);
  });

  describe("withdraw function testing", () => {
    it("withdraw request requires vault token", async() => {
      await expect(hedgepieInvestor.connect(deployer).withdraw(
          deployer.address,
          1,
          cakeAddr,
          ethers.utils.parseUnits("50")
      )).to.be.revertedWith("Withdraw: exceeded amount");
    });

    it("withdraw amount should be smaller than token balance", async() => {
      await expect(hedgepieInvestor.connect(whaleUser).withdraw(
          WHALE,
          1,
          cakeAddr,
          ethers.utils.parseUnits("150")
      )).to.be.revertedWith("Withdraw: exceeded amount");
    });

    it("withdraw will be successed", async() => {
      const startBal = Number(await cakeToken.balanceOf(WHALE)) / Math.pow(10, 18);

      await hedgepieInvestor.connect(whaleUser).withdraw(
        WHALE,
        1,
        cakeAddr,
        ethers.utils.parseUnits("50")
      );

      const lastBal = Number(await cakeToken.balanceOf(WHALE)) / Math.pow(10, 18);
      const diffBal = lastBal - startBal;
      expect(diffBal).to.be.gt(50);

      // deposit amount should be 50
      const depositAmount = Number(await hedgepieInvestor.userInfo(WHALE, ybnftContract.address, 1)) / Math.pow(10, 18);
      expect(depositAmount).to.be.equal(50);
    }).timeout(100000);
  });
});
