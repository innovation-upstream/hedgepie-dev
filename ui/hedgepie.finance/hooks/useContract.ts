import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getHpieAddress,
  getHpieLpAddress,
  getMasterChefAddress,
  getYBNFTAddress,
  getInvestorAddress,
  getAdapterManagerAddress,
  getWBNBAddress,
  // getBNBAddress,
  getApeSwapLPAddress,
  getAutoFarmLPAddress,
} from 'utils/addressHelpers'
import erc20Abi from 'config/abi/Erc20.json'
import masterChefAbi from 'config/abi/HedgepieMasterChef.json'
import ybnftAbi from 'config/abi/HedgepieYBNFT.json'
import investorAbi from 'config/abi/HedgepieInvestor.json'
import adapterManagerAbi from 'config/abi/HedgepieAdapterManager.json'
import wBNBAbi from 'config/abi/wBNB.json'
import apeSwapLPAdapterAbi from 'config/abi/ApeSwapLPAdapter.json'
import autoFarmLPAdapterAbi from 'config/abi/AutoFarmLPAdapter.json'

// import bnbAbi from 'config/abi/BNB.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

// erc20 token contract
export const useERC20Contract = (address: string) => {
  return useContract(erc20Abi as unknown as AbiItem, address)
}

// erc20 token contract
export const useHpieContract = (address: string) => {
  return useContract(erc20Abi as unknown as AbiItem, getHpieAddress())
}

// hpie lp token contract
export const useHpieLpContract = (address: string) => {
  return useContract(erc20Abi as unknown as AbiItem, getHpieLpAddress())
}

// vault contract (masterChef)
export const useMasterchefContract = () => {
  return useContract(masterChefAbi as unknown as AbiItem, getMasterChefAddress())
}

// YBNFT Mint Contract
export const useYBNFTMintContract = () => {
  return useContract(ybnftAbi as unknown as AbiItem, getYBNFTAddress())
}

// Investor Contract
export const useInvestorContract = () => {
  return useContract(investorAbi as unknown as AbiItem, getInvestorAddress())
}

// Adapter Manager Contract
export const useAdapterManagerContract = () => {
  return useContract(adapterManagerAbi as unknown as AbiItem, getAdapterManagerAddress())
}

// wBNB token contract
export const useWBNBContract = () => {
  return useContract(wBNBAbi as unknown as AbiItem, getWBNBAddress())
}

// ApeSwap Adapter token contract
export const useApeSwapLPAdapterContract = () => {
  return useContract(apeSwapLPAdapterAbi as unknown as AbiItem, getApeSwapLPAddress())
}

// AutoFarm Adapter token contract
export const useAutoFarmLPAdapterContract = () => {
  return useContract(autoFarmLPAdapterAbi as unknown as AbiItem, getAutoFarmLPAddress())
}

// // BNB token contract
// export const useBNBContract = () => {
//   return useContract(bnbAbi as unknown as AbiItem, getWBNBAddress())
// }

export default useContract
