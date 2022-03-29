<template>
  <div class="ym-table">
    <el-table :data="listData" stripe border style="width: 100%">
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
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  listData: {
    type: Array,
    require: true
  },
  propList: {
    type: Array,
    require: true
  }
})
</script>

<style lang="less" scoped></style>
