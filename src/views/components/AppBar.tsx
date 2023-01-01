import React, { FC } from 'react'

import { Select, Space } from 'antd'

import { styled } from '@/theme'
import { useAppDispatch, useAppSelector } from '@/store'
import { setComponentSize, SizeType } from '@/store/modules/config'

const { Option, OptGroup } = Select

const ItemWrapper = styled('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  height: '100%',
})
const ItemSeparator = styled('div', {
  flexGrow: 1,
})

const AppBar: FC = () => {
  const dispatch = useAppDispatch()

  const configState = useAppSelector((state) => state.config)

  return (
    <>
      <ItemWrapper>
        <div className="i-demo:logo w-9 h-9" />
      </ItemWrapper>
      <ItemSeparator />
      <ItemWrapper>
        <Space>
          <Select
            value={configState.componentSize}
            onSelect={(val: SizeType) => dispatch(setComponentSize(val))}
            className="w-32"
          >
            <OptGroup label="Component Size">
              <Option value="small" key="select-component-size-small">
                Small
              </Option>
              <Option value="middle" key="select-component-size-middle">
                Middle
              </Option>
              <Option value="large" key="select-component-size-large">
                Large
              </Option>
            </OptGroup>
          </Select>
        </Space>
      </ItemWrapper>
    </>
  )
}

export default AppBar
