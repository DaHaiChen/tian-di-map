import departmentJSON from '../json/dep.json'

/**
 * 原始数据项类型
 */
interface DepartmentItem {
    deptName: string
    deptId: string
    parentId: string | null
    type: 'regionalCompany' | 'park' | 'area'
    latitude: number | null
    longitude: number | null
    depPoint: string | null
    lanObj: any
    children?: DepartmentItem[]
    [key: string]: any
}

/**
 * API 响应类型
 */
interface ApiResponse {
    code: number
    message: string
    data: DepartmentItem[]
}

/**
 * Picker 数据项类型
 */
export interface PickerItem {
    label: string
    value: string
}

/**
 * Picker 数据映射类型
 */
export interface PickerDataMap {
    [key: string]: PickerItem[]
}

/**
 * Picker 工具类
 */
export interface PickerUtil {
    /** 数据映射对象 */
    dataMap: PickerDataMap
    /** 初始化的 columns */
    initialColumns: PickerItem[][]
    /** 列变化处理函数 */
    handleColumnChange: (
        pickerView: any,
        value: any[],
        columnIndex: number,
        resolve: Function
    ) => void
    /** 根据选中的值获取原始的完整节点数据 */
    getSelectedNodeData: (value: string[]) => any
}

/**
 * 直接从原始 JSON 数据转换为 wd-picker 需要的格式
 * 只处理三级：区域公司 -> 农场 -> 分场（type=area时停止）
 * @returns Picker 工具对象
 */
export function convertDepartmentJSONToPickerFormat(): PickerUtil {
    const dataMap: PickerDataMap = {}
    const nodeDataMap: Record<string, any> = {} // 存储完整的节点数据
    
    // 获取实际数据
    const response = departmentJSON as ApiResponse
    const dataList = response?.data || []
    
    /**
     * 递归构建数据映射
     * @param departments 部门列表
     * @param parentKey 父级key，根节点为 '0'
     * @param level 当前层级，从1开始
     */
    function buildDataMap(
        departments: DepartmentItem[],
        parentKey: string = '0',
        level: number = 1
    ) {
        // 最多处理到三级
        if (!departments || departments.length === 0 || level > 3) {
            return
        }
        
        // 获取当前层级的选项数据
        const items: PickerItem[] = []
        
        departments.forEach(dept => {
            // 第一级：区域公司（regionalCompany）
            if (level === 1 && dept.type === 'regionalCompany') {
                items.push({
                    label: dept.deptName,
                    value: dept.deptId
                })
                nodeDataMap[dept.deptId] = {
                    ...dept,
                    level: 1,
                    type: dept.type
                }
                
                // 递归处理子节点（第二级）
                if (dept.children && dept.children.length > 0) {
                    buildDataMap(dept.children, dept.deptId, level + 1)
                }
            }
            // 第二级：农场/基地（park）
            else if (level === 2 && dept.type === 'park') {
                items.push({
                    label: dept.deptName,
                    value: dept.deptId
                })
                nodeDataMap[dept.deptId] = {
                    ...dept,
                    level: 2,
                    type: dept.type
                }
                
                // 递归处理子节点（第三级）
                if (dept.children && dept.children.length > 0) {
                    buildDataMap(dept.children, dept.deptId, level + 1)
                }
            }
            // 第三级：分场（area）- 处理但不继续递归
            else if (level === 3 && dept.type === 'area') {
                items.push({
                    label: dept.deptName,
                    value: dept.deptId
                })
                nodeDataMap[dept.deptId] = {
                    ...dept,
                    level: 3,
                    type: dept.type
                }
                // 不再递归处理 children（已经到达最大层级）
            }
        })
        
        // 保存当前层级的数据
        if (items.length > 0) {
            dataMap[parentKey] = items
        }
    }
    
    // 从根节点开始构建
    buildDataMap(dataList)
    
    // 调试：输出数据映射
    console.log('数据映射构建完成:', {
        dataMapKeys: Object.keys(dataMap),
        dataMapSample: Object.entries(dataMap).slice(0, 5).reduce((acc, [key, value]) => {
            acc[key] = value
            return acc
        }, {} as any)
    })
    
    /**
     * 初始化 columns（三级联动）
     */
    function getInitialColumns(): PickerItem[][] {
        const columns: PickerItem[][] = []
        
        // 第一列：区域公司
        if (dataMap['0'] && dataMap['0'].length > 0) {
            columns.push(dataMap['0'])
            
            // 第二列：默认选中第一个区域公司的农场
            const firstCompanyValue = dataMap['0'][0].value
            if (dataMap[firstCompanyValue] && dataMap[firstCompanyValue].length > 0) {
                columns.push(dataMap[firstCompanyValue])
                
                // 第三列：默认选中第一个农场的分场
                const firstParkValue = dataMap[firstCompanyValue][0].value
                if (dataMap[firstParkValue] && dataMap[firstParkValue].length > 0) {
                    columns.push(dataMap[firstParkValue])
                }
            }
        }
        
        return columns
    }
    
    /**
     * 列变化处理函数
     */
    function handleColumnChange(
        pickerView: any,
        value: any[],
        columnIndex: number,
        resolve: Function
    ) {
        const selectedValue = value[columnIndex]
        
        // 根据当前列索引，更新后续所有列的数据
        if (columnIndex === 0) {
            // 第一列（区域公司）变化，更新第二、三列
            if (dataMap[selectedValue]) {
                pickerView.setColumnData(1, dataMap[selectedValue] || [])
                
                if (dataMap[selectedValue].length > 0) {
                    const firstParkValue = dataMap[selectedValue][0].value
                    if (dataMap[firstParkValue]) {
                        pickerView.setColumnData(2, dataMap[firstParkValue] || [])
                    } else {
                        pickerView.setColumnData(2, [])
                    }
                } else {
                    pickerView.setColumnData(2, [])
                }
            }
        } 
        else if (columnIndex === 1) {
            // 第二列（农场）变化，更新第三列
            console.log('第二列变化 - 选中的农场ID:', selectedValue.value)
            console.log(dataMap, '数据映射');
            console.log('查找数据映射:', dataMap[selectedValue.value])
            if (dataMap[selectedValue.value]) {
                pickerView.setColumnData(2, dataMap[selectedValue.value] || [])
            } else {
                console.warn('未找到农场的子节点数据:', selectedValue.value)
                pickerView.setColumnData(2, [])
            }
        }
        
        resolve()
    }
    
    /**
     * 根据选中的值获取原始的完整节点数据
     */
    function getSelectedNodeData(value: string[]): any {
        if (!value || value.length === 0) {
            return null
        }
        
        // 返回最后一级的完整数据
        const lastValue = value[value.length - 1]
        return nodeDataMap[lastValue] || null
    }
    
    return {
        dataMap,
        initialColumns: getInitialColumns(),
        handleColumnChange,
        getSelectedNodeData
    }
}

/**
 * 使用区域数据的 Hook（兼容旧代码）
 */
export function useAreaData() {
    return {
        areaList: [],
        defaultExpandedKeys: []
    }
}
