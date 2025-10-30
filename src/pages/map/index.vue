<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-28 17:24:30
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-28 19:01:27
 * @FilePath: /changwei-new-energy-admin/Users/chenshaocong/work/test/unibest/src/pages/map/index.vue
 * @Description: 天地图实例
-->
<script setup lang="ts">
import { ref } from 'vue'
import TiandituMap from './components/TiandituMap.vue'
import 'leaflet/dist/leaflet.css'

definePage({
  style: {
    navigationBarTitleText: '地图',
  },
})

// 存储标记点数据
const markerData = ref<{ lat: number, lng: number, address?: string } | null>(null)

// 单个回显点位
const singleMarker = ref<any>(null)

// 批量回显点位
const multipleMarkers = ref<any[]>([])

// 单条线配置
const singlePolyline = ref<any>(null)

// 多条线配置
const multiplePolylines = ref<any[]>([])

// 清除所有触发器
const clearAllTrigger = ref(0)

/**
 * 处理标记点添加事件
 */
function handleMarkerAdded(data: { lat: number, lng: number, address?: string }) {
  markerData.value = data
  console.log('父组件接收到标记点:', data)

  // 可以在这里调用 API 保存数据
  uni.showToast({
    title: '打点成功',
    icon: 'success',
  })
}

/**
 * 处理标记点删除事件
 */
function handleMarkerRemoved(markerId: string) {
  console.log('标记点已删除:', markerId)
}

/**
 * 处理标记点点击事件
 */
function handleMarkerClick(marker: any) {
  console.log('点击了标记点:', marker)
  uni.showToast({
    title: `点击了: ${marker.title || '标记点'}`,
    icon: 'none',
  })
}

/**
 * 测试：回显单个点位
 */
function testShowSingle() {
  singleMarker.value = {
    id: 1,
    lat: 39.908823,
    lng: 116.39747,
    title: '北京天安门',
  }
}

/**
 * 测试：批量回显点位
 */
function testShowMultiple() {
  multipleMarkers.value = [
    { id: 1, lat: 39.908823, lng: 116.39747, title: '北京天安门' },
    { id: 2, lat: 31.230416, lng: 121.473701, title: '上海东方明珠' },
    { id: 3, lat: 22.543099, lng: 114.057868, title: '深圳市民中心' },
  ]
}

/**
 * 清除所有（点位、线条）
 */
function clearDisplay() {
  console.log('开始清除所有数据')

  // 清空所有数据（会触发 watch 自动清除对应图层）
  singleMarker.value = null
  multipleMarkers.value = []
  singlePolyline.value = null
  multiplePolylines.value = []
  markerData.value = null

  // 延迟触发 clearAll，确保用户打点的标记也被清除
  setTimeout(() => {
    clearAllTrigger.value = Date.now()
    console.log('触发 clearAll:', clearAllTrigger.value)
  }, 50)

  uni.showToast({
    title: '已清除所有标记和线条',
    icon: 'success',
  })
}

/**
 * 测试：绘制单条线（连接多个点位）
 */
function testShowSingleLine() {
  // 清除其他显示
  singleMarker.value = null
  multipleMarkers.value = []
  multiplePolylines.value = []

  // 定义一条从北京到上海到深圳的路线
  singlePolyline.value = {
    points: [
      { lat: 30.265952764683064, lng: 120.24511114641949 },
      { lat: 30.2658705277956, lng: 120.24504168059688 },
      { lat: 30.265925953694772, lng: 120.24494347856664 },
      { lat: 30.26554833509027, lng: 120.24464829485923 },
      { lat: 30.2654148195323, lng: 120.24489562351484 },
      { lat: 30.265126160298966, lng: 120.24471210399051 },
      { lat: 30.265068799796314, lng: 120.24481191324878 },
      { lat: 30.264995308972242, lng: 120.2449045090603 },
      { lat: 30.264604588698205, lng: 120.2446206096805 },
    ],
    color: '#ff6b6b',
    weight: 4,
    opacity: 0.8,
  }
}

/**
 * 测试：绘制虚线
 */
function testShowDashedLine() {
  singleMarker.value = null
  multipleMarkers.value = []
  multiplePolylines.value = []

  singlePolyline.value = {
    points: [
      { lat: 39.908823, lng: 116.39747 },  // 北京
      { lat: 34.341568, lng: 108.939645 }, // 西安
      { lat: 30.572269, lng: 104.066541 }, // 成都
    ],
    color: '#11998e',
    weight: 3,
    opacity: 0.7,
    dashArray: '10, 10', // 虚线样式
  }
}

/**
 * 测试：绘制多条线
 */
function testShowMultipleLines() {
  singleMarker.value = null
  multipleMarkers.value = []
  singlePolyline.value = null

  multiplePolylines.value = [
    // 线路1：北京-上海-深圳
    {
      points: [
        { lat: 30.265952764683064, lng: 120.24511114641949 },
        { lat: 30.2658705277956, lng: 120.24504168059688 },
        { lat: 30.265925953694772, lng: 120.24494347856664 },
        { lat: 30.26554833509027, lng: 120.24464829485923 },
        { lat: 30.2654148195323, lng: 120.24489562351484 },
        { lat: 30.265126160298966, lng: 120.24471210399051 },
      ],
      color: '#667eea',
      weight: 3,
    },
  ]
}
</script>

<template>
  <view class="map-container">
    <view class="w-full h-[500px]">
      <TiandituMap :marker="singleMarker" :markers="multipleMarkers" :polyline="singlePolyline"
        :polylines="multiplePolylines" :clear-all="clearAllTrigger" :auto-focus="true" @marker-added="handleMarkerAdded"
        @marker-removed="handleMarkerRemoved" @marker-click="handleMarkerClick" />
    </view>

    <!-- 测试按钮 -->
    <view class="test-buttons">
      <view class="test-btn" @click="testShowSingle">
        <text>回显单个点位</text>
      </view>
      <view class="test-btn" @click="testShowMultiple">
        <text>批量回显(3个)</text>
      </view>
      <view class="test-btn line" @click="testShowSingleLine">
        <text>绘制单条线</text>
      </view>
      <view class="test-btn line" @click="testShowDashedLine">
        <text>绘制虚线</text>
      </view>
      <view class="test-btn line" @click="testShowMultipleLines">
        <text>绘制多条线</text>
      </view>
      <view class="test-btn clear" @click="clearDisplay">
        <text>清除所有</text>
      </view>
    </view>

    <!-- 显示标记点信息 -->
    <view v-if="markerData" class="marker-info">
      <view class="info-title">最新标记点信息</view>
      <view class="info-item">
        <text class="label">经度:</text>
        <text class="value">{{ markerData.lng.toFixed(6) }}</text>
      </view>
      <view class="info-item">
        <text class="label">纬度:</text>
        <text class="value">{{ markerData.lat.toFixed(6) }}</text>
      </view>
      <view class="info-item">
        <text class="label">地址:</text>
        <text class="value">{{ markerData.address || '未知' }}</text>
      </view>
    </view>

    <!-- 说明文档 -->
    <view class="instructions">
      <view class="ins-title">使用说明</view>
      <view class="ins-item">1. <text style="font-weight: bold;">打点:</text> 点击右下角"开始打点"按钮，然后点击地图任意位置</view>
      <view class="ins-item">2. <text style="font-weight: bold;">回显点位:</text> 使用上方蓝色按钮测试单个或批量回显点位功能</view>
      <view class="ins-item">3. <text style="font-weight: bold;">绘制线条:</text> 使用上方绿色按钮绘制实线、虚线，连接多个点位</view>
      <view class="ins-item">4. <text style="font-weight: bold;">查看信息:</text> 点击标记点或线条可查看详细信息和距离</view>
      <view class="ins-item">5. <text style="font-weight: bold;">清除:</text> 点击红色"清除所有"按钮清除所有标记和线条</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: #f5f5f5;
  box-sizing: border-box;
  position: relative;
}

.test-buttons {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 900;
  flex-wrap: wrap;
  max-width: 90%;
  justify-content: center;

  .test-btn {
    padding: 8px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
    }

    &.line {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      box-shadow: 0 2px 8px rgba(17, 153, 142, 0.3);
    }

    &.clear {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    }
  }
}

.marker-info {
  margin-top: 20px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .info-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;

    .label {
      color: #666;
      font-weight: 500;
    }

    .value {
      color: #333;
      font-weight: 600;
    }
  }
}

.instructions {
  margin-top: 20px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .ins-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
  }

  .ins-item {
    font-size: 13px;
    color: #555;
    line-height: 1.6;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    gap: 8px;

    &:last-child {
      border-bottom: none;
    }

    .number {
      color: #667eea;
      font-weight: 600;
      min-width: 50px;
    }
  }
}
</style>
