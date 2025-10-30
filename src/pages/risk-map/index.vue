<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 09:42:33
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-30 15:10:46
 * @FilePath: /unibest/src/pages/risk-map/index.vue
 * @Description: 测试组件
-->
<script lang="ts" setup>
import Map from '@/components/Map/index.vue'
import type { MarkerData } from '@/components/Map/type'

import 'leaflet/dist/leaflet.css'
import type { MapConfig } from '@/components/Map/type'
import { convertApiPointsToMarkers } from '@/components/Map/hooks/utils'
definePage({
  style: {
    navigationBarTitleText: '测试地图',
  },
})


// 接口类型示例（可调整）
interface ApiPoint {
  coordinatesConfig: string
  levelCode: string    // 点位级别
  typeCode?: string    // 点位类型，可选
  [key: string]: any
}



const mapConfig = ref<MapConfig>({
  latitude: 31.2281,
  longitude: 121.477,
  zoom: 18,
  initialized: false,
  defaultLayer: 'risk',
})

const isFullScreen = ref(false)

const layerList = ref<string[]>(['risk', 'monitor'])
const layerMarkers = ref({})
const defaultDept = ref([])
// 风险源、隐患、巡查、问题、设备
function handleChangeLayer() {
  layerList.value = ['risk', 'hazard', 'patrol', 'monitor']
  layerMarkers.value = {
    risk: convertApiPointsToMarkers([
      {
        coordinatesConfig: "121.68759,31.6167,109000031015120057425",
        inherentRiskLevel: "ignore",
        type: 'risk'
      }
    ]),
    hazard: convertApiPointsToMarkers([
      {
        coordinatesConfig: "121.87654,31.35147,109000031015120056652",
        levelCode: "01",
        type: 'hazard'
      },
      {
        coordinatesConfig: "121.64347,31.6343,109000031015120056652",
        levelCode: "02",
        type: 'hazard'
      },
      {
        coordinatesConfig: "121.87847,31.34776,10020040010101",
        levelCode: "02",
        type: 'hazard'
      }
    ])
  }
  defaultDept.value = ['1002004001', '100200400101', '10020040010101']
}
</script>

<template>
  <view class="test-component">
    <view class="map-container" :class="{ 'full-screen': isFullScreen }">
      <Map :config="mapConfig" :layerMarkers="layerMarkers" v-model:full-screen="isFullScreen" :layer-list="layerList"
        :default-dept="defaultDept" />
    </view>
    <view class="mt-4">
      <wd-button block @click="handleChangeLayer">
        编辑风险源
      </wd-button>
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
