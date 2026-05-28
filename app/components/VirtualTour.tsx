"use client";

import {
  Compass,
  Info,
  Layers3,
  LucideIcon,
  MapPin,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type SceneId =
  | "scene-1"
  | "scene-2"
  | "scene-3a"
  | "scene-3b"
  | "scene-4"
  | "scene-5"
  | "scene-6"
  | "scene-7"
  | "scene-8a"
  | "scene-8b"
  | "scene-9"
  | "scene-10"
  | "scene-11";

type Hotspot = {
  targetId: SceneId;
  label: string;
  yaw: number;
  pitch: number;
  rotation?: number;
};

type TourScene = {
  id: SceneId;
  order: string;
  title: string;
  location: "Đình Làng Định Công Thượng" | "Nhà thờ Tổ nghề Kim hoàn";
  image: string;
  initialYaw: number;
  hotspots: Hotspot[];
};

type Panel = "scenes" | "info" | "map" | "settings" | null;

const basePath = "/images/Đình Làng-Nhà thờ tổ nghề";
const hotspotIcon = encodeURI("/icon/hotspotelement.png");
const heroImage = encodeURI(`${basePath}/5. Bên trái vào Đình Thành Hoàng Làng.jpg`);
const dinhCardImage = encodeURI(`${basePath}/1. trước cổng.jpg`);
const shrineCardImage = encodeURI(`${basePath}/9. Nhà thờ tổ nghề Kim Hoàn.jpg`);

const panoramaPath = (fileName: string) => encodeURI(`${basePath}/${fileName}`);

const scenes: TourScene[] = [
  {
    id: "scene-1",
    order: "01",
    title: "Trước cổng",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("1. trước cổng.jpg"),
    initialYaw: 0,
    hotspots: [{ targetId: "scene-2", label: "Vào sân trước", yaw: 0, pitch: -18 }],
  },
  {
    id: "scene-2",
    order: "02",
    title: "Sân trước",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("2. Sân trước.jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-1", label: "Ra cổng", yaw: 180, pitch: -18, rotation: 180 },
      { targetId: "scene-3a", label: "Qua hồ sâu", yaw: 0, pitch: -16 },
    ],
  },
  {
    id: "scene-3a",
    order: "03A",
    title: "Hồ sâu",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("3. Hồ sâu .jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-2", label: "Quay lại sân trước", yaw: 180, pitch: -18, rotation: 180 },
      { targetId: "scene-3b", label: "Xem góc hồ sâu phụ", yaw: 42, pitch: -16, rotation: 20 },
      { targetId: "scene-4", label: "Lên sân Đình", yaw: 0, pitch: -15 },
    ],
  },
  {
    id: "scene-3b",
    order: "03B",
    title: "Hồ sâu, góc phụ",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("3. Hồ sâu.jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-3a", label: "Trở lại hồ sâu", yaw: 180, pitch: -16, rotation: 180 },
      { targetId: "scene-4", label: "Lên sân Đình", yaw: 0, pitch: -15 },
    ],
  },
  {
    id: "scene-4",
    order: "04",
    title: "Sân Đình",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("4. Sân Đình.jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-3a", label: "Về hồ sâu", yaw: 180, pitch: -18, rotation: 180 },
      { targetId: "scene-5", label: "Vào Đình Thành Hoàng Làng", yaw: -18, pitch: -15 },
      { targetId: "scene-10", label: "Ra sân sau", yaw: 128, pitch: -16, rotation: 105 },
    ],
  },
  {
    id: "scene-5",
    order: "05",
    title: "Bên trái vào Đình Thành Hoàng Làng",
    location: "Đình Làng Định Công Thượng",
    image: heroImage,
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-4", label: "Ra sân Đình", yaw: 175, pitch: -18, rotation: 180 },
      { targetId: "scene-6", label: "Vào Công Đồng", yaw: 0, pitch: -14 },
      {
        targetId: "scene-8a",
        label: "Sang Nhà thờ tổ nghề Kim Hoàn",
        yaw: 78,
        pitch: -14,
        rotation: 35,
      },
    ],
  },
  {
    id: "scene-6",
    order: "06",
    title: "Công Đồng",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("6. Công Đồng.jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-5", label: "Ra lối bên trái", yaw: 180, pitch: -16, rotation: 180 },
      { targetId: "scene-7", label: "Đến ban thờ Thần Nông", yaw: 0, pitch: -14 },
    ],
  },
  {
    id: "scene-7",
    order: "07",
    title: "Ban thờ Thần Nông",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("7 Ban thờ Thần Nông.jpg"),
    initialYaw: 0,
    hotspots: [{ targetId: "scene-6", label: "Quay lại Công Đồng", yaw: 180, pitch: -16, rotation: 180 }],
  },
  {
    id: "scene-8a",
    order: "08A",
    title: "Bên phải nối vào Đền thờ tổ nghề Kim Hoàn",
    location: "Nhà thờ Tổ nghề Kim hoàn",
    image: panoramaPath("8  Bên Phải Nối Vào Đền Thờ Tổ Nghề Kim Hoàn.jpg"),
    initialYaw: 0,
    hotspots: [
      {
        targetId: "scene-5",
        label: "Trở lại Đình Thành Hoàng Làng",
        yaw: 180,
        pitch: -16,
        rotation: 180,
      },
      { targetId: "scene-8b", label: "Theo đường vào tổ nghề", yaw: 0, pitch: -15 },
    ],
  },
  {
    id: "scene-8b",
    order: "08B",
    title: "Đường vào tổ nghề",
    location: "Nhà thờ Tổ nghề Kim hoàn",
    image: panoramaPath("8 đường vào tổ nghề.jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-8a", label: "Quay lại lối nối", yaw: 180, pitch: -16, rotation: 180 },
      { targetId: "scene-9", label: "Vào Nhà thờ tổ nghề Kim Hoàn", yaw: 0, pitch: -14 },
    ],
  },
  {
    id: "scene-9",
    order: "09",
    title: "Nhà thờ tổ nghề Kim Hoàn",
    location: "Nhà thờ Tổ nghề Kim hoàn",
    image: panoramaPath("9. Nhà thờ tổ nghề Kim Hoàn.jpg"),
    initialYaw: 0,
    hotspots: [
      { targetId: "scene-8b", label: "Ra đường vào tổ nghề", yaw: 180, pitch: -16, rotation: 180 },
      { targetId: "scene-11", label: "Xem toàn cảnh khu di tích", yaw: 44, pitch: -15, rotation: 25 },
    ],
  },
  {
    id: "scene-10",
    order: "10",
    title: "Sân Sau",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("Sân Sau.jpg"),
    initialYaw: 0,
    hotspots: [{ targetId: "scene-4", label: "Quay lại sân Đình", yaw: 180, pitch: -16, rotation: 180 }],
  },
  {
    id: "scene-11",
    order: "11",
    title: "Toàn cảnh khu di tích",
    location: "Nhà thờ Tổ nghề Kim hoàn",
    image: panoramaPath("photo360(2).jpg"),
    initialYaw: 0,
    hotspots: [{ targetId: "scene-9", label: "Về Nhà thờ tổ nghề", yaw: 180, pitch: -16, rotation: 180 }],
  },
];

const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));

function directionFromYawPitch(yaw: number, pitch: number) {
  const yawRad = THREE.MathUtils.degToRad(yaw);
  const pitchRad = THREE.MathUtils.degToRad(pitch);
  const cosPitch = Math.cos(pitchRad);

  return new THREE.Vector3(
    Math.sin(yawRad) * cosPitch,
    Math.sin(pitchRad),
    -Math.cos(yawRad) * cosPitch,
  );
}

export default function VirtualTour() {
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return <WelcomeScreen onEnter={() => setHasEntered(true)} />;
  }

  return <TourExperience />;
}

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<{ alpha: number; beta: number; gamma: number } | null>(null);
  const [isSupported] = useState(
    () => typeof window !== "undefined" && "DeviceOrientationEvent" in window,
  );

  const requestPermission = useCallback(async () => {
    const orientationEvent = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<PermissionState>;
    };

    if (typeof orientationEvent.requestPermission === "function") {
      try {
        const permission = await orientationEvent.requestPermission();
        if (permission === 'granted') {
          return true;
        }
      } catch (error) {
        console.error('Permission denied:', error);
        return false;
      }
    }
    return true;
  }, []);

  const startListening = useCallback(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        setOrientation({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
        });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return { orientation, isSupported, requestPermission, startListening };
}

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(
      76,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 0.1);

    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(500, 128, 72);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const loader = new THREE.TextureLoader();
    loader.load(heroImage, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      material.map = texture;
      material.needsUpdate = true;
    });

    let rotation = 0;
    const animate = () => {
      rotation += 0.0003;
      camera.rotation.y = rotation;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      geometry.dispose();
      material.dispose();
      if (material.map) material.map.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <main className="fixed inset-0 min-h-[100dvh] overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,245,0.9)_0%,rgba(245,241,230,0.64)_36%,rgba(45,38,33,0.34)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[46dvh] bg-[radial-gradient(ellipse_at_center,rgba(255,252,245,0.96)_0%,rgba(255,252,245,0.78)_45%,rgba(255,252,245,0)_76%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_86%,rgba(166,124,82,0.26),transparent_36%),radial-gradient(circle_at_84%_12%,rgba(49,95,80,0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(74,63,53,0.08)_0_1px,transparent_1px)] bg-[length:92px_100%] opacity-60" />

      <section className="relative z-10 grid min-h-[100dvh] place-items-center px-4 py-8">
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          <div className="max-w-5xl">
            
            <h1 className="font-display-vn mt-5 text-balance text-5xl font-bold uppercase leading-[0.98] text-[var(--tour-ink)] drop-shadow-[0_2px_0_rgba(255,252,245,0.86)] sm:text-7xl lg:text-8xl">
              Số hóa di tích
              <span className="block text-[var(--primary)]">lịch sử văn hóa</span>
            </h1>
            <p className="mt-5 text-base font-extrabold text-[rgb(74_63_53_/_0.9)] sm:text-2xl">
              Đình Làng Định Công Thượng · Nhà thờ Tổ nghề Kim hoàn
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="mt-[10dvh] rounded-full border border-[rgb(255_252_245_/_0.48)] bg-[linear-gradient(135deg,#315f50,#a67c52_58%,#735a3a)] px-9 py-4 text-lg font-extrabold text-white shadow-[0_22px_58px_rgb(74_63_53_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.28)] transition hover:scale-[1.03] hover:shadow-[0_28px_70px_rgb(74_63_53_/_0.42)] active:scale-[0.98] sm:px-12 sm:text-2xl"
          >
            Khám phá ngay
          </button>

          <div className="mt-[8dvh] grid w-full max-w-2xl grid-cols-2 gap-4 px-4 sm:gap-8">
            <WelcomeCard image={dinhCardImage} label="Đình Làng" rotate="-rotate-6" />
            <WelcomeCard image={shrineCardImage} label="Nhà thờ tổ nghề" rotate="rotate-5" />
          </div>
        </div>
      </section>
    </main>
  );
}

function WelcomeCard({
  image,
  label,
  rotate,
}: {
  image: string;
  label: string;
  rotate: string;
}) {
  return (
    <div
      className={`rounded-[8px] border border-[rgb(166_124_82_/_0.18)] bg-[var(--card)] p-2 shadow-[0_22px_58px_rgb(74_63_53_/_0.24)] ${rotate}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
        <Image src={image} alt={label} fill sizes="240px" className="object-cover" priority />
      </div>
      <p className="font-display-vn py-2 text-sm font-bold text-[var(--foreground)] sm:text-base">{label}</p>
    </div>
  );
}

function TourExperience() {
  const [currentSceneId, setCurrentSceneId] = useState<SceneId>("scene-5");
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wideAngle, setWideAngle] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vrMode, setVrMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const textureCacheRef = useRef<Map<string, THREE.Texture>>(new Map());
  const hotspotRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const currentSceneRef = useRef<TourScene>(sceneById.get("scene-5")!);
  const lastOrientationRef = useRef<{ alpha: number; beta: number; gamma: number } | null>(null);

  const { orientation, isSupported: isVrSupported, requestPermission, startListening } = useDeviceOrientation();

  const activeScene = useMemo(
    () => sceneById.get(currentSceneId) ?? sceneById.get("scene-5")!,
    [currentSceneId],
  );

  const positionCamera = useCallback((scene: TourScene) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) {
      return;
    }

    const direction = directionFromYawPitch(scene.initialYaw, 0).normalize();
    camera.position.copy(direction.multiplyScalar(-0.12));
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  const updateHotspots = useCallback(() => {
    const mount = mountRef.current;
    const camera = cameraRef.current;
    const scene = currentSceneRef.current;

    if (!mount || !camera) {
      return;
    }

    const { clientWidth, clientHeight } = mount;
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    scene.hotspots.forEach((hotspot) => {
      const element = hotspotRefs.current.get(`${scene.id}-${hotspot.targetId}`);

      if (!element) {
        return;
      }

      const worldPosition = directionFromYawPitch(hotspot.yaw, hotspot.pitch)
        .normalize()
        .multiplyScalar(240);
      const isVisible = worldPosition.clone().normalize().dot(cameraDirection) > 0.08;
      const projected = worldPosition.clone().project(camera);
      const x = (projected.x * 0.5 + 0.5) * clientWidth;
      const y = (-projected.y * 0.5 + 0.5) * clientHeight;
      const isOnScreen =
        isVisible &&
        projected.z < 1 &&
        x > -80 &&
        x < clientWidth + 80 &&
        y > -80 &&
        y < clientHeight + 80;

      element.style.opacity = isOnScreen ? "1" : "0";
      element.style.pointerEvents = isOnScreen ? "auto" : "none";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.transform = `translate(-50%, -50%) scale(${isOnScreen ? 1 : 0.88})`;
    });
  }, []);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const textureCache = textureCacheRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      76,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 0.12);

    const threeScene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(500, 128, 72);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    threeScene.add(sphere);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 0.08;
    controls.maxDistance = 0.72;
    controls.rotateSpeed = -0.42;
    controls.zoomSpeed = 0.48;
    controls.minPolarAngle = 0.03;
    controls.maxPolarAngle = Math.PI - 0.03;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_ROTATE,
    };

    cameraRef.current = camera;
    controlsRef.current = controls;
    materialRef.current = material;
    positionCamera(currentSceneRef.current);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateHotspots();
    };

    const animate = () => {
      controls.update();
      updateHotspots();
      renderer.render(threeScene, camera);
    };

    renderer.setAnimationLoop(animate);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      renderer.setAnimationLoop(null);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      textureCache.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [positionCamera, updateHotspots]);

  useEffect(() => {
    const controls = controlsRef.current;

    if (controls) {
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.35;
    }
  }, [autoRotate]);

  useEffect(() => {
    const camera = cameraRef.current;

    if (camera) {
      camera.fov = wideAngle ? 88 : 76;
      camera.updateProjectionMatrix();
      updateHotspots();
    }
  }, [updateHotspots, wideAngle]);

  useEffect(() => {
    currentSceneRef.current = activeScene;
    
    // Google Street View style zoom transition
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    
    if (camera && controls) {
      setIsTransitioning(true);
      
      // Zoom in animation (0.12 -> 0.01)
      const startDistance = camera.position.length();
      const zoomInDuration = 300;
      const zoomOutDuration = 300;
      const startTime = Date.now();
      
      const animateZoomIn = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / zoomInDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        const newDistance = startDistance + (0.01 - startDistance) * eased;
        const direction = camera.position.clone().normalize();
        camera.position.copy(direction.multiplyScalar(newDistance));
        controls.update();
        
        if (progress < 1) {
          requestAnimationFrame(animateZoomIn);
        } else {
          // Switch scene at peak zoom
          positionCamera(activeScene);
          
          // Zoom out animation
          const zoomOutStart = Date.now();
          const animateZoomOut = () => {
            const elapsed = Date.now() - zoomOutStart;
            const progress = Math.min(elapsed / zoomOutDuration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            
            const newDistance = 0.01 + (0.12 - 0.01) * eased;
            const direction = camera.position.clone().normalize();
            camera.position.copy(direction.multiplyScalar(newDistance));
            controls.update();
            
            if (progress < 1) {
              requestAnimationFrame(animateZoomOut);
            } else {
              setIsTransitioning(false);
            }
          };
          animateZoomOut();
        }
      };
      animateZoomIn();
    } else {
      positionCamera(activeScene);
    }

    const material = materialRef.current;

    if (!material) {
      return;
    }

    const cachedTexture = textureCacheRef.current.get(activeScene.image);

    if (cachedTexture) {
      material.map = cachedTexture;
      material.needsUpdate = true;
      updateHotspots();
      return;
    }

    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(
      activeScene.image,
      (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        textureCacheRef.current.set(activeScene.image, texture);
        material.map = texture;
        material.needsUpdate = true;
        updateHotspots();
      },
      undefined,
      () => {
        if (!cancelled) {
          setLoadError("Không tải được ảnh panorama cho cảnh này.");
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [activeScene, positionCamera, updateHotspots]);

  // VR Mode - Device Orientation
  useEffect(() => {
    if (!vrMode || !orientation) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const last = lastOrientationRef.current;
    if (last) {
      const alphaChange = orientation.alpha - last.alpha;
      const betaChange = orientation.beta - last.beta;
      
      // Apply rotation based on device orientation
      const euler = new THREE.Euler(
        THREE.MathUtils.degToRad(betaChange * 0.5),
        THREE.MathUtils.degToRad(-alphaChange * 0.5),
        0,
        'YXZ'
      );
      
      camera.rotation.x += euler.x;
      camera.rotation.y += euler.y;
      controls.update();
    }
    
    lastOrientationRef.current = orientation;
  }, [orientation, vrMode]);

  const toggleVrMode = useCallback(async () => {
    if (!vrMode) {
      const permitted = await requestPermission();
      if (permitted) {
        startListening();
        setVrMode(true);
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }
      }
    } else {
      setVrMode(false);
      lastOrientationRef.current = null;
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    }
  }, [vrMode, requestPermission, startListening]);

  const goToScene = (sceneId: SceneId, keepPanel = false) => {
    if (sceneId !== currentSceneId) {
      setLoadError(null);
      setIsLoading(true);
      setIsTransitioning(true);
    }

    setCurrentSceneId(sceneId);
    if (!keepPanel) {
      setActivePanel(null);
    }
  };

  return (
    <main className="fixed inset-0 min-h-[100dvh] overflow-hidden bg-[var(--tour-wood)] text-white">
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(45,38,33,0.1)_0%,rgba(45,38,33,0.02)_42%,rgba(45,38,33,0.68)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-10">
        {activeScene.hotspots.map((hotspot) => (
          <button
            key={`${activeScene.id}-${hotspot.targetId}`}
            ref={(node) => {
              const key = `${activeScene.id}-${hotspot.targetId}`;

              if (node) {
                hotspotRefs.current.set(key, node);
              } else {
                hotspotRefs.current.delete(key);
              }
            }}
            type="button"
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center opacity-0 drop-shadow-[0_10px_18px_rgba(0,0,0,0.46)] transition-[opacity,transform,filter] duration-200 hover:scale-110 hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.58)] active:scale-95 sm:h-20 sm:w-20"
            style={
              {
                "--hotspot-angle": `${hotspot.rotation ?? 0}deg`,
              } as CSSProperties
            }
            onClick={() => goToScene(hotspot.targetId)}
            aria-label={hotspot.label}
            title={hotspot.label}
          >
            <Image
              src={hotspotIcon}
              alt=""
              width={128}
              height={128}
              loading="eager"
              unoptimized
              className="h-full w-full object-contain [transform:rotate(var(--hotspot-angle))]"
              draggable={false}
            />
          </button>
        ))}
      </div>

      <div
        className={`absolute left-1/2 z-30 -translate-x-1/2 transition-[bottom,width,max-width,transform] duration-300 ease-out ${
          activePanel === "scenes" ? "w-[calc(100vw-32px)] max-w-[1480px]" : "w-[min(94vw,560px)]"
        } ${activePanel === "scenes" ? "bottom-1 sm:bottom-2" : "bottom-3 sm:bottom-6"}`}
      >
        {activePanel ? (
          <section className="mb-2 max-h-[46dvh] animate-[tourPanelIn_260ms_cubic-bezier(.2,.9,.2,1)_both] overflow-hidden rounded-[8px] border border-[rgb(255_252_245_/_0.18)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.12),rgb(255_252_245_/_0.04)_38%,transparent_70%),rgb(45_38_33_/_0.48)] shadow-[0_24px_86px_rgb(0_0_0_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.18),inset_0_-1px_0_rgb(0_0_0_/_0.16)] backdrop-blur-xl backdrop-saturate-150 sm:mb-3">
            <div className="flex items-center justify-between border-b border-[rgb(255_252_245_/_0.1)] bg-[rgb(255_252_245_/_0.035)] px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Compass className="h-4 w-4 text-[var(--tour-gold-light)]" strokeWidth={1.9} />
                {panelTitle(activePanel)}
              </div>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="grid h-9 w-9 place-items-center rounded-[8px] text-white transition hover:bg-white/10 active:scale-95"
                aria-label="Đóng bảng"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            {activePanel === "scenes" ? (
              <div className="flex w-full gap-3 overflow-x-auto overflow-y-hidden px-3 py-3 [scrollbar-color:var(--tour-gold)_transparent] [scrollbar-width:thin]">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => goToScene(scene.id, true)}
                    aria-current={scene.id === activeScene.id ? "true" : undefined}
                    className={`group relative h-24 w-[68vw] shrink-0 overflow-hidden rounded-[8px] border text-left transition-[border-color,box-shadow,filter] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tour-gold-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(45_38_33_/_0.62)] active:scale-[0.99] sm:h-28 sm:w-56 lg:w-64 ${
                      scene.id === activeScene.id
                        ? "border-[var(--tour-gold-light)] bg-[rgb(192_160_128_/_0.16)] shadow-[0_0_0_2px_rgb(232_207_170_/_0.28),0_16px_40px_rgb(0_0_0_/_0.28)]"
                        : "border-white/14 bg-white/[0.04] shadow-[0_12px_30px_rgb(0_0_0_/_0.18)] hover:border-[rgb(232_207_170_/_0.46)] hover:shadow-[0_16px_38px_rgb(0_0_0_/_0.24)]"
                    }`}
                  >
                    <Image src={scene.image} alt={scene.title} fill sizes="220px" className="object-cover transition duration-500 group-hover:saturate-[1.06]" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_22%,rgba(0,0,0,0.68)_100%)] opacity-90" />
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgb(255_252_245_/_0.18),transparent)] opacity-55" />
                    <span className="absolute inset-x-3 top-2 h-px bg-[linear-gradient(90deg,transparent,rgb(255_252_245_/_0.52),transparent)]" />
                    <span className="absolute left-3 top-3 grid h-7 min-w-9 place-items-center rounded-full bg-[rgb(255_252_245_/_0.84)] px-2 font-mono text-[11px] font-bold text-[var(--tour-wood)] shadow-[0_8px_22px_rgb(0_0_0_/_0.18)]">
                      {scene.order}
                    </span>
                    <span className="absolute inset-x-3 bottom-2.5 min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">
                        {scene.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-white/58">
                        {scene.location}
                      </span>
                    </span>
                    {scene.id === activeScene.id ? (
                      <span className="absolute right-3 top-3 rounded-full border border-[rgb(255_252_245_/_0.42)] bg-[rgb(49_95_80_/_0.86)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgb(0_0_0_/_0.24)]">
                        Đang xem
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}

            {activePanel === "info" ? (
              <div className="space-y-3 p-4 text-sm leading-6 text-white/76">
                <p>
                  Di chuyển bằng chuột hoặc vuốt trên màn hình để xoay 360 độ. Dùng con
                  lăn chuột hoặc chụm hai ngón để phóng to, thu nhỏ trong không gian.
                </p>
                <p>
                  Cảnh hiện tại:{" "}
                  <span className="font-semibold text-white">{activeScene.title}</span>.
                </p>
              </div>
            ) : null}

            {activePanel === "map" ? (
              <div className="grid gap-3 p-4 text-sm text-white/76 sm:grid-cols-2">
                <LocationCard title="Nhà thờ Tổ nghề Kim hoàn" detail="Không gian thờ tổ nghề, tuyến nối từ sân Đình sang khu tổ nghề." />
                <LocationCard title="Đình Làng Định Công Thượng" detail="Cổng, sân trước, hồ sâu, sân Đình, Công Đồng và các không gian thờ tự." />
              </div>
            ) : null}

            {activePanel === "settings" ? (
              <div className="grid gap-2 p-3 sm:grid-cols-2">
                <ToggleButton
                  active={autoRotate}
                  icon={autoRotate ? Pause : Play}
                  label="Tự xoay"
                  onClick={() => setAutoRotate((value) => !value)}
                />
                <ToggleButton
                  active={wideAngle}
                  icon={Compass}
                  label="Góc rộng"
                  onClick={() => setWideAngle((value) => !value)}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {activePanel !== "scenes" ? (
          <nav className="grid grid-cols-5 overflow-hidden rounded-[8px] border border-[rgb(255_252_245_/_0.2)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.14),transparent_36%),rgb(115_90_58_/_0.62)] p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,0.32),inset_0_1px_0_rgb(255_255_255_/_0.18)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out">
            <BottomButton
              icon={Layers3}
              label="Cảnh"
              active={false}
              onClick={() => setActivePanel("scenes")}
            />
            <BottomButton
              icon={Info}
              label="Thông tin"
              active={activePanel === "info"}
              onClick={() => setActivePanel(activePanel === "info" ? null : "info")}
            />
            <BottomButton
              icon={soundEnabled ? Volume2 : VolumeX}
              label="Âm thanh"
              active={soundEnabled}
              onClick={() => setSoundEnabled((value) => !value)}
            />
            <BottomButton
              icon={MapPin}
              label="Vị trí"
              active={activePanel === "map"}
              onClick={() => setActivePanel(activePanel === "map" ? null : "map")}
            />
            <BottomButton
              icon={Settings}
              label="Cài đặt"
              active={activePanel === "settings"}
              onClick={() => setActivePanel(activePanel === "settings" ? null : "settings")}
            />
          </nav>
        ) : null}
      </div>

      {/* VR Mode Button */}
      {isVrSupported && (
        <button
          type="button"
          onClick={toggleVrMode}
          className={`fixed right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border p-3 shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all active:scale-95 sm:p-4 ${
            vrMode
              ? "border-[var(--tour-gold-light)] bg-[rgb(192_160_128_/_0.24)] text-white"
              : "border-white/20 bg-[rgb(45_38_33_/_0.48)] text-white/80 hover:bg-[rgb(45_38_33_/_0.62)]"
          }`}
          aria-label={vrMode ? "Tắt chế độ VR" : "Bật chế độ VR"}
          title={vrMode ? "Tắt chế độ VR" : "Bật chế độ VR"}
        >
          <Compass className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
        </button>
      )}

      {loadError ? (
        <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center bg-[rgb(45_38_33_/_0.46)] backdrop-blur-sm">
          <div className="w-[min(82vw,340px)] rounded-[8px] border border-[rgb(255_252_245_/_0.16)] bg-[rgb(45_38_33_/_0.62)] p-5 text-center shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <p className="text-sm font-semibold text-white">{loadError}</p>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes tourPanelIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        canvas {
          display: block;
        }
      `}</style>
    </main>
  );
}

function panelTitle(panel: Exclude<Panel, null>) {
  if (panel === "scenes") {
    return "Danh sách cảnh";
  }

  if (panel === "info") {
    return "Thông tin";
  }

  if (panel === "map") {
    return "Vị trí";
  }

  return "Cài đặt";
}

function LocationCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[8px] border border-[rgb(255_252_245_/_0.14)] bg-[rgb(255_252_245_/_0.06)] p-3">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-1 leading-6 text-white/68">{detail}</p>
    </div>
  );
}

function BottomButton({
  active,
  hideLabel = false,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  hideLabel?: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-[8px] px-1.5 py-2.5 text-center transition active:scale-95 ${
        active ? "bg-[rgb(255_252_245_/_0.2)] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.18)]" : "text-white/92 hover:bg-white/12"
      }`}
      aria-label={label}
      title={label}
    >
      <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
      {hideLabel ? null : (
        <span className="w-full truncate text-[11px] font-semibold leading-tight sm:text-sm">
          {label}
        </span>
      )}
    </button>
  );
}

function ToggleButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-[8px] border px-3 py-3 text-sm font-semibold transition active:scale-[0.99] ${
        active
          ? "border-[rgb(232_207_170_/_0.56)] bg-[rgb(192_160_128_/_0.16)] text-white"
          : "border-white/10 bg-white/[0.04] text-white/78 hover:border-white/24"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[var(--tour-gold-light)]" strokeWidth={1.9} />
        {label}
      </span>
      <span className="h-2.5 w-2.5 rounded-full bg-current opacity-80" />
    </button>
  );
}
