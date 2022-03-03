import { defineStore } from 'pinia'

const mainStore = defineStore('main', {
  state: () => {
    return {
      name: 'ming',
      counter: 1
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    }
  }
})

export default mainStore
