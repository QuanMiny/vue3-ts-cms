import { useAppStoreWithOut } from '@/store/app'
import { useLoginStoreWithOut } from '@/store/login'

const AppStore = useAppStoreWithOut()
const LoginStore = useLoginStoreWithOut()

export function initAppConfigStore() {
  AppStore.getInitialDataAction()
  LoginStore.loadLocalLogin()
}
