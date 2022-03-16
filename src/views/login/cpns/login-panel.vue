<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <user-icon class="custom-icon" />
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <iphone-icon class="custom-icon" />
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-controller">
      <el-checkbox size="large" v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { User as UserIcon, Iphone as IphoneIcon } from '@element-plus/icons-vue'
import { ref } from 'vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

const isKeepPassword = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount>>()

const handleLoginClick = () => {
  accountRef.value?.loginAction(isKeepPassword.value)
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 400px;
  margin-bottom: 200px;
  .title {
    text-align: center;
    font-size: 24px;
  }
  .custom-tabs-label {
    font-size: 16px;
    .custom-icon {
      width: 1em;
      height: 1em;
      margin-right: 8px;
      position: relative;
      top: 3px;
    }
  }
  .account-controller {
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
