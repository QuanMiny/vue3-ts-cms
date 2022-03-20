import { defineStore } from 'pinia'
import { store } from '@/store'
import { ILoginState } from './type'
import { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'
import localCache from '@/utils/cache'
import router from '@/router'

export const useLoginStore = defineStore({
  id: 'app-login',
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  getters: {
    getUserMenus(): any {
      return this.userMenus
    }
  },
  actions: {
    changeToken(token: string) {
      this.token = token
    },
    changeUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    changeUserMenus(userMenus: any) {
      this.userMenus = userMenus
    },
    /**
     *
     * @description 账号登录
     */
    async accountLoginAction(payload: IAccount) {
      // 1.登录请求
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      this.changeToken(token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      this.changeUserInfo(userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.changeUserMenus(userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    /**
     *
     * @description 缓存信息加载
     */
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.changeToken(token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.changeUserInfo(userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        this.changeUserMenus(userMenus)
      }
    }
  }
})

export function useLoginStoreWithOut() {
  return useLoginStore(store)
}
