<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
    <div class="content">
      <ym-table :list-data="usersList" :prop-list="propList">
        <template #status="scope">
          <el-button
            plain
            size="mini"
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
      </ym-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { useSystemStoreWithOut } from '@/store/system'
import { computed } from 'vue'
import YmTable from '@/base-ui/table'

const SystemStore = useSystemStoreWithOut()

SystemStore.getPageListAction({
  pageUrl: '/users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const usersList = computed(() => SystemStore.getUsersList)
// const usersCount = computed(() => SystemStore.getUsersCount)

const propList = [
  { prop: 'name', label: '用户名', minWidth: 100 },
  { prop: 'realname', label: '真实姓名', minWidth: 100 },
  { prop: 'cellphone', label: '手机号码', minWidth: 100 },
  { prop: 'enable', label: '状态', minWidth: 100, slotName: 'status' },
  { prop: 'roleId', label: '角色', minWidth: 100 },
  { prop: 'createAt', label: '创建世间', minWidth: 180, slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: 180, slotName: 'updateAt' }
]
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
