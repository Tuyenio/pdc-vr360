la# Hệ thống chuyển cảnh VR 360 kiểu Google Street View

## Đã triển khai

### 1. **Smooth Camera Rotation** (Xoay camera mượt mà)
- Khi click vào hotspot, camera tự động xoay về hướng đích trước khi chuyển cảnh
- Tính toán đường đi ngắn nhất (tránh xoay 270° thay vì -90°)
- Thời gian xoay: 60% đầu của transition (600ms)

```typescript
// Normalize to shortest rotation path
let yawDelta = targetYaw - startYaw;
while (yawDelta > 180) yawDelta -= 360;
while (yawDelta < -180) yawDelta += 360;
```

### 2. **Crossfade Transition** (Chuyển cảnh fade)
- Fade mượt mà giữa 2 panorama (old → new)
- Sử dụng 2 sphere overlapping với opacity động
- Thời gian fade: 850ms (từ 15% → 100% của transition)
- Easing: cubic-bezier cho chuyển động tự nhiên

### 3. **Preloading** (Tải trước cảnh kế tiếp)
- Tự động tải trước tất cả cảnh liên kết từ hotspots
- Giống Google Street View: cảnh kế tiếp load ngay khi vào cảnh hiện tại
- Sử dụng texture cache để tránh load lại

```typescript
const preloadNextScenes = () => {
  scene.hotspots.forEach((hotspot) => {
    const nextScene = sceneById.get(hotspot.targetId);
    if (nextScene && !textureCacheRef.current.has(nextScene.image)) {
      // Load texture in background
    }
  });
};
```

### 4. **Visual Effects** (Hiệu ứng chuyển cảnh)
- **Blur**: 0 → 8px → 0 (motion blur effect)
- **Scale**: 1 → 1.02 → 1 (subtle zoom)
- **Vignette**: 0 → 0.35 → 0 (focus effect)
- Tất cả sync với progress của transition

### 5. **Transition Lock** (Khóa chuyển cảnh)
- Ngăn spam click vào hotspot
- Disable controls trong lúc transition
- Token-based cancellation cho async operations

## Cách sử dụng

### Click vào Hotspot
```typescript
<button onClick={() => goToScene(hotspot.targetId, false, hotspot)}>
  {/* Hotspot icon */}
</button>
```

### Chuyển cảnh từ Scene List
```typescript
goToScene(scene.id, true); // keepPanel = true
```

## Tham số cấu hình

```typescript
const PANORAMA_CAMERA_DISTANCE = 0.12;  // Khoảng cách camera
const duration = 1000;                   // Thời gian transition (ms)
const fadeStart = 0.15;                  // Bắt đầu fade (15%)
const rotationEnd = 0.6;                 // Kết thúc xoay camera (60%)
```

## So sánh với Google Street View

| Tính năng | Google Street View | Implementation này |
|-----------|-------------------|-------------------|
| Camera rotation | ✅ Có | ✅ Có |
| Crossfade | ✅ Có | ✅ Có |
| Preloading | ✅ Có | ✅ Có |
| Motion blur | ✅ Có | ✅ Có (CSS blur) |
| Thời gian transition | ~800ms | 1000ms |
| Easing | Custom | cubic-bezier |

## Cải tiến so với code cũ

### Trước
```typescript
// Chỉ fade đơn giản
transitionMaterial.opacity = fadeEase;
material.opacity = 1 - fadeEase;
```

### Sau
```typescript
// Camera rotation + fade + preload
if (progress < 0.6) {
  // Smooth rotation to target
  const currentYaw = startYaw + yawDelta * easeInOutCubic(rotationProgress);
  camera.position.copy(direction.multiplyScalar(-PANORAMA_CAMERA_DISTANCE));
}
// + Crossfade
// + Preload next scenes
```

## Hotspot Configuration

Mỗi hotspot cần có:
```typescript
{
  targetId: "scene-2",
  label: "Vào sân trước",
  yaw: 118,        // Hướng hotspot (độ)
  pitch: -20,      // Góc pitch (độ)
  rotation: 0      // Xoay icon (optional)
}
```

## Performance Tips

1. **Texture Cache**: Giữ textures đã load trong memory
2. **Anisotropy**: Giới hạn ở 8 (balance quality/performance)
3. **Pixel Ratio**: Clamp ở 1.8 (tránh over-render trên màn hình 4K)
4. **Geometry**: 128x72 segments (đủ smooth cho sphere)

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS/macOS)
- ✅ Mobile browsers
- ⚠️ VR mode cần DeviceOrientation API (iOS cần permission)

## Keyboard Shortcuts (có thể thêm)

```typescript
// Suggestion for future enhancement
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPreviousScene();
    if (e.key === 'ArrowRight') goToNextScene();
    if (e.key === 'f') toggleFullscreen();
  };
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

## Minimap (có thể thêm)

```typescript
// Hiển thị vị trí trên bản đồ 2D
const SceneMinimap = () => {
  return (
    <div className="absolute top-4 left-4 w-48 h-48 bg-white/10 rounded-lg">
      <svg viewBox="0 0 200 200">
        {scenes.map(scene => (
          <circle
            key={scene.id}
            cx={scene.mapX}
            cy={scene.mapY}
            r={scene.id === currentSceneId ? 8 : 4}
            fill={scene.id === currentSceneId ? "#e8cfa8" : "#fff"}
          />
        ))}
        {/* Draw connections */}
      </svg>
    </div>
  );
};
```

## Debug Mode

Thêm vào để debug transitions:
```typescript
const [debugMode, setDebugMode] = useState(false);

// In render
{debugMode && (
  <div className="fixed top-20 left-4 bg-black/80 text-white p-2 text-xs">
    <div>Scene: {currentSceneId}</div>
    <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
    <div>Transitioning: {isTransitioning ? 'Yes' : 'No'}</div>
    <div>FOV: {currentFovRef.current.toFixed(1)}°</div>
    <div>Cached: {textureCacheRef.current.size} textures</div>
  </div>
)}
```

## Kết luận

Hệ thống chuyển cảnh hiện tại đã implement đầy đủ các tính năng chính của Google Street View:
- ✅ Smooth camera rotation
- ✅ Crossfade transition
- ✅ Preloading
- ✅ Visual effects
- ✅ Transition locking
- ✅ Texture caching

Trải nghiệm người dùng mượt mà, tự nhiên và professional.
