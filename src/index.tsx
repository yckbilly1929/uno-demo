import React from 'react'
import { createRoot } from 'react-dom/client'

import { Modal } from 'antd'

import App from '@/App'
import * as serviceWorker from '@/serviceWorker'

import 'antd/dist/reset.css'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: (registration) => {
    // TODO: currently refreshed window no need double update
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      Modal.confirm({
        title: 'New version available, update now?',
        cancelText: 'Later',
        onOk: () => {
          // waitingServiceWorker.postMessage('SKIP_WAITING')
          window.location.reload()
        },
        onCancel: () => {
          // TODO: schedule remind for reload?
        },
      })
    }
  },
  onSuccess: (_registration) => {
    // TODO: no-op?
  },
})
