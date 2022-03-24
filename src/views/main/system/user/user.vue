<template>
  <div class="user">
    <ym-form v-bind="searchFormConfig" />
  </div>
</template>

<script lang="ts" setup>
import YmForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped></style>
