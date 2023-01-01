import React, { FC } from 'react'

import { Row, Col, Card, Form, Input, Button, notification } from 'antd'
import { useRequest } from 'ahooks'
import { ofetch } from 'ofetch'

import { fullWidthLayout } from '@/lib/layoutUtil'
import config from '@/config'

interface UsernameLoginForm {
  username: string
  password: string
}

const Login: FC = () => {
  const [form] = Form.useForm<UsernameLoginForm>()

  const { loading, runAsync } = useRequest<void, [UsernameLoginForm]>(
    async (_param) => {
      const res = await ofetch('https://1.1.1.1/cdn-cgi/trace')
      notification.success({
        message: 'On Success',
        description: res,
      })
    },
    {
      manual: true,
      onError: (err) => {
        notification.error({
          message: 'On Error',
          description: JSON.stringify(err),
        })
      },
    }
  )

  const onFinish = async (values: UsernameLoginForm) => {
    await runAsync({
      username: values.username,
      password: values.password,
    })
  }

  return (
    <Row justify="center" align="middle" className="min-h-screen">
      <Col>
        <Card bordered className="w-160 text-center">
          <div className="i-demo:logo w-50 h-50 mx-0 my-6" />
          <Form name="login-form" form={form} wrapperCol={fullWidthLayout.wrapperCol} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input
                placeholder="username"
                suffix={
                  <div className="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
                { min: 8, max: 40, message: 'Password length bewteen 8 and 40 only.' },
                () => ({
                  async validator(_rule, value) {
                    if (!value) {
                      return
                    }

                    // for basic
                    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
                      throw new Error('At least one uppercase letter, one lowercase letter and one number.')
                    }
                    // for special
                    if (!config.passwordPattern.test(value)) {
                      throw new Error('Only support these special characters: !@#$%^&*()')
                    }
                  },
                }),
              ]}
            >
              <Input.Password type="password" placeholder="password" autoComplete="new-password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
