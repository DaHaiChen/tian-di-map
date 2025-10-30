/*
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 09:23:24
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-30 13:49:04
 * @FilePath: /unibest/src/components/Map/type.d.ts
 * @Description: 
 */

/**
 * 标记点数据类型
 */
export interface MarkerData {
  id?: string | number
  lat: number
  lng: number
  title?: string
  icon?: string
  popupContent?: string
}

/**
 * 线条配置类型
 */
export interface PolylineConfig {
  points: Array<{ lat: number, lng: number }>  // 要连接的点位数组
  color?: string                                // 线条颜色
  weight?: number                               // 线条粗细
  opacity?: number                              // 线条透明度
  dashArray?: string                            // 虚线样式，如 '5, 10'
  smooth?: boolean                              // 是否平滑曲线
}

/**
 * 多边形配置类型
 */
export interface PolygonConfig {
  points: Array<[number, number]>              // 多边形顶点坐标数组 [lat, lng]
  color?: string                                // 边框颜色
  weight?: number                               // 边框宽度
  opacity?: number                              // 边框透明度
  fillColor?: string                            // 填充颜色
  fillOpacity?: number                          // 填充透明度
  title?: string                                // 多边形标题（用于弹窗显示）
}

/**
 * 地图配置类型
 */
export interface MapConfig {
  latitude: number
  longitude: number
  zoom: number
  initialized: boolean
  type?: string
  markerData?: MarkerData
  markersData?: MarkerData[]
  polylineData?: PolylineConfig
  polylinesData?: PolylineConfig[]
  polygonData?: PolygonConfig
  polygonsData?: PolygonConfig[]
  autoFocus?: boolean
  defaultLayer?: string
  [key: string]: any
}

/**
 * 外部按图层传入的点位映射
 * key 为图层 id，value 为该图层的点位数组
 */
export type LayerMarkersMap = Record<string, MarkerData[]>
