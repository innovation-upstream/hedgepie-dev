const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

const BigNumber = ethers.BigNumber;

const unlockAccount = async (address) => {
  await hre.network.provider.send("hardhat_impersonateAccount", [address]);
  return hre.ethers.provider.getSigner(address);
};

describe("ApeswapFarmLPAdapter Integration Test", function () {
  before("Deploy contract", async function () {
    const [owner, alice, bob, tom] = await ethers.getSigners();

    const performanceFee = 50;
    const wbnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const busd = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
    const Banana = "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95";
    const whaleAddr = "0x41772edd47d9ddf9ef848cdb34fe76143908c7ad";
    const strategy = "0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9"; // MasterApe
    const swapRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // pks rounter address
    const lpToken = "0x51e6D27FA57373d8d4C256231241053a70Cb1d93"; // BUSD-WBNB LP

    this.wbnb = wbnb;
    this.busd = busd;
    this.banana = Banana;

    this.owner = owner;
    this.alice = alice;
    this.bob = bob;
    this.tom = tom;
    this.apeRouter = "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7";

    this.bobAddr = bob.address;
    this.aliceAddr = alice.address;
    this.tomAddr = tom.address;
    this.accTokenPerShare = BigNumber.from(0);

    // Get existing contract handle
    this.bananaToken = await ethers.getContractAt("IBEP20", this.banana);

    // Deploy Apeswap LP Adapter contract
    const ApeLPAdapter = await ethers.getContractFactory(
      "ApeswapFarmLPAdapter"
    );
    this.aAdapter = await ApeLPAdapter.deploy(
      3, // pid
      strategy,
      lpToken,
      Banana,
      this.apeRouter,
      "Apeswap::Farm::BUSD-WBNB"
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
    const adapterManager = await ethers.getContractFactory(
      "HedgepieAdapterManager"
    );
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
    await this.investor.setTreasury(this.owner.address, 300);

    // Set investor in vAdapter
    await this.aAdapter.setInvestor(this.investor.address);
    await this.aAdapter.setPath(this.busd, this.wbnb, [this.busd, this.wbnb]);
    await this.aAdapter.setPath(this.wbnb, this.busd, [this.wbnb, this.busd]);
    await this.aAdapter.setPath(this.wbnb, this.banana, [
      this.wbnb,
      this.banana,
    ]);
    await this.aAdapter.setPath(this.banana, this.wbnb, [
      this.banana,
      this.wbnb,
    ]);

    console.log("Owner: ", this.owner.address);
    console.log("Investor: ", this.investor.address);
    console.log("Strategy: ", strategy);
    console.log("ApeswapFarmLPAdapter: ", this.aAdapter.address);

    this.whaleWallet = await unlockAccount(whaleAddr);
    this.lpContract = await ethers.getContractAt("VBep20Interface", lpToken);
  });

  describe("depositBNB function test", function () {
    it("(1)should be reverted when nft tokenId is invalid", async function () {
      // deposit to nftID: 3
      const depositAmount = ethers.utils.parseEther("1");
      await expect(
        this.investor
          .connect(this.owner)
          .depositBNB(this.owner.address, 3, depositAmount.toString(), {
            gasPrice: 21e9,
            value: depositAmount,
          })
      ).to.be.revertedWith("Error: nft tokenId is invalid");
    });

    it("(2)should be reverted when caller is not matched", async function () {
      // deposit to nftID: 1
      const depositAmount = ethers.utils.parseEther("1");
      await expect(
        this.investor.depositBNB(
          this.alice.address,
          1,
          depositAmount.toString(),
          { gasPrice: 21e9 }
        )
      ).to.be.revertedWith("Error: Caller is not matched");
    });

    it("(3)should be reverted when amount is 0", async function () {
      // deposit to nftID: 1
      const depositAmount = ethers.utils.parseEther("0");
      await expect(
        this.investor.depositBNB(
          this.owner.address,
          1,
          depositAmount.toString(),
          { gasPrice: 21e9 }
        )
      ).to.be.revertedWith("Error: Amount can not be 0");
    });

    it("(4) deposit should success for Alice", async function () {
      const depositAmount = ethers.utils.parseEther("10");
      await expect(
        this.investor
          .connect(this.alice)
          .depositBNB(this.aliceAddr, 1, depositAmount, {
            gasPrice: 21e9,
            value: depositAmount,
          })
      )
        .to.emit(this.investor, "DepositBNB")
        .withArgs(this.aliceAddr, this.ybNft.address, 1, depositAmount);

      const aliceInfo = await this.investor.userInfo(
        this.aliceAddr,
        this.ybNft.address,
        1
      );
      expect(Number(aliceInfo) / Math.pow(10, 18)).to.eq(10);

      const aliceAdapterInfos = await this.investor.userAdapterInfos(
        this.aliceAddr,
        1,
        this.aAdapter.address
      );
      const adapterInfos = await this.investor.adapterInfos(
        1,
        this.aAdapter.address
      );
      expect(BigNumber.from(adapterInfos.totalStaked)).to.eq(
        BigNumber.from(aliceAdapterInfos.amount)
      );

      const aliceWithdrawAmount = await this.aAdapter.getWithdrawalAmount(
        this.aliceAddr,
        1
      );
      expect(BigNumber.from(aliceWithdrawAmount)).to.eq(
        BigNumber.from(aliceAdapterInfos.amount)
      );

      // Check accTokenPerShare Info
      this.accTokenPerShare = (
        await this.investor.adapterInfos(1, this.aAdapter.address)
      ).accTokenPerShare;
      expect(BigNumber.from(this.accTokenPerShare)).to.eq(BigNumber.from(0));
    });

    it("(5) deposit should success for Bob", async function () {
      const beforeAdapterInfos = await this.investor.adapterInfos(
        1,
        this.aAdapter.address
      );
      const depositAmount = ethers.utils.parseEther("20");

      await expect(
        this.investor
          .connect(this.bob)
          .depositBNB(this.bobAddr, 1, depositAmount, {
            gasPrice: 21e9,
            value: depositAmount,
          })
      )
        .to.emit(this.investor, "DepositBNB")
        .withArgs(this.bobAddr, this.ybNft.address, 1, depositAmount);

      const bobInfo = await this.investor.userInfo(
        this.bobAddr,
        this.ybNft.address,
        1
      );
      expect(Number(bobInfo) / Math.pow(10, 18)).to.eq(20);

      const bobAdapterInfos = await this.investor.userAdapterInfos(
        this.bobAddr,
        1,
        this.aAdapter.address
      );
      expect(BigNumber.from(bobAdapterInfos.amount).gt(0)).to.eq(true);

      const afterAdapterInfos = await this.investor.adapterInfos(
        1,
        this.aAdapter.address
      );

      expect(
        BigNumber.from(afterAdapterInfos.totalStaked).gt(
          beforeAdapterInfos.totalStaked
        )
      ).to.eq(true);

      const bobWithdrable = await this.aAdapter.getWithdrawalAmount(
        this.bobAddr,
        1
      );
      expect(BigNumber.from(bobWithdrable)).to.eq(
        BigNumber.from(bobAdapterInfos.amount)
      );

      // Check accTokenPerShare Info
      expect(
        BigNumber.from(
          (await this.investor.adapterInfos(1, this.aAdapter.address))
            .accTokenPerShare
        ).gt(BigNumber.from(this.accTokenPerShare))
      ).to.eq(true);
      this.accTokenPerShare = (
        await this.investor.adapterInfos(1, this.aAdapter.address)
      ).accTokenPerShare;
    });
  });

  describe("withdrawBNB() function test", function () {
    it("(1) revert when nft tokenId is invalid", async function () {
      for (let i = 0; i < 10; i++) {
        await ethers.provider.send("evm_mine", []);
      }

      // withdraw to nftID: 3
      await expect(
        this.investor.withdrawBNB(this.owner.address, 3, { gasPrice: 21e9 })
      ).to.be.revertedWith("Error: nft tokenId is invalid");
    });

    it("(2) revert when caller is not matched", async function () {
      // deposit to nftID: 1
      await expect(
        this.investor.withdrawBNB(this.alice.address, 1, { gasPrice: 21e9 })
      ).to.be.revertedWith("Error: Caller is not matched");
    });

    it("(3) should receive the BNB successfully after withdraw function for Alice", async function () {
      // withdraw from nftId: 1
      const beforeBNB = await ethers.provider.getBalance(this.aliceAddr);

      await expect(
        this.investor
          .connect(this.alice)
          .withdrawBNB(this.aliceAddr, 1, { gasPrice: 21e9 })
      ).to.emit(this.investor, "WithdrawBNB");

      const afterBNB = await ethers.provider.getBalance(this.aliceAddr);

      expect(BigNumber.from(afterBNB).gt(BigNumber.from(beforeBNB))).to.eq(
        true
      );

      const aliceInfo = await this.investor.userInfo(
        this.aliceAddr,
        this.ybNft.address,
        1
      );
      expect(aliceInfo).to.eq(BigNumber.from(0));

      const aliceWithdrable = await this.aAdapter.getWithdrawalAmount(
        this.aliceAddr,
        1
      );
      expect(BigNumber.from(aliceWithdrable)).to.eq(BigNumber.from(0));

      const bobInfo = await this.investor.userInfo(
        this.bobAddr,
        this.ybNft.address,
        1
      );
      const bobDeposit = Number(bobInfo) / Math.pow(10, 18);
      expect(bobDeposit).to.eq(20);

      const bobWithdrable = await this.aAdapter.getWithdrawalAmount(
        this.bobAddr,
        1
      );
      expect(BigNumber.from(bobWithdrable).gt(0)).to.eq(true);

      // Check accTokenPerShare Info
      expect(
        BigNumber.from(
          (await this.investor.adapterInfos(1, this.aAdapter.address))
            .accTokenPerShare
        ).gt(BigNumber.from(this.accTokenPerShare))
      ).to.eq(true);

      this.accTokenPerShare = (
        await this.investor.adapterInfos(1, this.aAdapter.address)
      ).accTokenPerShare;
    });

    it("(4) should receive the BNB successfully after withdraw function for Bob", async function () {
      // withdraw from nftId: 1
      const beforeBNB = await ethers.provider.getBalance(this.bobAddr);

      await expect(
        this.investor
          .connect(this.bob)
          .withdrawBNB(this.bobAddr, 1, { gasPrice: 21e9 })
      ).to.emit(this.investor, "WithdrawBNB");

      const afterBNB = await ethers.provider.getBalance(this.bobAddr);

      expect(BigNumber.from(afterBNB).gt(BigNumber.from(beforeBNB))).to.eq(
        true
      );

      const bobInfo = await this.investor.userInfo(
        this.bobAddr,
        this.ybNft.address,
        1
      );
      expect(bobInfo).to.eq(BigNumber.from(0));

      const bobWithdrable = await this.aAdapter.getWithdrawalAmount(
        this.bobAddr,
        1
      );
      expect(BigNumber.from(bobWithdrable)).to.eq(BigNumber.from(0));

      // Check accTokenPerShare Info
      expect(
        BigNumber.from(
          (await this.investor.adapterInfos(1, this.aAdapter.address))
            .accTokenPerShare
        ).gt(BigNumber.from(this.accTokenPerShare))
      ).to.eq(true);
      this.accTokenPerShare = (
        await this.investor.adapterInfos(1, this.aAdapter.address)
      ).accTokenPerShare;
    });
  });
});
