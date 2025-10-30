<!--
 * @Description: 天地图组件 - 基于 Leaflet
-->
<template>
  <view class="map-wrapper">
    <view id="map" ref="mapRef" :change:prop="leaflet.updateMap" :prop="mapConfig" />
    <!-- 缩放控制按钮 -->
    <view class="map-controls">
      <view class="control-btn" @click="zoomIn">
        <text>+</text>
      </view>
      <view class="control-btn" @click="zoomOut">
        <text>−</text>
      </view>
    </view>

    <!-- 打点按钮 -->
    <view class="map-marker-btn">
      <view class="marker-btn" :class="{ active: isMarking }" @click="toggleMarking">
        <text class="marker-icon">📍</text>
        <text class="marker-text">{{ isMarking ? '取消打点' : '开始打点' }}</text>
      </view>
    </view>

    <!-- 打点提示 -->
    <view v-if="isMarking" class="marking-tip">
      <text>点击地图进行标记</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import type { MarkerData, PolylineConfig, MapConfig } from './type'


const props = defineProps<{
  // 单个回显点位
  marker?: MarkerData | null
  // 批量回显点位
  markers?: MarkerData[]
  // 是否自动聚焦到点位
  autoFocus?: boolean
  // 线条配置
  polyline?: PolylineConfig | null
  // 多条线配置
  polylines?: PolylineConfig[]
  // 清除所有标记和线条的触发器
  clearAll?: number
}>()


/**
 * 定义组件事件
 */
const emit = defineEmits<{
  markerAdded: [data: { lat: number, lng: number, address?: string }]
  markerRemoved: [markerId: string]
  markerClick: [marker: MarkerData]
}>()

const mapRef = ref()
const mapConfig = ref<MapConfig>({
  latitude: 39.908823,
  longitude: 116.39747,
  zoom: 8,
  initialized: false,
})

// 打点模式状态
const isMarking = ref(false)

/**
 * 监听单个点位变化
 */
watch(() => props.marker, (newMarker) => {
  if (newMarker) {
    mapConfig.value = {
      ...mapConfig.value,
      type: 'showMarker',
      markerData: newMarker,
      autoFocus: props.autoFocus ?? true,
    }
  } else {
    // 当 marker 变为 null 时，清除单个回显标记
    mapConfig.value = {
      ...mapConfig.value,
      type: 'clearDisplayMarkers',
    }
  }
}, { deep: true })

/**
 * 监听批量点位变化
 */
watch(() => props.markers, (newMarkers) => {
  if (newMarkers && newMarkers.length > 0) {
    mapConfig.value = {
      ...mapConfig.value,
      type: 'showMarkers',
      markersData: newMarkers,
      autoFocus: props.autoFocus ?? true,
    }
  } else {
    // 当 markers 变为空数组时，清除所有回显标记
    mapConfig.value = {
      ...mapConfig.value,
      type: 'clearDisplayMarkers',
    }
  }
}, { deep: true })

/**
 * 监听单条线变化
 */
watch(() => props.polyline, (newPolyline, oldPolyline) => {
  if (newPolyline && newPolyline.points && newPolyline.points.length >= 2) {
    mapConfig.value = {
      ...mapConfig.value,
      type: 'showPolyline',
      polylineData: newPolyline,
    }
  } else if (oldPolyline && !newPolyline) {
    // 只有当从有值变为 null 时才清除（不是初始化时）
    mapConfig.value = {
      ...mapConfig.value,
      type: 'clearSinglePolyline',
    }
  }
}, { deep: true })

/**
 * 监听多条线变化
 */
watch(() => props.polylines, (newPolylines, oldPolylines) => {
  if (newPolylines && newPolylines.length > 0) {
    mapConfig.value = {
      ...mapConfig.value,
      type: 'showPolylines',
      polylinesData: newPolylines,
    }
  } else if (oldPolylines && oldPolylines.length > 0 && (!newPolylines || newPolylines.length === 0)) {
    // 只有当从有值变为空数组时才清除（不是初始化时）
    mapConfig.value = {
      ...mapConfig.value,
      type: 'clearMultiplePolylines',
    }
  }
}, { deep: true })

/**
 * 监听清除所有触发
 */
watch(() => props.clearAll, (newValue) => {
  if (newValue !== undefined) {
    mapConfig.value = {
      ...mapConfig.value,
      type: 'clearAll',
      timestamp: newValue,
    }
  }
})

/**
 * 点击回显的标记点
 */
function onMarkerClick(marker: MarkerData) {
  emit('markerClick', marker)
}

/**
 * 缩放控制
 */
function zoomIn() {
  mapConfig.value = {
    ...mapConfig.value,
    type: 'zoomIn',
  }
}

function zoomOut() {
  mapConfig.value = {
    ...mapConfig.value,
    type: 'zoomOut',
  }
}

/**
 * 切换打点模式
 */
function toggleMarking() {
  isMarking.value = !isMarking.value
  mapConfig.value = {
    ...mapConfig.value,
    type: isMarking.value ? 'enableMarking' : 'disableMarking',
  }
}

/**
 * 接收来自 renderjs 的标记数据
 */
function onMarkerConfirmed(data: { lat: number, lng: number, address?: string }) {
  isMarking.value = false
  // 抛出事件给父组件
  emit('markerAdded', data)
  console.log('标记点数据:', data)
}

onMounted(() => {
  // 初始化地图配置
  mapConfig.value = {
    ...mapConfig.value,
    type: 'init',
    initialized: true,
  }
})
</script>

<script module="leaflet" lang="renderjs">
/**
 * 天地图 renderjs 模块
 * 使用 Leaflet.js 加载天地图瓦片服务
 */
import L from 'leaflet'

export default {
  data() {
    return {
      map: null,
      currentZoom: 8,
      currentMarker: null, // 当前打点的标记
      markers: [], // 所有标记点（用户打点）
      displayMarkers: [], // 回显的标记点
      singlePolyline: null, // 单条线
      multiplePolylines: [], // 多条线
      isMarkingMode: false, // 是否处于打点模式
    }
  },
  mounted() {
    console.log('Leaflet renderjs 模块已加载')
  },
  methods: {
    /**
     * 更新地图配置
     */
    updateMap(newValue, oldValue, ownerInstance, instance) {
      console.log('updateMap 触发, type:', newValue.type)
      
      if (!this.map && newValue.type === 'init') {
        this.initMap()
      }
      else if (this.map) {
        if (newValue.type === 'zoomIn') {
          this.map.zoomIn()
        }
        else if (newValue.type === 'zoomOut') {
          this.map.zoomOut()
        }
        else if (newValue.type === 'enableMarking') {
          this.enableMarkingMode()
        }
        else if (newValue.type === 'disableMarking') {
          this.disableMarkingMode()
        }
        else if (newValue.type === 'showMarker') {
          this.showSingleMarker(newValue.markerData, newValue.autoFocus)
        }
        else if (newValue.type === 'showMarkers') {
          this.showMultipleMarkers(newValue.markersData, newValue.autoFocus)
        }
        else if (newValue.type === 'showPolyline') {
          this.showSinglePolyline(newValue.polylineData)
        }
        else if (newValue.type === 'showPolylines') {
          this.showMultiplePolylines(newValue.polylinesData)
        }
        else if (newValue.type === 'clearDisplayMarkers') {
          console.log('触发 clearDisplayMarkers')
          this.clearDisplayMarkers()
        }
        else if (newValue.type === 'clearSinglePolyline') {
          console.log('触发 clearSinglePolyline')
          this.clearSinglePolyline()
        }
        else if (newValue.type === 'clearMultiplePolylines') {
          console.log('触发 clearMultiplePolylines')
          this.clearMultiplePolylines()
        }
        else if (newValue.type === 'clearPolylines') {
          console.log('触发 clearPolylines（清除所有线条）')
          this.clearAllPolylines()
        }
        else if (newValue.type === 'clearAll') {
          console.log('触发 clearAll')
          this.clearAll()
        }
      }
    },

    /**
     * 启用打点模式
     */
    enableMarkingMode() {
      console.log('启用打点模式 - 点击地图进行标记')
      this.isMarkingMode = true
      
      // 添加地图点击事件监听
      this.map.on('click', this.onMapClick)
      
      // 修改鼠标样式
      this.map.getContainer().style.cursor = 'crosshair'
    },

    /**
     * 禁用打点模式
     */
    disableMarkingMode() {
      console.log('禁用打点模式')
      this.isMarkingMode = false
      
      // 移除地图点击事件监听
      this.map.off('click', this.onMapClick)
      
      // 恢复鼠标样式
      this.map.getContainer().style.cursor = ''
    },

    /**
     * 地图点击事件处理
     */
    onMapClick(e) {
      if (!this.isMarkingMode) return

      const lat = e.latlng.lat
      const lng = e.latlng.lng

      // 创建标记点
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: '<div style="font-size: 32px;">📍</div>',
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -40],
        }),
      }).addTo(this.map)

      // 添加弹窗
      marker.bindPopup(`
        <div style="text-align: center; padding: 10px;">
          <p style="margin: 0 0 8px; font-weight: bold;">标记点 #${this.markers.length + 1}</p>
          <p style="margin: 4px 0;"><strong>经度:</strong> ${lng.toFixed(6)}</p>
          <p style="margin: 4px 0;"><strong>纬度:</strong> ${lat.toFixed(6)}</p>
          <button onclick="this.parentElement.parentElement.parentElement.style.display='none'" 
                  style="margin-top: 8px; padding: 4px 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
            关闭
          </button>
        </div>
      `).openPopup()

      // 保存标记
      this.currentMarker = marker
      this.markers.push(marker)

      // 回调给 Vue 组件
      this.$ownerInstance.callMethod('onMarkerConfirmed', {
        lat,
        lng,
        address: `经度: ${lng.toFixed(6)}, 纬度: ${lat.toFixed(6)}`,
      })

      console.log('打点成功:', { lat, lng, 总标记数: this.markers.length })
    },

    /**
     * 回显单个标记点
     */
    showSingleMarker(markerData, autoFocus = true) {
      if (!markerData || !markerData.lat || !markerData.lng) return

      // 清除之前的回显标记
      this.clearDisplayMarkers()

      // 创建标记点
      const marker = L.marker([markerData.lat, markerData.lng], {
        icon: L.divIcon({
          className: 'display-marker',
          html: markerData.icon || '<div style="font-size: 32px; color: #11998e;">📍</div>',
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -40],
        }),
      }).addTo(this.map)

      // 添加弹窗
      const popupContent = markerData.popupContent || `
        <div style="text-align: center; padding: 10px;">
          <p style="margin: 0 0 8px; font-weight: bold;">${markerData.title || '标记点'}</p>
          <p style="margin: 4px 0;"><strong>经度:</strong> ${markerData.lng.toFixed(6)}</p>
          <p style="margin: 4px 0;"><strong>纬度:</strong> ${markerData.lat.toFixed(6)}</p>
        </div>
      `
      marker.bindPopup(popupContent)

      // 添加点击事件
      marker.on('click', () => {
        this.$ownerInstance.callMethod('onMarkerClick', markerData)
      })

      // 保存标记
      this.displayMarkers.push(marker)

      // 自动聚焦到标记点
      if (autoFocus) {
        this.map.setView([markerData.lat, markerData.lng], 15)
        marker.openPopup()
      }

      console.log('回显单个标记点:', markerData)
    },

    /**
     * 批量回显标记点
     */
    showMultipleMarkers(markersData, autoFocus = true) {
      if (!markersData || markersData.length === 0) return

      // 清除之前的回显标记
      this.clearDisplayMarkers()

      const bounds = []

      // 创建所有标记点
      markersData.forEach((markerData, index) => {
        if (!markerData.lat || !markerData.lng) return

        // 创建标记点
        const marker = L.marker([markerData.lat, markerData.lng], {
          icon: L.divIcon({
            className: 'display-marker',
            html: markerData.icon || '<div style="font-size: 32px; color: #11998e;">📍</div>',
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -40],
          }),
        }).addTo(this.map)

        // 添加弹窗
        const popupContent = markerData.popupContent || `
          <div style="text-align: center; padding: 10px;">
            <p style="margin: 0 0 8px; font-weight: bold;">${markerData.title || `标记点 #${index + 1}`}</p>
            <p style="margin: 4px 0;"><strong>经度:</strong> ${markerData.lng.toFixed(6)}</p>
            <p style="margin: 4px 0;"><strong>纬度:</strong> ${markerData.lat.toFixed(6)}</p>
          </div>
        `
        marker.bindPopup(popupContent)

        // 添加点击事件
        marker.on('click', () => {
          this.$ownerInstance.callMethod('onMarkerClick', markerData)
        })

        // 保存标记
        this.displayMarkers.push(marker)
        bounds.push([markerData.lat, markerData.lng])
      })

      // 自动聚焦到所有标记点
      if (autoFocus && bounds.length > 0) {
        if (bounds.length === 1) {
          this.map.setView(bounds[0], 15)
        } else {
          this.map.fitBounds(bounds, { padding: [50, 50] })
        }
      }

      console.log('批量回显标记点:', markersData.length, '个')
    },

    /**
     * 清除回显的标记点
     */
    clearDisplayMarkers() {
      console.log('clearDisplayMarkers: 清除', this.displayMarkers.length, '个回显标记')
      this.displayMarkers.forEach(marker => {
        this.map.removeLayer(marker)
      })
      this.displayMarkers = []
      console.log('clearDisplayMarkers: 完成')
    },

    /**
     * 显示单条线
     */
    showSinglePolyline(polylineConfig) {
      if (!polylineConfig || !polylineConfig.points || polylineConfig.points.length < 2) {
        console.warn('至少需要2个点才能绘制线条')
        return
      }

      // 只清除之前的单条线
      this.clearSinglePolyline()

      // 转换点位格式
      const latlngs = polylineConfig.points.map(p => [p.lat, p.lng])

      // 创建线条配置
      const options = {
        color: polylineConfig.color || '#667eea',
        weight: polylineConfig.weight || 3,
        opacity: polylineConfig.opacity || 0.8,
        dashArray: polylineConfig.dashArray || null,
        smoothFactor: polylineConfig.smooth ? 1.5 : 1,
      }

      // 创建线条
      const polyline = L.polyline(latlngs, options).addTo(this.map)

      // 添加点击事件
      polyline.on('click', () => {
        const distance = this.calculateDistance(latlngs)
        polyline.bindPopup(`
          <div style="padding: 10px;">
            <p style="margin: 4px 0;"><strong>单条线信息</strong></p>
            <p style="margin: 4px 0;">点位数量: ${latlngs.length}</p>
            <p style="margin: 4px 0;">总距离: ${distance.toFixed(2)} 米</p>
          </div>
        `).openPopup()
      })

      // 保存单条线
      this.singlePolyline = polyline

      console.log('绘制单条线成功:', polylineConfig.points.length, '个点')
    },

    /**
     * 显示多条线
     */
    showMultiplePolylines(polylinesData) {
      if (!polylinesData || polylinesData.length === 0) return

      // 只清除之前的多条线
      this.clearMultiplePolylines()

      polylinesData.forEach((polylineConfig, index) => {
        if (!polylineConfig.points || polylineConfig.points.length < 2) return

        // 转换点位格式
        const latlngs = polylineConfig.points.map(p => [p.lat, p.lng])

        // 创建线条配置
        const options = {
          color: polylineConfig.color || '#667eea',
          weight: polylineConfig.weight || 3,
          opacity: polylineConfig.opacity || 0.8,
          dashArray: polylineConfig.dashArray || null,
          smoothFactor: polylineConfig.smooth ? 1.5 : 1,
        }

        // 创建线条
        const polyline = L.polyline(latlngs, options).addTo(this.map)

        // 添加点击事件
        polyline.on('click', () => {
          const distance = this.calculateDistance(latlngs)
          polyline.bindPopup(`
            <div style="padding: 10px;">
              <p style="margin: 4px 0;"><strong>线条 #${index + 1}</strong></p>
              <p style="margin: 4px 0;">点位数量: ${latlngs.length}</p>
              <p style="margin: 4px 0;">总距离: ${distance.toFixed(2)} 米</p>
            </div>
          `).openPopup()
        })

        // 保存线条
        this.multiplePolylines.push(polyline)
      })

      console.log('批量绘制线条成功:', polylinesData.length, '条')
    },

    /**
     * 清除单条线
     */
    clearSinglePolyline() {
      if (this.singlePolyline) {
        console.log('clearSinglePolyline: 清除单条线')
        this.map.removeLayer(this.singlePolyline)
        this.singlePolyline = null
        console.log('clearSinglePolyline: 完成')
      }
    },

    /**
     * 清除多条线
     */
    clearMultiplePolylines() {
      if (this.multiplePolylines && this.multiplePolylines.length > 0) {
        console.log('clearMultiplePolylines: 清除', this.multiplePolylines.length, '条线')
        this.multiplePolylines.forEach(polyline => {
          this.map.removeLayer(polyline)
        })
        this.multiplePolylines = []
        console.log('clearMultiplePolylines: 完成')
      }
    },

    /**
     * 清除所有线条（单条+多条）
     */
    clearAllPolylines() {
      console.log('clearAllPolylines: 清除所有线条')
      this.clearSinglePolyline()
      this.clearMultiplePolylines()
      console.log('clearAllPolylines: 完成')
    },

    /**
     * 计算线条总距离（米）
     */
    calculateDistance(latlngs) {
      let totalDistance = 0
      for (let i = 0; i < latlngs.length - 1; i++) {
        const from = L.latLng(latlngs[i])
        const to = L.latLng(latlngs[i + 1])
        totalDistance += from.distanceTo(to)
      }
      return totalDistance
    },

    /**
     * 清除所有标记和线条
     */
    clearAll() {
      console.log('renderjs: 开始清除所有标记和线条')
      
      // 清除用户打点的标记
      if (this.markers && this.markers.length > 0) {
        console.log('清除用户打点标记:', this.markers.length, '个')
        this.markers.forEach(marker => {
          this.map.removeLayer(marker)
        })
        this.markers = []
      }
      
      if (this.currentMarker) {
        console.log('清除当前标记')
        this.map.removeLayer(this.currentMarker)
        this.currentMarker = null
      }
      
      // 清除回显的标记点
      if (this.displayMarkers && this.displayMarkers.length > 0) {
        console.log('清除回显标记:', this.displayMarkers.length, '个')
        this.clearDisplayMarkers()
      }
      
      // 清除所有线条（单条+多条）
      this.clearAllPolylines()
      
      console.log('renderjs: 清除完成')
    },

    /**
     * 初始化地图
     */
    initMap() {
      // 检查环境是否为 H5
      // if (typeof window === 'undefined') {
      //   console.warn('地图组件仅在 H5 环境运行')
      //   return
      // }

      try {
        // 如果地图已经存在，先移除
        if (this.map) {
          this.map.remove()
        }
        console.log('initMap')

        // 创建地图实例 - 添加移动端优化选项
        this.map = L.map('map', {
          zoomSnap: 0.1, // 设置缩放捕捉为0.1
          attributionControl: false, // 移除右下角leaflet标识
          zoomControl: false, // 不添加默认的缩放控件
          doubleClickZoom: false,
          maxZoom: 21,
          maxNativeZoom: 18,
          minZoom: 5,
          wheelPxPerZoomLevel: 120, // 控制滚轮缩放敏感度
          zoomAnimation: true, // 启用缩放动画
          zoomAnimationThreshold: 4, // 缩放动画阈值
          fadeAnimation: true, // 启用淡入淡出动画
          markerZoomAnimation: true, // 启用标记缩放动画
          inertia: true, // 启用惯性
          inertiaDeceleration: 3000, // 惯性减速
          worldCopyJump: false, // 禁用世界复制跳转
          preferCanvas: true, // 优先使用Canvas渲染
        }).setView([30.265952764683064, 120.24511114641949], 8)

        // 添加天地图影像图层 - 添加缓存和性能优化
        L.tileLayer(
          'https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=036825be613a859007fa3004c9e87ddf',
          {
            transparent: true,
            zIndex: 999,
            subdomains: ['0', '1', '2', '3', '4', '5', '6'],
            maxZoom: 21,
            maxNativeZoom: 18,
            minZoom: 4.5,
            tileSize: 256, // 明确指定瓦片大小
            keepBuffer: 4, // 增加缓冲区，预加载更多瓦片
            updateWhenIdle: false, // 立即更新瓦片
            updateWhenZooming: true, // 缩放时更新瓦片
            crossOrigin: 'anonymous', // 添加跨域支持
            errorTileUrl: '', // 错误瓦片URL为空，避免显示错误图片
            detectRetina: false, // 禁用Retina检测，提高性能
          },
        ).addTo(this.map)

        // 添加天地图标注图层 - 同样的优化
        L.tileLayer(
          'https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=036825be613a859007fa3004c9e87ddf',
          {
            transparent: true,
            zIndex: 999,
            subdomains: ['0', '1', '2', '3', '4', '5', '6'],
            maxZoom: 21,
            maxNativeZoom: 18,
            minZoom: 4.5,
            keepBuffer: 4, // 增加缓冲区，预加载更多瓦片
            updateWhenIdle: false, // 立即更新瓦片
            updateWhenZooming: true, // 缩放时更新瓦片
            crossOrigin: 'anonymous', // 添加跨域支持
            errorTileUrl: '', // 错误瓦片URL为空，避免显示错误图片
            detectRetina: false, // 禁用Retina检测，提高性能
          },
        ).addTo(this.map)

        console.log('地图初始化成功')
      }
      catch (error) {
        console.error('地图初始化失败:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 99;
}

#map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .control-btn {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 20px;
    font-weight: bold;
    color: #333;
    cursor: pointer;

    &:active {
      background: #f0f0f0;
    }
  }
}

/* 打点按钮 */
.map-marker-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 999;

  .marker-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
    }

    &.active {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    }

    .marker-icon {
      font-size: 20px;
    }

    .marker-text {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

/* 打点提示 */
.marking-tip {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(102, 126, 234, 0.95);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

/* 自定义标记点样式 */
:global(.custom-marker) {
  background: transparent;
  border: none;
}

/* 回显标记点样式 */
:global(.display-marker) {
  background: transparent;
  border: none;
}
</style>
