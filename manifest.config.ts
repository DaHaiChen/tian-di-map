import path from 'node:path'
import process from 'node:process'
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { loadEnv } from 'vite'

// 手动解析命令行参数获取 mode
function getMode() {
  const args = process.argv.slice(2)
  const modeFlagIndex = args.findIndex(arg => arg === '--mode')
  return modeFlagIndex !== -1 ? args[modeFlagIndex + 1] : args[0] === 'build' ? 'production' : 'development' // 默认 development
}
// 获取环境变量的范例
const env = loadEnv(getMode(), path.resolve(process.cwd(), 'env'))
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_WX_APPID,
  VITE_APP_PUBLIC_BASE,
  VITE_FALLBACK_LOCALE,
} = env
// console.log('manifest.config.ts env:', env)

export default defineManifestConfig({
  'name': VITE_APP_TITLE,
  'appid': VITE_UNI_APPID,
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'locale': VITE_FALLBACK_LOCALE, // 'zh-Hans'
  'h5': {
    router: {
      base: VITE_APP_PUBLIC_BASE,
    },
  },
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    compatible: {
      ignoreVersion: true,
    },
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {
      Geolocation: {}, // 定位模块
    },
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        minSdkVersion: 21,
        targetSdkVersion: 30,
        abiFilters: ['armeabi-v7a', 'arm64-v8a'],
        // 隐私政策提示框配置（Android 必需）
        privacyPrompts: {
          enable: true,
          title: '服务协议和隐私政策',
          message: '请你务必审慎阅读、充分理解"服务协议"和"隐私政策"各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br/>你可阅读<a href="">《服务协议》</a>和<a href="">《隐私政策》</a>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。',
          buttonAccept: '同意',
          buttonRefuse: '暂不同意',
        },
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
          // 定位权限（必需）
          '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>',
          '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>',
          // Android 10+ 后台定位权限（如需后台定位）
          '<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>',
        ],
      },
      /* ios打包配置 */
      ios: {},
      /* SDK配置 */
      sdkConfigs: {
        /* SDK配置 */
        sdkConfigs: {
          /* 定位 */
          geolocation: {
            amap: {
              name: 'amapCcaOIunjz',
              __platform__: ['android'],
              appkey_ios: '',
              appkey_android: 'f1f2f554f65e7f91a2a87e24e492d914',
            },
          },
          /* 地图 */
          maps: {
            amap: {
              name: 'amapCcaOIunjz',
              __platform__: ['android'],
              appkey_ios: '',
              appkey_android: 'f1f2f554f65e7f91a2a87e24e492d914',
            },
          },
        },
      },
      /* 图标配置 */
      icons: {
        android: {
          hdpi: 'static/app/icons/72x72.png',
          xhdpi: 'static/app/icons/96x96.png',
          xxhdpi: 'static/app/icons/144x144.png',
          xxxhdpi: 'static/app/icons/192x192.png',
        },
        ios: {
          appstore: 'static/app/icons/1024x1024.png',
          ipad: {
            'app': 'static/app/icons/76x76.png',
            'app@2x': 'static/app/icons/152x152.png',
            'notification': 'static/app/icons/20x20.png',
            'notification@2x': 'static/app/icons/40x40.png',
            'proapp@2x': 'static/app/icons/167x167.png',
            'settings': 'static/app/icons/29x29.png',
            'settings@2x': 'static/app/icons/58x58.png',
            'spotlight': 'static/app/icons/40x40.png',
            'spotlight@2x': 'static/app/icons/80x80.png',
          },
          iphone: {
            'app@2x': 'static/app/icons/120x120.png',
            'app@3x': 'static/app/icons/180x180.png',
            'notification@2x': 'static/app/icons/40x40.png',
            'notification@3x': 'static/app/icons/60x60.png',
            'settings@2x': 'static/app/icons/58x58.png',
            'settings@3x': 'static/app/icons/87x87.png',
            'spotlight@2x': 'static/app/icons/80x80.png',
            'spotlight@3x': 'static/app/icons/120x120.png',
          },
        },
      },
    },
  },
  /* 快应用特有相关 */
  'quickapp': {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
      // 是否启用 ES6 转 ES5
      es6: true,
      minified: true,
    },
    optimization: {
      subPackages: true,
    },
    // 是否合并组件虚拟节点外层属性，uni-app 3.5.1+ 开始支持。目前仅支持 style、class 属性。
    // 默认不开启（undefined），这里设置为开启。
    mergeVirtualHostAttributes: true,
    // styleIsolation: 'shared',
    usingComponents: true,
    // __usePrivacyCheck__: true,
  },
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
    optimization: {
      subPackages: true,
    },
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
