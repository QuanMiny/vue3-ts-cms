<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @reset-click="resetClick"
      @query-search="querySearch"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="users"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
  </div>
  <page-modal
    ref="pageModalRef"
    :modal-config="modalConfigRef"
    :default-info="defaultInfo"
    page-name="users"
  ></page-modal>
</template>
<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { computed } from 'vue'
import { useAppStoreWithOut } from '@/store/app'

const [pageContentRef, resetClick, querySearch] = usePageSearch()

// 1.处理密码选项的显隐性
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  passwordItem!.isHidden = true
}

// 2.动态添加部门和角色列表
const AppStore = useAppStoreWithOut()
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  departmentItem!.options = AppStore.entireDepartment.map((item: any) => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  roleItem!.options = AppStore.entireRole.map((item: any) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})

const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style scoped lang="less"></style>
