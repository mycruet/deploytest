import React, { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ControlOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import AccountInfoDrawer from '../../components/AccountInfoDrawer'

const { Header, Content } = Layout
const { Title } = Typography

type MenuKey = 'workbench' | 'app' | 'enterprise' | 'system'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const resetUserInfo = useUserStore((state) => state.resetUserInfo)
  const userInfo = useUserStore((state) => state.userInfo)
  
  const [currentMenu, setCurrentMenu] = useState<MenuKey>('workbench')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // 菜单点击处理
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setCurrentMenu(e.key as MenuKey)
  }

  // 用户菜单处理
  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'info') {
      setDrawerOpen(true)
    } else if (key === 'logout') {
      logout()
      resetUserInfo()
      navigate('/login')
    }
  }

  // 顶部水平菜单配置
  const menuItems: MenuProps['items'] = [
    {
      key: 'workbench',
      icon: <DashboardOutlined />,
      label: '工作台'
    },
    {
      key: 'app',
      icon: <AppstoreOutlined />,
      label: '应用管理'
    },
    {
      key: 'enterprise',
      icon: <TeamOutlined />,
      label: '企业管理'
    },
    {
      key: 'system',
      icon: <ControlOutlined />,
      label: '系统管理'
    }
  ]

  // 用户下拉菜单配置
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'info',
      icon: <SettingOutlined />,
      label: '账号信息'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      danger: true
    }
  ]

  // 根据菜单显示内容
  const renderContent = () => {
    const contentMap: Record<MenuKey, string> = {
      workbench: '工作台',
      app: '应用管理',
      enterprise: '企业管理',
      system: '系统管理'
    }
    
    return (
      <div className="content-card">
        <div className="development-text">
          {contentMap[currentMenu]} - 开发中
        </div>
      </div>
    )
  }

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div className="header-left">
          <div className="logo-placeholder">物</div>
          <Title level={4} style={{ margin: 0 }} className="app-title">
            物联数智化赋能
          </Title>
        </div>

        <Menu
          mode="horizontal"
          items={menuItems}
          selectedKeys={[currentMenu]}
          onClick={handleMenuClick}
          className="header-menu"
        />

        <div className="header-right">
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
            arrow
          >
            <Avatar
              size={40}
              className="user-avatar"
              icon={<UserOutlined />}
              style={{ backgroundColor: '#667eea' }}
            >
              {userInfo.nickname.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        </div>
      </Header>

      <Content className="dashboard-content">
        {renderContent()}
      </Content>

      <AccountInfoDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Layout>
  )
}

export default Dashboard
