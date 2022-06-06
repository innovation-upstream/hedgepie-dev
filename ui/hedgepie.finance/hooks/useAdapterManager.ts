import { useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useAdapterManagerContract } from 'hooks/useContract'
import { fetchAdapters } from 'utils/callHelpers'

export const useAdapterManager = () => {
  const adapterManagerContract = useAdapterManagerContract()

  const getAdapters = async () => {
    const adapters = await fetchAdapters(adapterManagerContract)
    return adapters
  }

  return { getAdapters: getAdapters }
}
