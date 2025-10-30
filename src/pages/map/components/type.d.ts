/*
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 09:23:24
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-29 09:23:37
 * @FilePath: /unibest/src/pages/map/components/type.d.ts
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
  autoFocus?: boolean
  [key: string]: any
}

