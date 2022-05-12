const hre = require("hardhat");
const { expect } = require("chai");
const { time } = require("@openzeppelin/test-helpers");
const { ethers } = require("hardhat");

const BUSD_TOKEN = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const vBUSD_TOKEN = "0x95c78222B3D6e262426483D42CfA53685A67Ab9D";
const WHALE = "0x41772edd47d9ddf9ef848cdb34fe76143908c7ad";
const REWARD_FEE = 500;

const BigNumber = ethers.BigNumber;

const E18 = BigNumber.from(10).pow(18);

const unlockAccount = async (address) => {
  await hre.network.provider.send("hardhat_impersonateAccount", [address]);
  return hre.ethers.provider.getSigner(address);
};

describe("Venus Adapter Integration Test", function () {
  before("Deploy contract", async function () {
    const [owner, alice] = await ethers.getSigners();

    this.whaleWallet = await unlockAccount(WHALE);
    this.owner = owner;
    this.alice = alice;
    this.vBUSD = await ethers.getContractAt("VBep20Interface", vBUSD_TOKEN);
    this.BUSD = await ethers.getContractAt("VBep20Interface", BUSD_TOKEN);

    // Deploy Venus Adapter contract
    const VenusAdapter = await ethers.getContractFactory("VenusAdapter");
    this.vAdapter = await VenusAdapter.deploy(REWARD_FEE);
    await this.vAdapter.deployed();

    console.log("VenusAdapter: ", this.vAdapter.address);
    console.log("vBUSD: ", this.vBUSD.address);
    console.log("BUSD: ", this.BUSD.address);

    // Send 10k BUSD to alice
    await this.BUSD.connect(this.whaleWallet).transfer(
      this.alice.address,
      ethers.utils.parseEther("10000").toString()
    );

    // Send 1k BNB to alice
    await this.whaleWallet.sendTransaction({
      to: this.alice.address,
      value: ethers.utils.parseEther("1000.0"),
    });

    // Approve BUSD for adapter contract
    await this.BUSD.connect(this.alice).approve(
      this.vAdapter.address,
      ethers.constants.MaxUint256
    );

    // Approve vBUSD for adapter contract
    await this.vBUSD
      .connect(this.alice)
      .approve(this.vAdapter.address, ethers.constants.MaxUint256);

    // Add vTokens
    await this.vAdapter.addVTokens([this.vBUSD.address], [this.BUSD.address]);
  });

  it("(1) test supply workflow", async function () {
    await this.vAdapter
      .connect(this.alice)
      .supply(this.BUSD.address, ethers.utils.parseEther("100").toString());

    expect(await this.vBUSD.balanceOf(this.alice.address)).to.eq(
      BigNumber.from(100)
        .mul(E18)
        .mul(E18)
        .div(BigNumber.from(await this.vBUSD.exchangeRateStored()))
    );
  });

  it("(2) test redeem workflow", async function () {
    const vTokenBal = await this.vBUSD.balanceOf(this.alice.address);
    const balBefore = await this.BUSD.balanceOf(this.alice.address);

    // mint 10 blocks
    for (let i = 0; i < 10; i++) {
      await ethers.provider.send("evm_mine");
    }

    await this.vAdapter
      .connect(this.alice)
      .redeem(this.vBUSD.address, BigNumber.from(vTokenBal).toString());

    const balAfter = await this.BUSD.balanceOf(this.alice.address);

    expect(BigNumber.from(balAfter).sub(BigNumber.from(balBefore))).to.eq(
      BigNumber.from(vTokenBal)
        .mul(BigNumber.from(await this.vBUSD.exchangeRateStored()))
        .div(E18)
    ) &&
      expect(
        BigNumber.from(balAfter).sub(
          BigNumber.from(balBefore).gt(BigNumber.from(1000).mul(E18))
        )
      ).to.eq(true);
  });
});
