import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import { setupStore } from './store'
import { initAppConfigStore } from './logics/initAppConfig'
import { globalRegister } from './logics/globalRegister'

const app = createApp(App)

setupStore(app)

initAppConfigStore()

globalRegister(app)

app.use(router).mount('#app')
