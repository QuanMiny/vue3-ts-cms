import { useLoginStoreWithOut } from '@/store/login'

/**
 * 查询权限
 * @param pageName 查询权限的页面
 * @param hanldeName 查询的权限
 * @returns bool 是否存在该权限
 */

export function usePermission(pageName: string, hanldeName: string) {
  const userLoginStore = useLoginStoreWithOut()
  const permissions = userLoginStore.getPermissions
  const verifyPermission = `system:${pageName}:${hanldeName}`
  return !!permissions.find((item: any) => item === verifyPermission)
}
