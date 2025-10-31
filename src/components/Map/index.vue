<template>
  <view class="map-wrapper">
    <view id="map" ref="mapRef" :change:prop="leaflet.updateMap" :prop="mapConfig" />
    <!-- 缩放控制按钮 -->
    <view class="map-controls" v-if="isFullScreen">
      <view class="control-btn" @click="zoomIn">
        <text>+</text>
      </view>
      <view class="control-btn" @click="zoomOut">
        <text>−</text>
      </view>
    </view>

    <!-- 打点按钮 -->
    <view class="map-marker-btn" v-if="config.defaultLayer === selectedLayerId">
      <view class="marker-btn" :class="{ active: isMarking }" @click="toggleMarking">
        <wd-icon name="location" size="16px"></wd-icon>
        <text class="marker-text">{{ isMarking ? '取消打点' : '开始打点' }}</text>
      </view>
    </view>

    <Operation :layer-list="layerList" :defaultLayer="config.defaultLayer" v-model:full-screen="isFullScreen"
      v-model="selectedLayerId" />
    <SelectDept @deptSelected="onDeptSelected" :defaultDept="defaultDept" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import 'leaflet/dist/leaflet.css'
import type { MarkerData, PolylineConfig, PolygonConfig, MapConfig } from './type'
import type { LayerMarkersMap } from './type'
import Operation from './component/operation.vue'
import SelectDept from './component/selectDept.vue'
import { formatData, parsePointToLatLng } from './hooks/utils'
/** 全屏状态 */
const isFullScreen = defineModel('fullScreen', { default: false })

const props = withDefaults(defineProps<{
  config?: MapConfig
  // 外部按图层传入的点位
  layerMarkers?: LayerMarkersMap
  // 是否自动聚焦到点位
  autoFocus?: boolean
  // 线条配置
  polyline?: PolylineConfig | null
  // 多条线配置
  polylines?: PolylineConfig[]
  // 清除所有标记和线条的触发器
  clearAll?: number
  layerList: string[]
  defaultDept?: string[]
}>(), {
  config: () => ({
    latitude: 39.908823,
    longitude: 116.39747,
    zoom: 18,
    initialized: false,
  }),
  layerList: () => ['risk', 'hazard', 'patrol'],
})

// 当外部 layerMarkers 更新时，刷新当前图层回显
watch(() => props.layerMarkers, (newMap) => {
  if (!newMap || !mapConfig.value?.initialized) return
  const list = newMap[selectedLayerId.value] || []
  mapConfig.value = list.length
    ? { ...mapConfig.value, type: 'showMarkers', markersData: list, autoFocus: false }
    : { ...mapConfig.value, type: 'clearDisplayMarkers' }
}, { deep: true })

/**
 * 定义组件事件
 */
const emit = defineEmits<{
  markerAdded: [data: { lat: number, lng: number, address?: string }]
  markerRemoved: [markerId: string]
  markerClick: [marker: MarkerData]
}>()

const mapRef = ref()
const mapConfig = ref(props.config)


// 打点模式状态
const isMarking = ref(false)

/** 当前选中的图层ID */
const selectedLayerId = ref<string>('hazard')

/**
 * 监听单条线变化
 */
watch(() => props.polyline, (newPolyline, oldPolyline) => {
  // 确保地图已初始化
  if (!mapConfig.value?.initialized) return
  
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
}, { deep: true, immediate: true })

/**
 * 监听多条线变化
 */
watch(() => props.polylines, (newPolylines, oldPolylines) => {
  // 确保地图已初始化
  if (!mapConfig.value?.initialized) return
  
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
}, { deep: true, immediate: true })

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
 * 监听全屏状态变化，重新初始化地图
 */
watch(() => isFullScreen.value, async (newValue) => {
  if (mapConfig.value.initialized) {
    // 等待 DOM 更新完成
    await nextTick()
    // 延迟一点时间确保全屏动画完成
    setTimeout(() => {
      mapConfig.value = {
        ...mapConfig.value,
        type: 'reinitMap',
        fullScreen: newValue,
        timestamp: Date.now(),
      }
    }, 300)
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
    currentLayerId: selectedLayerId.value, // 传递当前图层ID
  }
  console.log(isMarking.value, 'isMarking.value');
  console.log('type:', isMarking.value ? 'enableMarking' : 'disableMarking');


}

/**
 * 监听图层ID变化，更新到地图配置中
 */
watch(() => selectedLayerId.value, (newLayerId) => {
  if (mapConfig.value.initialized) {
    mapConfig.value = {
      ...mapConfig.value,
      currentLayerId: newLayerId,
    }
    const list = props.layerMarkers[newLayerId] || []
    mapConfig.value = list.length
      ? { ...mapConfig.value, type: 'showMarkers', markersData: list, autoFocus: true }
      : { ...mapConfig.value, type: 'clearDisplayMarkers' }
  }
  console.log('[Map] selectedLayerId changed:', newLayerId)
})

/**
 * 接收来自 renderjs 的标记数据
 */
function onMarkerConfirmed(data: { lat: number, lng: number, address?: string }) {
  isMarking.value = false
  // 抛出事件给父组件
  emit('markerAdded', data)
  console.log('标记点数据:', data)
}


/** 选择部门 */
function onDeptSelected(data: { value: string[], selectedItems: any[], nodeData: any }) {
  const depPoint = data.nodeData.depPoint
  const latLng = parsePointToLatLng(depPoint)
  const arr = formatData(data.nodeData.areaChildren)
  console.log('部门选择数据depPoint:', data.nodeData)

  // 将 arr 中的每一项的 geo 数据转换为多边形配置
  const polygons: PolygonConfig[] = arr.map((item: any) => {
    return {
      points: item.geo,
      color: '#000000',           // 黑色边框
      weight: 2,                  // 2px 边框宽度
      opacity: 0.8,               // 边框透明度
      fillColor: '#ffff00',       // 黄色填充
      fillOpacity: 0.5,           // 填充透明度
      title: item.locatedName || '地块',
    } as PolygonConfig
  }).filter((polygon: any) => polygon !== null) as PolygonConfig[]

  // 切换部门时，先禁用打点模式，避免多边形点击被误触发打点
  if (isMarking.value) {
    isMarking.value = false
    mapConfig.value = {
      ...mapConfig.value,
      type: 'disableMarking',
    }
  }

  // 如果有多边形数据，则绘制多边形
  if (polygons.length > 0) {
    mapConfig.value = {
      ...mapConfig.value,
      type: 'showPolygons',
      polygonsData: polygons,
    }
  }

  // 更新地图配置，设置中心点和绘制多边形
  if (latLng.length) {
    nextTick(() => {
      mapConfig.value = {
        ...mapConfig.value,
        type: 'setCenter',
        // parsePointToLatLng 返回的是 [lng, lat]，这里需要交换为 [lat, lng]
        latitude: latLng[0],
        longitude: latLng[1],
        zoom: 18
      }
    })
  }
}


/** 调用方法 */
function callMethod(type, params) {
  switch (type) {
    case 'onMarkerConfirmed':
      onMarkerConfirmed(params)
      break
    case 'onMarkerClick':
      onMarkerClick(params)
      break
  }
}

onMounted(() => {
  // 初始化地图配置
  mapConfig.value = {
    ...mapConfig.value,
    type: 'init',
    initialized: true,
  }
  mapRef.value.callMethod = callMethod
})
</script>

<script module="leaflet" lang="renderjs">
/**
 * 天地图 renderjs 模块
 * 使用 Leaflet.js 加载天地图瓦片服务
 */
import L from 'leaflet'
import coordtransform from 'coordtransform'

// 图标路径映射（使用 static 目录）
const ICON_PATHS = {
  point_risk_critical: '/static/map-icons/point_risk_critical.png',
  point_risk_high: '/static/map-icons/point_risk_high.png',
  point_risk_ignore: '/static/map-icons/point_risk_ignore.png',
  point_risk_low: '/static/map-icons/point_risk_low.png',
  point_risk_medium: '/static/map-icons/point_risk_medium.png',
  point_device_01: '/static/map-icons/point_device_01.png',
  point_device_02: '/static/map-icons/point_device_02.png',
  point_device_03: '/static/map-icons/point_device_03.png',
  point_hazard_01: '/static/map-icons/point_hazard_01.png',
  point_hazard_02: '/static/map-icons/point_hazard_02.png',
}

export default {
  data() {
    return {
      map: null,
      currentZoom: 8,
      currentCenter: null, // 当前地图中心点 [lat, lng]
      currentMarker: null, // 当前打点的标记
      markers: [], // 所有标记点（历史数组，兼容旧逻辑）
      /**
       * 每个图层的唯一标记点映射：key 为 layerId，value 为 Leaflet Marker
       */
      markersByLayer: {},
      displayMarkers: [], // 回显的标记点
      singlePolyline: null, // 单条线
      multiplePolylines: [], // 多条线
      multiplePolygons: [], // 多个多边形
      polygonLabels: [], // 多边形标签（用于显示地块名称）
      isMarkingMode: false, // 是否处于打点模式
      currentLayerId: 'hazard', // 当前选中的图层ID
      ownerInstance: null, // Vue 组件实例引用（用于回调）
      // 保存原始配置数据用于恢复
      /** 历史数组（兼容旧逻辑） */
      savedMarkersData: [],
      /**
       * 保存的按图层存储的标记原始数据：
       * { [layerId: string]: { lat, lng, layerId, iconUrl } }
       */
      savedMarkersByLayerData: {},
      savedDisplayMarkersData: [], // 保存的回显标记点原始数据
      savedSinglePolylineData: null, // 保存的单条线原始数据
      savedMultiplePolylinesData: [], // 保存的多条线原始数据
      savedMultiplePolygonsData: [], // 保存的多边形原始数据
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
      // 保存 ownerInstance 以便在事件回调中使用
      this.ownerInstance = instance.$vm

      if (!this.map && newValue.type === 'init') {
        this.initMap(false, newValue)
      }
      else if (this.map) {
        if (newValue.type === 'zoomIn') {
          this.map.zoomIn()
        }
        else if (newValue.type === 'zoomOut') {
          this.map.zoomOut()
        }
        else if (newValue.type === 'setCenter') {
          // 设置地图中心点
          if (newValue.latitude !== undefined && newValue.longitude !== undefined) {
            const zoom = newValue.zoom !== undefined ? newValue.zoom : this.map.getZoom()
            this.map.setView([newValue.latitude, newValue.longitude], zoom)
            // 更新保存的中心点
            this.currentCenter = [newValue.latitude, newValue.longitude]
            this.currentZoom = zoom
          }
        }
        else if (newValue.type === 'enableMarking') {
          // 更新当前图层ID（如果传递了）
          if (newValue.currentLayerId) {
            this.currentLayerId = newValue.currentLayerId
          }
          this.enableMarkingMode()
          console.log('[Map] updateMap -> enableMarking, currentLayerId:', this.currentLayerId)
        }
        else if (newValue.type === 'disableMarking') {
          this.disableMarkingMode()
          console.log('[Map] updateMap -> disableMarking')
        }
        // 更新当前图层ID：仅当没有显式的 type 指令时，避免拦截后续 typed 操作
        else if (newValue.type === undefined && newValue.currentLayerId) {
          this.currentLayerId = newValue.currentLayerId
          console.log('[Map] updateMap -> currentLayerId changed:', this.currentLayerId)
        }
        else if (newValue.type === 'showMarker') {
          this.savedDisplayMarkersData = [newValue.markerData]
          this.showSingleMarker(newValue.markerData, newValue.autoFocus)
        }
        else if (newValue.type === 'showMarkers') {
          this.savedDisplayMarkersData = [...newValue.markersData]
          this.showMultipleMarkers(newValue.markersData, newValue.autoFocus)
        }
        else if (newValue.type === 'showPolyline') {
          this.savedSinglePolylineData = newValue.polylineData
          this.showSinglePolyline(newValue.polylineData)
        }
        else if (newValue.type === 'showPolylines') {
          this.savedMultiplePolylinesData = [...newValue.polylinesData]
          this.showMultiplePolylines(newValue.polylinesData)
        }
        else if (newValue.type === 'showPolygons') {
          this.savedMultiplePolygonsData = [...newValue.polygonsData]
          this.showMultiplePolygons(newValue.polygonsData)
        }
        else if (newValue.type === 'switchLayer') {
          const targetLayerId = newValue.switchLayerId || this.currentLayerId
          // 移除地图上所有已添加的用户打点（历史数组）
          if (this.markers && this.markers.length > 0) {
            this.markers.forEach(m => { try { this.map.removeLayer(m) } catch (e) {} })
            this.markers = []
          }
          // 确保除目标图层外的 marker 都被移除
          const allLayerIds = Object.keys(this.markersByLayer || {})
          allLayerIds.forEach((layerId) => {
            const mk = this.markersByLayer[layerId]
            if (!mk) return
            try { this.map.removeLayer(mk) } catch (e) {}
          })
          // 为目标图层恢复/创建 marker，并添加到地图与历史数组
          let targetMarker = this.markersByLayer[targetLayerId]
          if (!targetMarker) {
            const md = this.savedMarkersByLayerData[targetLayerId]
            if (md) {
              const iconUrl = md.iconUrl || this.getIconByLayerId(targetLayerId)
              const icon = L.icon({ iconUrl, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
              targetMarker = L.marker([md.lat, md.lng], { icon }).addTo(this.map)
              // 点击回传
              targetMarker.on('click', () => {
                if (this.ownerInstance && this.ownerInstance.callMethod) {
                  this.ownerInstance.callMethod('onMarkerConfirmed', md)
                }
              })
              this.markersByLayer[targetLayerId] = targetMarker
            }
          }
          if (targetMarker) {
            try { targetMarker.addTo(this.map) } catch (e) {}
            this.markers.push(targetMarker)
          }
          console.log('[Map] switchLayer -> show only layer:', targetLayerId)
        }
        else if (newValue.type === 'clearDisplayMarkers') {
          console.log('触发 clearDisplayMarkers')
          this.savedDisplayMarkersData = []
          this.clearDisplayMarkers()
        }
        else if (newValue.type === 'clearSinglePolyline') {
          console.log('触发 clearSinglePolyline')
          this.savedSinglePolylineData = null
          this.clearSinglePolyline()
        }
        else if (newValue.type === 'clearMultiplePolylines') {
          console.log('触发 clearMultiplePolylines')
          this.savedMultiplePolylinesData = []
          this.clearMultiplePolylines()
        }
        else if (newValue.type === 'clearPolylines') {
          console.log('触发 clearPolylines（清除所有线条）')
          this.clearAllPolylines()
        }
        else if (newValue.type === 'clearAll') {
          console.log('触发 clearAll')
          // 清除所有保存的数据
          this.savedMarkersData = []
          this.savedDisplayMarkersData = []
          this.savedSinglePolylineData = null
          this.savedMultiplePolylinesData = []
          this.savedMultiplePolygonsData = []
          this.clearAll()
        }
        else if (newValue.type === 'reinitMap') {
          console.log('触发 reinitMap - 重新初始化地图')
          this.reinitMap(newValue)
        }
      }
    },

    /**
     * 启用打点模式
     */
    enableMarkingMode() {
      console.log('启用打点模式 - 点击多边形进行标记')
      this.isMarkingMode = true
      
      // 添加地图点击事件监听 - 已注释，改为在多边形点击事件中打点
      // this.map.on('click', this.onMapClick)
      
      // 修改鼠标样式
      this.map.getContainer().style.cursor = 'crosshair'
    },

    /**
     * 禁用打点模式
     */
    disableMarkingMode() {
      console.log('禁用打点模式')
      this.isMarkingMode = false
      console.log('[Map] disableMarkingMode -> isMarkingMode:', this.isMarkingMode)
      // 移除地图点击事件监听 - 已注释，改为在多边形点击事件中打点
      // this.map.off('click', this.onMapClick)
      
      // 恢复鼠标样式
      this.map.getContainer().style.cursor = ''
    },
    /**
     * 根据图层ID获取对应的图标
     * @param {string} layerId - 图层ID
     * @returns {string} 图标URL
     */
    getIconByLayerId(layerId) {
      // 图层ID到图标的映射关系
      const iconMap = {
        // 风险图层 - 默认使用高风险图标
        'risk': ICON_PATHS.point_risk_ignore,
        // 隐患图层 - 默认使用第一个隐患图标
        'hazard': ICON_PATHS.point_hazard_01,
        // 资产图层 - 使用第一个设备图标
        'ziChan': ICON_PATHS.point_risk_ignore,
        // 监控图层 - 使用第二个设备图标
        'monitor': ICON_PATHS.point_device_01,
        // 巡查图层 - 使用第三个设备图标
        'patrol': ICON_PATHS.point_risk_ignore,
      }
      
      // 返回对应的图标，如果没有则返回默认图标
      return iconMap[layerId] || ICON_PATHS.point_hazard_01
    },

    /**
     * 创建标记点（用于在多边形点击事件中调用）
     * @param {number} lat - 纬度
     * @param {number} lng - 经度
     */
    createMarker(lat, lng) {
      // 根据当前图层ID获取对应的图标
      const layerId = this.currentLayerId || 'default'
      const iconUrl = this.getIconByLayerId(layerId)
      
      // 创建图标
      const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32], // 根据实际图标大小调整
        iconAnchor: [16, 32], // 图标锚点（底部中心）
        popupAnchor: [0, -32], // 弹窗锚点
      })
      
      // 如果该图层已存在标记，先移除
      if (this.markersByLayer[layerId]) {
        try {
          this.map.removeLayer(this.markersByLayer[layerId])
        } catch (e) {}
        // 同步移除历史数组中的引用（兼容旧逻辑）
        this.markers = this.markers.filter(m => m !== this.markersByLayer[layerId])
      }

      // 创建标记点
      const marker = L.marker([lat, lng], {
        icon: icon,
      }).addTo(this.map)

      // 保存标记原始数据（用于重新实例化后恢复）
      const markerData = {
        lat,
        lng,
        layerId: layerId, // 保存图层ID
        iconUrl: iconUrl, // 保存图标URL
        address: `经度: ${lng.toFixed(6)}, 纬度: ${lat.toFixed(6)}`,
      }
      // 兼容旧逻辑的数组（不再用于恢复，仅保留历史）
      this.savedMarkersData.push(markerData)
      // 新的图层映射保存
      this.savedMarkersByLayerData[layerId] = markerData
      
      // 保存标记
      this.currentMarker = marker
      this.markersByLayer[layerId] = marker
      this.markers.push(marker)
      marker.on('click', () => {
        if (this.ownerInstance && this.ownerInstance.callMethod) {
          this.ownerInstance.callMethod('onMarkerConfirmed', markerData)
        }
      })
      console.log('[Map] 打点成功:', { lat, lng, layerId, 总标记数: this.markers.length })
      console.log('[Map] markersByLayer keys:', Object.keys(this.markersByLayer || {}))
      console.log('[Map] savedMarkersByLayerData:', this.savedMarkersByLayerData)
    },

    /**
     * 回显单个标记点
     */
    showSingleMarker(markerData, autoFocus = true) {
      if (!markerData || !markerData.lat || !markerData.lng) return

      // 清除之前的回显标记
      this.clearDisplayMarkers()

      const icon = L.icon({
        iconUrl: this.getIconByLayerId(markerData.type),
        iconSize: [32, 32], // 根据实际图标大小调整
        iconAnchor: [16, 32], // 图标锚点（底部中心）
        popupAnchor: [0, -32], // 弹窗锚点
      })

        // 创建标记点
        const marker = L.marker([markerData.lat, markerData.lng], {
        icon: icon,
      }).addTo(this.map)


      // 添加点击事件
      marker.on('click', () => {
          this.ownerInstance.callMethod('onMarkerClick', markerData)
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
        const icon = L.icon({
        iconUrl: this.getIconByLayerId(markerData.type),
        iconSize: [32, 32], // 根据实际图标大小调整
        iconAnchor: [16, 32], // 图标锚点（底部中心）
        popupAnchor: [0, -32], // 弹窗锚点
      })

        // 创建标记点
        const marker = L.marker([markerData.lat, markerData.lng], {
        icon: icon,
      }).addTo(this.map)

        // 添加点击事件
        marker.on('click', () => {
          this.ownerInstance.callMethod('onMarkerClick', markerData)
        })

        // 保存标记
        this.displayMarkers.push(marker)
        bounds.push([markerData.lat, markerData.lng])
      })
      console.log(markersData,'markersData', autoFocus, 'autoFocus');
      // 只聚焦第一个点
      this.map.setView([markersData[0].lat, markersData[0].lng], 15)
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

      // 转换点位格式，并将 GCJ-02 坐标转换为 WGS-84
      const latlngs = polylineConfig.points.map(p => {
        // coordtransform.gcj02towgs84(lng, lat) 返回 [lng, lat]
        const [wgs84_lng, wgs84_lat] = coordtransform.gcj02towgs84(p.lng, p.lat)
        console.log(`坐标转换: GCJ-02(${p.lng}, ${p.lat}) -> WGS-84(${wgs84_lng.toFixed(6)}, ${wgs84_lat.toFixed(6)})`)
        return [wgs84_lat, wgs84_lng]
      })

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

        // 转换点位格式，并将 GCJ-02 坐标转换为 WGS-84
        const latlngs = polylineConfig.points.map(p => {
          // coordtransform.gcj02towgs84(lng, lat) 返回 [lng, lat]
          const [wgs84_lng, wgs84_lat] = coordtransform.gcj02towgs84(p.lng, p.lat)
          return [wgs84_lat, wgs84_lng]
        })

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
     * 显示多个多边形
     * @param {Array} polygonsData - 多边形配置数组
     */
    showMultiplePolygons(polygonsData) {
      if (!polygonsData || polygonsData.length === 0) return

      // 清除之前的多边形
      this.clearMultiplePolygons()

      const bounds = []

      polygonsData.forEach((polygonConfig, index) => {
        if (!polygonConfig.points || polygonConfig.points.length < 3) {
          console.warn(`多边形 #${index + 1} 的点数不足（至少需要3个点）`)
          return
        }

        // 转换点位格式为 Leaflet 需要的格式 [lat, lng]
        const latlngs = polygonConfig.points.map(point => {
          // 确保格式正确 [lat, lng]
          if (Array.isArray(point) && point.length >= 2) {
            return [point[0], point[1]]
          }
          return null
        }).filter(point => point !== null)

        if (latlngs.length < 3) {
          console.warn(`多边形 #${index + 1} 有效点数不足`)
          return
        }

        // 创建多边形样式配置
        const options = {
          color: polygonConfig.color || '#000000',           // 边框颜色
          weight: polygonConfig.weight || 2,                 // 边框宽度
          opacity: polygonConfig.opacity !== undefined ? polygonConfig.opacity : 0.8,  // 边框透明度
          fillColor: polygonConfig.fillColor || '#ffff00',   // 填充颜色
          fillOpacity: polygonConfig.fillOpacity !== undefined ? polygonConfig.fillOpacity : 0.5,  // 填充透明度
        }

        // 创建多边形
        const polygon = L.polygon(latlngs, options).addTo(this.map)

        // 添加点击事件
        polygon.on('click', (e) => {
          // 只有在打点模式下才执行操作
          if (!this.isMarkingMode) {
            // 非打点模式下，不执行任何操作
            return
          }
          
          // 如果处于打点模式，则在点击位置打点
          const lat = e.latlng.lat
          const lng = e.latlng.lng
          this.createMarker(lat, lng)
        })

        // 保存多边形
        this.multiplePolygons.push(polygon)
        
        // 添加地块名称标签（显示在多边形中心）
        if (polygonConfig.title) {
          // 计算多边形的中心点
          const polygonBounds = polygon.getBounds()
          const center = polygonBounds.getCenter()
          
          // 创建自定义标签图标
          // 估算文本宽度（粗略计算：每个中文字符约12px，英文字符约6px）
          const titleLength = polygonConfig.title.length
          const estimatedWidth = Math.max(titleLength * 12 + 16, 80) // 最小宽度80px，加上padding
          
          const labelIcon = L.divIcon({
            className: 'polygon-label',
            html: `<div style="
              font-size: 12px;
              color: #ffff00;
            ">${polygonConfig.title}</div>`,
            iconSize: [estimatedWidth, 30], // 根据文本长度动态设置宽度
            iconAnchor: [estimatedWidth / 2, 0], // 居中显示在中心点上方
          })
          
          // 创建标签标记
          const label = L.marker(center, {
            icon: labelIcon,
            interactive: false, // 不可交互，避免阻挡点击
            zIndexOffset: 100, // 确保标签显示在多边形上方
          }).addTo(this.map)
          
          // 保存标签以便后续清除
          this.polygonLabels.push(label)
        }
        
        // 收集边界点用于自动缩放
        // latlngs.forEach(latlng => {
        //   bounds.push(latlng)
        // })
      })

      // 自动调整地图视图以包含所有多边形
      // if (bounds.length > 0) {
      //   const boundsLatLng = L.latLngBounds(bounds)
      //   this.map.fitBounds(boundsLatLng, { padding: [50, 50] })
      // }

      console.log('批量绘制多边形成功:', polygonsData.length, '个')
    },

    /**
     * 清除多个多边形
     */
    clearMultiplePolygons() {
      // 清除多边形标签
      if (this.polygonLabels && this.polygonLabels.length > 0) {
        console.log('clearMultiplePolygons: 清除', this.polygonLabels.length, '个标签')
        this.polygonLabels.forEach(label => {
          this.map.removeLayer(label)
        })
        this.polygonLabels = []
      }
      
      // 清除多边形
      if (this.multiplePolygons && this.multiplePolygons.length > 0) {
        console.log('clearMultiplePolygons: 清除', this.multiplePolygons.length, '个多边形')
        this.multiplePolygons.forEach(polygon => {
          this.map.removeLayer(polygon)
        })
        this.multiplePolygons = []
        console.log('clearMultiplePolygons: 完成')
      }
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
     * 清除所有标记、线条和多边形
     */
    clearAll() {
      console.log('renderjs: 开始清除所有标记、线条和多边形')
      
      // 清除用户打点的标记（历史数组）
      if (this.markers && this.markers.length > 0) {
        console.log('清除用户打点标记(历史):', this.markers.length, '个')
        this.markers.forEach(marker => {
          this.map.removeLayer(marker)
        })
        this.markers = []
      }

      // 清除每图层的唯一标记
      const layerIds = Object.keys(this.markersByLayer || {})
      if (layerIds.length > 0) {
        console.log('清除图层标记:', layerIds.length, '个图层')
        layerIds.forEach((layerId) => {
          const m = this.markersByLayer[layerId]
          if (m) {
            try { this.map.removeLayer(m) } catch (e) {}
          }
        })
      }
      this.markersByLayer = {}
      this.savedMarkersByLayerData = {}
      
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
      
      // 清除所有多边形
      this.clearMultiplePolygons()
      
      console.log('renderjs: 清除完成')
    },

    /**
     * 保存当前地图视图状态
     */
    saveMapViewState() {
        console.log(this.map, 'this.map');
      if (this.map) {
        const center = this.map.getCenter()
        
        this.currentCenter = [center.lat, center.lng]
        this.currentZoom = this.map.getZoom()
        console.log('保存地图视图状态:', {
          center: this.currentCenter,
          zoom: this.currentZoom,
        })
      }
    },

    /**
     * 恢复地图视图状态
     */
    restoreMapViewState() {
      if (this.map && this.currentCenter && this.currentZoom) {
        this.map.setView(this.currentCenter, this.currentZoom)
        console.log('恢复地图视图状态:', {
          center: this.currentCenter,
          zoom: this.currentZoom,
        })
      }
    },

    /**
     * 重新初始化地图（全屏切换时使用）
     * @param config - 地图配置对象，如果提供则使用配置，否则使用保存的视图状态
     */
    reinitMap(config = null) {
      // 保存当前视图状态（仅在需要时使用，如果传入了配置则优先使用配置）
      if (!config || (!config.zoom && !config.latitude)) {
        this.saveMapViewState()
      }
      
      // 保存需要恢复的状态数据
      const savedIsMarkingMode = this.isMarkingMode
      const savedMarkersData = [...this.savedMarkersData]
      const savedDisplayMarkersData = [...this.savedDisplayMarkersData]
      const savedSinglePolylineData = this.savedSinglePolylineData
      const savedMultiplePolylinesData = [...this.savedMultiplePolylinesData]
      const savedMultiplePolygonsData = [...this.savedMultiplePolygonsData]
      
      // 重新初始化地图，传入配置（如果有）
      this.initMap(true, config)
      
      // 等待地图初始化完成后恢复状态
      setTimeout(() => {
        // 重要：当容器尺寸改变时，需要调用 invalidateSize 重新计算地图尺寸
        if (this.map) {
          this.map.invalidateSize()
        }
        
        // 恢复视图状态
        this.restoreMapViewState()
        
        // 兼容：恢复历史数组中的用户打点（旧逻辑）
        if (savedMarkersData.length > 0) {
          savedMarkersData.forEach((markerData) => {
            const iconUrl = markerData.iconUrl || this.getIconByLayerId(markerData.layerId || 'hazard')
            const icon = L.icon({ iconUrl, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
            const marker = L.marker([markerData.lat, markerData.lng], { icon }).addTo(this.map)
            marker.on('click', () => {
              if (this.ownerInstance && this.ownerInstance.callMethod) {
                this.ownerInstance.callMethod('onMarkerConfirmed', markerData)
              }
            })
            this.markers.push(marker)
            if (markerData.layerId) {
              this.markersByLayer[markerData.layerId] = marker
              this.savedMarkersByLayerData[markerData.layerId] = markerData
            }
          })
          console.log('恢复用户打点标记(历史):', savedMarkersData.length, '个')
        }

        // 新逻辑：按图层恢复用户打点（仅保留每图层一个）
        const layerIds = Object.keys(this.savedMarkersByLayerData || {})
        if (layerIds.length > 0) {
          layerIds.forEach((layerId) => {
            const md = this.savedMarkersByLayerData[layerId]
            if (!md) return
            const iconUrl = md.iconUrl || this.getIconByLayerId(layerId)
            const icon = L.icon({ iconUrl, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
            const marker = L.marker([md.lat, md.lng], { icon }).addTo(this.map)
            marker.on('click', () => {
              if (this.ownerInstance && this.ownerInstance.callMethod) {
                this.ownerInstance.callMethod('onMarkerConfirmed', md)
              }
            })
            this.markersByLayer[layerId] = marker
            this.markers.push(marker)
          })
          console.log('按图层恢复用户打点标记:', layerIds.length, '个图层')
        }
        
        // 恢复回显标记点
        if (savedDisplayMarkersData.length > 0) {
          if (savedDisplayMarkersData.length === 1) {
            this.showSingleMarker(savedDisplayMarkersData[0], false)
          } else {
            this.showMultipleMarkers(savedDisplayMarkersData, false)
          }
        }
        
        // 恢复线条
        if (savedSinglePolylineData) {
          this.showSinglePolyline(savedSinglePolylineData)
        }
        if (savedMultiplePolylinesData.length > 0) {
          this.showMultiplePolylines(savedMultiplePolylinesData)
        }
        
        // 恢复多边形
        if (savedMultiplePolygonsData.length > 0) {
          this.showMultiplePolygons(savedMultiplePolygonsData)
        }
        
        // 恢复打点模式状态
        if (savedIsMarkingMode) {
          this.enableMarkingMode()
        }
        
        console.log('地图重新初始化完成，所有状态已恢复', {
          userMarkers: savedMarkersData.length,
          displayMarkers: savedDisplayMarkersData.length,
          polylines: savedMultiplePolylinesData.length,
          polygons: savedMultiplePolygonsData.length,
        })
      }, 100)
    },
    /**
     * 初始化地图
     * @param isReinit - 是否为重新初始化
     * @param config - 地图配置对象，包含 latitude、longitude、zoom 等
     */
    initMap(isReinit = false, config = null) {
      // 检查环境是否为 H5
      // if (typeof window === 'undefined') {
      //   console.warn('地图组件仅在 H5 环境运行')
      //   return
      // }

      try {
        // 如果地图已经存在，先移除
        if (this.map) {
          // 清除所有事件监听
          this.map.off()
          // 移除地图
          this.map.remove()
          this.map = null
        }
        console.log('initMap', isReinit ? '(重新初始化)' : '')

        // 确定初始视图
        let initialView = [30.265952764683064, 120.24511114641949]
        let initialZoom = 8
        
        // 优先使用传入的配置
        if (config) {
          if (config.latitude !== undefined && config.longitude !== undefined) {
            initialView = [config.latitude, config.longitude]
          }
          if (config.zoom !== undefined) {
            initialZoom = config.zoom
          }
        }
        // 如果没有配置，且是重新初始化，使用保存的视图状态（用于全屏切换等场景）
        else if (isReinit && this.currentCenter && this.currentZoom) {
          initialView = this.currentCenter
          initialZoom = this.currentZoom
        }

        // 创建地图实例 - 添加移动端优化选项
        this.map = L.map('map', {
          zoomSnap: 1, // 设置缩放捕捉为0.1
          attributionControl: false, // 移除右下角leaflet标识
          zoomControl: false, // 不添加默认的缩放控件
          doubleClickZoom: false,
          maxZoom: 18,
          maxNativeZoom: 18,
          minZoom: 9,
          wheelPxPerZoomLevel: 120, // 控制滚轮缩放敏感度
          zoomAnimation: true, // 启用缩放动画
          zoomAnimationThreshold: 4, // 缩放动画阈值
          fadeAnimation: true, // 启用淡入淡出动画
          markerZoomAnimation: true, // 启用标记缩放动画
          inertia: true, // 启用惯性
          inertiaDeceleration: 3000, // 惯性减速
          worldCopyJump: false, // 禁用世界复制跳转
          preferCanvas: true, // 优先使用Canvas渲染
        }).setView(initialView, initialZoom)

        // 添加天地图影像图层 - 使用 WGS-84 坐标系
        L.tileLayer(
          'https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=036825be613a859007fa3004c9e87ddf',
          {
            transparent: true,
            zIndex: 999,
            subdomains: ['0', '1', '2', '3', '4', '5', '6'],
            maxZoom: 18,
            maxNativeZoom: 18,
            minZoom: 9,
            tileSize: 256, // 明确指定瓦片大小
            keepBuffer: 4, // 增加缓冲区，预加载更多瓦片
            updateWhenIdle: false, // 立即更新瓦片
            updateWhenZooming: true, // 缩放时更新瓦片
            crossOrigin: 'anonymous', // 添加跨域支持
            errorTileUrl: '', // 错误瓦片URL为空，避免显示错误图片
            detectRetina: false, // 禁用Retina检测，提高性能
          },
        ).addTo(this.map)

        // 添加天地图标注图层 - 使用 WGS-84 坐标系
        L.tileLayer(
          'https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=036825be613a859007fa3004c9e87ddf',
          {
            transparent: true,
            zIndex: 999,
            subdomains: ['0', '1', '2', '3', '4', '5', '6'],
            maxZoom: 18,
            maxNativeZoom: 18,
            minZoom: 9,
            keepBuffer: 4, // 增加缓冲区，预加载更多瓦片
            updateWhenIdle: false, // 立即更新瓦片
            updateWhenZooming: true, // 缩放时更新瓦片
            crossOrigin: 'anonymous', // 添加跨域支持
            errorTileUrl: '', // 错误瓦片URL为空，避免显示错误图片
            detectRetina: false, // 禁用Retina检测，提高性能
          },
        ).addTo(this.map)

        // 保存初始缩放级别和中心点
        this.currentZoom = initialZoom
        this.currentCenter = initialView

        // 监听地图移动事件
        this.map.on('moveend', () => {
          const center = this.map.getCenter()
          this.currentCenter = [center.lat, center.lng]
        })

        console.log('地图初始化成功', {
          center: initialView,
          zoom: initialZoom,
        })
      }
      catch (error) {
        console.error('地图初始化失败:', error)
      }
    },

  },
}
</script>

<style lang="scss" scoped>
.full-screen {
  width: 100vw;
  height: 100vh;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 12px;
  box-sizing: border-box;

  .map-wrapper {
    width: 100%;
    height: 100%;
    z-index: 99;
  }
}


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

/**
 * 当前层级显示
 */
.hierarchy {
  position: absolute;
  left: 20px;
  bottom: 20px; // 避免与打返按钮重叠，留出足够空间
  z-index: 999;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  backdrop-filter: blur(10px);
  user-select: none;
}

/* 打点按钮 */
.map-marker-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 999;

  .marker-btn {
    background: linear-gradient(90deg, #0092FF 0%, #067AF6 100%);
    color: #FFFFFF;
    width: 96px;
    height: 34px;
    border-radius: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    gap: 4px;
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

.current-layer {
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 999;
  padding: 6px 12px;
  border-radius: 6px;
  color: #333;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.9);
  user-select: none;
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

/* 多边形标签样式 */
:global(.polygon-label) {
  background: transparent !important;
  border: none !important;
}
</style>
