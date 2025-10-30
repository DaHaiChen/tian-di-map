<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-10 17:53:19
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-30 14:22:21
 * @FilePath: /unibest/src/pages/index/index.vue
 * @Description: 首页
-->
<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

function gotoMap() {
  uni.navigateTo({
    url: '/pages/map/index',
  })
}

function gotoMap2() {
  uni.navigateTo({
    url: '/pages/test-component/index',
  })
}

function gotoRiskMap() {
  uni.navigateTo({
    url: '/pages/risk-map/index',
  })
}
// #endregion
</script>

<template>
  <view class="bg-white px-4 pt-2 flex flex-col gap-3" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <wd-button @click="gotoMap">
      demo地图
    </wd-button>
    <wd-button @click="gotoMap2">
      功能测试地图
    </wd-button>
    <wd-button @click="gotoRiskMap">
      risk地图
    </wd-button>
  </view>
</template>
