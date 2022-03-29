import { defineStore } from 'pinia'
import { store } from '@/store'
import { ISystemState } from './type'
import { getPageListData } from '@/service/system'

export const useSystemStore = defineStore({
  id: 'app-system',
  state: (): ISystemState => ({
    usersList: [],
    usersCount: 0
  }),
  getters: {
    getUsersList(): any {
      return this.usersList
    },
    getUsersCount(): any {
      return this.usersCount
    }
  },
  actions: {
    changeUserList(usersList: any) {
      this.usersList = usersList
    },
    changeUserCount(usersCount: any) {
      this.usersCount = usersCount
    },
    /**
     *
     * @description 页面请求数据列表
     */
    async getPageListAction(payload: any) {
      // 对页面发生请求
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      this.changeUserList(list)
      this.changeUserCount(totalCount)
    }
  }
})

export function useSystemStoreWithOut() {
  return useSystemStore(store)
}
