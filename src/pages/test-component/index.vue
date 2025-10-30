<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 09:42:33
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-29 18:35:33
 * @FilePath: /unibest/src/pages/test-component/index.vue
 * @Description: 测试组件
-->
<script lang="ts" setup>
import Map from '@/components/Map/index.vue'
import 'leaflet/dist/leaflet.css'
import type { MapConfig } from '@/components/Map/type'
definePage({
  style: {
    navigationBarTitleText: '测试地图',
  },
})

const mapConfig = ref<MapConfig>({
  latitude: 31.2281,
  longitude: 121.477,
  zoom: 18,
  initialized: false,
  defaultLayer: 'risk',
})

const isFullScreen = ref(false)

const layerList = ref<string[]>(['risk', 'hazard', 'patrol', 'monitor'])

</script>

<template>
  <view class="test-component">
    <view class="map-container" :class="{ 'full-screen': isFullScreen }">
      <Map :config="mapConfig" v-model:full-screen="isFullScreen" v-model:layer-list="layerList" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.test-component {
  padding: 16px;
}
.map-container {
  width: 100%;
  height: 222px;
}
.full-screen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
