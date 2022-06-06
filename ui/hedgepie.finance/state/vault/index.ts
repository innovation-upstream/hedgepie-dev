/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchGlobalData, fetchVaultPoolData } from './fetchVault'
import { fetchVaultUserData } from './fetchVaultUser'
import { VaultState, Pool } from 'state/types'

const initialState: VaultState = {
  poolLength: 0,
  totalAllocPoint: 0,
  rewardToken: '',
  rewardPerBlock: 0,
  data: [] as Pool[],
}

export const VaultSlice = createSlice({
  name: 'Vault',
  initialState,
  reducers: {
    setVaultGlobalData: (state, action) => {
      state.poolLength = action.payload.poolLength
      state.rewardToken = action.payload.rewardToken
      state.rewardPerBlock = action.payload.rewardPerBlock
      state.totalAllocPoint = action.payload.totalAllocPoint
    },
    setVaultPoolData: (state, action) => {
      const poolData: Pool[] = action.payload
      state.data = [...poolData]
    },
    setVaultUserData: (state, action) => {
      const data = action.payload
      state.data = state.data.map((pool) => {
        const userData = data.find((f) => f.pid === pool.pid)
        return { ...pool, userData }
      })
    },
  },
})

// Actions
export const { setVaultGlobalData, setVaultPoolData, setVaultUserData } = VaultSlice.actions

export const fetchVaultGlobalDataAsync = () => async (dispatch) => {
  const { poolLength, rewardToken, rewardPerBlock, totalAllocPoint } = await fetchGlobalData()
  dispatch(
    setVaultGlobalData({
      poolLength,
      rewardToken,
      rewardPerBlock,
      totalAllocPoint,
    }),
  )
}

export const fetchVaultPoolDataAsync = () => async (dispatch) => {
  const pools = await fetchVaultPoolData()
  dispatch(setVaultPoolData(pools))
}

export const fetchVaultUserDataAsync = (account) => async (dispatch) => {
  if (!account) return

  const data = await fetchVaultUserData(account)
  dispatch(setVaultUserData(data))
}

export default VaultSlice.reducer
