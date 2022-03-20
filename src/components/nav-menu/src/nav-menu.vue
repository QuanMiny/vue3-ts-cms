<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      active-text-color="#0a60bd"
      background-color="#001529"
      text-color="#ffffffa6"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id + ''">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <template v-if="item.id === 38">
                <el-icon><monitor-icon /></el-icon>
              </template>
              <template v-else-if="item.id === 1">
                <el-icon><setting-icon /></el-icon>
              </template>
              <template v-else-if="item.id === 9">
                <el-icon><goods-icon /></el-icon>
              </template>
              <template v-else-if="item.id === 41">
                <el-icon><chat-line-round-icon /></el-icon>
              </template>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
// 菜单图标暂定做法
import {
  Monitor as MonitorIcon,
  Setting as SettingIcon,
  Goods as GoodsIcon,
  ChatLineRound as ChatLineRoundIcon
} from '@element-plus/icons-vue'

import { useLoginStoreWithOut } from '@/store/login'
import { defineProps } from 'vue'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const userLoginStore = useLoginStoreWithOut()
const userMenus = userLoginStore.getUserMenus
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  // background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin-right: 10px;
      margin-left: 7px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}

.el-menu {
  border-right: none;
}

// 目录
.el-sub-menu {
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

::v-deep .el-sub-menu.is-active .el-sub-menu__title {
  color: #fff !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}

// .el-menu-vertical:not(.el-menu--collapse) {
//   width: 100%;
//   height: calc(100% - 48px);
// }
</style>
