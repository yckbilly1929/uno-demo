import React, { FC, PropsWithChildren } from 'react'

import { ConfigProvider, Layout } from 'antd'

import AppBar from '@/views/components/AppBar'
import { useAppSelector } from '@/store'

const { Header } = Layout

const Skeleton: FC<PropsWithChildren> = ({ children }) => {
  const componentSize = useAppSelector((state) => state.config.componentSize)

  return (
    <Layout>
      <ConfigProvider componentSize={componentSize} space={{ size: 'middle' }}>
        <Header className="inline-flex fixed z-1 top-0 w-screen">
          <AppBar />
        </Header>
        {children}
      </ConfigProvider>
    </Layout>
  )
}

export default Skeleton
