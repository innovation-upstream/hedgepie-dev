const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("VenusAdapter Fuzz Test", function () {
  before("Deploy contract", async function () {
    const [owner, alice] = await ethers.getSigners();

    this.owner = owner;
    this.alice = alice;
    this.rewardFee = 500;
    this.vBUSD = "0x95c78222B3D6e262426483D42CfA53685A67Ab9D";
    this.BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

    // Deploy Venus Adapter contract
    const VenusAdapter = await ethers.getContractFactory("VenusAdapter");
    this.vAdapter = await VenusAdapter.deploy(this.rewardFee);
    await this.vAdapter.deployed();

    console.log("Owner: ", this.owner.address);
    console.log("VenusAdapter: ", this.vAdapter.address);
  });

  describe("should set correct state variable", function () {
    it("(1) Check reward fee", async function () {
      expect(await this.vAdapter.rewardFee()).to.eq(this.rewardFee);
    });

    it("(2) Check owner address", async function () {
      expect(await this.vAdapter.owner()).to.eq(this.owner.address);
    });

    it("(3) Check pausable state", async function () {
      expect(await this.vAdapter.paused()).to.eq(false);
    });
  });

  describe("should adding vTokens properly", function () {
    it("revert addVTokens not from owner", async function () {
      await expect(
        this.vAdapter.connect(this.alice).addVTokens([this.vBUSD], [this.BUSD])
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("addVToken set state properly", async function () {
      await this.vAdapter.addVTokens([this.vBUSD], [this.BUSD]);

      expect(await this.vAdapter.isVToken(this.vBUSD)).to.eq(true) &&
        expect(await this.vAdapter.nTokens(this.vBUSD)).to.eq(this.BUSD) &&
        expect(await this.vAdapter.vTokens(this.BUSD)).to.eq(this.vBUSD);
    });
  });

  describe("should pause supply & redeem", function () {
    it("pause contract", async function () {
      await this.vAdapter.pause();

      expect(await this.vAdapter.paused()).to.eq(true);
    });

    it("test paused supply method", async function () {
      await expect(
        this.vAdapter.supply(this.BUSD, ethers.utils.parseEther("1").toString())
      ).to.be.revertedWith("Pausable: paused");
    });

    it("test paused redeem method", async function () {
      await expect(
        this.vAdapter.redeem(
          this.vBUSD,
          ethers.utils.parseEther("1").toString()
        )
      ).to.be.revertedWith("Pausable: paused");
    });
  });
});
