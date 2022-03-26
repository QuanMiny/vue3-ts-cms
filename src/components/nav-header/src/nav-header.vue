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
      <ym-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import YmBreadcrumb from '@/base-ui/breadcrumb'
import UserInfo from './user-info.vue'
import { Fold as FoldIcon, Expand as ExpandIcon } from '@element-plus/icons-vue'
import { ref, defineEmits, computed } from 'vue'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useLoginStoreWithOut } from '@/store/login'
import { useRoute } from 'vue-router'

const isFold = ref(false)

const emits = defineEmits(['collapseChange'])

const handleCollapseClick = () => {
  isFold.value = !isFold.value
  emits('collapseChange', isFold.value)
}

const breadcrumbs = computed(() => {
  const userLoginStore = useLoginStoreWithOut()
  const userMenus = userLoginStore.getUserMenus
  // 可获取当前路径
  const currentPath = useRoute().path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
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
