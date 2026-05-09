import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))

  // Mock 登录
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin' && password === 'admin123') {
          const mockToken = 'mock-token-' + Date.now()
          const mockUserInfo = {
            id: 1,
            name: '系统管理员',
            email: email,
            role: 'admin',
            department: '信息中心',
            avatar: ''
          }
          token.value = mockToken
          userInfo.value = mockUserInfo
          localStorage.setItem('token', mockToken)
          localStorage.setItem('userInfo', JSON.stringify(mockUserInfo))
          resolve(mockUserInfo)
        } else if (email && password) {
          // 通用账号（演示用）
          const mockToken = 'mock-token-' + Date.now()
          const mockUserInfo = {
            id: 2,
            name: email.split('@')[0],
            email: email,
            role: 'user',
            department: '业务部门',
            avatar: ''
          }
          token.value = mockToken
          userInfo.value = mockUserInfo
          localStorage.setItem('token', mockToken)
          localStorage.setItem('userInfo', JSON.stringify(mockUserInfo))
          resolve(mockUserInfo)
        } else {
          reject(new Error('邮箱或密码错误'))
        }
      }, 500)
    })
  }

  // 退出登录
  const logout = () => {
    token.value = ''
    userInfo.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  return { token, userInfo, login, logout }
})
