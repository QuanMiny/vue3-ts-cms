<template>
  <div class="page-content">
    <ym-table
      :list-data="dataList"
      :list-count="dataCount"
      v-model:page="pageInfo"
      v-bind="contentTableConfig"
    >
      <!-- 头部处理插槽 -->
      <template #header-handler>
        <el-button type="primary" v-if="isCreate" @click="handleNewClick">
          新建数据
        </el-button>
      </template>
      <!-- 表格列的插槽 -->
      <template #enable="scope">
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
      <template #handler="scope">
        <el-button
          size="small"
          type="text"
          :icon="EditIcon"
          v-if="isUpdate"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          size="small"
          type="text"
          :icon="DeleteIcon"
          v-if="isDelete"
          @click="handleDeleteClick(scope.row)"
        >
          删除
        </el-button>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ym-table>
  </div>
</template>

<script setup lang="ts">
import YmTable from '@/base-ui/table'
import { Edit as EditIcon, Delete as DeleteIcon } from '@element-plus/icons-vue'
import { defineProps, defineExpose, defineEmits, ref, watch } from 'vue'
import { usePermission } from '@/hooks/usePermission'
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

// 获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'enable') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

// 获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 利用pinia请求数据并保存
const SystemStore = useSystemStoreWithOut()

const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  SystemStore.getPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()
// 读取pinia保存的数据
const dataList = computed(() =>
  SystemStore.pageListData(props.pageName as string)
)
const dataCount = computed(() =>
  SystemStore.pageListCount(props.pageName as string)
)

// 删除/编辑/新增
const handleDeleteClick = (item: any) => {
  if (!isDelete) return
  SystemStore.deletePageDataAction({ pageName: props.pageName, id: item.id })
}

const emits = defineEmits(['newBtnClick', 'editBtnClick'])

const handleNewClick = () => {
  emits('newBtnClick')
}

const handleEditClick = (item: any) => {
  emits('editBtnClick', item)
}

defineExpose({ getPageData })
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}

// 解决图片预览层级显示问题
::v-deep .el-table .el-table__cell {
  position: static;
}
</style>
