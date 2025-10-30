# 图标文件说明

## 所需图标

### map-pin.png
地图标记点图标

**规格要求：**
- 尺寸：32x40 像素（推荐64x80或更高分辨率）
- 格式：PNG（带透明背景）
- 样式：地图标记pin样式

**临时解决方案：**

如果暂时没有图标，可以：

1. **使用 Leaflet 默认图标**
   修改 `TiandituMap.vue` 中的图标路径为：
   ```
   https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png
   ```

2. **使用 Emoji 替代**
   ```vue
   <text class="marker-icon">📍</text>
   ```

3. **在线生成图标**
   - https://www.flaticon.com/
   - 搜索 "map pin" 或"location marker"
   - 下载 PNG 格式
   - 重命名为 `map-pin.png`
   - 放入此目录

**推荐图标资源：**
- Font Awesome（需要授权）
- Material Icons（免费）
- Iconify（开源）
- Bootstrap Icons（开源）

