<template>
  <div class="role">
    <page-search
      :search-form-config="searchFormConfig"
      @reset-click="resetClick"
      @query-search="querySearch"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="role"
    ></page-content>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/usePageSearch'
const [pageContentRef, resetClick, querySearch] = usePageSearch()
</script>

<style scoped lang="less"></style>
