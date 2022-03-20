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
  </div>
</template>

<script setup lang="ts">
import { Fold as FoldIcon, Expand as ExpandIcon } from '@element-plus/icons-vue'
import { ref, defineEmits } from 'vue'

const isFold = ref(false)

const emits = defineEmits(['collapseChange'])

const handleCollapseClick = () => {
  isFold.value = !isFold.value
  emits('collapseChange', isFold.value)
}
</script>

<style lang="less" scoped>
.nav-header {
  .collapse-icon {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
