/*
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 09:48:15
 * @LastEditors: dahai chendahai777@gmail.com
 * @LastEditTime: 2025-10-29 09:48:21
 * @FilePath: /unibest/src/pages/test-component/type.ts
 * @Description: 
 */
export interface MapConfig {
  /** 中心点的经度 */
  centerLng: number
  /** 中心点的纬度 */
  centerLat: number
  /** 缩放级别 */
  zoom: number
  /** 最大缩放级别 */
  maxZoom: number
  /** 默认图层 */
  defaultLayer: string
}