import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import vaultReducer from './vault'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    vault: vaultReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
