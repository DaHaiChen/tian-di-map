# 天地图组件使用说明

基于 Leaflet.js 的天地图组件，使用直接方法调用而非 watch 来渲染数据。

## 功能清单

- ✅ 设置中心点位
- ✅ 设置缩放级别
- ✅ 两种模式：打点模式、查看模式
- ✅ 单个点位回显，自动居中
- ✅ 批量点位回显，自动聚焦到第一个点位
- ✅ 轨迹线回显，支持多个点，自定义颜色
- ⏳ 根据数据渲染行政区域（待实现）

## 基础使用

```vue
<template>
  <view class="map-container">
    <TiandituMap ref="mapRef" @marker-added="onMarkerAdded" @marker-click="onMarkerClick" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TiandituMap from '@/components/tian-di-map/index.vue'

const mapRef = ref()

/**
 * 标记点添加事件
 */
function onMarkerAdded(data: { lat: number, lng: number, address?: string }) {
  console.log('标记点添加:', data)
}

/**
 * 标记点点击事件
 */
function onMarkerClick(marker: any) {
  console.log('点击了标记点:', marker)
}

// 使用示例
setTimeout(() => {
  // 设置中心点
  mapRef.value?.setCenter(39.908823, 116.39747, 15)
  
  // 显示单个标记点
  mapRef.value?.showMarker({
    lat: 39.908823,
    lng: 116.39747,
    title: '北京天安门',
  })
  
  // 显示多个标记点
  mapRef.value?.showMarkers([
    { lat: 39.908823, lng: 116.39747, title: '天安门' },
    { lat: 39.9042, lng: 116.4074, title: '故宫' },
  ])
  
  // 显示轨迹线
  mapRef.value?.showPolyline(
    [
      { lat: 39.908823, lng: 116.39747 },
      { lat: 39.9042, lng: 116.4074 },
    ],
    {
      color: '#667eea',
      weight: 3,
      opacity: 0.8,
    }
  )
}, 1000)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
```

## API 方法

### setCenter(lat, lng, zoom?)
设置地图中心点位和缩放级别。

**参数:**
- `lat`: 纬度
- `lng`: 经度
- `zoom`: 缩放级别（可选，默认15）

### setZoom(zoom)
设置地图缩放级别。

**参数:**
- `zoom`: 缩放级别

### showMarker(markerData)
显示单个标记点，并自动居中。

**参数:**
```ts
{
  lat: number      // 纬度
  lng: number      // 经度
  title?: string   // 标题
  icon?: string    // 自定义图标 HTML
}
```

### showMarkers(markersData)
显示多个标记点，自动聚焦到第一个点位。

**参数:**
```ts
Array<{
  lat: number
  lng: number
  title?: string
  icon?: string
}>
```

### showPolyline(points, options?)
显示轨迹线。

**参数:**
- `points`: 点位数组 `Array<{ lat, lng }>`
- `options`: 线条配置（可选）
  ```ts
  {
    color?: string      // 颜色，默认 '#667eea'
    weight?: number     // 粗细，默认 3
    opacity?: number    // 透明度，默认 0.8
    dashArray?: string  // 虚线样式，如 '5, 10'
    smooth?: boolean    // 是否平滑曲线
  }
  ```

### showPolylines(polylines)
显示多条轨迹线。

**参数:**
```ts
Array<{
  points: Array<{ lat, lng }>
  color?: string
  weight?: number
  opacity?: number
  dashArray?: string
  smooth?: boolean
}>
```

### clearMarkers()
清除所有回显的标记点。

### clearPolylines()
清除所有轨迹线。

### clearAll()
清除所有标记点和轨迹线。

### renderRegion(regionData)
渲染行政区域（待实现）。

## 事件

### markerAdded
标记点添加事件。

**回调参数:**
```ts
{
  lat: number       // 纬度
  lng: number       // 经度
  address?: string  // 地址信息
}
```

### markerClick
点击标记点事件。

**回调参数:**
```ts
marker: any  // 标记点数据
```

## 打点模式

点击地图右下角的"开始打点"按钮可以进入打点模式。在打点模式下，点击地图任意位置即可添加标记点。添加完成后会触发 `markerAdded` 事件。
