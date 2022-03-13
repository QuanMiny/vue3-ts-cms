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
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password>
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
import { useLoginStoreWithOut } from '@/store/login'

const LoginStore = useLoginStoreWithOut()

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.判断是否记住密码
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      // 2.登录验证
      LoginStore.accountLoginAction({ ...account })
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
