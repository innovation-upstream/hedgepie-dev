import { ethers } from 'ethers'
import { getInvestorAddress, getYBNFTAddress } from './addressHelpers'

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

// These are the functions currently used for Deposit and Withdraw BNB
export const depositBNBOnYBNFT = async (ybnftInvestorContract, account, ybnftId, amount) => {
  return ybnftInvestorContract.methods
    .depositBNB(account, ybnftId, amount)
    .send({ from: account, value: amount })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// These are the functions currently used for Deposit and Withdraw BNB
export const withdrawBNBFromYBNFT = async (ybnftInvestorContract, account, ybnftId) => {
  return ybnftInvestorContract.methods
    .withdrawBNB(account, ybnftId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const withdrawFromYBNFT = async (ybnftInvestorContract, account, ybnftId, amount) => {
  return ybnftInvestorContract.methods
    .withdrawBNB(account, ybnftId, amount)
    .send({ from: account, value: amount })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const fetchBalance = async (ybnftInvestorContract, account, ybnftId) => {
  const balance = await ybnftInvestorContract.methods.userInfo(account, await getYBNFTAddress(), ybnftId).call()
  return balance
}

export const fetchAdapters = async (adapterManagerContract) => {
  const adapters = await adapterManagerContract.methods.getAdapters().call()
  return adapters
}

export const fetchTokenAddress = async (adapterContract) => {
  const tokenAddress = await adapterContract.methods.stakingToken().call()
  return tokenAddress
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
