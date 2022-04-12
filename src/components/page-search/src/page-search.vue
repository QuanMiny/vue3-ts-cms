<template>
  <div class="page-search">
    <ym-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3>检索</h3>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="RefreshIcon" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            :icon="SearchIcon"
            @click="handleQuerySearch"
            >搜索</el-button
          >
        </div>
      </template>
    </ym-form>
  </div>
</template>

<script setup lang="ts">
import {
  Refresh as RefreshIcon,
  Search as SearchIcon
} from '@element-plus/icons-vue'

import YmForm from '@/base-ui/form'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    require: true
  }
})

const emits = defineEmits(['resetClick', 'querySearch'])

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

const formData = ref(formOriginData)

const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  emits('resetClick')
}

const handleQuerySearch = () => {
  emits('querySearch', formData.value)
}
</script>

<style lang="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px;
}
</style>
