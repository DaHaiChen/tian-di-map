// vite.config.ts
import path4 from "node:path";
import process4 from "node:process";
import Uni from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-helper+plugin-uni@0.1.0_@dcloudio+vite-plugin-uni@3.0.0-4070620250821001_postcss@8_0531a23cbdff7442fc614704e222f868/node_modules/@uni-helper/plugin-uni/src/index.js";
import Components from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.3_rollup@4.52.4/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.52.4/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-helper+vite-plugin-uni-manifest@0.2.8_vite@5.2.8_@types+node@20.19.20_sass@1.77.8_terser@5.44.0_/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-helper+vite-plugin-uni-pages@0.3.19_vite@5.2.8_@types+node@20.19.20_sass@1.77.8_terser@5.44.0_/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-helper+vite-plugin-uni-platform@0.0.5/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import Optimization from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-ku+bundle-optimizer@1.3.15-beta.2_postcss@8.5.6_rollup@4.52.4_vite@5.2.8_@types+no_98b8d82f5a06a130481e14836684597c/node_modules/@uni-ku/bundle-optimizer/dist/index.mjs";
import UniKuRoot from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/@uni-ku+root@1.4.1_vite@5.2.8_@types+node@20.19.20_sass@1.77.8_terser@5.44.0_/node_modules/@uni-ku/root/dist/index.mjs";
import dayjs from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import { visualizer } from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/rollup-plugin-visualizer@6.0.4_rollup@4.52.4/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import UnoCSS from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/unocss@66.0.0_postcss@8.5.6_vite@5.2.8_@types+node@20.19.20_sass@1.77.8_terser@5.44.0__vue@3.5.22_typescript@5.8.3_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/unplugin-auto-import@20.2.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/vite@5.2.8_@types+node@20.19.20_sass@1.77.8_terser@5.44.0/node_modules/vite/dist/node/index.js";
import ViteRestart from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/vite-plugin-restart@1.0.0_vite@5.2.8_@types+node@20.19.20_sass@1.77.8_terser@5.44.0_/node_modules/vite-plugin-restart/dist/index.js";

// scripts/open-dev-tools.js
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
function _openDevTools() {
  const platform = process.platform;
  const { UNI_PLATFORM } = process.env;
  const uniPlatformText = UNI_PLATFORM === "mp-weixin" ? "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F" : UNI_PLATFORM === "mp-alipay" ? "\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F" : "\u5C0F\u7A0B\u5E8F";
  const projectPath = path.resolve(process.cwd(), `dist/dev/${UNI_PLATFORM}`);
  if (!fs.existsSync(projectPath)) {
    console.log(`\u274C ${uniPlatformText}\u6784\u5EFA\u76EE\u5F55\u4E0D\u5B58\u5728:`, projectPath);
    return;
  }
  console.log(`\u{1F680} \u6B63\u5728\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177...`);
  let command = "";
  if (platform === "darwin") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli -o "${projectPath}"`;
    } else if (UNI_PLATFORM === "mp-alipay") {
      command = `/Applications/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177.app/Contents/MacOS/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177 --p "${projectPath}"`;
    }
  } else if (platform === "win32" || platform === "win64") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `"C:\\Program Files (x86)\\Tencent\\\u5FAE\u4FE1web\u5F00\u53D1\u8005\u5DE5\u5177\\cli.bat" -o "${projectPath}"`;
    }
  } else {
    console.log("\u274C \u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u81EA\u52A8\u6253\u5F00\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177");
    return;
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`\u274C \u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5931\u8D25:`, error.message);
      console.log(`\u{1F4A1} \u8BF7\u786E\u4FDD${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u670D\u52A1\u7AEF\u53E3\u5DF2\u542F\u7528`);
      console.log(`\u{1F4A1} \u53EF\u4EE5\u624B\u52A8\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5E76\u5BFC\u5165\u9879\u76EE:`, projectPath);
      return;
    }
    if (stderr) {
      console.log("\u26A0\uFE0F \u8B66\u544A:", stderr);
    }
    console.log(`\u2705 ${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u6253\u5F00`);
    if (stdout) {
      console.log(stdout);
    }
  });
}
function openDevTools() {
  let isFirstBuild = true;
  return {
    name: "uni-devtools",
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes("mp")) {
        isFirstBuild = false;
        _openDevTools();
      }
    }
  };
}

// vite-plugins/copy-native-resources.ts
import path2 from "node:path";
import process2 from "node:process";
import fs2 from "file:///Users/chenshaocong/work/test/unibest/node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
var DEFAULT_OPTIONS = {
  enable: true,
  sourceDir: "nativeplugins",
  targetDirName: "nativeplugins",
  verbose: true,
  logPrefix: "[copy-native-resources]"
};
function copyNativeResources(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  if (!config.enable) {
    return {
      name: "copy-native-resources-disabled",
      apply: "build",
      writeBundle() {
      }
    };
  }
  return {
    name: "copy-native-resources",
    apply: "build",
    // 只在构建时应用
    enforce: "post",
    // 在其他插件执行完毕后执行
    async writeBundle() {
      const { sourceDir, targetDirName, verbose, logPrefix } = config;
      try {
        const projectRoot = process2.cwd();
        const sourcePath = path2.resolve(projectRoot, sourceDir);
        const buildMode = process2.env.NODE_ENV === "production" ? "build" : "dev";
        const platform = process2.env.UNI_PLATFORM || "app";
        const targetPath = path2.resolve(
          projectRoot,
          "dist",
          buildMode,
          platform,
          targetDirName
        );
        const sourceExists = await fs2.pathExists(sourcePath);
        if (!sourceExists) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u5982\u9700\u4F7F\u7528\u672C\u5730\u539F\u751F\u63D2\u4EF6\uFF0C\u8BF7\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA nativeplugins \u76EE\u5F55`);
            console.warn(`${logPrefix} \u5E76\u6309\u7167\u5B98\u65B9\u6587\u6863\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
            console.warn(`${logPrefix} \u53C2\u8003: https://uniapp.dcloud.net.cn/plugin/native-plugin.html`);
          }
          return;
        }
        const sourceFiles = await fs2.readdir(sourcePath);
        if (sourceFiles.length === 0) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u8BF7\u5728 nativeplugins \u76EE\u5F55\u4E2D\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
          }
          return;
        }
        await fs2.ensureDir(targetPath);
        if (verbose) {
          console.log(`${logPrefix} \u5F00\u59CB\u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6...`);
          console.log(`${logPrefix} \u6E90\u76EE\u5F55: ${sourcePath}`);
          console.log(`${logPrefix} \u76EE\u6807\u76EE\u5F55: ${targetPath}`);
          console.log(`${logPrefix} \u6784\u5EFA\u6A21\u5F0F: ${buildMode}`);
          console.log(`${logPrefix} \u76EE\u6807\u5E73\u53F0: ${platform}`);
          console.log(`${logPrefix} \u53D1\u73B0 ${sourceFiles.length} \u4E2A\u539F\u751F\u63D2\u4EF6\u6587\u4EF6/\u76EE\u5F55`);
        }
        await fs2.copy(sourcePath, targetPath, {
          overwrite: true,
          // 覆盖已存在的文件，确保使用最新版本
          errorOnExist: false,
          // 如果目标文件存在不报错
          preserveTimestamps: true
          // 保持文件的时间戳
        });
        if (verbose) {
          console.log(`${logPrefix} \u2705 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u590D\u5236\u5B8C\u6210`);
          console.log(`${logPrefix} \u5DF2\u6210\u529F\u590D\u5236 ${sourceFiles.length} \u4E2A\u6587\u4EF6/\u76EE\u5F55\u5230\u6784\u5EFA\u76EE\u5F55`);
          console.log(`${logPrefix} \u539F\u751F\u63D2\u4EF6\u73B0\u5728\u53EF\u4EE5\u5728 App \u4E2D\u6B63\u5E38\u4F7F\u7528`);
        }
      } catch (error) {
        console.error(`${config.logPrefix} \u274C \u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u5931\u8D25:`, error);
        console.error(`${config.logPrefix} \u9519\u8BEF\u8BE6\u60C5:`, error instanceof Error ? error.message : String(error));
        console.error(`${config.logPrefix} \u8BF7\u68C0\u67E5\u6E90\u76EE\u5F55\u6743\u9650\u548C\u78C1\u76D8\u7A7A\u95F4`);
      }
    }
  };
}
function createCopyNativeResourcesPlugin(enable = true, options = {}) {
  return copyNativeResources({ enable, ...options });
}

// vite-plugins/sync-manifest-plugins.ts
import fs3 from "node:fs";
import path3 from "node:path";
import process3 from "node:process";
function syncManifestPlugin() {
  return {
    name: "sync-manifest",
    apply: "build",
    enforce: "post",
    writeBundle: {
      order: "post",
      handler() {
        const srcManifestPath = path3.resolve(process3.cwd(), "./src/manifest.json");
        const distAppPath = path3.resolve(process3.cwd(), "./dist/dev/app/manifest.json");
        try {
          const srcManifest = JSON.parse(fs3.readFileSync(srcManifestPath, "utf8"));
          const distAppDir = path3.dirname(distAppPath);
          if (!fs3.existsSync(distAppDir)) {
            fs3.mkdirSync(distAppDir, { recursive: true });
          }
          let distManifest = {};
          if (fs3.existsSync(distAppPath)) {
            distManifest = JSON.parse(fs3.readFileSync(distAppPath, "utf8"));
          }
          if (srcManifest["app-plus"]?.distribute?.plugins) {
            if (!distManifest.plus)
              distManifest.plus = {};
            if (!distManifest.plus.distribute)
              distManifest.plus.distribute = {};
            distManifest.plus.distribute.plugins = srcManifest["app-plus"].distribute.plugins;
            fs3.writeFileSync(distAppPath, JSON.stringify(distManifest, null, 2));
            console.log("\u2705 Manifest plugins \u540C\u6B65\u6210\u529F");
          }
        } catch (error) {
          console.error("\u274C \u540C\u6B65 manifest plugins \u5931\u8D25:", error);
        }
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig(({ command, mode }) => {
  console.log("command, mode -> ", command, mode);
  const { UNI_PLATFORM } = process4.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);
  const env = loadEnv(mode, path4.resolve(process4.cwd(), "env"));
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
    VITE_COPY_NATIVE_RES_ENABLE
  } = env;
  console.log("\u73AF\u5883\u53D8\u91CF env -> ", env);
  return defineConfig({
    envDir: "./env",
    // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      UniPages({
        exclude: ["**/components/**/**.*"],
        // pages 目录为 src/pages，分包目录不能配置在pages目录下！！
        // 是个数组，可以配置多个，但是不能为pages里面的目录！！
        subPackages: [
          "src/pages-fg",
          // 这个是相对必要的路由，尽量留着（登录页、注册页、404页等）
          "src/pages-sub"
          // 这个多为示例代码，参考用的，开发完后注释掉即可（或者直接删除）
        ],
        dts: "src/types/uni-pages.d.ts"
      }),
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      // Optimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
      Optimization({
        enable: {
          "optimization": true,
          "async-import": true,
          "async-component": true
        },
        dts: {
          base: "src/types"
        },
        logger: false
      }),
      // UniXXX 需要在 Uni 之前引入
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue");
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"],
        // 自动导入 hooks
        vueTemplate: true
        // default false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_TIME%", dayjs().format("YYYY-MM-DD HH:mm:ss")).replace("%VITE_APP_TITLE%", VITE_APP_TITLE);
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" && mode === "production" && visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      // 原生插件资源复制插件 - 仅在 app 平台且启用时生效
      createCopyNativeResourcesPlugin(
        UNI_PLATFORM === "app" && VITE_COPY_NATIVE_RES_ENABLE === "true",
        {
          verbose: mode === "development"
          // 开发模式显示详细日志
        }
      ),
      syncManifestPlugin(),
      Components({
        extensions: ["vue"],
        deep: true,
        // 是否递归扫描子目录，
        directoryAsNamespace: false,
        // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts"
        // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
      UniKuRoot(),
      Uni(),
      // 自动打开开发者工具插件 (必须修改 .env 文件中的 VITE_WX_APPID)
      openDevTools()
    ],
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE)
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ]
      }
    },
    resolve: {
      alias: {
        "@": path4.join(process4.cwd(), "./src"),
        "@img": path4.join(process4.cwd(), "./src/static/images")
      }
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          // 后端有/api前缀则不做处理，没有则需要去掉
          rewrite: (path5) => path5.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
        }
      } : void 0
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : ["debugger"]
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "esbuild"
    }
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9vcGVuLWRldi10b29scy5qcyIsICJ2aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzIiwgInZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hlbnNoYW9jb25nL3dvcmsvdGVzdC91bmliZXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvY2hlbnNoYW9jb25nL3dvcmsvdGVzdC91bmliZXN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9jaGVuc2hhb2Nvbmcvd29yay90ZXN0L3VuaWJlc3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cydcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xuaW1wb3J0IFVuaUxheW91dHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWxheW91dHMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdFxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktcGFnZXNcbmltcG9ydCBVbmlQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxuLy8gXHU5NzAwXHU4OTgxXHU0RTBFIEB1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wYWdlcyBcdTYzRDJcdTRFRjZcdTRFMDBcdThENzdcdTRGN0ZcdTc1MjhcbmltcG9ydCBVbmlQbGF0Zm9ybSBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGxhdGZvcm0nXG4vKipcbiAqIFx1NTIwNlx1NTMwNVx1NEYxOFx1NTMxNlx1MzAwMVx1NkEyMVx1NTc1N1x1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1OEMwM1x1NzUyOFx1MzAwMVx1N0VDNFx1NEVGNlx1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1NUYxNVx1NzUyOFxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXJcbiAqL1xuaW1wb3J0IE9wdGltaXphdGlvbiBmcm9tICdAdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXInXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW5pLWt1L3Jvb3RcbmltcG9ydCBVbmlLdVJvb3QgZnJvbSAnQHVuaS1rdS9yb290J1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0J1xuaW1wb3J0IG9wZW5EZXZUb29scyBmcm9tICcuL3NjcmlwdHMvb3Blbi1kZXYtdG9vbHMnXG5pbXBvcnQgeyBjcmVhdGVDb3B5TmF0aXZlUmVzb3VyY2VzUGx1Z2luIH0gZnJvbSAnLi92aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzJ1xuaW1wb3J0IHN5bmNNYW5pZmVzdFBsdWdpbiBmcm9tICcuL3ZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIEBzZWUgaHR0cHM6Ly91bm9jc3MuZGV2L1xuICAvLyBjb25zdCBVbm9DU1MgPSAoYXdhaXQgaW1wb3J0KCd1bm9jc3Mvdml0ZScpKS5kZWZhdWx0XG4gIC8vIGNvbnNvbGUubG9nKG1vZGUgPT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSAvLyB0cnVlXG5cbiAgLy8gbW9kZTogXHU1MzNBXHU1MjA2XHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU4RkQ4XHU2NjJGXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXG4gIGNvbnNvbGUubG9nKCdjb21tYW5kLCBtb2RlIC0+ICcsIGNvbW1hbmQsIG1vZGUpXG4gIC8vIHBucG0gZGV2Omg1IFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBzZXJ2ZSBkZXZlbG9wbWVudFxuICAvLyBwbnBtIGJ1aWxkOmg1IFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBwcm9kdWN0aW9uXG4gIC8vIHBucG0gZGV2Om1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgZGV2ZWxvcG1lbnQgKFx1NkNFOFx1NjEwRlx1NTMzQVx1NTIyQlx1RkYwQ2NvbW1hbmRcdTRFM0FidWlsZClcbiAgLy8gcG5wbSBidWlsZDptcC13ZWl4aW4gXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgLy8gcG5wbSBkZXY6YXBwIFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBkZXZlbG9wbWVudCAoXHU2Q0U4XHU2MTBGXHU1MzNBXHU1MjJCXHVGRjBDY29tbWFuZFx1NEUzQWJ1aWxkKVxuICAvLyBwbnBtIGJ1aWxkOmFwcCBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxuICAvLyBkZXYgXHU1NDhDIGJ1aWxkIFx1NTQ3RFx1NEVFNFx1NTNFRlx1NEVFNVx1NTIwNlx1NTIyQlx1NEY3Rlx1NzUyOCAuZW52LmRldmVsb3BtZW50IFx1NTQ4QyAuZW52LnByb2R1Y3Rpb24gXHU3Njg0XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG5cbiAgY29uc3QgeyBVTklfUExBVEZPUk0gfSA9IHByb2Nlc3MuZW52XG4gIGNvbnNvbGUubG9nKCdVTklfUExBVEZPUk0gLT4gJywgVU5JX1BMQVRGT1JNKSAvLyBcdTVGOTdcdTUyMzAgbXAtd2VpeGluLCBoNSwgYXBwIFx1N0I0OVxuXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdlbnYnKSlcbiAgY29uc3Qge1xuICAgIFZJVEVfQVBQX1BPUlQsXG4gICAgVklURV9TRVJWRVJfQkFTRVVSTCxcbiAgICBWSVRFX0FQUF9USVRMRSxcbiAgICBWSVRFX0RFTEVURV9DT05TT0xFLFxuICAgIFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxuICAgIFZJVEVfQVBQX1BST1hZX0VOQUJMRSxcbiAgICBWSVRFX0FQUF9QUk9YWV9QUkVGSVgsXG4gICAgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFLFxuICB9ID0gZW52XG4gIGNvbnNvbGUubG9nKCdcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0YgZW52IC0+ICcsIGVudilcblxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBlbnZEaXI6ICcuL2VudicsIC8vIFx1ODFFQVx1NUI5QVx1NEU0OWVudlx1NzZFRVx1NUY1NVxuICAgIGJhc2U6IFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFVuaVBhZ2VzKHtcbiAgICAgICAgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoqLyoqLionXSxcbiAgICAgICAgLy8gcGFnZXMgXHU3NkVFXHU1RjU1XHU0RTNBIHNyYy9wYWdlc1x1RkYwQ1x1NTIwNlx1NTMwNVx1NzZFRVx1NUY1NVx1NEUwRFx1ODBGRFx1OTE0RFx1N0Y2RVx1NTcyOHBhZ2VzXHU3NkVFXHU1RjU1XHU0RTBCXHVGRjAxXHVGRjAxXG4gICAgICAgIC8vIFx1NjYyRlx1NEUyQVx1NjU3MFx1N0VDNFx1RkYwQ1x1NTNFRlx1NEVFNVx1OTE0RFx1N0Y2RVx1NTkxQVx1NEUyQVx1RkYwQ1x1NEY0Nlx1NjYyRlx1NEUwRFx1ODBGRFx1NEUzQXBhZ2VzXHU5MUNDXHU5NzYyXHU3Njg0XHU3NkVFXHU1RjU1XHVGRjAxXHVGRjAxXG4gICAgICAgIHN1YlBhY2thZ2VzOiBbXG4gICAgICAgICAgJ3NyYy9wYWdlcy1mZycsIC8vIFx1OEZEOVx1NEUyQVx1NjYyRlx1NzZGOFx1NUJGOVx1NUZDNVx1ODk4MVx1NzY4NFx1OERFRlx1NzUzMVx1RkYwQ1x1NUMzRFx1OTFDRlx1NzU1OVx1Nzc0MFx1RkYwOFx1NzY3Qlx1NUY1NVx1OTg3NVx1MzAwMVx1NkNFOFx1NTE4Q1x1OTg3NVx1MzAwMTQwNFx1OTg3NVx1N0I0OVx1RkYwOVxuICAgICAgICAgICdzcmMvcGFnZXMtc3ViJywgLy8gXHU4RkQ5XHU0RTJBXHU1OTFBXHU0RTNBXHU3OTNBXHU0RjhCXHU0RUUzXHU3ODAxXHVGRjBDXHU1M0MyXHU4MDAzXHU3NTI4XHU3Njg0XHVGRjBDXHU1RjAwXHU1M0QxXHU1QjhDXHU1NDBFXHU2Q0U4XHU5MUNBXHU2Mzg5XHU1MzczXHU1M0VGXHVGRjA4XHU2MjE2XHU4MDA1XHU3NkY0XHU2M0E1XHU1MjIwXHU5NjY0XHVGRjA5XG4gICAgICAgIF0sXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy91bmktcGFnZXMuZC50cycsXG4gICAgICB9KSxcbiAgICAgIFVuaUxheW91dHMoKSxcbiAgICAgIFVuaVBsYXRmb3JtKCksXG4gICAgICBVbmlNYW5pZmVzdCgpLFxuICAgICAgLy8gT3B0aW1pemF0aW9uIFx1NjNEMlx1NEVGNlx1OTcwMFx1ODk4MSBwYWdlLmpzb24gXHU2NTg3XHU0RUY2XHVGRjBDXHU2NTQ1XHU1RTk0XHU1NzI4IFVuaVBhZ2VzIFx1NjNEMlx1NEVGNlx1NEU0Qlx1NTQwRVx1NjI2N1x1ODg0Q1xuICAgICAgT3B0aW1pemF0aW9uKHtcbiAgICAgICAgZW5hYmxlOiB7XG4gICAgICAgICAgJ29wdGltaXphdGlvbic6IHRydWUsXG4gICAgICAgICAgJ2FzeW5jLWltcG9ydCc6IHRydWUsXG4gICAgICAgICAgJ2FzeW5jLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGR0czoge1xuICAgICAgICAgIGJhc2U6ICdzcmMvdHlwZXMnLFxuICAgICAgICB9LFxuICAgICAgICBsb2dnZXI6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICAvLyBVbmlYWFggXHU5NzAwXHU4OTgxXHU1NzI4IFVuaSBcdTRFNEJcdTUyNERcdTVGMTVcdTUxNjVcbiAgICAgIHtcbiAgICAgICAgLy8gXHU0RTM0XHU2NUY2XHU4OUUzXHU1MUIzIGRjbG91ZGlvIFx1NUI5OFx1NjVCOVx1NzY4NCBAZGNsb3VkaW8vdW5pLW1wLWNvbXBpbGVyIFx1NTFGQVx1NzNCMFx1NzY4NFx1N0YxNlx1OEJEMSBCVUdcbiAgICAgICAgLy8gXHU1M0MyXHU4MDAzIGdpdGh1YiBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RjbG91ZGlvL3VuaS1hcHAvaXNzdWVzLzQ5NTJcbiAgICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU2M0QyXHU0RUY2XHU3OTgxXHU3NTI4IHZpdGU6dnVlIFx1NjNEMlx1NEVGNlx1NzY4NCBkZXZUb29sc0VuYWJsZWRcdUZGMENcdTVGM0FcdTUyMzZcdTdGMTZcdThCRDEgdnVlIFx1NkEyMVx1Njc3Rlx1NjVGNiBpbmxpbmUgXHU0RTNBIHRydWVcbiAgICAgICAgbmFtZTogJ2ZpeC12aXRlLXBsdWdpbi12dWUnLFxuICAgICAgICBjb25maWdSZXNvbHZlZChjb25maWcpIHtcbiAgICAgICAgICBjb25zdCBwbHVnaW4gPSBjb25maWcucGx1Z2lucy5maW5kKHAgPT4gcC5uYW1lID09PSAndml0ZTp2dWUnKVxuICAgICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLmFwaSAmJiBwbHVnaW4uYXBpLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5hcGkub3B0aW9ucy5kZXZUb29sc0VuYWJsZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBVbm9DU1MoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd1bmktYXBwJ10sXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy9hdXRvLWltcG9ydC5kLnRzJyxcbiAgICAgICAgZGlyczogWydzcmMvaG9va3MnXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IGhvb2tzXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICB9KSxcbiAgICAgIFZpdGVSZXN0YXJ0KHtcbiAgICAgICAgLy8gXHU5MDFBXHU4RkM3XHU4RkQ5XHU0RTJBXHU2M0QyXHU0RUY2XHVGRjBDXHU1NzI4XHU0RkVFXHU2NTM5dml0ZS5jb25maWcuanNcdTY1ODdcdTRFRjZcdTUyMTlcdTRFMERcdTk3MDBcdTg5ODFcdTkxQ0RcdTY1QjBcdThGRDBcdTg4NENcdTRFNUZcdTc1MUZcdTY1NDhcdTkxNERcdTdGNkVcbiAgICAgICAgcmVzdGFydDogWyd2aXRlLmNvbmZpZy5qcyddLFxuICAgICAgfSksXG4gICAgICAvLyBoNVx1NzNBRlx1NTg4M1x1NTg5RVx1NTJBMCBCVUlMRF9USU1FIFx1NTQ4QyBCVUlMRF9CUkFOQ0hcbiAgICAgIFVOSV9QTEFURk9STSA9PT0gJ2g1JyAmJiB7XG4gICAgICAgIG5hbWU6ICdodG1sLXRyYW5zZm9ybScsXG4gICAgICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgnJUJVSUxEX1RJTUUlJywgZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSkucmVwbGFjZSgnJVZJVEVfQVBQX1RJVExFJScsIFZJVEVfQVBQX1RJVExFKVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjI1M1x1NTMwNVx1NTIwNlx1Njc5MFx1NjNEMlx1NEVGNlx1RkYwQ2g1ICsgXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2MjREXHU1RjM5XHU1MUZBXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNSdcbiAgICAgICYmIG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xuICAgICAgJiYgdmlzdWFsaXplcih7XG4gICAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgfSksXG4gICAgICAvLyBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTU5MERcdTUyMzZcdTYzRDJcdTRFRjYgLSBcdTRFQzVcdTU3MjggYXBwIFx1NUU3M1x1NTNGMFx1NEUxNFx1NTQyRlx1NzUyOFx1NjVGNlx1NzUxRlx1NjU0OFxuICAgICAgY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbihcbiAgICAgICAgVU5JX1BMQVRGT1JNID09PSAnYXBwJyAmJiBWSVRFX0NPUFlfTkFUSVZFX1JFU19FTkFCTEUgPT09ICd0cnVlJyxcbiAgICAgICAge1xuICAgICAgICAgIHZlcmJvc2U6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsIC8vIFx1NUYwMFx1NTNEMVx1NkEyMVx1NUYwRlx1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NjVFNVx1NUZEN1xuICAgICAgICB9LFxuICAgICAgKSxcbiAgICAgIHN5bmNNYW5pZmVzdFBsdWdpbigpLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgICAgIGRlZXA6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OTAxMlx1NUY1Mlx1NjI2Qlx1NjNDRlx1NUI1MFx1NzZFRVx1NUY1NVx1RkYwQ1xuICAgICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjI4QVx1NzZFRVx1NUY1NVx1NTQwRFx1NEY1Q1x1NEUzQVx1NTQ3RFx1NTQwRFx1N0E3QVx1OTVGNFx1NTI0RFx1N0YwMFx1RkYwQ3RydWUgXHU2NUY2XHU3RUM0XHU0RUY2XHU1NDBEXHU0RTNBIFx1NzZFRVx1NUY1NVx1NTQwRCtcdTdFQzRcdTRFRjZcdTU0MERcdUZGMENcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsIC8vIFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NzY4NFx1N0VDNFx1NEVGNlx1N0M3Qlx1NTc4Qlx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1RkYwOFx1NzUyOFx1NEU4RSBUeXBlU2NyaXB0IFx1NjUyRlx1NjMwMVx1RkYwOVxuICAgICAgfSksXG4gICAgICAvLyBcdTgyRTVcdTVCNThcdTU3MjhcdTY1MzlcdTUzRDggcGFnZXMuanNvbiBcdTc2ODRcdTYzRDJcdTRFRjZcdUZGMENcdThCRjdcdTVDMDYgVW5pS3VSb290IFx1NjUzRVx1N0Y2RVx1NTE3Nlx1NTQwRVxuICAgICAgVW5pS3VSb290KCksXG4gICAgICBVbmkoKSxcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NjNEMlx1NEVGNiAoXHU1RkM1XHU5ODdCXHU0RkVFXHU2NTM5IC5lbnYgXHU2NTg3XHU0RUY2XHU0RTJEXHU3Njg0IFZJVEVfV1hfQVBQSUQpXG4gICAgICBvcGVuRGV2VG9vbHMoKSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgX19WSVRFX0FQUF9QUk9YWV9fOiBKU09OLnN0cmluZ2lmeShWSVRFX0FQUF9QUk9YWV9FTkFCTEUpLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAvLyBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgIC8vICAgLy8gXHU2MzA3XHU1QjlBXHU3NkVFXHU2ODA3XHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICAgICAgLy8gICBvdmVycmlkZUJyb3dzZXJzbGlzdDogWyc+IDElJywgJ2xhc3QgMiB2ZXJzaW9ucyddLFxuICAgICAgICAgIC8vIH0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJy4vc3JjJyksXG4gICAgICAgICdAaW1nJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuL3NyYy9zdGF0aWMvaW1hZ2VzJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBobXI6IHRydWUsXG4gICAgICBwb3J0OiBOdW1iZXIucGFyc2VJbnQoVklURV9BUFBfUE9SVCwgMTApLFxuICAgICAgLy8gXHU0RUM1IEg1IFx1N0FFRlx1NzUxRlx1NjU0OFx1RkYwQ1x1NTE3Nlx1NEVENlx1N0FFRlx1NEUwRFx1NzUxRlx1NjU0OFx1RkYwOFx1NTE3Nlx1NEVENlx1N0FFRlx1OEQ3MGJ1aWxkXHVGRjBDXHU0RTBEXHU4RDcwZGV2U2VydmVyKVxuICAgICAgcHJveHk6IEpTT04ucGFyc2UoVklURV9BUFBfUFJPWFlfRU5BQkxFKVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIFtWSVRFX0FQUF9QUk9YWV9QUkVGSVhdOiB7XG4gICAgICAgICAgICAgIHRhcmdldDogVklURV9TRVJWRVJfQkFTRVVSTCxcbiAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgICAvLyBcdTU0MEVcdTdBRUZcdTY3MDkvYXBpXHU1MjREXHU3RjAwXHU1MjE5XHU0RTBEXHU1MDVBXHU1OTA0XHU3NDA2XHVGRjBDXHU2Q0ExXHU2NzA5XHU1MjE5XHU5NzAwXHU4OTgxXHU1M0JCXHU2Mzg5XG4gICAgICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke1ZJVEVfQVBQX1BST1hZX1BSRUZJWH1gKSwgJycpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgZHJvcDogVklURV9ERUxFVEVfQ09OU09MRSA9PT0gJ3RydWUnID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbJ2RlYnVnZ2VyJ10sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgIC8vIFx1NjVCOVx1NEZCRlx1OTc1RWg1XHU3QUVGXHU4QzAzXHU4QkQ1XG4gICAgICAvLyBzb3VyY2VtYXA6IFZJVEVfU0hPV19TT1VSQ0VNQVAgPT09ICd0cnVlJywgLy8gXHU5RUQ4XHU4QkE0XHU2NjJGZmFsc2VcbiAgICAgIHRhcmdldDogJ2VzNicsXG4gICAgICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMERcdTc1MjhcdTUzOEJcdTdGMjlcbiAgICAgIG1pbmlmeTogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyA/IGZhbHNlIDogJ2VzYnVpbGQnLFxuICAgIH0sXG4gIH0pXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hlbnNoYW9jb25nL3dvcmsvdGVzdC91bmliZXN0L3NjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jaGVuc2hhb2Nvbmcvd29yay90ZXN0L3VuaWJlc3Qvc2NyaXB0cy9vcGVuLWRldi10b29scy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hlbnNoYW9jb25nL3dvcmsvdGVzdC91bmliZXN0L3NjcmlwdHMvb3Blbi1kZXYtdG9vbHMuanNcIjtpbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5cbi8qKlxuICogXHU2MjUzXHU1RjAwXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XG4gKi9cbmZ1bmN0aW9uIF9vcGVuRGV2VG9vbHMoKSB7XG4gIGNvbnN0IHBsYXRmb3JtID0gcHJvY2Vzcy5wbGF0Zm9ybSAvLyBkYXJ3aW4sIHdpbjMyLCBsaW51eFxuICBjb25zdCB7IFVOSV9QTEFURk9STSB9ID0gcHJvY2Vzcy5lbnYgLy8gIG1wLXdlaXhpbiwgbXAtYWxpcGF5XG5cbiAgY29uc3QgdW5pUGxhdGZvcm1UZXh0ID0gVU5JX1BMQVRGT1JNID09PSAnbXAtd2VpeGluJyA/ICdcdTVGQUVcdTRGRTFcdTVDMEZcdTdBMEJcdTVFOEYnIDogVU5JX1BMQVRGT1JNID09PSAnbXAtYWxpcGF5JyA/ICdcdTY1MkZcdTRFRDhcdTVCOURcdTVDMEZcdTdBMEJcdTVFOEYnIDogJ1x1NUMwRlx1N0EwQlx1NUU4RidcblxuICAvLyBcdTk4NzlcdTc2RUVcdThERUZcdTVGODRcdUZGMDhcdTY3ODRcdTVFRkFcdThGOTNcdTUxRkFcdTc2RUVcdTVGNTVcdUZGMDlcbiAgY29uc3QgcHJvamVjdFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgYGRpc3QvZGV2LyR7VU5JX1BMQVRGT1JNfWApXG5cbiAgLy8gXHU2OEMwXHU2N0U1XHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XG4gIGlmICghZnMuZXhpc3RzU3luYyhwcm9qZWN0UGF0aCkpIHtcbiAgICBjb25zb2xlLmxvZyhgXHUyNzRDICR7dW5pUGxhdGZvcm1UZXh0fVx1Njc4NFx1NUVGQVx1NzZFRVx1NUY1NVx1NEUwRFx1NUI1OFx1NTcyODpgLCBwcm9qZWN0UGF0aClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURFODAgXHU2QjYzXHU1NzI4XHU2MjUzXHU1RjAwJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3Li4uYClcblxuICAvLyBcdTY4MzlcdTYzNkVcdTRFMERcdTU0MENcdTY0Q0RcdTRGNUNcdTdDRkJcdTdFREZcdTYyNjdcdTg4NENcdTRFMERcdTU0MENcdTU0N0RcdTRFRTRcbiAgbGV0IGNvbW1hbmQgPSAnJ1xuXG4gIGlmIChwbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAvLyBtYWNPU1xuICAgIGlmIChVTklfUExBVEZPUk0gPT09ICdtcC13ZWl4aW4nKSB7XG4gICAgICBjb21tYW5kID0gYC9BcHBsaWNhdGlvbnMvd2VjaGF0d2ViZGV2dG9vbHMuYXBwL0NvbnRlbnRzL01hY09TL2NsaSAtbyBcIiR7cHJvamVjdFBhdGh9XCJgXG4gICAgfVxuICAgIGVsc2UgaWYgKFVOSV9QTEFURk9STSA9PT0gJ21wLWFsaXBheScpIHtcbiAgICAgIGNvbW1hbmQgPSBgL0FwcGxpY2F0aW9ucy9cdTVDMEZcdTdBMEJcdTVFOEZcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcuYXBwL0NvbnRlbnRzL01hY09TL1x1NUMwRlx1N0EwQlx1NUU4Rlx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3NyAtLXAgXCIke3Byb2plY3RQYXRofVwiYFxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChwbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fCBwbGF0Zm9ybSA9PT0gJ3dpbjY0Jykge1xuICAgIC8vIFdpbmRvd3NcbiAgICBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtd2VpeGluJykge1xuICAgICAgY29tbWFuZCA9IGBcIkM6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcVGVuY2VudFxcXFxcdTVGQUVcdTRGRTF3ZWJcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcXFxcY2xpLmJhdFwiIC1vIFwiJHtwcm9qZWN0UGF0aH1cImBcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gTGludXggXHU2MjE2XHU1MTc2XHU0RUQ2XHU3Q0ZCXHU3RURGXG4gICAgY29uc29sZS5sb2coJ1x1Mjc0QyBcdTVGNTNcdTUyNERcdTdDRkJcdTdFREZcdTRFMERcdTY1MkZcdTYzMDFcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTVGQUVcdTRGRTFcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcnKVxuICAgIHJldHVyblxuICB9XG5cbiAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhgXHUyNzRDIFx1NjI1M1x1NUYwMCR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NTkzMVx1OEQyNTpgLCBlcnJvci5tZXNzYWdlKVxuICAgICAgY29uc29sZS5sb2coYFx1RDgzRFx1RENBMSBcdThCRjdcdTc4NkVcdTRGREQke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTY3MERcdTUyQTFcdTdBRUZcdTUzRTNcdTVERjJcdTU0MkZcdTc1MjhgKVxuICAgICAgY29uc29sZS5sb2coYFx1RDgzRFx1RENBMSBcdTUzRUZcdTRFRTVcdTYyNEJcdTUyQThcdTYyNTNcdTVGMDAke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTVFNzZcdTVCRkNcdTUxNjVcdTk4NzlcdTc2RUU6YCwgcHJvamVjdFBhdGgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoc3RkZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnXHUyNkEwXHVGRTBGIFx1OEI2Nlx1NTQ0QTonLCBzdGRlcnIpXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYFx1MjcwNSAke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTVERjJcdTYyNTNcdTVGMDBgKVxuXG4gICAgaWYgKHN0ZG91dCkge1xuICAgICAgY29uc29sZS5sb2coc3Rkb3V0KVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3BlbkRldlRvb2xzKCkge1xuICAvLyBcdTk5OTZcdTZCMjFcdTY3ODRcdTVFRkFcdTY4MDdcdThCQjBcbiAgbGV0IGlzRmlyc3RCdWlsZCA9IHRydWVcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICd1bmktZGV2dG9vbHMnLFxuICAgIHdyaXRlQnVuZGxlKCkge1xuICAgICAgaWYgKGlzRmlyc3RCdWlsZCAmJiBwcm9jZXNzLmVudi5VTklfUExBVEZPUk0/LmluY2x1ZGVzKCdtcCcpKSB7XG4gICAgICAgIGlzRmlyc3RCdWlsZCA9IGZhbHNlXG4gICAgICAgIF9vcGVuRGV2VG9vbHMoKVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2NoZW5zaGFvY29uZy93b3JrL3Rlc3QvdW5pYmVzdC92aXRlLXBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jaGVuc2hhb2Nvbmcvd29yay90ZXN0L3VuaWJlc3Qvdml0ZS1wbHVnaW5zL2NvcHktbmF0aXZlLXJlc291cmNlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hlbnNoYW9jb25nL3dvcmsvdGVzdC91bmliZXN0L3ZpdGUtcGx1Z2lucy9jb3B5LW5hdGl2ZS1yZXNvdXJjZXMudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXG5cbi8qKlxuICogXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU5MTREXHU3RjZFXHU2M0E1XHU1M0UzXG4gKlxuICogXHU2ODM5XHU2MzZFIFVuaUFwcCBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWwjJUU2JTlDJUFDJUU1JTlDJUIwJUU2JThGJTkyJUU0JUJCJUI2LSVFOSU5RCU5RSVFNSU4NiU4NSVFNyVCRCVBRSVFNSU4RSU5RiVFNyU5NCU5RiVFNiU4RiU5MiVFNCVCQiVCNlxuICogXHU2NzJDXHU1NzMwXHU2M0QyXHU0RUY2XHU1RTk0XHU4QkU1XHU1QjU4XHU1MEE4XHU1NzI4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU0RTBCXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29weU5hdGl2ZVJlc291cmNlc09wdGlvbnMge1xuICAvKiogXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4XHU2M0QyXHU0RUY2ICovXG4gIGVuYWJsZT86IGJvb2xlYW5cbiAgLyoqXG4gICAqIFx1NkU5MFx1NzZFRVx1NUY1NVx1OERFRlx1NUY4NFx1RkYwQ1x1NzZGOFx1NUJGOVx1NEU4RVx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVxuICAgKiBcdTlFRDhcdThCQTRcdTRFM0EgJ25hdGl2ZXBsdWdpbnMnXHVGRjBDXHU3QjI2XHU1NDA4IFVuaUFwcCBcdTVCOThcdTY1QjlcdTg5QzRcdTgzMDNcbiAgICogQHNlZSBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWwjJUU2JTlDJUFDJUU1JTlDJUIwJUU2JThGJTkyJUU0JUJCJUI2LSVFOSU5RCU5RSVFNSU4NiU4NSVFNyVCRCVBRSVFNSU4RSU5RiVFNyU5NCU5RiVFNiU4RiU5MiVFNCVCQiVCNlxuICAgKi9cbiAgc291cmNlRGlyPzogc3RyaW5nXG4gIC8qKlxuICAgKiBcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcdUZGMENcdTY3ODRcdTVFRkFcdTU0MEVcdTU3MjggZGlzdCBcdTc2RUVcdTVGNTVcdTRFMkRcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcdTU0MERcbiAgICogXHU5RUQ4XHU4QkE0XHU0RTNBICduYXRpdmVwbHVnaW5zJ1x1RkYwQ1x1NEUwRVx1NkU5MFx1NzZFRVx1NUY1NVx1NEZERFx1NjMwMVx1NEUwMFx1ODFGNFxuICAgKi9cbiAgdGFyZ2V0RGlyTmFtZT86IHN0cmluZ1xuICAvKiogXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU4QkU2XHU3RUM2XHU2NUU1XHU1RkQ3XHVGRjBDXHU0RkJGXHU0RThFXHU4QzAzXHU4QkQ1XHU1NDhDXHU3NkQxXHU2M0E3XHU1OTBEXHU1MjM2XHU4RkM3XHU3QTBCICovXG4gIHZlcmJvc2U/OiBib29sZWFuXG4gIC8qKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTY1RTVcdTVGRDdcdTUyNERcdTdGMDBcdUZGMENcdTc1MjhcdTRFOEVcdTUzM0FcdTUyMDZcdTRFMERcdTU0MENcdTYzRDJcdTRFRjZcdTc2ODRcdTY1RTVcdTVGRDdcdThGOTNcdTUxRkEgKi9cbiAgbG9nUHJlZml4Pzogc3RyaW5nXG59XG5cbi8qKlxuICogXHU5RUQ4XHU4QkE0XHU5MTREXHU3RjZFXG4gKlxuICogXHU2ODM5XHU2MzZFIFVuaUFwcCBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTg5QzRcdTgzMDNcdThCQkVcdTdGNkVcdTlFRDhcdThCQTRcdTUwM0NcdUZGMUFcbiAqIC0gc291cmNlRGlyOiAnbmF0aXZlcGx1Z2lucycgLSBcdTdCMjZcdTU0MDhcdTVCOThcdTY1QjlcdTY3MkNcdTU3MzBcdTYzRDJcdTRFRjZcdTVCNThcdTUwQThcdTg5QzRcdTgzMDNcbiAqIC0gdGFyZ2V0RGlyTmFtZTogJ25hdGl2ZXBsdWdpbnMnIC0gXHU2Nzg0XHU1RUZBXHU1NDBFXHU0RkREXHU2MzAxXHU3NkY4XHU1NDBDXHU3Njg0XHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0XG4gKi9cbmNvbnN0IERFRkFVTFRfT1BUSU9OUzogUmVxdWlyZWQ8Q29weU5hdGl2ZVJlc291cmNlc09wdGlvbnM+ID0ge1xuICBlbmFibGU6IHRydWUsXG4gIHNvdXJjZURpcjogJ25hdGl2ZXBsdWdpbnMnLFxuICB0YXJnZXREaXJOYW1lOiAnbmF0aXZlcGx1Z2lucycsXG4gIHZlcmJvc2U6IHRydWUsXG4gIGxvZ1ByZWZpeDogJ1tjb3B5LW5hdGl2ZS1yZXNvdXJjZXNdJyxcbn1cblxuLyoqXG4gKiBVbmlBcHAgXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2XG4gKlxuICogXHU1MjlGXHU4MEZEXHU4QkY0XHU2NjBFXHVGRjFBXG4gKiAxLiBcdTg5RTNcdTUxQjMgVW5pQXBwIFx1NEY3Rlx1NzUyOFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NjVGNlx1RkYwQ1x1NjI1M1x1NTMwNVx1NTQwRVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NjI3RVx1NEUwRFx1NTIzMFx1NzY4NFx1OTVFRVx1OTg5OFxuICogMi4gXHU1QzA2XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU1OTBEXHU1MjM2XHU1MjMwXHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHU0RTJEXG4gKiAzLiBcdTY1MkZcdTYzMDEgQW5kcm9pZCBcdTU0OEMgaU9TIFx1NUU3M1x1NTNGMFx1NzY4NFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlxuICogNC4gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTY3ODRcdTVFRkFcdTY1RjZcdTc1MUZcdTY1NDhcdUZGMENcdTUxNzZcdTRFRDZcdTVFNzNcdTUzRjBcdUZGMDhINVx1MzAwMVx1NUMwRlx1N0EwQlx1NUU4Rlx1RkYwOVx1NEUwRFx1NjI2N1x1ODg0Q1xuICpcbiAqIFx1NEY3Rlx1NzUyOFx1NTczQVx1NjY2Rlx1RkYxQVxuICogLSBcdTRGN0ZcdTc1MjhcdTRFODYgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1RkYwOFx1OTc1RVx1NEU5MVx1N0FFRlx1NjNEMlx1NEVGNlx1RkYwOVxuICogLSBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTUzMDVcdTU0MkJcdTk4OURcdTU5MTZcdTc2ODRcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdUZGMDhcdTU5ODIgLnNvIFx1NUU5M1x1NjU4N1x1NEVGNlx1MzAwMVx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1N0I0OVx1RkYwOVxuICogLSBcdTk3MDBcdTg5ODFcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTc2ODRcdTVCOENcdTY1NzRcdTc2RUVcdTVGNTVcdTdFRDNcdTY3ODRcbiAqXG4gKiBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTUzQzJcdTgwMDNcdUZGMUFcbiAqIEBzZWUgaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sIyVFNiU5QyVBQyVFNSU5QyVCMCVFNiU4RiU5MiVFNCVCQiVCNi0lRTklOUQlOUUlRTUlODYlODUlRTclQkQlQUUlRTUlOEUlOUYlRTclOTQlOUYlRTYlOEYlOTIlRTQlQkIlQjZcbiAqIEBzZWUgaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi90dXRvcmlhbC9udnVlLWFwaS5odG1sI2RvbVxuICpcbiAqIEBwYXJhbSBvcHRpb25zIFx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVx1OTAwOVx1OTg3OVxuICogQHJldHVybnMgVml0ZSBcdTYzRDJcdTRFRjZcdTVCRjlcdThDNjFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlOYXRpdmVSZXNvdXJjZXMob3B0aW9uczogQ29weU5hdGl2ZVJlc291cmNlc09wdGlvbnMgPSB7fSk6IFBsdWdpbiB7XG4gIGNvbnN0IGNvbmZpZyA9IHsgLi4uREVGQVVMVF9PUFRJT05TLCAuLi5vcHRpb25zIH1cblxuICAvLyBcdTU5ODJcdTY3OUNcdTYzRDJcdTRFRjZcdTg4QUJcdTc5ODFcdTc1MjhcdUZGMENcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTdBN0FcdTYzRDJcdTRFRjZcbiAgaWYgKCFjb25maWcuZW5hYmxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdjb3B5LW5hdGl2ZS1yZXNvdXJjZXMtZGlzYWJsZWQnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB3cml0ZUJ1bmRsZSgpIHtcbiAgICAgICAgLy8gXHU2M0QyXHU0RUY2XHU1REYyXHU3OTgxXHU3NTI4XHVGRjBDXHU0RTBEXHU2MjY3XHU4ODRDXHU0RUZCXHU0RjU1XHU2NENEXHU0RjVDXG4gICAgICB9LFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2NvcHktbmF0aXZlLXJlc291cmNlcycsXG4gICAgYXBwbHk6ICdidWlsZCcsIC8vIFx1NTNFQVx1NTcyOFx1Njc4NFx1NUVGQVx1NjVGNlx1NUU5NFx1NzUyOFxuICAgIGVuZm9yY2U6ICdwb3N0JywgLy8gXHU1NzI4XHU1MTc2XHU0RUQ2XHU2M0QyXHU0RUY2XHU2MjY3XHU4ODRDXHU1QjhDXHU2QkQ1XHU1NDBFXHU2MjY3XHU4ODRDXG5cbiAgICBhc3luYyB3cml0ZUJ1bmRsZSgpIHtcbiAgICAgIGNvbnN0IHsgc291cmNlRGlyLCB0YXJnZXREaXJOYW1lLCB2ZXJib3NlLCBsb2dQcmVmaXggfSA9IGNvbmZpZ1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdThERUZcdTVGODRcbiAgICAgICAgY29uc3QgcHJvamVjdFJvb3QgPSBwcm9jZXNzLmN3ZCgpXG5cbiAgICAgICAgLy8gXHU2Nzg0XHU1RUZBXHU2RTkwXHU3NkVFXHU1RjU1XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjA4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHVGRjA5XG4gICAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBwYXRoLnJlc29sdmUocHJvamVjdFJvb3QsIHNvdXJjZURpcilcblxuICAgICAgICAvLyBcdTY3ODRcdTVFRkFcdTc2RUVcdTY4MDdcdThERUZcdTVGODRcdUZGMUFkaXN0L1tidWlsZHxkZXZdL1twbGF0Zm9ybV0vbmF0aXZlcGx1Z2luc1xuICAgICAgICAvLyBidWlsZE1vZGU6ICdidWlsZCcgKFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4MykgXHU2MjE2ICdkZXYnIChcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODMpXG4gICAgICAgIC8vIHBsYXRmb3JtOiAnYXBwJyAoQXBwXHU1RTczXHU1M0YwKSBcdTYyMTZcdTUxNzZcdTRFRDZcdTVFNzNcdTUzRjBcdTY4MDdcdThCQzZcbiAgICAgICAgY29uc3QgYnVpbGRNb2RlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdidWlsZCcgOiAnZGV2J1xuICAgICAgICBjb25zdCBwbGF0Zm9ybSA9IHByb2Nlc3MuZW52LlVOSV9QTEFURk9STSB8fCAnYXBwJ1xuICAgICAgICBjb25zdCB0YXJnZXRQYXRoID0gcGF0aC5yZXNvbHZlKFxuICAgICAgICAgIHByb2plY3RSb290LFxuICAgICAgICAgICdkaXN0JyxcbiAgICAgICAgICBidWlsZE1vZGUsXG4gICAgICAgICAgcGxhdGZvcm0sXG4gICAgICAgICAgdGFyZ2V0RGlyTmFtZSxcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NkU5MFx1NzZFRVx1NUY1NVx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTRFMERcdTVCNThcdTU3MjggbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdUZGMENcdThCRjRcdTY2MEVcdTk4NzlcdTc2RUVcdTZDQTFcdTY3MDlcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcbiAgICAgICAgY29uc3Qgc291cmNlRXhpc3RzID0gYXdhaXQgZnMucGF0aEV4aXN0cyhzb3VyY2VQYXRoKVxuICAgICAgICBpZiAoIXNvdXJjZUV4aXN0cykge1xuICAgICAgICAgIGlmICh2ZXJib3NlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdTRFMERcdTVCNThcdTU3MjhcdUZGMENcdThERjNcdThGQzdcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNgKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0OiAke3NvdXJjZVBhdGh9YClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NTk4Mlx1OTcwMFx1NEY3Rlx1NzUyOFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1RkYwQ1x1OEJGN1x1NTcyOFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NTIxQlx1NUVGQSBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NWApXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTVFNzZcdTYzMDlcdTcxNjdcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTY1M0VcdTUxNjVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1ODdcdTRFRjZgKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU1M0MyXHU4MDAzOiBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWxgKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NkU5MFx1NzZFRVx1NUY1NVx1NjYyRlx1NTQyNlx1NEUzQVx1N0E3QVxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcdTRGNDZcdTRFM0FcdTdBN0FcdUZGMENcdTRFNUZcdThERjNcdThGQzdcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNcbiAgICAgICAgY29uc3Qgc291cmNlRmlsZXMgPSBhd2FpdCBmcy5yZWFkZGlyKHNvdXJjZVBhdGgpXG4gICAgICAgIGlmIChzb3VyY2VGaWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAodmVyYm9zZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1XHU0RTNBXHU3QTdBXHVGRjBDXHU4REYzXHU4RkM3XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDYClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1OERFRlx1NUY4NDogJHtzb3VyY2VQYXRofWApXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdThCRjdcdTU3MjggbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdTRFMkRcdTY1M0VcdTUxNjVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1ODdcdTRFRjZgKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NVx1NTNDQVx1NTE3Nlx1NzIzNlx1NzZFRVx1NUY1NVx1NUI1OFx1NTcyOFxuICAgICAgICBhd2FpdCBmcy5lbnN1cmVEaXIodGFyZ2V0UGF0aClcblxuICAgICAgICBpZiAodmVyYm9zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU1RjAwXHU1OUNCXHU1OTBEXHU1MjM2IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjYuLi5gKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1OiAke3NvdXJjZVBhdGh9YClcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NTogJHt0YXJnZXRQYXRofWApXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEY6ICR7YnVpbGRNb2RlfWApXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTc2RUVcdTY4MDdcdTVFNzNcdTUzRjA6ICR7cGxhdGZvcm19YClcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NTNEMVx1NzNCMCAke3NvdXJjZUZpbGVzLmxlbmd0aH0gXHU0RTJBXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NTg3XHU0RUY2L1x1NzZFRVx1NUY1NWApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTYyNjdcdTg4NENcdTY1ODdcdTRFRjZcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNcbiAgICAgICAgLy8gXHU1QzA2XHU2NTc0XHU0RTJBIG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU1OTBEXHU1MjM2XHU1MjMwXHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XG4gICAgICAgIGF3YWl0IGZzLmNvcHkoc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwge1xuICAgICAgICAgIG92ZXJ3cml0ZTogdHJ1ZSwgLy8gXHU4OTg2XHU3NkQ2XHU1REYyXHU1QjU4XHU1NzI4XHU3Njg0XHU2NTg3XHU0RUY2XHVGRjBDXHU3ODZFXHU0RkREXHU0RjdGXHU3NTI4XHU2NzAwXHU2NUIwXHU3MjQ4XHU2NzJDXG4gICAgICAgICAgZXJyb3JPbkV4aXN0OiBmYWxzZSwgLy8gXHU1OTgyXHU2NzlDXHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHU1QjU4XHU1NzI4XHU0RTBEXHU2MkE1XHU5NTE5XG4gICAgICAgICAgcHJlc2VydmVUaW1lc3RhbXBzOiB0cnVlLCAvLyBcdTRGRERcdTYzMDFcdTY1ODdcdTRFRjZcdTc2ODRcdTY1RjZcdTk1RjRcdTYyMzNcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAodmVyYm9zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHUyNzA1IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTU5MERcdTUyMzZcdTVCOENcdTYyMTBgKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU1REYyXHU2MjEwXHU1MjlGXHU1OTBEXHU1MjM2ICR7c291cmNlRmlsZXMubGVuZ3RofSBcdTRFMkFcdTY1ODdcdTRFRjYvXHU3NkVFXHU1RjU1XHU1MjMwXHU2Nzg0XHU1RUZBXHU3NkVFXHU1RjU1YClcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NzNCMFx1NTcyOFx1NTNFRlx1NEVFNVx1NTcyOCBBcHAgXHU0RTJEXHU2QjYzXHU1RTM4XHU0RjdGXHU3NTI4YClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Y29uZmlnLmxvZ1ByZWZpeH0gXHUyNzRDIFx1NTkwRFx1NTIzNiBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU1OTMxXHU4RDI1OmAsIGVycm9yKVxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbmZpZy5sb2dQcmVmaXh9IFx1OTUxOVx1OEJFRlx1OEJFNlx1NjBDNTpgLCBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Y29uZmlnLmxvZ1ByZWZpeH0gXHU4QkY3XHU2OEMwXHU2N0U1XHU2RTkwXHU3NkVFXHU1RjU1XHU2NzQzXHU5NjUwXHU1NDhDXHU3OEMxXHU3NkQ4XHU3QTdBXHU5NUY0YClcbiAgICAgICAgLy8gXHU0RTBEXHU2MjlCXHU1MUZBXHU5NTE5XHU4QkVGXHVGRjBDXHU5MDdGXHU1MTREXHU1RjcxXHU1NENEXHU2NTc0XHU0RTJBXHU2Nzg0XHU1RUZBXHU4RkM3XHU3QTBCXHVGRjBDXHU0RjQ2XHU0RjFBXHU4QkIwXHU1RjU1XHU4QkU2XHU3RUM2XHU3Njg0XHU5NTE5XHU4QkVGXHU0RkUxXHU2MDZGXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuXG4vKipcbiAqIFx1NTIxQlx1NUVGQSBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2XHU3Njg0XHU0RkJGXHU2Mzc3XHU1MUZEXHU2NTcwXG4gKlxuICogXHU4RkQ5XHU2NjJGXHU0RTAwXHU0RTJBXHU0RkJGXHU2Mzc3XHU3Njg0XHU1REU1XHU1MzgyXHU1MUZEXHU2NTcwXHVGRjBDXHU3NTI4XHU0RThFXHU1RkVCXHU5MDFGXHU1MjFCXHU1RUZBXHU2M0QyXHU0RUY2XHU1QjlFXHU0RjhCXG4gKiBcdTcyNzlcdTUyMkJcdTkwMDJcdTc1MjhcdTRFOEVcdTU3Mjggdml0ZS5jb25maWcudHMgXHU0RTJEXHU4RkRCXHU4ODRDXHU2NzYxXHU0RUY2XHU2MDI3XHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXG4gKlxuICogXHU0RjdGXHU3NTI4XHU3OTNBXHU0RjhCXHVGRjFBXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBcdTU3Mjggdml0ZS5jb25maWcudHMgXHU0RTJEXG4gKiBwbHVnaW5zOiBbXG4gKiAgIC8vIFx1NEVDNVx1NTcyOCBhcHAgXHU1RTczXHU1M0YwXHU0RTE0XHU1NDJGXHU3NTI4XHU2NUY2XHU3NTFGXHU2NTQ4XG4gKiAgIFVOSV9QTEFURk9STSA9PT0gJ2FwcCdcbiAqICAgICA/IGNyZWF0ZUNvcHlOYXRpdmVSZXNvdXJjZXNQbHVnaW4oXG4gKiAgICAgICAgIFZJVEVfQ09QWV9OQVRJVkVfUkVTX0VOQUJMRSA9PT0gJ3RydWUnLFxuICogICAgICAgICB7IHZlcmJvc2U6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgfVxuICogICAgICAgKVxuICogICAgIDogbnVsbCxcbiAqIF1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBlbmFibGUgXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4XHU2M0QyXHU0RUY2XHVGRjBDXHU5MDFBXHU1RTM4XHU5MDFBXHU4RkM3XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU2M0E3XHU1MjM2XG4gKiBAcGFyYW0gb3B0aW9ucyBcdTUxNzZcdTRFRDZcdTkxNERcdTdGNkVcdTkwMDlcdTk4NzlcdUZGMENcdTRFMERcdTUzMDVcdTU0MkIgZW5hYmxlIFx1NUM1RVx1NjAyN1xuICogQHJldHVybnMgVml0ZSBcdTYzRDJcdTRFRjZcdTVCRjlcdThDNjFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvcHlOYXRpdmVSZXNvdXJjZXNQbHVnaW4oXG4gIGVuYWJsZTogYm9vbGVhbiA9IHRydWUsXG4gIG9wdGlvbnM6IE9taXQ8Q29weU5hdGl2ZVJlc291cmNlc09wdGlvbnMsICdlbmFibGUnPiA9IHt9LFxuKTogUGx1Z2luIHtcbiAgcmV0dXJuIGNvcHlOYXRpdmVSZXNvdXJjZXMoeyBlbmFibGUsIC4uLm9wdGlvbnMgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2NoZW5zaGFvY29uZy93b3JrL3Rlc3QvdW5pYmVzdC92aXRlLXBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jaGVuc2hhb2Nvbmcvd29yay90ZXN0L3VuaWJlc3Qvdml0ZS1wbHVnaW5zL3N5bmMtbWFuaWZlc3QtcGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hlbnNoYW9jb25nL3dvcmsvdGVzdC91bmliZXN0L3ZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcblxuaW50ZXJmYWNlIE1hbmlmZXN0VHlwZSB7XG4gICdwbHVzJz86IHtcbiAgICBkaXN0cmlidXRlPzoge1xuICAgICAgcGx1Z2lucz86IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgICB9XG4gIH1cbiAgJ2FwcC1wbHVzJz86IHtcbiAgICBkaXN0cmlidXRlPzoge1xuICAgICAgcGx1Z2lucz86IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3luY01hbmlmZXN0UGx1Z2luKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3N5bmMtbWFuaWZlc3QnLFxuICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgIGVuZm9yY2U6ICdwb3N0JyxcbiAgICB3cml0ZUJ1bmRsZToge1xuICAgICAgb3JkZXI6ICdwb3N0JyxcbiAgICAgIGhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHNyY01hbmlmZXN0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLi9zcmMvbWFuaWZlc3QuanNvbicpXG4gICAgICAgIGNvbnN0IGRpc3RBcHBQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuL2Rpc3QvZGV2L2FwcC9tYW5pZmVzdC5qc29uJylcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFx1OEJGQlx1NTNENlx1NkU5MFx1NjU4N1x1NEVGNlxuICAgICAgICAgIGNvbnN0IHNyY01hbmlmZXN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoc3JjTWFuaWZlc3RQYXRoLCAndXRmOCcpKSBhcyBNYW5pZmVzdFR5cGVcblxuICAgICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NVx1NUI1OFx1NTcyOFxuICAgICAgICAgIGNvbnN0IGRpc3RBcHBEaXIgPSBwYXRoLmRpcm5hbWUoZGlzdEFwcFBhdGgpXG4gICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RBcHBEaXIpKSB7XG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlzdEFwcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBcdThCRkJcdTUzRDZcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdUZGMDhcdTU5ODJcdTY3OUNcdTVCNThcdTU3MjhcdUZGMDlcbiAgICAgICAgICBsZXQgZGlzdE1hbmlmZXN0OiBNYW5pZmVzdFR5cGUgPSB7fVxuICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpc3RBcHBQYXRoKSkge1xuICAgICAgICAgICAgZGlzdE1hbmlmZXN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZGlzdEFwcFBhdGgsICd1dGY4JykpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2RTkwXHU2NTg3XHU0RUY2XHU1QjU4XHU1NzI4IHBsdWdpbnNcbiAgICAgICAgICBpZiAoc3JjTWFuaWZlc3RbJ2FwcC1wbHVzJ10/LmRpc3RyaWJ1dGU/LnBsdWdpbnMpIHtcbiAgICAgICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1NjU4N1x1NEVGNlx1NEUyRFx1NjcwOVx1NUZDNVx1ODk4MVx1NzY4NFx1NUJGOVx1OEM2MVx1N0VEM1x1Njc4NFxuICAgICAgICAgICAgaWYgKCFkaXN0TWFuaWZlc3QucGx1cylcbiAgICAgICAgICAgICAgZGlzdE1hbmlmZXN0LnBsdXMgPSB7fVxuICAgICAgICAgICAgaWYgKCFkaXN0TWFuaWZlc3QucGx1cy5kaXN0cmlidXRlKVxuICAgICAgICAgICAgICBkaXN0TWFuaWZlc3QucGx1cy5kaXN0cmlidXRlID0ge31cblxuICAgICAgICAgICAgLy8gXHU1OTBEXHU1MjM2IHBsdWdpbnMgXHU1MTg1XHU1QkI5XG4gICAgICAgICAgICBkaXN0TWFuaWZlc3QucGx1cy5kaXN0cmlidXRlLnBsdWdpbnMgPSBzcmNNYW5pZmVzdFsnYXBwLXBsdXMnXS5kaXN0cmlidXRlLnBsdWdpbnNcblxuICAgICAgICAgICAgLy8gXHU1MTk5XHU1MTY1XHU2NkY0XHU2NUIwXHU1NDBFXHU3Njg0XHU1MTg1XHU1QkI5XG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpc3RBcHBQYXRoLCBKU09OLnN0cmluZ2lmeShkaXN0TWFuaWZlc3QsIG51bGwsIDIpKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1MjcwNSBNYW5pZmVzdCBwbHVnaW5zIFx1NTQwQ1x1NkI2NVx1NjIxMFx1NTI5RicpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBcdTU0MENcdTZCNjUgbWFuaWZlc3QgcGx1Z2lucyBcdTU5MzFcdThEMjU6JywgZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxPQUFPQSxXQUFVO0FBQ2xULE9BQU9DLGNBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8saUJBQWlCO0FBRXhCLE9BQU8sY0FBYztBQUdyQixPQUFPLGlCQUFpQjtBQUt4QixPQUFPLGtCQUFrQjtBQUV6QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLGlCQUFpQjs7O0FDekJ1UyxTQUFTLFlBQVk7QUFDcFYsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sYUFBYTtBQUtwQixTQUFTLGdCQUFnQjtBQUN2QixRQUFNLFdBQVcsUUFBUTtBQUN6QixRQUFNLEVBQUUsYUFBYSxJQUFJLFFBQVE7QUFFakMsUUFBTSxrQkFBa0IsaUJBQWlCLGNBQWMsbUNBQVUsaUJBQWlCLGNBQWMseUNBQVc7QUFHM0csUUFBTSxjQUFjLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxZQUFZLFlBQVksRUFBRTtBQUcxRSxNQUFJLENBQUMsR0FBRyxXQUFXLFdBQVcsR0FBRztBQUMvQixZQUFRLElBQUksVUFBSyxlQUFlLCtDQUFZLFdBQVc7QUFDdkQ7QUFBQSxFQUNGO0FBRUEsVUFBUSxJQUFJLHFDQUFVLGVBQWUsbUNBQVU7QUFHL0MsTUFBSSxVQUFVO0FBRWQsTUFBSSxhQUFhLFVBQVU7QUFFekIsUUFBSSxpQkFBaUIsYUFBYTtBQUNoQyxnQkFBVSw4REFBOEQsV0FBVztBQUFBLElBQ3JGLFdBQ1MsaUJB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
