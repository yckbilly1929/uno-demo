import React, { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import UnauthedLayout from '@/views/components/UnauthedLayout'
import Login from '@/views/pages/Login'

const UnauthedApp: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnauthedLayout />}>
          <Route index element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default UnauthedApp
