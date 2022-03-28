<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped></style>
