import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainnetChainId = 56
  const testnetChainId = 97
  return address[testnetChainId] ? address[testnetChainId] : address[mainnetChainId]
}

export const getHpieAddress = () => {
  return getAddress(addresses.hpie)
}

export const getHpieLpAddress = () => {
  return getAddress(addresses.hpieLp)
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}

export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}

export const getYBNFTAddress = () => {
  return getAddress(addresses.ybnft)
}

export const getInvestorAddress = () => {
  return getAddress(addresses.investor)
}

export const getAdapterManagerAddress = () => {
  return getAddress(addresses.adapterManager)
}

export const getWBNBAddress = () => {
  return getAddress(addresses.wBNB)
}

export const getTokenName = (address: string) => {
  if (address.toLowerCase() === getHpieAddress().toLowerCase()) return 'HPIE'
  if (address.toLowerCase() === getHpieLpAddress().toLowerCase()) return 'HPIE-LP'
  return 'Unknown'
}
