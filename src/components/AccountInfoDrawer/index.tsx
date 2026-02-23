import React, { useState } from 'react'
import { Drawer, Button, Form, Input, Modal, message } from 'antd'
import { EditOutlined, SaveOutlined, CloseOutlined, KeyOutlined } from '@ant-design/icons'
import { useUserStore } from '../../store/userStore'

interface AccountInfoDrawerProps {
  open: boolean
  onClose: () => void
}

const AccountInfoDrawer: React.FC<AccountInfoDrawerProps> = ({ open, onClose }) => {
  const userInfo = useUserStore((state) => state.userInfo)
  const updateUserInfo = useUserStore((state) => state.updateUserInfo)
  
  const [isEditing, setIsEditing] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()

  // 查看信息部分
  const renderViewInfo = () => (
    <div className="account-info-section">
      <div className="section-title">账号信息</div>
      <div className="info-item">
        <span className="info-label">账号名称</span>
        <span className="info-value">{userInfo.username}</span>
      </div>
      <div className="info-item">
        <span className="info-label">昵称</span>
        <span className="info-value">{userInfo.nickname}</span>
      </div>
      <div className="info-item">
        <span className="info-label">电话</span>
        <span className="info-value">{userInfo.phone}</span>
      </div>
      <div className="info-item">
        <span className="info-label">邮箱</span>
        <span className="info-value">{userInfo.email}</span>
      </div>
      <div className="info-item">
        <span className="info-label">角色</span>
        <span className="info-value">{userInfo.role}</span>
      </div>
      <div className="info-item">
        <span className="info-label">所属组织</span>
        <span className="info-value">{userInfo.organization}</span>
      </div>
      <div className="info-item">
        <span className="info-label">创建日期</span>
        <span className="info-value">{userInfo.createdAt}</span>
      </div>
    </div>
  )

  // 编辑信息部分
  const renderEditInfo = () => (
    <div className="account-info-section">
      <div className="section-title">修改信息</div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          nickname: userInfo.nickname,
          phone: userInfo.phone,
          email: userInfo.email
        }}
      >
        <Form.Item
          label="昵称"
          name="nickname"
          className="edit-form-item"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="请输入昵称" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          label="电话"
          name="phone"
          className="edit-form-item"
          rules={[{ required: true, message: '请输入电话' }]}
        >
          <Input placeholder="请输入电话" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          className="edit-form-item"
          rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
        >
          <Input placeholder="请输入邮箱" disabled={!isEditing} />
        </Form.Item>
      </Form>

      <div className="edit-actions">
        {!isEditing ? (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
          >
            编辑
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              保存
            </Button>
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                setIsEditing(false)
                form.resetFields()
              }}
            >
              取消
            </Button>
          </>
        )}

        <Button
          type="dashed"
          icon={<KeyOutlined />}
          onClick={() => setIsPasswordModalOpen(true)}
        >
          修改密码
        </Button>
      </div>
    </div>
  )

  // 保存修改
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      updateUserInfo(values)
      setIsEditing(false)
      message.success('信息更新成功')
    } catch (error) {
      message.error('请检查输入')
    }
  }

  // 修改密码处理
  const handlePasswordChange = async () => {
    try {
      const values = await passwordForm.validateFields()
      
      // 前端模拟验证
      if (values.oldPassword === values.newPassword) {
        message.error('新密码不能与原密码相同')
        return
      }
      
      if (values.newPassword !== values.confirmPassword) {
        message.error('两次输入的新密码不一致')
        return
      }

      // 模拟原密码验证（实际项目中需要后端验证）
      if (values.oldPassword.trim().length === 0) {
        message.error('请输入原密码')
        return
      }

      message.success('密码修改成功')
      setIsPasswordModalOpen(false)
      passwordForm.resetFields()
    } catch (error) {
      message.error('请检查输入')
    }
  }

  return (
    <>
      <Drawer
        title="账号信息"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
      >
        {renderViewInfo()}
        {renderEditInfo()}
      </Drawer>

      <Modal
        title="修改密码"
        open={isPasswordModalOpen}
        onOk={handlePasswordChange}
        onCancel={() => {
          setIsPasswordModalOpen(false)
          passwordForm.resetFields()
        }}
        okText="确认修改"
        cancelText="取消"
        width={400}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          className="password-modal"
        >
          <Form.Item
            label="原密码"
            name="oldPassword"
            className="password-form-item"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
            <Input.Password placeholder="请输入原密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            className="password-form-item"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            className="password-form-item"
            rules={[{ required: true, message: '请确认新密码' }]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AccountInfoDrawer
