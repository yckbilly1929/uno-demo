import React, { FC, Suspense } from 'react'
import { Provider } from 'react-redux'

import store from '@/store'
import FullPageSpin from '@/views/components/FullPageSpin'

const DemoApp = React.lazy(() => import('@/router/DemoApp'))

const App: FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<FullPageSpin />}>
        <DemoApp />
      </Suspense>
    </Provider>
  )
}

export default App
