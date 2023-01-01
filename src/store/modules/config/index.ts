import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SizeType } from 'antd/es/config-provider/SizeContext'

export interface State {
  componentSize: SizeType
}

const getPreferredSize = (): SizeType => {
  const size = localStorage.getItem('antdComponentSize')
  if (!size || (size !== 'small' && size !== 'middle' && size !== 'large')) {
    return 'middle'
  }

  return size
}

const initialState: State = {
  componentSize: getPreferredSize(),
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setComponentSize: (state, action: PayloadAction<SizeType>) => {
      state.componentSize = action.payload
      localStorage.setItem('antdComponentSize', action.payload as string)
    },
  },
})

export const { setComponentSize } = configSlice.actions
export type { SizeType }

export default configSlice
