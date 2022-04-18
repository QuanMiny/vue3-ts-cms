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
    :modal-config="modalConfig"
    :default-info="defaultInfo"
  ></page-modal>
</template>
<script lang="ts" setup>
// import { computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

const [pageContentRef, resetClick, querySearch] = usePageSearch()

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

const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style scoped lang="less"></style>
