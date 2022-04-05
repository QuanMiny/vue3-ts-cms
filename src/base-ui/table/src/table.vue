<template>
  <div class="ym-table">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="handler">
        <slot name="header-handler"></slot>
      </div>
    </div>
    <el-table
      :data="listData"
      stripe
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showSelection" type="selection" align="center">
      </el-table-column>
      <el-table-column
        label="序号"
        v-if="showColumnIndex"
        type="index"
        align="center"
        width="80"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.name">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import { IProplist } from '../type'
defineProps({
  title: {
    type: String,
    default: ''
  },
  listData: {
    type: Array,
    require: true
  },
  propList: {
    type: Array as PropType<IProplist[]>,
    require: true
  },
  showColumnIndex: {
    type: Boolean,
    default: false
  },
  showSelection: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['selectionChange'])
const handleSelectionChange = (value: any) => {
  emits('selectionChange', value)
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-weight: 700;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
