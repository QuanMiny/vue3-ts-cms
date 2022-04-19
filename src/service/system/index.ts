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
 * @param url 删除请求路径
 * @returns IDataType
 */
export function deletePageData(url: string) {
  return ymRequest.delete<IDataType>({
    url: url,
    showLoading: false
  })
}

/**
 * 新建某行数据
 * @param url 新建请求路径
 * @param newData 传入新建的数据值
 * @returns IDataType
 */
export function createPageData(url: string, newData: any) {
  return ymRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

/**
 * 编辑某行数据
 * @param url 编辑请求路径
 * @param editData 传入编辑的数据值
 * @returns IDataType
 */
export function editPageData(url: string, editData: any) {
  return ymRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
