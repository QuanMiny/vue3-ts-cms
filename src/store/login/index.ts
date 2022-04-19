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
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'

import { useAppStoreWithOut } from '@/store/app'
const AppStore = useAppStoreWithOut()

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
    },
    getPermissions(): any {
      return this.permissions
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
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      // 将 routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions
    },
    /**
     *
     * @description 账号登录
     */
    async accountLoginAction(payload: IAccount) {
      // 1.登录请求
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      if (token) {
        this.changeToken(token)
        localCache.setCache('token', token)
        // 动态获取部门和列表数据
        AppStore.getInitialDataAction()
      }

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
        // 动态获取部门和列表数据
        AppStore.getInitialDataAction()
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
