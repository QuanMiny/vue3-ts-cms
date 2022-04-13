export const contentTableConfig = {
  title: '商品信息',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: 120 },
    { prop: 'oldPrice', label: '原价格', minWidth: 80, slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: 80, slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: 120, slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: 80, slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: 180,
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: 180,
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: 120, slotName: 'handler' }
  ],
  showColumnIndex: true,
  showSelection: false
}