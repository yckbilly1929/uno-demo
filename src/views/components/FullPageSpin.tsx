import React, { FC } from 'react'
import { Row, Col, Spin } from 'antd'

const FullPageSpin: FC = () => {
  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  )
}

export default FullPageSpin
