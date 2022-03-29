import ymRequest from '..'
import { IDataType } from '../type'

export function getPageListData(url: string, queryInfo: any) {
  return ymRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    showLoading: false
  })
}
