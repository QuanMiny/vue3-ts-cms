<template>
  <div class="page-content">
    <ym-table :list-data="dataList" v-bind="contentTableConfig">
      <!-- 头部处理插槽 -->
      <template #header-handler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 表格列的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '停用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <el-button size="small" type="text" :icon="EditIcon">编辑</el-button>
        <el-button size="small" type="text" :icon="DeleteIcon">删除</el-button>
      </template>
    </ym-table>
  </div>
</template>

<script setup lang="ts">
import YmTable from '@/base-ui/table'
import { Edit as EditIcon, Delete as DeleteIcon } from '@element-plus/icons-vue'
import { defineProps } from 'vue'

import { useSystemStoreWithOut } from '@/store/system'
import { computed } from 'vue'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  pageName: {
    type: String,
    require: true
  }
})

const SystemStore = useSystemStoreWithOut()

SystemStore.getPageListAction({
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const dataList = computed(() =>
  SystemStore.pageListData(props.pageName as string)
)
// const usersCount = computed(() => SystemStore.getUsersCount)
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
