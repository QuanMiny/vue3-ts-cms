import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia()).use(router).mount('#app')
