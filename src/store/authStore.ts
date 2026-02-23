import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        // 模拟登录验证：用户名和密码任意非空即可
        if (username.trim() && password.trim()) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
