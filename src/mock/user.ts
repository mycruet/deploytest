export interface UserInfo {
  username: string
  nickname: string
  phone: string
  email: string
  role: string
  organization: string
  createdAt: string
}

export const mockUserInfo: UserInfo = {
  username: 'admin',
  nickname: '管理员',
  phone: '13800000000',
  email: 'admin@example.com',
  role: '超级管理员',
  organization: '总部',
  createdAt: '2025-01-01'
}
