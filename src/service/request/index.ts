import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

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
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default YMRequest
