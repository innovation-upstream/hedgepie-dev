const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("BiswapFarmLPAdapter Unit Test", function () {
  before("Deploy contract", async function () {
    const [owner, investor, alice] = await ethers.getSigners();

    this.alice = alice;
    this.owner = owner;
    this.investor = investor;
    this.strategy = "0xDbc1A13490deeF9c3C12b44FE77b503c1B061739"; // BiSwap Masterchef
    this.lpToken = "0x2b30c317ceDFb554Ec525F85E79538D59970BEb0"; // USDT-BSW LP
    this.bsw = "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1";
    this.biswapRouter = "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8";

    // Deploy Biswap LP Adapter contract
    const BiLPAdapter = await ethers.getContractFactory("BiSwapFarmLPAdapter");
    this.aAdapter = await BiLPAdapter.deploy(
      9, // pid USDT-BSW LP
      this.strategy,
      this.lpToken,
      this.bsw,
      this.biswapRouter,
      "USDT-BSW LP Adapter"
    );
    await this.aAdapter.deployed();

    // set investor
    await this.aAdapter.setInvestor(this.investor.address);

    console.log("Owner: ", this.owner.address);
    console.log("Investor: ", this.investor.address);
    console.log("Strategy: ", this.strategy);
    console.log("BiswapFarmLPAdapter: ", this.aAdapter.address);
  });

  describe("should set correct state variable", function () {
    it("(1) Check investor address", async function () {
      expect(await this.aAdapter.investor()).to.eq(this.investor.address);
    });

    it("(2) Check strategy address", async function () {
      expect(await this.aAdapter.strategy()).to.eq(this.strategy);
    });

    it("(3) Check owner wallet", async function () {
      expect(await this.aAdapter.owner()).to.eq(this.owner.address);
    });
  });

  describe("should get invest call data", function () {
    it("should get invest call data properly", async function () {
      const result = await this.aAdapter.getInvestCallData("0");
      expect(!!result).to.eq(true);
    });
  });

  describe("should get devest call data", function () {
    it("should get devest call data properly", async function () {
      const result = await this.aAdapter.getDevestCallData("0");
      expect(!!result).to.eq(true);
    });
  });

  describe("should increase withdrawal amount from only investor", function () {
    it("revert not from investor", async function () {
      await expect(
        this.aAdapter
          .connect(this.alice)
          .increaseWithdrawalAmount(
            this.alice.address,
            1,
            ethers.utils.parseUnits("1")
          )
      ).to.be.revertedWith("Error: Caller is not investor");
    });

    it("test increaseWithdrawalAmount functinon", async function () {
      await this.aAdapter
        .connect(this.investor)
        .increaseWithdrawalAmount(
          this.alice.address,
          1,
          ethers.utils.parseUnits("1")
        );

      const nft1Amount =
        Number(await this.aAdapter.getWithdrawalAmount(this.alice.address, 1)) /
        Math.pow(10, 18);
      expect(nft1Amount).to.eq(1);

      const nft2Amount =
        Number(await this.aAdapter.getWithdrawalAmount(this.alice.address, 2)) /
        Math.pow(10, 18);
      expect(nft2Amount).to.eq(0);

      const nftAmount =
        Number(
          await this.aAdapter.getWithdrawalAmount(this.investor.address, 1)
        ) / Math.pow(10, 18);
      expect(nftAmount).to.eq(0);
    });
  });

  describe("should set investor only from owner wallet", function () {
    it("revert when from owner wallet", async function () {
      await expect(
        this.aAdapter.connect(this.alice).setInvestor(this.owner.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("test the investor address correctly", async function () {
      await this.aAdapter.setInvestor(this.owner.address);
      expect(await this.aAdapter.investor()).to.eq(this.owner.address);
    });
  });
});
