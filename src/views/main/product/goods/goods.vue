<template>
  <div class="goods">
    <page-search
      :search-form-config="searchFormConfig"
      @reset-click="resetClick"
      @query-search="querySearch"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="goods"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          :z-index="100"
        />
      </template>
      <template #oldPrice="scope">
        <span>{{ '￥' + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ '￥' + scope.row.newPrice }}</span>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '启用' : '停用' }}</el-button
        >
      </template>
    </page-content>
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
