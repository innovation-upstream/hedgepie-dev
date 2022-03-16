import { BigNumber, ethers } from 'ethers'
import { addresses } from '../constants/address'
import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers'

import VaultABI from '../abi/HedgepieVault.json'
import MockABI from '../abi/MockupToken.json'

export const getInfo = async (provider: JsonRpcProvider, address: string) => {
  const { chainId } = await provider.getNetwork()
  const vaultContract = new ethers.Contract(addresses[chainId].VAULT_ADDRESS as string, VaultABI, provider)

  const tokenContract = new ethers.Contract(addresses[chainId].MOCLUP_ADDRESS as string, MockABI, provider)

  const [tvl, blockEmission, totalStaked] = await Promise.all([
    tokenContract.balanceOf(addresses[chainId].VAULT_ADDRESS as string),
    vaultContract.blockEmission(),
    vaultContract.totalStaked(),
  ])

  const blockReward = Number(blockEmission)
  const rpd = tvl === 0 ? 0 : (blockReward * 86400) / 3 / (tvl / Math.pow(10, 18))
  const apy = (Math.pow(1 + rpd, 365) - 1).toFixed(2)

  const userStake =
    address.length > 0 ? await vaultContract.userStake(address, addresses[chainId].MOCLUP_ADDRESS) : { reward: 0 }

  return {
    tvl: Number(tvl),
    apy,
    profit: userStake.reward,
    staked: Number(totalStaked),
  }
}

export const vaultAction = async (provider: JsonRpcProvider, token: string, amount: BigNumber, action: string) => {
  const { chainId } = await provider.getNetwork()
  const vaultContract = new ethers.Contract(addresses[chainId].VAULT_ADDRESS as string, VaultABI, provider.getSigner())

  try {
    let tx
    if (action == 'stake') {
      tx = vaultContract.stake(amount)
    } else if (action == 'stakelp') {
      tx = vaultContract.stakeLP(token, amount)
    } else if (action == 'unstake') {
      tx = vaultContract.unstake(token, amount)
    } else if (action == 'claim') {
      tx = vaultContract.claimReward(token, amount)
    }

    if (tx) {
      await tx.wait()
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log(`vault ${action} error: `, err)
    return false
  }
}
