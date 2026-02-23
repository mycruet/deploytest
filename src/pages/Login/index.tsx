import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import { useAuthStore } from '../../store/authStore'

interface LoginFormValues {
  username: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      const success = await login(values.username, values.password)
      if (success) {
        message.success('登录成功')
        navigate('/dashboard')
      } else {
        message.error('用户名或密码不能为空')
      }
    } catch (error) {
      message.error('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">物联数智化赋能平台</h1>
        
        <Form
          form={form}
          name="login"
          className="login-form"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              icon={<LoginOutlined />}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <p>© 2025 物联数智化赋能平台</p>
          <p>技术支持：XXX</p>
        </div>
      </div>
    </div>
  )
}

export default Login
