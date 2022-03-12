<template>
  <div class="login-account">
    <el-form
      :model="account"
      :rules="rules"
      size="large"
      label-width="60px"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="account.pwd" show-password>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref, defineExpose } from 'vue'
import rules from '../config/account-config'
import localCache from '@/utils/cache'

const account = reactive({
  name: localCache.getCache('name') ?? '',
  pwd: localCache.getCache('pwd') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('pwd', account.pwd)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('pwd')
      }
    }
  })
}

// setup 将方法暴露出去
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.login-account {
  margin: 10px;
}
</style>
