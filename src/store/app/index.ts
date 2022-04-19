import { defineStore } from 'pinia'
import { store } from '@/store'
import { IAppState } from './type'
import { getPageListData } from '@/service/system'

export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppState => ({
    entireDepartment: [],
    entireRole: [],
    entireMenu: []
  }),
  getters: {},
  actions: {
    async getInitialDataAction() {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      this.entireDepartment = departmentList
      this.entireRole = roleList
      this.entireMenu = menuList
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
