import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ymRequest from './service'

createApp(App).use(createPinia()).use(router).mount('#app')

ymRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
