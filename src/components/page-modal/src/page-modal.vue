<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <ym-form v-bind="modalConfig" v-model="formData"></ym-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import YmForm from '@/base-ui/form'
import { ref, defineProps, defineExpose, watch } from 'vue'

const props = defineProps({
  modalConfig: {
    type: Object,
    require: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  }
})

const dialogVisible = ref(false)
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  (newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const item of props.modalConfig!.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

defineExpose({ dialogVisible })
</script>

<style lang="less" scoped></style>
