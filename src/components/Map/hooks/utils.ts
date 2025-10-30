import type { GeocodeResult } from './types'
import { TK } from './config'

// 通过经纬度获取地址信息
export const getAddressByCoordinates = async (lon: number, lat: number): Promise<GeocodeResult | null> => {
    try {
        const postStr = JSON.stringify({
            'lon': lon,
            'lat': lat,
            'ver': 1
        })

        const url = `http://api.tianditu.gov.cn/geocoder?postStr=${encodeURIComponent(postStr)}&type=geocode&tk=${TK}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: GeocodeResult = await response.json()

        if (data.status === '0' && data.msg === 'ok') {
            console.log('逆地理编码成功:', data.result.formatted_address)
            return data
        } else {
            console.error('逆地理编码失败:', data.msg)
            return null
        }
    } catch (error) {
        console.error('逆地理编码请求失败:', error)
        return null
    }
}

// 解析坐标字符串 "POINT (31.6243 121.652)" 转换为 [31.6243, 121.652]
export const parsePointToLatLng = (pointStr: string): number[] => {
    if (!pointStr || typeof pointStr !== 'string') {
        console.warn('parsePointString - 输入无效:', pointStr)
        return []
    }

    const match = pointStr.match(/POINT\s*\(\s*([\d.-]+)\s+([\d.-]+)\s*\)/i)
    if (match) {
        const lng = parseFloat(match[1])
        const lat = parseFloat(match[2])

        if (!isNaN(lng) && !isNaN(lat)) {
            console.log('parsePointString - 成功解析:', pointStr, '->', [lng, lat])
            return [lng, lat]
        }
    }

    console.warn('无法解析坐标字符串:', pointStr)
    return []
}

// 生成"星期X yyyy-mm-dd"格式的日期字符串
export function formatDateWithWeekday(date?: any) {
    const targetDate = date ? new Date(date) : new Date()

    if (isNaN(targetDate.getTime())) {
        throw new Error('无效的日期')
    }

    // 获取中文星期几
    const weekday = new Intl.DateTimeFormat('zh-CN', {
        weekday: 'long'
    }).format(targetDate)

    // 获取年月日
    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const day = String(targetDate.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    return `${weekday} ${dateStr}`
}

// 递归搜索函数，在树形结构中根据value节点
export const findGeoDataByValue = (nodes: any[], targetValue: string): any => {
    for (const node of nodes) {
        if (node.value === targetValue) {
            return node
        }

        if (node.children && node.children.length > 0) {
            const result = findGeoDataByValue(node.children, targetValue)
            if (result) {
                return result
            }
        }
    }
    return null
}

/**
 * 格式化地块数据
 * @param data - areaChildren 数组，包含地块组数据
 * @returns 格式化后的地块数组，每个地块包含地理坐标和相关信息
 */
export function formatData(data: any[]) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn('formatData: 输入数据为空或无效')
        return []
    }

    const result: any[] = []

    data.forEach((item, index) => {
        try {
            // 检查是否存在子地块数据
            if (!item.children || !Array.isArray(item.children) || item.children.length === 0) {
                console.warn(`formatData: 地块 ${index + 1} (${item.landLeardingName || '未知'}) 没有子地块数据`)
                return
            }

            // 获取第一个子地块（通常每个地块组只有一个子地块）
            const child = item.children[0]
            
            // 检查是否存在地理坐标信息
            if (!child.soilInfoGeometry) {
                console.warn(`formatData: 地块 ${index + 1} (${item.landLeardingName || '未知'}) 没有地理坐标数据`)
                return
            }

            // 解析地理坐标 JSON 字符串
            let geometry
            try {
                geometry = JSON.parse(child.soilInfoGeometry)
            } catch (parseError) {
                console.error(`formatData: 解析地理坐标JSON失败 - 地块 ${index + 1}:`, parseError)
                return
            }

            // 提取坐标点数组
            // soilInfoGeometry 格式: {"rings":[[[[lat, lng], [lat, lng], ...]]], "type":"Polygon"}
            // rings[0][0] 是坐标点数组
            if (!geometry.rings || !Array.isArray(geometry.rings) || geometry.rings.length === 0) {
                console.warn(`formatData: 地块 ${index + 1} (${item.landLeardingName || '未知'}) 坐标数据格式错误`)
                return
            }

            const firstRing = geometry.rings[0].length === 1 ? geometry.rings[0] : geometry.rings
            if (!Array.isArray(firstRing) || firstRing.length === 0) {
                console.warn(`formatData: 地块 ${index + 1} (${item.landLeardingName || '未知'}) 坐标环数据为空`)
                return
            }

            const coordinates = firstRing[0]
            if (!Array.isArray(coordinates) || coordinates.length < 3) {
                console.warn(`formatData: 地块 ${index + 1} (${item.landLeardingName || '未知'}) 坐标点数不足（至少需要3个点）`)
                return
            }

            // 组合数据：优先使用子地块的数据，父地块的数据作为补充
            result.push({
                // 父地块信息
                landLeardingNo: item.landLeardingNo,
                landLeardingName: item.landLeardingName,
                
                // 子地块信息（优先使用）
                soilLeardingNo: child.soilLeardingNo,
                soilLeardingName: child.soilLeardingName,
                locatedName: child.locatedName || item.locatedName, // 优先使用子地块的 locatedName
                level: child.level,
                
                // 地理坐标（提取坐标点数组）
                geo: coordinates,
                
                // 其他有用信息
                soilInfoCollectArea: child.soilInfoCollectArea,
                soilInfoLocationSituationName: child.soilInfoLocationSituationName,
                soilInfoTransportationConditionsName: child.soilInfoTransportationConditionsName,
                soilInfoCertificationStatusName: child.soilInfoCertificationStatusName,
                baseNo: child.baseNo,
                baseName: child.baseName,
                companyNo: child.companyNo,
                companyName: child.companyName,
            })

        } catch (error) {
            console.error(`formatData: 处理地块 ${index + 1} 时出错:`, error, item)
        }
    })

    console.log(`formatData: 成功处理 ${result.length}/${data.length} 个地块`)
    return result
}