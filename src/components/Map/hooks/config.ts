import type { WmsConfig } from './types'

// 天地图的key   
export const TK = import.meta.env.VITE_TIAN_DI_MAP_KEY || '036825be613a859007fa3004c9e87ddf'

// 地图默认配置
export const MAP_OPTIONS = {
    projection: 'EPSG:4326',
    minZoom: 9,
    maxZoom: 22,
}

// 天气接口调用配置
export const WEATHER_CONFIG = {
    CALL_INTERVAL: 50000, // 50秒间隔
    DEBOUNCE_DELAY: 1000, // 1秒防抖延迟
}

// 杭州区域公司行政边界WMS配置
export const COMPANY_BORDER_WMS_CONFIG: WmsConfig = {
    url: 'http://111.198.118.154:8080/geoserver/wms',
    layers: 'cite:companyborder',
    format: 'image/png',
    maxNativeZoom: 18,
    transparent: true,
    version: '1.1.0',
    srs: 'EPSG:4326',
    style: 'cite:区域公司'  // 使用服务器上实际存在的样式
}

// 默认WMS样式
export const DEFAULT_WMS_STYLE = ''  // 使用默认样式

// 杭州市区域边界范围
export const HANGZHOU_BOUNDS = {
    southWest: { lng: 118.5, lat: 29.5 },
    northEast: { lng: 120.5, lat: 30.8 }
}

// 图标配置
export const ICON_CONFIG = {
    size: [32, 32] as [number, number],
    anchor: [16, 32] as [number, number]
}

// 级联选择器配置
export const TREE_PROPS = {
    children: 'children',
    label: 'label',
}