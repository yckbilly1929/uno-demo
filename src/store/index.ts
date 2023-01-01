import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import rootReducer, { RootState } from './root'

const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch

// TODO: check if this workaround can be removed
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppRootState = RootState

export default store
