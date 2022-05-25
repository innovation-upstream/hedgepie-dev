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
    const whaleAddr = "0x41772edd47d9ddf9ef848cdb34fe76143908c7ad";
    const Banana = "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95";
    const swapRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // pks rounter address

    this.alice = alice;
    this.owner = owner;
    this.strategy = "0x5711a833C943AD1e8312A9c7E5403d48c717e1aa"; // VaultApe
    this.hpie = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; // BUSD

    // Deploy Apeswap Banana Adapter contract
    const ApeVaultAdapter = await ethers.getContractFactory("ApeswapVaultAdapter");
    this.aAdapter = await ApeVaultAdapter.deploy(
      0, // PID
      this.strategy,
      Banana,
      Banana,
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
        [Banana],
        [this.aAdapter.address],
        performanceFee,
        "test tokenURI1"
    );
  
    // tokenID: 2
    await this.ybNft.mint(
        [10000],
        [Banana],
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

    // BUSD will be our HPIE token
    const hpieToken = await ethers.getContractAt("VBep20Interface", this.hpie);
    
    const whaleWallet = await unlockAccount(whaleAddr);
    
    await hpieToken.connect(whaleWallet).transfer(this.alice.address, ethers.utils.parseUnits("1000"));
    await hpieToken.connect(this.alice).approve(this.investor.address, ethers.utils.parseUnits("1000"));
  });

  describe("deposit function test", function() {
    it("(1)should be reverted when nft tokenId is invalid", async function () {
        // deposit to nftID: 3
        const depositAmount = ethers.utils.parseEther("1");
        await expect(
          this.investor.connect(this.owner).deposit(
            this.owner.address,
            3,
            this.hpie,
            depositAmount.toString(),
            { gasPrice: 21e9 }
          )
        ).to.be.revertedWith("Error: nft tokenId is invalid")
    });

    it("(2)should be reverted when caller is not matched", async function () {
        // deposit to nftID: 1
        const depositAmount = ethers.utils.parseEther("1");
        await expect(
          this.investor.deposit(
            this.alice.address,
            1,
            this.hpie,
            depositAmount.toString(),
            { gasPrice: 21e9 }
          )
        ).to.be.revertedWith("Error: Caller is not matched")
    });

    it("(3)should be reverted when amount is 0", async function () {
        // deposit to nftID: 1
        const depositAmount = ethers.utils.parseEther("0")
        await expect(
          this.investor.deposit(
            this.owner.address,
            1,
            this.hpie,
            depositAmount.toString(),
            { gasPrice: 21e9 }
          )
        ).to.be.revertedWith("Error: Amount can not be 0")
    });

    it("(4) deposit should success", async function () {
        const depositAmount = ethers.utils.parseEther("10")
        await this.investor.connect(this.alice).deposit(
          this.alice.address,
          1,
          this.hpie,
          depositAmount,
          { gasPrice: 21e9 }
        );
        
        const userInfo = await this.investor.userInfo(this.alice.address, this.ybNft.address, 1);
        const depositAmount1 = Number(userInfo) / Math.pow(10, 18);
        expect(depositAmount1).to.eq(10);
    }).timeout(50000000);
  });

  describe("withdraw() function test", function () {
    it("(1)should be reverted when nft tokenId is invalid", async function () {
        // withdraw to nftID: 3
        await expect(
          this.investor.withdraw(
            this.owner.address,
            3,
            this.hpie,
            { gasPrice: 21e9 }
          )
        ).to.be.revertedWith("Error: nft tokenId is invalid")
      });
  
      it("(2)should be reverted when caller is not matched", async function () {
        // deposit to nftID: 1
        await expect(
          this.investor.withdraw(
            this.alice.address,
            1,
            this.hpie,
            { gasPrice: 21e9 }
          )
        ).to.be.revertedWith("Error: Caller is not matched")
      });
  
      it("(3)should receive the Banana token successfully after withdraw function", async function () {
        // withdraw from nftId: 1
        let bananaBalBefore = await this.rewardToken.balanceOf(this.alice.address);
  
        await this.investor.connect(this.alice).withdraw(
          this.alice.address,
          1,
          this.hpie,
          { gasPrice: 21e9 }
        );
  
        let bananaBalAfter = await this.rewardToken.balanceOf(this.alice.address);
  
        expect(
          BigNumber.from(bananaBalAfter).gte(BigNumber.from(bananaBalBefore))
        ).to.eq(true);
      });
    });
});