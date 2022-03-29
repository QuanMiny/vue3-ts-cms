import { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'

function registerProperties(app: App) {
  // 注册全局函数
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}

export function globalRegister(app: App): void {
  app.use(registerProperties)
}
