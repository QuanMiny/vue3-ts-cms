<template>
  <div class="user">
    <ym-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3>检索</h3>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="RefreshIcon">重置</el-button>
          <el-button type="primary" :icon="SearchIcon">搜索</el-button>
        </div>
      </template>
    </ym-form>
  </div>
</template>

<script lang="ts" setup>
import {
  Refresh as RefreshIcon,
  Search as SearchIcon
} from '@element-plus/icons-vue'

import YmForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import { ref } from 'vue'

const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px;
}
</style>
