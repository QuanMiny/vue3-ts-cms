import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '10px 40px'
  },
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '选择',
      placeholder: '请选择',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'datetimerange'
      }
    }
  ]
}
