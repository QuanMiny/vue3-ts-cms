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
        <el-input type="password" v-model="account.pwd"> </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref, defineExpose } from 'vue'
import rules from '../config/account-config'

const account = reactive({
  name: '',
  pwd: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('登录')
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
