const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

const BigNumber = ethers.BigNumber;

const unlockAccount = async (address) => {
  await hre.network.provider.send("hardhat_impersonateAccount", [address]);
  return hre.ethers.provider.getSigner(address);
};

describe("ApeswapVaultAdapter Integration Test", function () {
  before("Deploy contract", async function () {
    const [owner, alice] = await ethers.getSigners();

    const performanceFee = 50;
    const wbnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const Banana = "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95";
    const lpToken = "0x7Bd46f6Da97312AC2DBD1749f82E202764C0B914"; // BUSD-BANANA LP
    const apeRouter = "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7";
    const swapRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // pks rounter address

    this.alice = alice;
    this.owner = owner;
    this.strategy = "0x5711a833C943AD1e8312A9c7E5403d48c717e1aa"; // VaultApe

    // Deploy Apeswap Banana Adapter contract
    const ApeVaultAdapter = await ethers.getContractFactory("ApeswapVaultAdapter");
    this.aAdapter = await ApeVaultAdapter.deploy(
      2, // PID
      this.strategy,
      lpToken,
      Banana,
      apeRouter,
      "Apeswap Vault Adapter"
    );
    await this.aAdapter.deployed();

    // Deploy YBNFT contract
    const ybNftFactory = await ethers.getContractFactory("YBNFT");
    this.ybNft = await ybNftFactory.deploy();

    // Deploy Investor contract
    const investorFactory = await ethers.getContractFactory("HedgepieInvestor");
    this.investor = await investorFactory.deploy(
      this.ybNft.address,
      swapRouter,
      wbnb
    );

    // Deploy Adaptor Manager contract
    const adapterManager = await ethers.getContractFactory("HedgepieAdapterManager");
    this.adapterManager = await adapterManager.deploy();

    // set investor
    await this.aAdapter.setInvestor(this.investor.address);

    // Mint NFTs
    // tokenID: 1
    await this.ybNft.mint(
        [10000],
        [lpToken],
        [this.aAdapter.address],
        performanceFee,
        "test tokenURI1"
    );
  
    // tokenID: 2
    await this.ybNft.mint(
        [10000],
        [lpToken],
        [this.aAdapter.address],
        performanceFee,
        "test tokenURI2"
    );

    // Add Venus Adapter to AdapterManager
    await this.adapterManager.addAdapter(this.aAdapter.address);

    // Set investor in adapter manager
    await this.adapterManager.setInvestor(this.investor.address);

    // Set adapter manager in investor
    await this.investor.setAdapterManager(this.adapterManager.address);

    // Set investor in vAdapter
    await this.aAdapter.setInvestor(this.investor.address);

    console.log("Owner: ", this.owner.address);
    console.log("Investor: ", this.investor.address);
    console.log("Strategy: ", this.strategy);
    console.log("ApeswapVaultAdapter: ", this.aAdapter.address);

    this.rewardToken = await ethers.getContractAt("VBep20Interface", Banana);
  });

  describe("depositBNB function test", function() {
    it("(1)should be reverted when nft tokenId is invalid", async function () {
        // deposit to nftID: 3
        const depositAmount = ethers.utils.parseEther("1");
        await expect(
          this.investor.connect(this.owner).depositBNB(
            this.owner.address,
            3,
            depositAmount.toString(),
            { 
              gasPrice: 21e9,
              value: depositAmount
            }
          )
        ).to.be.revertedWith("Error: nft tokenId is invalid")
    });

    it("(2)should be reverted when caller is not matched", async function () {
        // deposit to nftID: 1
        const depositAmount = ethers.utils.parseEther("1");
        await expect(
          this.investor.depositBNB(
            this.alice.address,
            1,
            depositAmount.toString(),
            { 
              gasPrice: 21e9,
              value: depositAmount
            }
          )
        ).to.be.revertedWith("Error: Caller is not matched")
    });

    it("(3)should be reverted when amount is 0", async function () {
        // deposit to nftID: 1
        const depositAmount = ethers.utils.parseEther("0")
        await expect(
          this.investor.depositBNB(
            this.owner.address,
            1,
            depositAmount.toString(),
            { 
              gasPrice: 21e9,
              value: depositAmount
            }
          )
        ).to.be.revertedWith("Error: Amount can not be 0")
    });

    it("(4) deposit should success", async function () {
      const aliceAddr = this.alice.address
      const depositAmount = ethers.utils.parseEther("10")
      await this.investor.connect(this.alice).depositBNB(
        aliceAddr,
        1,
        depositAmount,
        { 
          gasPrice: 21e9,
          value: depositAmount
        }
      );
      
      const userInfo = await this.investor.userInfo(aliceAddr, this.ybNft.address, 1);
      const depositAmount1 = Number(userInfo) / Math.pow(10, 18);
      expect(depositAmount1).to.eq(10);
    }).timeout(50000000);
  });

  describe("withdrawBNB() function test", function () {
    it("(1)should be reverted when nft tokenId is invalid", async function () {
      // withdraw to nftID: 3
      await expect(
        this.investor.withdrawBNB(
          this.owner.address,
          3,
          { gasPrice: 21e9 }
        )
      ).to.be.revertedWith("Error: nft tokenId is invalid")
    });

    it("(2)should be reverted when caller is not matched", async function () {
      // deposit to nftID: 1
      await expect(
        this.investor.withdrawBNB(
          this.alice.address,
          1,
          { gasPrice: 21e9 }
        )
      ).to.be.revertedWith("Error: Caller is not matched")
    });

    it("(3)should receive the BNB successfully after withdraw function", async function () {
      // withdraw from nftId: 1
      const aliceAddr = this.alice.address;
      const beforeBNB = await ethers.provider.getBalance(aliceAddr);

      await this.investor.connect(this.alice).withdrawBNB(
        aliceAddr,
        1,
        { gasPrice: 21e9 }
      );

      const afterBNB = await ethers.provider.getBalance(aliceAddr);

      expect(
        BigNumber.from(afterBNB).gt(BigNumber.from(beforeBNB))
      ).to.eq(true);

      const userInfo = await this.investor.userInfo(aliceAddr, this.ybNft.address, 1);
      const depositAmount1 = Number(userInfo) / Math.pow(10, 18);
      expect(depositAmount1).to.eq(0);
    }).timeout(50000000);
  });
});