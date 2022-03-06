import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YMRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface YMRequestConfig extends AxiosRequestConfig {
  interceptors?: YMRequestInterceptors
}
