<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 09:42:33
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-31 12:35:10
 * @FilePath: /unibest/src/pages/risk-map/index.vue
 * @Description: 测试组件
-->
<script lang="ts" setup>
import type { MapConfig, MarkerData, PolylineConfig } from '@/components/Map/type'

import { convertApiPointsToMarkers } from '@/components/Map/hooks/utils'
import Map from '@/components/Map/index.vue'
import 'leaflet/dist/leaflet.css'

definePage({
  style: {
    navigationBarTitleText: '测试地图',
  },
})

// 接口类型示例（可调整）
interface ApiPoint {
  coordinatesConfig: string
  levelCode: string // 点位级别
  typeCode?: string // 点位类型，可选
  [key: string]: any
}

const mapConfig = ref<MapConfig>({
  latitude: 30.467632,
  longitude: 114.422021,
  zoom: 15,
  initialized: false,
  defaultLayer: 'risk',
})

const isFullScreen = ref(false)

const layerList = ref<string[]>(['risk', 'monitor', 'myLocation'])
const layerMarkers = ref<Record<string, MarkerData[]>>({
  myLocation: [], // 我的位置图层
})
const defaultDept = ref([])

// 定位相关
const isTracking = ref(false) // 是否正在追踪
let locationTimer: any = null // 定时器引用

// 位置变化回调函数（需要保持引用以便移除监听）
const handleLocationChange = (location: any) => {
  console.log('📍 位置更新:', location)
  
  // 添加到轨迹
  if (polyline.value && Array.isArray(polyline.value.points)) {
    polyline.value.points.push({
      lat: location.latitude,
      lng: location.longitude,
    })
  }
  
  // 更新标记
  // layerMarkers.value = {
  //   ...layerMarkers.value,
  //   myLocation: [{
  //     lat: location.latitude,
  //     lng: location.longitude,
  //     title: '📍 我的位置',
  //     popupContent: `
  //       <div style="padding: 8px;">
  //         <strong>我的位置</strong><br>
  //         精度: ${location.accuracy?.toFixed(0) || 0}米<br>
  //         坐标: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}<br>
  //         已记录: ${polyline.value?.points?.length || 0} 个点
  //       </div>
  //     `,
  //   }]
  // }
}
// 风险源、隐患、巡查、问题、设备
function handleChangeLayer() {
  layerList.value = ['risk', 'hazard', 'patrol', 'monitor']
  layerMarkers.value = {
    risk: convertApiPointsToMarkers([
      {
        coordinatesConfig: '121.68759,31.6167,109000031015120057425',
        levelCode: 'ignore',
        type: 'risk',
      },
    ]),
    hazard: convertApiPointsToMarkers([
      {
        coordinatesConfig: '121.87654,31.35147,109000031015120056652',
        levelCode: '01',
        type: 'hazard',
      },
      {
        coordinatesConfig: '121.64347,31.6343,109000031015120056652',
        levelCode: '02',
        type: 'hazard',
      },
      {
        coordinatesConfig: '121.87847,31.34776,10020040010101',
        levelCode: '02',
        type: 'hazard',
      },
    ]),
  }
  defaultDept.value = ['1002004001', '100200400101', '10020040010101']
}

const polyline = ref<PolylineConfig | null>({
  points: [],
  color: 'red',
  weight: 2,
  opacity: 0.8,
  smooth: true
})

function handleDrawTrajectory() {
  console.log(polyline.value, 'polyline')
}

/**
 * 获取单次位置
 */
function getLocation() {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02', // 使用 WGS-84 坐标系，与天地图一致
      altitude: true, // 获取高度信息（可选）
      isHighAccuracy: true, // 开启高精度定位
      success: (res) => {
        console.log('📍 定位成功:', {
          经度: res.longitude,
          纬度: res.latitude,
          精度: res.accuracy + '米',
        })

        // 添加到轨迹
        if (polyline.value && Array.isArray(polyline.value.points)) {
          polyline.value.points.push({
            lat: res.latitude,
            lng: res.longitude,
          })
        }

        // 更新"我的位置"标记
        // layerMarkers.value = {
        //   ...layerMarkers.value,
        //   myLocation: [{
        //     lat: res.latitude,
        //     lng: res.longitude,
        //     title: '📍 我的位置',
        //     popupContent: `
        //       <div style="padding: 8px;">
        //         <strong>我的位置</strong><br>
        //         精度: ${res.accuracy.toFixed(0)}米<br>
        //         坐标: ${res.latitude.toFixed(6)}, ${res.longitude.toFixed(6)}<br>
        //         已记录: ${polyline.value?.points?.length || 0} 个点
        //       </div>
        //     `,
        //   }]
        // }

        // 更新地图中心（第一次定位时）
        if (!isTracking.value) {
          mapConfig.value = {
            ...mapConfig.value,
            latitude: res.latitude,
            longitude: res.longitude,
            zoom: 18,
          }
        }

        resolve(res)
      },
      fail: (err) => {
        console.error('❌ 定位失败:', err)
        reject(err)
      },
    })
  })
}

/**
 * 开始持续定位
 */
async function startTracking() {
  if (isTracking.value) {
    uni.showToast({ title: '已经在定位中', icon: 'none' })
    return
  }

  try {
    uni.showLoading({ title: '启动定位中...' })
    
    // 先获取一次位置
    // await getLocation()
    
    uni.hideLoading()
    isTracking.value = true

    // #ifndef H5
    // APP 端使用系统持续定位（推荐）
    uni.startLocationUpdate({
      success: () => {
        console.log('✅ 开启系统持续定位')
        // 注册位置变化监听
        uni.onLocationChange(handleLocationChange)
        
        uni.showToast({ title: '定位已开启（系统级）', icon: 'success' })
      },
      fail: (err) => {
        console.error('系统定位失败，降级为定时轮询:', err)
        startPollingLocation()
      }
    })
    // #endif

    // #ifdef H5
    // H5 端使用定时轮询（每 3 秒）
    startPollingLocation()
    // #endif

  } catch (error) {
    uni.hideLoading()
    uni.showToast({ 
      title: '定位失败，请检查权限',
      icon: 'none'
    })
  }
}

/**
 * 定时轮询定位（H5 或 APP 降级方案）
 */
function startPollingLocation() {
  console.log('📍 使用定时轮询定位（每3秒）')
  
  // 清除旧定时器
  if (locationTimer) {
    clearInterval(locationTimer)
  }
  
  // 每 3 秒获取一次位置（不要太频繁）
  locationTimer = setInterval(async () => {
    if (!isTracking.value) {
      clearInterval(locationTimer)
      return
    }
    
    try {
      await getLocation()
    } catch (error) {
      console.error('定时定位失败:', error)
    }
  }, 3000)
  
  uni.showToast({ title: '定位已开启（轮询模式）', icon: 'success' })
}

/**
 * 停止持续定位
 */
function stopTracking() {
  if (!isTracking.value) {
    return
  }

  isTracking.value = false

  // #ifndef H5
  // 停止系统定位
  uni.stopLocationUpdate({
    success: () => {
      console.log('🛑 停止系统定位')
      uni.offLocationChange(handleLocationChange)
    }
  })
  // #endif

  // 清除定时器
  if (locationTimer) {
    clearInterval(locationTimer)
    locationTimer = null
  }

  uni.showToast({ 
    title: `已停止定位\n共记录 ${polyline.value?.points?.length || 0} 个点`,
    icon: 'success',
    duration: 2000
  })

  console.log('🛑 已停止定位, 共记录', polyline.value?.points?.length || 0, '个点')
}

/**
 * 清除轨迹
 */
function clearTrajectory() {
  if (polyline.value) {
    polyline.value.points = []
  }
  
  uni.showToast({ title: '已清除轨迹', icon: 'success' })
}

// 页面卸载时停止定位
onUnmounted(() => {
  if (isTracking.value) {
    stopTracking()
  }
})
</script>

<template>
  <view class="test-component">
    <view class="map-container" :class="{ 'full-screen': isFullScreen }">
      <Map v-model:full-screen="isFullScreen" :config="mapConfig" :layer-markers="layerMarkers" :layer-list="layerList"
        :default-dept="defaultDept" :polyline="polyline" />
    </view>
    <!-- 状态显示 -->
    <view v-if="polyline && polyline.points && polyline.points.length > 0" class="status-card">
      <text class="status-text">📍 已记录 {{ polyline.points.length }} 个位置点</text>
      <text v-if="isTracking" class="tracking-status">🟢 正在定位中...</text>
    </view>

    <view class="mt-4 flex flex-col gap-2">
      <!-- 定位控制 -->
      <wd-button 
        v-if="!isTracking" 
        block 
        type="success" 
        @click="startTracking"
      >
        🚀 开始定位
      </wd-button>
      <wd-button 
        v-else 
        block 
        type="warning" 
        @click="stopTracking"
      >
        🛑 停止定位
      </wd-button>

      <!-- 轨迹操作 -->
      <wd-button 
        block 
        plain
        @click="clearTrajectory"
        :disabled="!polyline || !polyline.points || polyline.points.length === 0"
      >
        🗑️ 清除轨迹
      </wd-button>

      <!-- 测试按钮 -->
      <wd-button block @click="handleChangeLayer">
        编辑风险源
      </wd-button>
      <wd-button block @click="handleDrawTrajectory">
        画轨迹（测试）
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

.status-card {
  margin-top: 12px;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .status-text {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }

  .tracking-status {
    font-size: 12px;
    color: #4caf50;
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.mt-4 {
  margin-top: 16px;

  :deep(.wd-button) {
    margin-bottom: 8px;
  }
}
</style>
