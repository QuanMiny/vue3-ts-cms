<template>
  <div class="nav-header">
    <el-icon class="collapse-icon" @click="handleCollapseClick">
      <template v-if="isFold === false">
        <fold-icon />
      </template>
      <template v-else-if="isFold === true">
        <expand-icon />
      </template>
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fold as FoldIcon, Expand as ExpandIcon } from '@element-plus/icons-vue'
import { ref, defineEmits } from 'vue'

import UserInfo from './user-info.vue'

const isFold = ref(false)

const emits = defineEmits(['collapseChange'])

const handleCollapseClick = () => {
  isFold.value = !isFold.value
  emits('collapseChange', isFold.value)
}
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .collapse-icon {
    font-size: 24px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
  }
}
</style>
