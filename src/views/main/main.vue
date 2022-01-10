<template>
  <div>Main</div>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-input v-model="input" placeholder="Please input" />
  <el-tag type="success">标签二</el-tag>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const input = ref('')

    return {
      input
    }
  }
})
</script>

<style scoped></style>
