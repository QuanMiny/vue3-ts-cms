import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { YMRequestInterceptors, YMRequestConfig } from './type'

class YMRequest {
  // new YMRequest() 可创建多个axios实例，可以分别配置不同请求,比如是否携带token
  instance: AxiosInstance
  interceptors?: YMRequestInterceptors
  constructor(config: YMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
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
        return res
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应拦截失败')
        return err
      }
    )
  }

  request(config: YMRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default YMRequest
