import { combineReducers, Reducer } from '@reduxjs/toolkit'

import configSlice from '@/store/modules/config'

const appReducer = combineReducers({
  config: configSlice.reducer,
})

const rootReducer: Reducer<RootState> = (state, action) => {
  return appReducer(state, action)
}

export type RootState = ReturnType<typeof appReducer>
export default rootReducer
