import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ymRequest from './service'

createApp(App).use(createPinia()).use(router).mount('#app')

ymRequest.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独请求的res')
      return res
    }
  },
  showLoading: true
})

// ymRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })
