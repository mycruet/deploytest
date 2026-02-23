import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserInfo, mockUserInfo } from '../mock/user'

interface UserState {
  userInfo: UserInfo
  updateUserInfo: (info: Partial<UserInfo>) => void
  resetUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userInfo: mockUserInfo,
      updateUserInfo: (info: Partial<UserInfo>) => {
        const currentInfo = get().userInfo
        set({ userInfo: { ...currentInfo, ...info } })
      },
      resetUserInfo: () => {
        set({ userInfo: mockUserInfo })
      }
    }),
    {
      name: 'user-storage'
    }
  )
)
