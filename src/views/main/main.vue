<template>
  <div>Main</div>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-input v-model="input" placeholder="Please input" />
  <el-tag type="success">标签二</el-tag>
  <div>{{ store.counter }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import mainStore from '@/store'

const store = mainStore()
const input = ref('')
</script>

<style scoped></style>
