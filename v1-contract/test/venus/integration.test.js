const hre = require("hardhat");
const { ethers } = require("hardhat");

const BUSD_TOKEN = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const vBUSD_TOKEN = "0x95c78222B3D6e262426483D42CfA53685A67Ab9D";
const WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
const REWARD_FEE = 500;

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
  });

  describe("should set correct state variable", function () {});
});
