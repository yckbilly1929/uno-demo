import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'

import Skeleton from '@/views/components/Skeleton'
import { styled } from '@/theme'

const { Content } = Layout

const StyledContent = styled(Content, {
  '&.ant-layout-content': {
    minHeight: 'calc(100vh - 64px)',
    padding: 0,
    transition: 'margin 0.2s',
  },
})

const UnauthedLayout: FC = () => {
  return (
    <Skeleton>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </Skeleton>
  )
}

export default UnauthedLayout
