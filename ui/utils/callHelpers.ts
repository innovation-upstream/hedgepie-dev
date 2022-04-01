import { ethers } from 'ethers'

export const approveToken = async (tokenContract, masterChefContract, account) => {
    return tokenContract.methods
        .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
}

export const stakeOnMasterChef = async (masterChefContract, pid, amount, account) => {
    return masterChefContract.methods
        .deposit(pid, ethers.utils.parseEther(amount))
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const unstakeOnMasterChef = async (masterChefContract, pid, amount, account) => {
    return masterChefContract.methods
        .deposit(pid, ethers.utils.parseEther(amount))
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}
