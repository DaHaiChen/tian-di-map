<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 15:22:58
 * @Description: 部门选择组件 - 三级联动（区域公司->农场->分场）
 * @FilePath: /unibest/src/components/Map/component/selectDept.vue
 * @LastEditTime: 2025-10-29 18:04:59
 * @LastEditors: dahai chendahai777@gmail.com
-->
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { convertDepartmentJSONToPickerFormat } from '../hooks/useAreaData'

const emit = defineEmits(['deptSelected'])

/**
 * 直接从 JSON 数据转换为 picker 格式（三级：区域公司->农场->分场）
 */
const pickerUtil = computed(() => {
  return convertDepartmentJSONToPickerFormat()
})

/**
 * 选中的值（数组形式，对应每一列：[区域公司ID, 农场ID, 分场ID]）
 */
const selectValue = ref<string[]>([])

/**
 * Picker 的 columns（二维数组）
 */
const columns = computed(() => {
  return pickerUtil.value?.initialColumns || []
})

/**
 * 自定义显示格式 - 只显示最后一级（第三级）的节点名称
 */
function displayFormat(items: any[]) {
  if (!items || items.length === 0) {
    return '请选择部门'
  }
  // 只返回最后一项的名称
  return items[items.length - 1]?.label || '请选择部门'
}

/**
 * 确认选择事件
 */
function handleConfirm({ value, selectedItems }: any) {
  // 获取完整的节点数据
  if (pickerUtil.value) {
    const nodeData = pickerUtil.value.getSelectedNodeData(value)
    console.log('选中的节点完整数据:', nodeData)
    
    // 触发自定义事件，传递选中的部门信息
    emit('deptSelected', { value, selectedItems, nodeData })
  }
}
</script>

<template>
  <view class="select-dept-wrapper">
    <wd-picker
      v-if="pickerUtil"
      size="small"
      :columns="columns"
      v-model="selectValue"
      :column-change="pickerUtil.handleColumnChange"
      :display-format="displayFormat"
      @confirm="handleConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.select-dept-wrapper {
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 999;
  min-width: 120px;
  border-radius: 4px;
  overflow: hidden;
}

:deep(.wd-cell__wrapper){
  padding: 4px 6px;
}
</style>
