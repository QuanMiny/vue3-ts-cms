import { defineStore } from 'pinia'
import { store } from '@/store'
import { ISystemState } from './type'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/system'

export const useSystemStore = defineStore({
  id: 'app-system',
  state: (): ISystemState => ({
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0,
    departmentList: [],
    departmentCount: 0
  }),
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    changeList(list: any, pageName: string) {
      ;(this.$state as any)[`${pageName}List`] = list
    },
    changeCount(count: any, pageName: string) {
      ;(this.$state as any)[`${pageName}Count`] = count
    },
    /**
     *
     * @description 页面请求数据列表
     */
    async getPageListAction(payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 2.对页面发生请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      // 3.修改state的数据
      this.changeList(list, pageName)
      this.changeCount(totalCount, pageName)
    },
    /**
     *
     * @description 删除某行数据
     */
    async deletePageDataAction(payload: any) {
      const { pageName, id } = payload
      const deleteUrl = `/${pageName}/${id}`
      await deletePageData(deleteUrl)
      this.getPageListAction({
        pageName: pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    /**
     *
     * @description 新建某行数据
     */
    async createPageDataAction(payload: any) {
      const { pageName, newData } = payload
      const createUrl = `/${pageName}/`
      await createPageData(createUrl, newData)
      this.getPageListAction({
        pageName: pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    async editPageDataAction(payload: any) {
      const { pageName, editData, id } = payload
      const editUrl = `/${pageName}/${id}`
      await editPageData(editUrl, editData)
      this.getPageListAction({
        pageName: pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    }
  }
})

export function useSystemStoreWithOut() {
  return useSystemStore(store)
}
