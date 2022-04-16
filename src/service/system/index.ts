import ymRequest from '..'
import { IDataType } from '../type'

/**
 * 请求列表数据
 * @param url 请求路径
 * @param queryInfo 请求参数
 * @returns IDataType
 */
export function getPageListData(url: string, queryInfo: any) {
  return ymRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    showLoading: false
  })
}

/**
 * 删除某行数据
 * @param url 请求路径
 * @returns IDataType
 */
export function deletePageData(url: string) {
  return ymRequest.delete<IDataType>({
    url: url,
    showLoading: false
  })
}
