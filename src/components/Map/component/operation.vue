<!--
 * @Author: dahai chendahai777@gmail.com
 * @Date: 2025-10-29 15:44:35
 * @Description: 
 * @FilePath: /unibest/src/components/Map/component/operation.vue
 * @LastEditTime: 2025-10-30 15:26:35
 * @LastEditors: dahai chendahai777@gmail.com
-->
<script lang="ts" setup>
import { ref, computed } from 'vue'
import ZiChanImage from '../image/map-layer-zichan.png'
import RiskImage from '../image/map-layer-fengxian.png'
import HazardImage from '../image/map-layer-yinhuan.png'
import PatrolImage from '../image/map-layer-xunjian.png'
import MonitorImage from '../image/map-layer-jiankong.png'

const props = defineProps<{
  defaultLayer?: string
  layerList?: string[]
}>()

/** 图层列表 */
const defaultLayerList = [
  {
    name: '资产',
    id: 'ziChan',
    icon: ZiChanImage,
  },
  {
    name: '风险',
    id: 'risk',
    icon: RiskImage,
  },
  {
    name: '隐患',
    id: 'hazard',
    icon: HazardImage,
  },
  {
    name: '巡查',
    id: 'patrol',
    icon: PatrolImage,
  },
  {
    name: '监控',
    id: 'monitor',
    icon: MonitorImage,
  },
]

/** 全屏状态 */
const isFullScreen = defineModel<boolean>('fullScreen', { default: false })

/** 图层列表 */
const list = computed(() => {
  return defaultLayerList.filter(item => props.layerList.includes(item.id))
})

/** 下拉菜单显示状态 */
const showDropdown = ref(false)

/** 当前选中的图层ID */
const selectedLayerId = defineModel<String>({ default: 'hazard' })

/**
 * 切换下拉菜单显示状态
 */
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

/**
 * 选择图层项
 * @param layerId - 图层ID
 */
const selectLayer = (layerId: string) => {
  selectedLayerId.value = layerId
  showDropdown.value = false
}

/**
 * 切换全屏状态
 */
const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
}

watch(() => props.defaultLayer, (newVal) => {
  if (newVal) {
    selectedLayerId.value = newVal
  }
}, { immediate: true, deep: true })
</script>

<template>
  <view class="operation-wrapper">
    <!-- 图层选择按钮 -->
    <view class="layer-select-wrapper">
      <image src="../image/hierarchy.png" mode="scaleToFill" class="hierarchy-img" @click="toggleDropdown" />
      <!-- 下拉菜单 -->
      <view v-if="showDropdown" class="dropdown-menu">
        <!-- 向上的箭头 -->
        <view class="dropdown-caret"></view>
        <!-- 菜单项列表 -->
        <view class="dropdown-list">
          <view v-for="layer in list" :key="layer.id" class="dropdown-item"
            :class="{ 'dropdown-item-active': selectedLayerId === layer.id }" @click="selectLayer(layer.id)">
            <image :src="layer.icon" mode="scaleToFill" class="dropdown-item-icon" />
            <text class="dropdown-item-text">{{ layer.name }}</text>
          </view>
        </view>
      </view>
    </view>
    <image src="../image/full-screen.png" mode="scaleToFill" class="hierarchy-img" @click="toggleFullScreen" />
  </view>
</template>

<style lang="scss" scoped>
.operation-wrapper {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 999;
  display: flex;
  gap: 6px;
  flex-direction: flex;
  align-items: flex-end;

  .layer-select-wrapper {
    position: relative;

    .hierarchy-img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .dropdown-menu {
      position: absolute;
      right: -20px;
      top: calc(100% + 8px);
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      width: 70px;
      padding: 4px 2px;
      z-index: 1000;

      .dropdown-caret {
        position: absolute;
        top: -6px;
        right: 24px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #ffffff;
      }

      .dropdown-list {
        .dropdown-item {
          display: flex;
          align-items: center;
          // padding: 2px 12px;
          height: 24px;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: rgba(24, 144, 255, 0.08);
          }

          &.dropdown-item-active {
            background-color: #e6f4ff;
          }

          .dropdown-item-icon {
            width: 14px;
            height: 14px;
            margin-right: 4px;
            flex-shrink: 0;
          }

          .dropdown-item-text {
            font-size: 14px;
            color: #333333;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .hierarchy-img {
    width: 20px;
    height: 20px;
  }
}
</style>
