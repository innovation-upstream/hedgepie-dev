import { ethers } from 'ethers'
import { getInvestorAddress } from './addressHelpers'

export const approveToken = async (tokenContract, masterChefContract, account) => {
  return tokenContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stakeOnMasterChef = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, amount.toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstakeOnMasterChef = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, amount.toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const mintYBNFT = async (
  ybnftMintContract,
  allocations,
  tokens,
  addresses,
  performanceFee,
  ipfsUrl,
  account,
) => {
  return ybnftMintContract.methods
    .mint(allocations, tokens, addresses, performanceFee, ipfsUrl)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const depositOnYBNFT = async (ybnftInvestorContract, account, ybnftId, token, amount) => {
  console.log(account + ' ' + ybnftId + ' ' + token + ' ' + amount)
  return ybnftInvestorContract.methods
    .deposit(account, ybnftId, token, amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const withdrawFromYBNFT = async (ybnftInvestorContract, account, ybnftId, token) => {
  return ybnftInvestorContract.methods
    .withdraw(account, ybnftId, token)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const fetchAdapters = async (adapterManagerContract) => {
  const adapters = await adapterManagerContract.methods.getAdapters().call()
  return adapters
}

export const fetchMaxTokenId = async (ybnftMintContract) => {
  const maxTokenId = await ybnftMintContract.methods.getCurrentTokenId().call()
  return maxTokenId
}

export const fetchTokenUri = async (ybnftMintContract, tokenId) => {
  const tokenUri = await ybnftMintContract.methods.tokenURI(tokenId).call()
  return tokenUri
}

export const fetchAllocations = async (ybnftMintContract, tokenId) => {
  const allocations = await ybnftMintContract.methods.getAdapterInfo(tokenId).call()
  return allocations
}

export const fetchAllowance = async (wbnbContract, account) => {
  const allowance = await wbnbContract.methods.allowance(account, getInvestorAddress()).call()
  return allowance
}
