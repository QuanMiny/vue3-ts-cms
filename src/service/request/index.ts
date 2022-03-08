import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { YMRequestInterceptors, YMRequestConfig } from './type'

import { ElLoading } from 'element-plus'
// 注意引入路径的更新
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
// 需要带上loading的样式才能正常显示
import 'element-plus/es/components/loading/style/css'

const DEFAULT_LOADING = true

class YMRequest {
  // new YMRequest() 可创建多个axios实例，可以分别配置不同请求,比如是否携带token
  instance: AxiosInstance
  interceptors?: YMRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  constructor(config: YMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 传入自定义的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 传入自定义的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求拦截成功')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应拦截成功')
        // 将loading移除
        this.loading?.close()
        return res
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应拦截失败')

        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }

  request(config: YMRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        console.log(res)
        // 将showLoading设置为true，这样不会影响下一个请求
        this.showLoading = DEFAULT_LOADING
      })
      .catch((err) => {
        // 将showLoading设置为true，这样不会影响下一个请求
        this.showLoading = DEFAULT_LOADING
        return err
      })
  }
}

export default YMRequest
