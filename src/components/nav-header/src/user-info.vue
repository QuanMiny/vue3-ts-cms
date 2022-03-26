<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="user-name">{{ username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><span @click="handleExitClick">退出登录</span></el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStoreWithOut } from '@/store/login'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const userLoginStore = useLoginStoreWithOut()
const username = computed(() => userLoginStore.userInfo.name)

const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .user-name {
    padding-left: 6px;
  }
}
</style>
