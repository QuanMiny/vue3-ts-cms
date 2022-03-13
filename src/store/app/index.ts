import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({}),
  getters: {},
  actions: {}
})

export function useLoginAppStoreWithOut() {
  return useAppStore(store)
}
