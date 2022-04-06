<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig" />
    <page-content
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
</script>

<style scoped lang="less"></style>
