import hre from "hardhat";
import { Logger } from "tslog";
import "@nomiclabs/hardhat-ethers";
import { mockBEP20Args } from "../config/construct-arguments";
import { verify } from "../utils";

const log: Logger = new Logger();
const contractName = "MockBEP20";
const mockBEP20ArgValues = Object.values(mockBEP20Args);

async function deploy() {
  log.info(`Deploying "${contractName}" on network: ${hre.network.name}`);
  const deployContract = await hre.ethers.getContractFactory(contractName);
  const deployContractInstance = await deployContract.deploy(
    mockBEP20Args.name,
    mockBEP20Args.symbol,
    mockBEP20Args.initialSupply
  );
  await deployContractInstance.deployed();
  const deployContractAddress = deployContractInstance.address;
  log.info(
    `"${contractName}" was successfully deployed on network: ${hre.network.name}, address: ${deployContractAddress}`
  );
  return { deployedAddr: deployContractAddress };
}

async function main() {
  const { deployedAddr } = await deploy();
  await verify({
    contractName,
    address: deployedAddr,
    constructorArguments: mockBEP20ArgValues,
    contractPath: "contracts/mock/BEP20.sol:MockBEP20",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
