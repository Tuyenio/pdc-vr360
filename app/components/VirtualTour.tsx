"use client";

import {
  Info,
  Layers3,
  LucideIcon,
  MapPin,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Pause,
  Play,
  MoveRight,
  Scan,
  Settings,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import letterAnimation from "@/letter.json";

type SceneId =
  | "scene-1"
  | "scene-2"
  | "scene-3"
  | "scene-4"
  | "scene-5"
  | "scene-6"
  | "scene-7"
  | "scene-8"
  | "scene-9"
  | "scene-10"
  | "scene-11"
  | "scene-12"
  | "scene-13";

type Hotspot = {
  targetId: SceneId;
  label: string;
  yaw: number;
  pitch: number;
  rotation?: number;
  nextYaw?: number;
};

type InfoMarker = {
  id: string;
  title: string;
  eyebrow: string;
  yaw: number;
  pitch: number;
  rotation?: number;
  content: string[];
};

type TourScene = {
  id: SceneId;
  order: string;
  title: string;
  location: string;
  image: string;
  initialYaw: number;
  mapPosition: {
    x: number;
    y: number;
  };
  hotspots: Hotspot[];
  infoMarkers?: InfoMarker[];
};

type Panel = "scenes" | "info" | "map" | "settings" | null;
type MapRoute = {
  from: SceneId;
  to: SceneId;
  via?: { x: number; y: number }[];
};

const basePath = "/images-tour/Đình Làng-Đền Thờ";
const panoramaPath = (fileName: string) => encodeURI(`${basePath}/${fileName}`);
const hotspotIcon = encodeURI("/icon/hotspotelement.png");
const infoModalBackground = encodeURI("/modal/modal-2.png");
const welcomeTitleBackground = encodeURI("/modal/background-1.png");
const heroImage = encodeURI(`${basePath}/6 Trung Đình.jpg`);
const welcomeBackgroundImage = panoramaPath("3 Tả Hồ.jpg");
const dinhCardImage = encodeURI(`${basePath}/1 Cổng Đình.jpg`);
const shrineCardImage = encodeURI(`${basePath}/13 Chính điện Đền thờ Tổ nghề.jpg`);
const backgroundAudio = encodeURI("/media/Nhạc Phật Giáo sâu lắng.mp3");

const PANORAMA_CAMERA_DISTANCE = 0.12;
const DEFAULT_FOV = 76;
const WIDE_FOV = 88;
const MIN_ZOOM_FOV = 36;
const MAX_ZOOM_FOV = 96;
const AUDIO_TARGET_VOLUME = 0.2;
const AUDIO_FADE_DURATION = 650;

const clampFov = (fov: number) => THREE.MathUtils.clamp(fov, MIN_ZOOM_FOV, MAX_ZOOM_FOV);

const normalizeYaw = (yaw: number) => {
  const normalized = ((yaw + 180) % 360) - 180;
  return normalized === -180 ? 180 : normalized;
};

// Manual start-view calibration:
// Open Settings -> "Căn hướng ảnh", rotate to the desired opening view,
// then copy "Yaw hiện tại" into the matching scene's initialYaw below.
// Positive yaw turns the starting view to the right; negative yaw turns it to the left.

const scenes: TourScene[] = [
  {
    id: "scene-1",
    order: "01",
    title: "Cổng Đình",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("1 Cổng Đình.jpg"),
    initialYaw: 113,
    mapPosition: { x: 50, y: 91 },
    hotspots: [{ targetId: "scene-2", label: "Tiền Đình", yaw: 115, pitch: -20 }],
    infoMarkers: [
      {
        id: "tam-quan",
        title: "Tam quan",
        eyebrow: "Cổng Đại Môn",
        // Sửa vị trí icon tại đây: yaw xoay ngang, pitch nâng/hạ theo chiều dọc.
        yaw: 98,
        pitch: -8,
        rotation: -3,
        content: [
          "Tam Quan là lối vào chính dẫn bách gia trăm họ vào không gian linh thiêng của Đình Định Công Thượng, được xây dựng theo phong cách kiến trúc nghi môn truyền thống dưới dạng các cột trụ biểu cao vút gồm 4 trụ: hai trụ lớn ở giữa đỉnh chạm hình bốn chim phượng, hai trụ nhỏ hai bên đỉnh đắp đôi nghê chầu uốn mình uy nghiêm nhằm soi xét tâm linh con người trước khi bước vào nơi điện thờ.",
          "Trải qua bao thăng trầm thời gian và các đợt trùng tu lớn dưới thời nhà Nguyễn (thế kỷ XIX), cổng Đại Môn không chỉ là ranh giới kiến trúc chuyển tiếp từ không gian đời thường vào chốn thâm nghiêm, tách biệt sự ồn ào của phố thị hiện đại để đưa du khách bước vào khuôn viên thanh tịnh, thâm nghiêm của một di tích cổ.",
        ],
      },
    ],
  },
  {
    id: "scene-2",
    order: "02",
    title: "Tiền Đình",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("2 Tiền Đình.jpg"),
    initialYaw: 118,
    mapPosition: { x: 50, y: 76 },
    hotspots: [
      { targetId: "scene-1", label: "Cổng Đình", yaw: -75, pitch: -10, rotation: 0 },
      { targetId: "scene-3", label: "Tả Hồ", yaw: 58, pitch: -16, rotation: -35 },
      { targetId: "scene-4", label: "Hữu Hồ", yaw: 172, pitch: -16, rotation: 35 },
      { targetId: "scene-6", label: "Trung Đình", yaw: 118, pitch: -16, rotation: 0 },
    ],
  },
  {
    id: "scene-3",
    order: "03",
    title: "Tả Hồ",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("3 Tả Hồ.jpg"),
    initialYaw: 0,
    mapPosition: { x: 35, y: 65 },
    hotspots: [
      { targetId: "scene-2", label: "Tiền Đình", yaw: -40, pitch: -18, rotation: 2 },
      { targetId: "scene-8", label: "Tiền sảnh Đình làng", yaw: -220, pitch: -15, nextYaw: -180 },
    ],
  },
  {
    id: "scene-4",
    order: "04",
    title: "Hữu Hồ",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("4 Hữu Hồ.jpg"),
    initialYaw: 0,
    mapPosition: { x: 70, y: 65 },
    hotspots: [
      { targetId: "scene-2", label: "Tiền Đình", yaw: 72  , pitch: -18, rotation: -12 },
      { targetId: "scene-5", label: "Vườn cảnh phía Đông", yaw: 222, pitch: -15, rotation: -2 },
    ],
  },
  {
    id: "scene-5",
    order: "05",
    title: "Vườn cảnh phía Đông",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("5 Vườn cảnh phía Đông.jpg"),
    initialYaw: 0,
    mapPosition: { x: 84, y: 54 },
    hotspots: [
      { targetId: "scene-4", label: "Hữu Hồ", yaw: 198, pitch: -18, rotation: -10 },
      { targetId: "scene-6", label: "Trung Đình", yaw: -2, pitch: -15, rotation: 0 },
    ],
  },
  {
    id: "scene-6",
    order: "06",
    title: "Trung Đình",
    location: "Đình Làng Định Công Thượng",
    image: heroImage,
    initialYaw: 0,
    mapPosition: { x: 50, y: 55 },
    hotspots: [
      { targetId: "scene-2", label: "Tiền Đình", yaw: -78, pitch: -18, rotation: 0 },
      { targetId: "scene-7", label: "Tả đình làng", yaw: 82, pitch: -15, rotation: 0 },
      { targetId: "scene-10", label: "Sân hậu", yaw: 121, pitch: -15 },
      { targetId: "scene-11", label: "Lối dẫn sang Đền thờ Tổ", yaw: -190, pitch: -15 , rotation: 22 },
    ],
  },
  {
    id: "scene-7",
    order: "07",
    title: "Tả đình làng",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("7 Tả đình làng.jpg"),
    initialYaw: 0,
    mapPosition: { x: 44, y: 49 },
    hotspots: [
      { targetId: "scene-8", label: "Tiền sảnh Đình làng", yaw: 159, pitch: -15, rotation: 0 },
      { targetId: "scene-6", label: "Trung Đình", yaw: 49, pitch: -17, rotation: 0 },
    ],
  },
  {
    id: "scene-8",
    order: "08",
    title: "Tiền sảnh Đình làng",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("8 Tiền sảnh Đình làng.jpg"),
    initialYaw: 0,
    mapPosition: { x: 38, y: 43 },
    hotspots: [
      { targetId: "scene-9", label: "Chính điện Đình làng", yaw: -87, pitch: -14 },
      { targetId: "scene-3", label: "Tả Hồ", yaw: -166, pitch: -17, rotation: -20 },
      { targetId: "scene-7", label: "Tả đình làng", yaw: -37, pitch: -15, rotation: 10 },
    ],
  },
  {
    id: "scene-9",
    order: "09",
    title: "Chính điện Đình làng",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("9 Chính điện Đình làng.jpg"),
    initialYaw: 0,
    mapPosition: { x: 38, y: 28 },
    hotspots: [{ targetId: "scene-8", label: "Tiền sảnh Đình làng", yaw: 180, pitch: -30, rotation: -30 }],
    },
    {
      id: "scene-10",
      order: "10",
      title: "Sân hậu",
    location: "Đình Làng Định Công Thượng",
    image: panoramaPath("10 Sân hậu.jpg"),
    initialYaw: 0,
    mapPosition: { x: 50, y: 35 },
    hotspots: [{ targetId: "scene-6", label: "Trung Đình", yaw: -62, pitch: -16, rotation: 0 }],
  },
  {
    id: "scene-11",
    order: "11",
    title: "Lối dẫn sang Đền thờ Tổ",
    location: "Đền thờ Tổ nghề Kim hoàn",
    image: panoramaPath("11 Lối dẫn sang Đền thờ Tổ.jpg"),
    initialYaw: 0,
    mapPosition: { x: 67, y: 30 },
    hotspots: [
      { targetId: "scene-6", label: "Trung Đình", yaw: 31, pitch: -16, rotation: 0 },
      { targetId: "scene-12", label: "Không gian kết nối di tích", yaw: 110, pitch: -15, rotation: 10 },
    ],
  },
  {
    id: "scene-12",
    order: "12",
    title: "Không gian kết nối di tích",
    location: "Không gian kết nối",
    image: panoramaPath("12 Không gian kết nối di tích.jpg"),
    initialYaw: 0,
    mapPosition: { x: 80, y: 23 },
    hotspots: [
      { targetId: "scene-11", label: "Lối dẫn sang Đền thờ Tổ", yaw: 92, pitch: -16, rotation: 0 },
      { targetId: "scene-13", label: "Chính điện Đền thờ Tổ", yaw: -68, pitch: -14 },
    ],
  },
  {
    id: "scene-13",
    order: "13",
    title: "Chính điện Đền thờ Tổ",
    location: "Đền thờ Tổ nghề Kim hoàn",
    image: panoramaPath("13 Chính điện Đền thờ Tổ nghề.jpg"),
    initialYaw: 0,
    mapPosition: { x: 80, y: 10 },
    hotspots: [
      { targetId: "scene-12", label: "Quay lại", yaw: -68, pitch: -14 },
    ],
  },
];

const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
const mapRoutes: MapRoute[] = [
  { from: "scene-1", to: "scene-2" },
  { from: "scene-2", to: "scene-3" },
  { from: "scene-2", to: "scene-4" },
  { from: "scene-2", to: "scene-6" },
  { from: "scene-3", to: "scene-8" },
  { from: "scene-4", to: "scene-5" },
  { from: "scene-5", to: "scene-6" },
  { from: "scene-6", to: "scene-7" },
  { from: "scene-6", to: "scene-10" },
  { from: "scene-6", to: "scene-11" },
  { from: "scene-7", to: "scene-8" },
  { from: "scene-8", to: "scene-9" },
  { from: "scene-11", to: "scene-12" },
  { from: "scene-12", to: "scene-13" },
];
const locationGroups = Array.from(
  scenes
    .reduce((groups, scene) => {
      if (!groups.has(scene.location)) {
        groups.set(scene.location, scene);
      }

      return groups;
    }, new Map<string, TourScene>())
    .values(),
);
const panoramaTextureCache = new Map<string, THREE.Texture>();
const panoramaTexturePromises = new Map<string, Promise<THREE.Texture>>();
const panoramaTextureProgress = new Map<string, number>();
const panoramaTextureProgressListeners = new Map<string, Set<(progress: number) => void>>();

function notifyPanoramaProgress(image: string, progress: number) {
  panoramaTextureProgress.set(image, progress);
  panoramaTextureProgressListeners.get(image)?.forEach((listener) => listener(progress));
}

function subscribePanoramaProgress(image: string, listener?: (progress: number) => void) {
  if (!listener) {
    return () => undefined;
  }

  const listeners = panoramaTextureProgressListeners.get(image) ?? new Set<(progress: number) => void>();
  listeners.add(listener);
  panoramaTextureProgressListeners.set(image, listeners);
  listener(panoramaTextureProgress.get(image) ?? 0);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      panoramaTextureProgressListeners.delete(image);
    }
  };
}

function loadPanoramaTexture(image: string, onProgress?: (progress: number) => void) {
  const cachedTexture = panoramaTextureCache.get(image);

  if (cachedTexture) {
    onProgress?.(100);
    return Promise.resolve(cachedTexture);
  }

  const unsubscribe = subscribePanoramaProgress(image, onProgress);
  const pendingTexture = panoramaTexturePromises.get(image);

  if (pendingTexture) {
    return pendingTexture.finally(unsubscribe);
  }

  const texturePromise = new Promise<THREE.Texture>((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    notifyPanoramaProgress(image, 0);
    loader.load(
      image,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        panoramaTextureCache.set(image, texture);
        panoramaTexturePromises.delete(image);
        notifyPanoramaProgress(image, 100);
        resolve(texture);
      },
      (event) => {
        if (event.lengthComputable && event.total > 0) {
          notifyPanoramaProgress(image, Math.round((event.loaded / event.total) * 100));
        }
      },
      () => {
        panoramaTexturePromises.delete(image);
        panoramaTextureProgress.delete(image);
        reject(new Error("load-failed"));
      },
    );
  });

  panoramaTexturePromises.set(image, texturePromise);
  return texturePromise.finally(unsubscribe);
}

function preloadSceneAndHotspots(scene: TourScene) {
  loadPanoramaTexture(scene.image).catch(() => undefined);

  scene.hotspots.forEach((hotspot) => {
    const targetScene = sceneById.get(hotspot.targetId);

    if (targetScene) {
      loadPanoramaTexture(targetScene.image).catch(() => undefined);
    }
  });
}

function yawFromDirection(direction: THREE.Vector3) {
  return normalizeYaw(THREE.MathUtils.radToDeg(Math.atan2(direction.x, -direction.z)));
}

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
  const [isEntering, setIsEntering] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const enterTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFadeRef = useRef<number | null>(null);

  const fadeAudioTo = useCallback(
    (targetVolume: number, duration = AUDIO_FADE_DURATION, pauseAfter = false) => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      const setSafeVolume = (value: number) => {
        const safeValue = THREE.MathUtils.clamp(Number.isFinite(value) ? value : 0, 0, 1);
        audio.volume = safeValue;
        return safeValue;
      };

      if (audioFadeRef.current) {
        cancelAnimationFrame(audioFadeRef.current);
      }

      const clampedTarget = THREE.MathUtils.clamp(targetVolume, 0, 1);
      const startVolume = THREE.MathUtils.clamp(
        Number.isFinite(audio.volume) ? audio.volume : 0,
        0,
        1,
      );
      const delta = clampedTarget - startVolume;

      if (duration <= 0 || Math.abs(delta) < 0.01) {
        setSafeVolume(clampedTarget);
        if (pauseAfter && clampedTarget === 0) {
          audio.pause();
        }
        return;
      }

      const startTime = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setSafeVolume(startVolume + delta * easeOutCubic(progress));

        if (progress < 1) {
          audioFadeRef.current = requestAnimationFrame(tick);
          return;
        }

        audioFadeRef.current = null;
        if (pauseAfter && clampedTarget === 0) {
          audio.pause();
        }
      };

      audioFadeRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.volume = 0;
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio autoplay blocked:", error);
        return;
      }
    }

    fadeAudioTo(AUDIO_TARGET_VOLUME, AUDIO_FADE_DURATION);
  }, [fadeAudioTo]);

  const pauseAudio = useCallback(() => {
    fadeAudioTo(0, AUDIO_FADE_DURATION, true);
  }, [fadeAudioTo]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((value) => !value);
  }, []);

  const handleEnter = useCallback(() => {
    if (isEntering) {
      return;
    }

    setIsEntering(true);
    if (soundEnabled) {
      void playAudio();
    }
    if (enterTimerRef.current) {
      window.clearTimeout(enterTimerRef.current);
    }

    enterTimerRef.current = window.setTimeout(() => {
      setHasEntered(true);
    }, 720);
  }, [isEntering, playAudio, soundEnabled]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0;
    }

    return () => {
      if (audioFadeRef.current) {
        cancelAnimationFrame(audioFadeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) {
      return;
    }

    if (soundEnabled) {
      void playAudio();
    } else {
      pauseAudio();
    }
  }, [hasEntered, pauseAudio, playAudio, soundEnabled]);

  useEffect(() => {
    return () => {
      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={backgroundAudio} preload="auto" loop playsInline />
      {!hasEntered ? (
        <WelcomeScreen isEntering={isEntering} onEnter={handleEnter} />
      ) : (
        <TourExperience soundEnabled={soundEnabled} onToggleSound={toggleSound} />
      )}
    </>
  );
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

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);

  return { orientation, isSupported, requestPermission, startListening };
}

function WelcomeScreen({ isEntering, onEnter }: { isEntering: boolean; onEnter: () => void }) {
  const [isPanoramaReady, setIsPanoramaReady] = useState(false);
  const [isFirstSceneReady, setIsFirstSceneReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const canEnterTour = isPanoramaReady && isFirstSceneReady;

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

    let isDisposed = false;
    const firstScene = sceneById.get("scene-1")!;
    
    preloadSceneAndHotspots(firstScene);

    loadPanoramaTexture(firstScene.image)
      .then(() => {
        if (!isDisposed) {
          setIsFirstSceneReady(true);
        }
      })
      .catch(() => {
        if (!isDisposed) {
          setIsFirstSceneReady(true);
        }
      });

    loadPanoramaTexture(welcomeBackgroundImage)
      .then((texture) => {
        if (isDisposed) {
          return;
        }

        material.map = texture;
        material.needsUpdate = true;
        setIsPanoramaReady(true);
      })
      .catch(() => {
        if (!isDisposed) {
          setIsPanoramaReady(true);
        }
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
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <main
      className={`fixed inset-0 min-h-[100dvh] overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-[opacity,transform,filter] duration-[720ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
        isEntering ? "pointer-events-none scale-[1.02] opacity-0 blur-[2px]" : "opacity-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full sepia-[0.24] contrast-[1.24] saturate-[0.92] brightness-[0.58] transition-opacity duration-500 ${
          isPanoramaReady ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,25,19,0.58),rgba(36,28,19,0.12)_48%,rgba(12,18,14,0.62))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,232,180,0.12)_0%,rgba(65,48,31,0.12)_45%,rgba(5,8,6,0.56)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,226,176,0.15)_0%,rgba(40,31,22,0.02)_38%,rgba(10,10,8,0.46)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(0deg,rgba(255,252,245,0.18)_1px,transparent_1px)] [background-size:100%_3px]" />

      <div
        className={`absolute inset-0 z-20 grid place-items-center bg-[var(--background)] text-[var(--tour-ink)] transition-opacity duration-500 ${
          canEnterTour ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="rounded-full border border-[rgb(166_124_82_/_0.22)] bg-[rgb(255_252_245_/_0.72)] px-5 py-2 text-[0.82rem] font-black uppercase tracking-[0.18em] shadow-[0_18px_52px_rgb(74_63_53_/_0.16)]">
          Đang tải không gian 360°...
        </div>
      </div>

      <section
        className={`relative z-10 grid min-h-[100dvh] place-items-center px-4 py-8 transition-[opacity,transform] duration-500 ${
          canEnterTour ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          <div className="relative w-[min(94vw,860px)] px-5 pb-7 pt-8 sm:px-10 sm:pb-8 sm:pt-10 lg:w-[min(94vw,940px)]">
            <Image
              src={welcomeTitleBackground}
              alt=""
              fill
              priority
              sizes="1120px"
              className="pointer-events-none scale-[1.24] select-none object-contain sm:scale-[1.1] lg:scale-[1.26]"
              draggable={false}
            />
            <h1 className="font-display-vn relative text-balance text-[1.85rem] font-bold uppercase leading-[1.08] text-[var(--tour-ink)] drop-shadow-[0_2px_0_rgba(255,252,245,0.92),0_3px_8px_rgba(45,38,33,0.28)] sm:text-[3rem] sm:leading-[1] lg:text-[3.72rem]">
              Số hóa di tích
              <span className="mt-1 block text-[var(--primary)] sm:mt-0">lịch sử văn hóa</span>
            </h1>
            <p className="relative mt-3 text-[0.78rem] font-extrabold text-[rgb(58_50_44_/_0.94)] drop-shadow-[0_1px_0_rgba(255,252,245,0.76)] sm:text-[1rem]">
              Đình Làng Định Công Thượng · Đền thờ Tổ nghề Kim hoàn
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            disabled={isEntering || !canEnterTour}
            className="group relative mt-5 inline-flex min-w-[15.5rem] items-center justify-between gap-4 overflow-hidden rounded-full border border-[rgb(232_207_170_/_0.72)] bg-[linear-gradient(90deg,#173f2d_0%,#315f50_52%,#b98b56_100%)] px-5 py-2.5 text-[0.95rem] font-extrabold text-white shadow-[0_16px_48px_rgb(8_10_7_/_0.44),0_0_0_3px_rgb(185_139_86_/_0.22),inset_0_1px_0_rgb(255_255_255_/_0.26),inset_0_-1px_0_rgb(45_38_33_/_0.3)] transition-[transform,box-shadow,filter] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_62px_rgb(8_10_7_/_0.52),0_0_0_3px_rgb(232_207_170_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.34)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-6 sm:min-w-[17rem] sm:px-6 sm:py-3 sm:text-[1.04rem]"
          >
            <span className="welcome-cta-sheen pointer-events-none absolute inset-0" />
            <span className="relative">Bắt đầu tham quan</span>
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgb(255_252_245_/_0.56)] bg-[linear-gradient(135deg,#8e6533,#c89a55)] text-white shadow-[0_6px_14px_rgb(45_38_33_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.34)] transition duration-300 group-hover:translate-x-0.5 group-hover:brightness-110">
              <MoveRight className="h-4 w-4" strokeWidth={2.4} />
            </span>
          </button>

          <div className="relative mt-6 grid w-full max-w-[480px] grid-cols-2 gap-4 px-4 sm:mt-7 sm:gap-6">
            <WelcomeCard image={dinhCardImage} label="Đình Làng" rotate="-rotate-6" />
            <WelcomeCard image={shrineCardImage} label="Đền thờ Tổ nghề" rotate="rotate-5" />
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes welcomeCtaSheen {
          from {
            transform: translateX(-120%) skewX(-18deg);
          }
          to {
            transform: translateX(180%) skewX(-18deg);
          }
        }

        .welcome-cta-sheen {
          background: linear-gradient(90deg, transparent, rgba(255, 252, 245, 0.28), transparent);
          animation: welcomeCtaSheen 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .welcome-title-plaque {
          isolation: isolate;
          border-radius: 56px 56px 48px 48px / 42px 42px 36px 36px;
        }

        .welcome-title-plaque::before,
        .welcome-title-plaque::after {
          content: "";
          position: absolute;
          top: 30%;
          z-index: -1;
          width: 5.25rem;
          height: 6.1rem;
          border: 2px solid rgba(185, 139, 86, 0.55);
          background: linear-gradient(180deg, rgba(255, 252, 245, 0.96), rgba(246, 234, 210, 0.96));
          box-shadow:
            0 0 0 5px rgba(255, 252, 245, 0.62),
            0 0 0 7px rgba(166, 124, 82, 0.34),
            0 22px 54px rgba(8, 10, 7, 0.28);
        }

        .welcome-title-plaque::before {
          left: -2.6rem;
          border-radius: 999px 0 0 999px;
          border-right: 0;
        }

        .welcome-title-plaque::after {
          right: -2.6rem;
          border-left: 0;
          border-radius: 0 999px 999px 0;
        }

        .welcome-plaque-crown {
          position: absolute;
          left: 50%;
          top: -3.05rem;
          z-index: -1;
          width: 9.5rem;
          height: 5.8rem;
          transform: translateX(-50%);
          border: 2px solid rgba(185, 139, 86, 0.58);
          border-bottom: 0;
          border-radius: 999px 999px 0 0;
          background:
            radial-gradient(circle at 50% 52%, rgba(185, 139, 86, 0.28) 0 0.34rem, transparent 0.36rem),
            linear-gradient(180deg, rgba(255, 252, 245, 0.96), rgba(246, 234, 210, 0.96));
          box-shadow:
            0 0 0 5px rgba(255, 252, 245, 0.62),
            0 0 0 7px rgba(166, 124, 82, 0.34);
        }

        .welcome-plaque-crown::before,
        .welcome-plaque-crown::after {
          content: "";
          position: absolute;
          left: 50%;
          background: rgba(185, 139, 86, 0.72);
          transform: translateX(-50%) rotate(45deg);
        }

        .welcome-plaque-crown::before {
          top: 1.45rem;
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 0.16rem;
        }

        .welcome-plaque-crown::after {
          top: 2.72rem;
          width: 4.4rem;
          height: 1px;
          border-radius: 999px;
          transform: translateX(-50%);
        }

        .welcome-plaque-ornament {
          position: absolute;
          top: 50%;
          width: 5.8rem;
          height: 2.8rem;
          transform: translateY(-8%);
          opacity: 0.34;
          background:
            radial-gradient(ellipse at 24% 54%, transparent 0 0.65rem, rgba(185, 139, 86, 0.76) 0.68rem 0.76rem, transparent 0.8rem),
            radial-gradient(ellipse at 44% 54%, transparent 0 0.44rem, rgba(185, 139, 86, 0.62) 0.47rem 0.54rem, transparent 0.58rem),
            linear-gradient(90deg, transparent 0%, rgba(185, 139, 86, 0.74) 52%, transparent 100%);
          background-size: 100% 100%, 100% 100%, 100% 1px;
          background-position: center, center, center;
          background-repeat: no-repeat;
        }

        .welcome-plaque-ornament--left {
          left: 2.4rem;
        }

        .welcome-plaque-ornament--right {
          right: 2.4rem;
          transform: translateY(-8%) scaleX(-1);
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-cta-sheen,
          .tour-envelope-glow {
            animation: none;
          }

          .welcome-cta-sheen {
            opacity: 0;
          }

          .tour-envelope-glow {
            opacity: 0.32;
          }
        }

        @media (max-width: 640px) {
          .welcome-title-plaque::before,
          .welcome-title-plaque::after,
          .welcome-plaque-ornament {
            display: none;
          }

          .welcome-plaque-crown {
            top: -2.4rem;
            width: 7rem;
            height: 4.4rem;
          }
        }
      `}</style>
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
    <div className={`group relative ${rotate}`}>
      <div className="absolute inset-0 rounded-[18px] bg-[conic-gradient(from_140deg,#f6ead4,#c8a27a,#315f50,#c8a27a,#f6ead4)] opacity-55 blur-[14px]" />
      <div className="relative rounded-[18px] bg-[linear-gradient(150deg,rgba(255,252,245,0.9),rgba(255,252,245,0.55)_46%,rgba(255,252,245,0.2))] p-[2px] shadow-[0_26px_70px_rgb(74_63_53_/_0.26)]">
        <div className="rounded-[16px] border border-[rgb(166_124_82_/_0.18)] bg-[linear-gradient(160deg,rgba(255,252,245,0.85),rgba(236,229,216,0.6))] p-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
            <Image
              src={image}
              alt={label}
              fill
              sizes="260px"
              className="object-cover transition duration-500 group-hover:scale-[1.05]"
              priority
            />
            <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.3),transparent_40%,rgba(0,0,0,0.2))]" />
            <span className="absolute inset-0 ring-1 ring-white/40" />
          </div>
          <div className="mt-2 flex items-center justify-between px-1">
            <p className="font-display-vn text-[0.8rem] font-bold text-[var(--foreground)] sm:text-[0.9rem]">
              {label}
            </p>
            <span className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-[var(--tour-gold)]">
              Di sản
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TourExperience({
  soundEnabled,
  onToggleSound,
}: {
  soundEnabled: boolean;
  onToggleSound: () => void;
}) {
  const [currentSceneId, setCurrentSceneId] = useState<SceneId>("scene-1");
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wideAngle, setWideAngle] = useState(false);
  const [vrMode, setVrMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMiniMapExpanded, setIsMiniMapExpanded] = useState(true);
  const [isMiniMapOverviewOpen, setIsMiniMapOverviewOpen] = useState(false);
  const [cameraYaw, setCameraYaw] = useState(0);
  const [showItems, setShowItems] = useState(true);

  const rootRef = useRef<HTMLElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const transitionMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const warmedTextureUrlsRef = useRef<Set<string>>(new Set());
  const hotspotRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const currentSceneRef = useRef<TourScene>(sceneById.get("scene-1")!);
  const lastOrientationRef = useRef<{ alpha: number; beta: number; gamma: number } | null>(null);
  const stopOrientationRef = useRef<(() => void) | null>(null);
  const vrModeRef = useRef(false);
  const vrDragOffsetRef = useRef({ yaw: 0, pitch: 0 });
  const vrYawOffsetRef = useRef<number | null>(null);
  const vrPointerRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const transitionFrameRef = useRef<number | null>(null);
  const transitionTokenRef = useRef(0);
  const initialSceneRef = useRef(true);
  const transitionLockRef = useRef(false);
  const currentFovRef = useRef(DEFAULT_FOV);
  const targetFovRef = useRef(DEFAULT_FOV);
  const lastPinchDistanceRef = useRef<number | null>(null);
  const infoMarkerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [activeInfoMarker, setActiveInfoMarker] = useState<InfoMarker | null>(null);
  const [isInfoMarkerClosing, setIsInfoMarkerClosing] = useState(false);
  const [openingInfoMarkerId, setOpeningInfoMarkerId] = useState<string | null>(null);
  const [readMarkers, setReadMarkers] = useState<Set<string>>(new Set());
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const openingInfoTimerRef = useRef<number | null>(null);
  const closingInfoTimerRef = useRef<number | null>(null);

  const { orientation, isSupported, requestPermission, startListening } = useDeviceOrientation();

  useEffect(() => {
    vrModeRef.current = vrMode;
  }, [vrMode]);

  const activeScene = useMemo(
    () => sceneById.get(currentSceneId) ?? sceneById.get("scene-1")!,
    [currentSceneId],
  );

  const closeInfoMarker = useCallback(() => {
    if (!activeInfoMarker || isInfoMarkerClosing) {
      return;
    }

    if (closingInfoTimerRef.current) {
      window.clearTimeout(closingInfoTimerRef.current);
    }

    setIsInfoMarkerClosing(true);
    closingInfoTimerRef.current = window.setTimeout(() => {
      setActiveInfoMarker(null);
      setIsInfoMarkerClosing(false);
      closingInfoTimerRef.current = null;
    }, 240);
  }, [activeInfoMarker, isInfoMarkerClosing]);

  useEffect(() => {
    if (!activeInfoMarker) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeInfoMarker();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeInfoMarker, closeInfoMarker]);

  useEffect(() => {
    return () => {
      if (openingInfoTimerRef.current) {
        window.clearTimeout(openingInfoTimerRef.current);
      }
      if (closingInfoTimerRef.current) {
        window.clearTimeout(closingInfoTimerRef.current);
      }
    };
  }, []);

  const positionCamera = useCallback((scene: TourScene, distance = PANORAMA_CAMERA_DISTANCE, yaw = scene.initialYaw) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) {
      return;
    }

    const direction = directionFromYawPitch(yaw, 0).normalize();
    camera.position.copy(direction.multiplyScalar(-distance));
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  const getTouchDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) {
      return null;
    }

    const first = touches.item(0);
    const second = touches.item(1);

    if (!first || !second) {
      return null;
    }

    return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
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

    scene.infoMarkers?.forEach((marker) => {
      const element = infoMarkerRefs.current.get(`${scene.id}-${marker.id}`);

      if (!element) {
        return;
      }

      const worldPosition = directionFromYawPitch(marker.yaw, marker.pitch)
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

  const setTargetFov = useCallback(
    (nextFov: number, immediate = false) => {
      const camera = cameraRef.current;
      const fov = clampFov(nextFov);

      targetFovRef.current = fov;

      if (immediate && camera) {
        currentFovRef.current = fov;
        camera.fov = fov;
        camera.updateProjectionMatrix();
        updateHotspots();
      }
    },
    [updateHotspots],
  );

  const warmPanoramaTexture = useCallback((image: string, texture: THREE.Texture) => {
    const renderer = rendererRef.current;

    if (!renderer || warmedTextureUrlsRef.current.has(image)) {
      return;
    }

    renderer.initTexture(texture);
    warmedTextureUrlsRef.current.add(image);
  }, []);

  const preloadTourScene = useCallback(
    (scene: TourScene) => {
      const preloadImage = (image: string) => {
        loadPanoramaTexture(image)
          .then((texture) => warmPanoramaTexture(image, texture))
          .catch(() => undefined);
      };

      preloadImage(scene.image);
      scene.hotspots.forEach((hotspot) => {
        const targetScene = sceneById.get(hotspot.targetId);

        if (targetScene) {
          preloadImage(targetScene.image);
        }
      });
    },
    [warmPanoramaTexture],
  );

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

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
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(
      currentFovRef.current,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, PANORAMA_CAMERA_DISTANCE);

    const threeScene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(500, 128, 72);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
    const transitionMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    const sphere = new THREE.Mesh(geometry, material);
    const transitionSphere = new THREE.Mesh(geometry, transitionMaterial);
    threeScene.add(sphere);
    threeScene.add(transitionSphere);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = -0.42;
    controls.minPolarAngle = 0.03;
    controls.maxPolarAngle = Math.PI - 0.03;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.ROTATE,
    };

    const handleWheel = (event: WheelEvent) => {
      if (vrModeRef.current || transitionLockRef.current) {
        return;
      }

      event.preventDefault();

      const deltaModeScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? 320 : 1;
      const normalizedDelta = THREE.MathUtils.clamp(event.deltaY * deltaModeScale, -240, 240);
      const sensitivity = event.ctrlKey ? 0.028 : 0.038;
      setTargetFov(targetFovRef.current + normalizedDelta * sensitivity);
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastPinchDistanceRef.current = getTouchDistance(event.touches);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (vrModeRef.current || transitionLockRef.current || event.touches.length !== 2) {
        return;
      }

      const distance = getTouchDistance(event.touches);
      const previousDistance = lastPinchDistanceRef.current;

      if (!distance || !previousDistance) {
        lastPinchDistanceRef.current = distance;
        return;
      }

      event.preventDefault();

      const ratio = THREE.MathUtils.clamp(previousDistance / distance, 0.82, 1.18);
      setTargetFov(targetFovRef.current * ratio);
      lastPinchDistanceRef.current = distance;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      lastPinchDistanceRef.current = getTouchDistance(event.touches);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!vrModeRef.current || transitionLockRef.current || event.pointerType === "mouse") {
        return;
      }

      event.preventDefault();
      vrPointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const pointer = vrPointerRef.current;

      if (!vrModeRef.current || !pointer || pointer.id !== event.pointerId) {
        return;
      }

      event.preventDefault();
      const deltaX = event.clientX - pointer.x;
      const deltaY = event.clientY - pointer.y;
      vrDragOffsetRef.current.yaw += deltaX * 0.18;
      vrDragOffsetRef.current.pitch = THREE.MathUtils.clamp(
        vrDragOffsetRef.current.pitch + deltaY * 0.12,
        -55,
        55,
      );
      vrPointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    };

    const handlePointerEnd = (event: PointerEvent) => {
      const pointer = vrPointerRef.current;

      if (!pointer || pointer.id !== event.pointerId) {
        return;
      }

      vrPointerRef.current = null;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };

    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });
    renderer.domElement.addEventListener("touchstart", handleTouchStart, { passive: false });
    renderer.domElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    renderer.domElement.addEventListener("touchend", handleTouchEnd, { passive: false });
    renderer.domElement.addEventListener("touchcancel", handleTouchEnd, { passive: false });
    renderer.domElement.addEventListener("pointerdown", handlePointerDown, { passive: false });
    renderer.domElement.addEventListener("pointermove", handlePointerMove, { passive: false });
    renderer.domElement.addEventListener("pointerup", handlePointerEnd);
    renderer.domElement.addEventListener("pointercancel", handlePointerEnd);

    cameraRef.current = camera;
    controlsRef.current = controls;
    materialRef.current = material;
    transitionMaterialRef.current = transitionMaterial;
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
      const targetFov = targetFovRef.current;

      if (Math.abs(currentFovRef.current - targetFov) > 0.01) {
        currentFovRef.current += (targetFov - currentFovRef.current) * 0.16;
        camera.fov = currentFovRef.current;
        camera.updateProjectionMatrix();
      } else if (camera.fov !== targetFov) {
        currentFovRef.current = targetFov;
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }

      if (!vrModeRef.current) {
        controls.update();
      }
      
      // Update camera yaw for mini-map rotation
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      const yaw = yawFromDirection(direction);
      setCameraYaw(yaw);
      
      updateHotspots();

      renderer.render(threeScene, camera);
    };

    renderer.setAnimationLoop(animate);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      renderer.domElement.removeEventListener("touchmove", handleTouchMove);
      renderer.domElement.removeEventListener("touchend", handleTouchEnd);
      renderer.domElement.removeEventListener("touchcancel", handleTouchEnd);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerEnd);
      renderer.domElement.removeEventListener("pointercancel", handlePointerEnd);
      renderer.setAnimationLoop(null);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      transitionMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      rendererRef.current = null;
    };
  }, [getTouchDistance, positionCamera, setTargetFov, updateHotspots]);

  useEffect(() => {
    const controls = controlsRef.current;

    if (controls) {
      controls.autoRotate = autoRotate && !vrMode;
      controls.autoRotateSpeed = 0.85;
    }
  }, [autoRotate, vrMode]);

  useEffect(() => {
    setTargetFov(wideAngle ? WIDE_FOV : DEFAULT_FOV);
  }, [setTargetFov, wideAngle]);

  const setTransitionVisuals = useCallback((progress: number) => {
    const wrap = canvasWrapRef.current;

    if (!wrap) {
      return;
    }

    const intensity = Math.sin(Math.PI * progress);
    wrap.style.setProperty("--tour-blur", `${(4 * intensity).toFixed(2)}px`);
    wrap.style.setProperty("--tour-scale", `${(1 + intensity * 0.01).toFixed(3)}`);
    wrap.style.setProperty("--tour-vignette", `${(0.2 * intensity).toFixed(3)}`);
  }, []);

  const runSceneTransition = useCallback(
    (scene: TourScene, arrivalYaw = scene.initialYaw) => {
      currentSceneRef.current = scene;
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      const material = materialRef.current;
      const transitionMaterial = transitionMaterialRef.current;

      if (!camera || !controls || !material || !transitionMaterial) {
        positionCamera(scene);
        return;
      }

      if (transitionFrameRef.current) {
        cancelAnimationFrame(transitionFrameRef.current);
        transitionFrameRef.current = null;
      }

      const token = ++transitionTokenRef.current;
      const isVrTransition = vrModeRef.current;
      setLoadError(null);
      transitionLockRef.current = !initialSceneRef.current;
      preloadTourScene(scene);

      const cachedTexture = panoramaTextureCache.get(scene.image);

      if (!initialSceneRef.current) {
        const startPosition = camera.position.clone();
        const startRotation = camera.rotation.clone();
        const targetYaw = arrivalYaw;
        const targetDirection = directionFromYawPitch(targetYaw, 0).normalize();
        const targetPosition = targetDirection.multiplyScalar(-PANORAMA_CAMERA_DISTANCE);

        const duration = 1000;
        const startTime = performance.now();
        const easeInOutQuart = (t: number) =>
          t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

        let textureLoaded = !!cachedTexture;
        let loadedTexture: THREE.Texture | null = cachedTexture || null;
        let textureFailed = false;
        let textureReadyAt = cachedTexture ? startTime : 0;

        setIsTransitioning(true);
        setIsLoading(!cachedTexture);
        setLoadProgress(cachedTexture ? 100 : 0);
        setTransitionVisuals(0);

        const prepareTransitionTexture = (texture: THREE.Texture) => {
          warmPanoramaTexture(scene.image, texture);
          transitionMaterial.map = texture;
          transitionMaterial.opacity = 0;
          transitionMaterial.needsUpdate = true;
        };

        if (cachedTexture) {
          prepareTransitionTexture(cachedTexture);
        } else {
          loadPanoramaTexture(scene.image, (progress) => {
            if (transitionTokenRef.current === token) {
              setLoadProgress(progress);
            }
          })
            .then((texture) => {
              if (transitionTokenRef.current !== token) return;

              textureLoaded = true;
              loadedTexture = texture;
              textureReadyAt = performance.now();
              setIsLoading(false);
              setLoadProgress(100);
              prepareTransitionTexture(texture);
            })
            .catch(() => {
              if (transitionTokenRef.current !== token) return;

              textureFailed = true;
              setLoadError("Không tải được ảnh panorama cho cảnh này.");
              setIsLoading(false);
            });
        }

        const tick = (now: number) => {
          if (transitionTokenRef.current !== token) {
            return;
          }

          const rawProgress = (now - startTime) / duration;
          const progress = !textureLoaded && !textureFailed ? Math.min(rawProgress, 0.72) : Math.min(rawProgress, 1);
          const eased = easeInOutQuart(progress);
          let fadeProgress = 0;

          if (!isVrTransition) {
            camera.position.lerpVectors(startPosition, targetPosition, eased);
            camera.rotation.x = THREE.MathUtils.lerp(startRotation.x, 0, eased);
            camera.rotation.y = THREE.MathUtils.lerp(startRotation.y, THREE.MathUtils.degToRad(targetYaw), eased);
            camera.rotation.z = THREE.MathUtils.lerp(startRotation.z, 0, eased);

            camera.position.setLength(PANORAMA_CAMERA_DISTANCE);
            controls.update();
          }

          // Fade when texture is loaded
          if (textureLoaded && loadedTexture) {
            const fadeStart = 0.2;
            const fadeEnd = 0.9;
            fadeProgress =
              textureReadyAt > startTime + duration * fadeEnd
                ? Math.min(Math.max((now - textureReadyAt) / 420, 0), 1)
                : Math.min(Math.max((progress - fadeStart) / (fadeEnd - fadeStart), 0), 1);
            const fadeEase = easeInOutQuart(fadeProgress);
            transitionMaterial.opacity = fadeEase;
            material.opacity = 1 - fadeEase;
          }

          setTransitionVisuals(progress);

          if (progress < 1 || (textureLoaded && loadedTexture && fadeProgress < 1)) {
            transitionFrameRef.current = requestAnimationFrame(tick);
            return;
          }

          if (!textureLoaded && !textureFailed) {
            setIsLoading(true);
            setTransitionVisuals(0.5);
            transitionFrameRef.current = requestAnimationFrame(tick);
            return;
          }

          if (textureLoaded && loadedTexture) {
            material.map = loadedTexture;
            material.opacity = 1;
            material.needsUpdate = true;
            transitionMaterial.opacity = 0;
            transitionMaterial.needsUpdate = true;
          } else {
            material.opacity = 1;
            transitionMaterial.opacity = 0;
            transitionMaterial.needsUpdate = true;
          }

          transitionFrameRef.current = null;
          if (!isVrTransition) {
            positionCamera(scene, PANORAMA_CAMERA_DISTANCE, targetYaw);
          }
          setTransitionVisuals(0);
          setIsTransitioning(false);
          setIsLoading(false);
          setLoadProgress(100);
          transitionLockRef.current = false;
          updateHotspots();
          preloadTourScene(scene);
        };

        transitionFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      // Initial scene load - use global cache
      const initialCachedTexture = panoramaTextureCache.get(scene.image);
      const loadTexture = initialCachedTexture
        ? Promise.resolve(initialCachedTexture)
        : loadPanoramaTexture(scene.image, (progress) => {
            if (transitionTokenRef.current === token) {
              setLoadProgress(progress);
            }
          });

      setIsLoading(!initialCachedTexture);
      setLoadProgress(initialCachedTexture ? 100 : 0);
      loadTexture
        .then((texture) => {
          if (transitionTokenRef.current !== token) return;

          warmPanoramaTexture(scene.image, texture);
          material.map = texture;
          material.opacity = 1;
          material.needsUpdate = true;
          transitionMaterial.map = texture;
          transitionMaterial.opacity = 0;
          transitionMaterial.needsUpdate = true;
          positionCamera(scene);
          updateHotspots();
          initialSceneRef.current = false;
          setIsTransitioning(false);
          setIsLoading(false);
          setLoadProgress(100);
          setTransitionVisuals(0);
          transitionLockRef.current = false;
          preloadTourScene(scene);
        })
        .catch(() => {
          if (transitionTokenRef.current !== token) return;
          setIsLoading(false);
          setLoadError("Không tải được ảnh panorama cho cảnh này.");
          transitionLockRef.current = false;
        });
    },
    [positionCamera, preloadTourScene, setTransitionVisuals, updateHotspots, warmPanoramaTexture],
  );

  useEffect(() => {
    // Only run auto-transition when scene changes from scene list
    if (!transitionLockRef.current) {
      runSceneTransition(activeScene);
    }
  }, [activeScene, runSceneTransition]);

  useEffect(() => {
    return () => {
      if (transitionFrameRef.current) {
        cancelAnimationFrame(transitionFrameRef.current);
      }

      stopOrientationRef.current?.();
    };
  }, []);

  // VR Mode - Device Orientation
  useEffect(() => {
    if (!vrMode || !orientation) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const alpha = THREE.MathUtils.degToRad(orientation.alpha);
    const beta = THREE.MathUtils.degToRad(orientation.beta);
    const gamma = THREE.MathUtils.degToRad(orientation.gamma);
    const screenOrientation = THREE.MathUtils.degToRad(window.screen.orientation?.angle ?? window.orientation ?? 0);
    const zee = new THREE.Vector3(0, 0, 1);
    const euler = new THREE.Euler(beta, alpha, -gamma, "YXZ");
    const headsetCorrection = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
    const screenCorrection = new THREE.Quaternion().setFromAxisAngle(zee, -screenOrientation);
    const dragOffset = vrDragOffsetRef.current;
    const orientationQuaternion = new THREE.Quaternion()
      .setFromEuler(euler)
      .multiply(headsetCorrection)
      .multiply(screenCorrection);
    const orientationDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(orientationQuaternion);
    const orientationYaw = yawFromDirection(orientationDirection);

    if (vrYawOffsetRef.current === null) {
      const currentDirection = new THREE.Vector3();
      camera.getWorldDirection(currentDirection);
      vrYawOffsetRef.current = normalizeYaw(yawFromDirection(currentDirection) - orientationYaw);
    }

    const yawOffset = vrYawOffsetRef.current ?? 0;
    const yawCorrection = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      THREE.MathUtils.degToRad(yawOffset),
    );
    const dragCorrection = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        THREE.MathUtils.degToRad(dragOffset.pitch),
        THREE.MathUtils.degToRad(dragOffset.yaw),
        0,
        "YXZ",
      ),
    );

    camera.quaternion.copy(orientationQuaternion);
    camera.quaternion.premultiply(yawCorrection);
    camera.quaternion.premultiply(dragCorrection);
    lastOrientationRef.current = orientation;
  }, [orientation, vrMode]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    handleFullscreen();
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  const toggleVrMode = useCallback(async () => {
    if (!vrMode) {
      const permitted = await requestPermission();
      if (permitted) {
        stopOrientationRef.current?.();
        stopOrientationRef.current = startListening();
        setVrMode(true);
        setAutoRotate(false);
        vrDragOffsetRef.current = { yaw: 0, pitch: 0 };
        vrYawOffsetRef.current = null;
        vrPointerRef.current = null;
        lastOrientationRef.current = null;
        if (controlsRef.current) {
          controlsRef.current.autoRotate = false;
          controlsRef.current.enabled = false;
        }
      }
    } else {
      setVrMode(false);
      stopOrientationRef.current?.();
      stopOrientationRef.current = null;
      vrPointerRef.current = null;
      vrYawOffsetRef.current = null;
      lastOrientationRef.current = null;
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
        controlsRef.current.update();
      }
    }
  }, [vrMode, requestPermission, startListening]);

  const toggleFullscreen = useCallback(async () => {
    if (typeof document === "undefined") {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await rootRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);

  const goToScene = (sceneId: SceneId, keepPanel = false, arrivalYaw?: number) => {
    if (sceneId === currentSceneId || transitionLockRef.current) {
      return;
    }

    setLoadError(null);
    setCurrentSceneId(sceneId);
    setActiveInfoMarker(null);
    setIsInfoMarkerClosing(false);
    if (!keepPanel) {
      setActivePanel(null);
    }

    const targetScene = sceneById.get(sceneId);
    if (targetScene) {
      runSceneTransition(targetScene, arrivalYaw ?? targetScene.initialYaw);
    }
  };

  return (
    <main
      ref={rootRef}
      className="fixed inset-0 min-h-[100dvh] overflow-hidden bg-[var(--tour-wood)] text-white"
    >
      <div ref={canvasWrapRef} className="tour-canvas absolute inset-0">
        <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(45,38,33,0.1)_0%,rgba(45,38,33,0.02)_42%,rgba(45,38,33,0.68)_100%)]" />
      <div
        className={`fixed left-3 top-3 z-20 hidden transition-[width,opacity,transform] duration-300 sm:left-4 sm:top-4 sm:block ${
          isMiniMapExpanded ? "w-[min(52vw,220px)] sm:w-[240px]" : "w-[min(72vw,260px)] sm:w-auto"
        }`}
      >
        {isMiniMapExpanded ? (
          <div className="relative">
            <div className="absolute right-2 top-2 z-30 flex gap-1.5">
              <button
                type="button"
                onClick={() => setIsMiniMapOverviewOpen(true)}
                className="grid h-8 w-8 place-items-center rounded-[5px] border border-[rgb(232_207_170_/_0.28)] bg-[rgb(45_38_33_/_0.72)] text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[var(--tour-gold-light)] hover:bg-[rgb(45_38_33_/_0.9)] active:scale-95"
                aria-label="Phóng to bản đồ"
                title="Toàn bản đồ"
              >
                <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={() => setIsMiniMapExpanded(false)}
                className="h-8 rounded-[5px] border border-white/14 bg-[rgb(45_38_33_/_0.72)] px-2 text-[0.62rem] font-bold text-white/86 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-[rgb(45_38_33_/_0.86)] active:scale-95"
                aria-label="Thu gọn mini-map"
                title="Thu gọn mini-map"
              >
                Thu gọn
              </button>
            </div>
            <MiniMap
              activeScene={activeScene}
              onSceneSelect={(sceneId) => goToScene(sceneId, true)}
              compact
              cameraYaw={cameraYaw}
              mode="overview"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsMiniMapExpanded(true)}
            className="flex max-w-full items-center gap-2 rounded-[6px] border border-[rgb(255_252_245_/_0.18)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.14),transparent_44%),rgb(45_38_33_/_0.66)] px-2.5 py-2 text-left text-white shadow-[0_18px_54px_rgba(0,0,0,0.3),inset_0_1px_0_rgb(255_255_255_/_0.14)] backdrop-blur-xl transition hover:bg-[rgb(45_38_33_/_0.78)] active:scale-95"
            aria-label="Mở mini-map"
            title="Mở mini-map"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e83030] text-[0.65rem] font-black text-white shadow-[0_0_0_4px_rgb(232_48_48_/_0.18)]">
              {activeScene.order}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.62rem] font-black uppercase tracking-[0.12em] text-[var(--tour-gold-light)]">
                Mở map
              </span>
              <span className="block truncate text-[0.76rem] font-bold text-white">{activeScene.title}</span>
            </span>
          </button>
        )}
      </div>

      {isMiniMapOverviewOpen ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[rgb(22_18_15_/_0.54)] px-3 py-4 backdrop-blur-[4px] sm:px-5 sm:py-6">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsMiniMapOverviewOpen(false)}
            aria-label="Đóng bản đồ phóng to"
          />
          <section className="relative max-h-[88dvh] w-[min(92vw,760px)] overflow-y-auto rounded-[14px] border border-[rgb(232_207_170_/_0.2)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.13),rgb(255_252_245_/_0.045)_40%,transparent_72%),rgb(45_38_33_/_0.78)] p-3 text-white shadow-[0_38px_120px_rgb(0_0_0_/_0.48),inset_0_1px_0_rgb(255_255_255_/_0.16)] backdrop-blur-2xl [scrollbar-color:var(--tour-gold)_transparent] [scrollbar-width:thin] sm:p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.7rem] font-black uppercase tracking-[0.16em] text-[var(--tour-gold-light)]">
                  Toàn bộ tuyến tham quan
                </p>
                <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-white sm:text-2xl">
                  Bản đồ điểm đến
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMiniMapOverviewOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-white/12 bg-white/[0.06] text-white transition hover:bg-white/[0.12] active:scale-95"
                aria-label="Đóng bản đồ phóng to"
                title="Đóng"
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
            <MiniMap
              activeScene={activeScene}
              onSceneSelect={(sceneId) => {
                goToScene(sceneId, true);
                setIsMiniMapOverviewOpen(false);
              }}
              cameraYaw={cameraYaw}
              mode="overview"
              showLegend
              compact
            />
          </section>
        </div>
      ) : null}

      {isLoading ? (
        <div className="fixed left-1/2 top-4 z-20 w-[min(84vw,280px)] -translate-x-1/2 rounded-[7px] border border-white/16 bg-[rgb(45_38_33_/_0.68)] px-3 py-2 text-white shadow-[0_12px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/88">
            <span>Tải không gian 360</span>
            <span className="font-mono text-[0.74rem] text-[var(--tour-gold-light)]">
              {Math.max(0, Math.min(100, Math.round(loadProgress)))}%
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/14">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#e8cfaa,#ffffff)] transition-[width] duration-200"
              style={{ width: `${Math.max(4, Math.min(100, Math.round(loadProgress)))}%` }}
            />
          </div>
        </div>
      ) : null}

      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-200 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
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
            className="group absolute left-1/2 top-1/2 grid h-[3.2rem] w-[3.2rem] -translate-x-1/2 -translate-y-1/2 place-items-center opacity-0 drop-shadow-[0_10px_18px_rgba(0,0,0,0.46)] transition-[opacity,transform,filter] duration-200 hover:scale-105 hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.58)] active:scale-96 sm:h-16 sm:w-16"
            style={
              {
                "--hotspot-angle": `${hotspot.rotation ?? 0}deg`,
              } as CSSProperties
            }
            onClick={() => goToScene(hotspot.targetId, false, hotspot.nextYaw ?? hotspot.yaw)}
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
            <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] max-w-[9.5rem] -translate-x-1/2 whitespace-nowrap rounded-[6px] border border-white/16 bg-[rgb(45_38_33_/_0.72)] px-2.5 py-1 text-[0.72rem] font-bold text-white opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.34)] backdrop-blur-xl transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {hotspot.label}
            </span>
          </button>
        ))}
        {showItems && activeScene.infoMarkers?.map((marker) => {
          const markerKey = `${activeScene.id}-${marker.id}`;
          const isRead = readMarkers.has(markerKey);
          const isOpening = openingInfoMarkerId === marker.id;
          const isHovered = hoveredMarkerId === markerKey;

          return (
            <button
              key={markerKey}
              ref={(node) => {
                if (node) {
                  infoMarkerRefs.current.set(markerKey, node);
                } else {
                  infoMarkerRefs.current.delete(markerKey);
                }
              }}
              type="button"
              className="group absolute left-1/2 top-1/2 grid h-[7.35rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 place-items-center opacity-0 drop-shadow-[0_16px_30px_rgba(0,0,0,0.4)] transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(.2,.9,.2,1)] hover:scale-[1.045] hover:drop-shadow-[0_20px_38px_rgba(0,0,0,0.48)] active:scale-[0.97] sm:h-[8.15rem] sm:w-[11rem]"
              data-opening={isOpening ? "true" : undefined}
              data-read={isRead ? "true" : undefined}
              style={
                {
                  "--marker-angle": `${marker.rotation ?? 0}deg`,
                } as CSSProperties
              }
              onMouseEnter={() => setHoveredMarkerId(markerKey)}
              onMouseLeave={() => setHoveredMarkerId(null)}
              onClick={() => {
                if (openingInfoTimerRef.current) {
                  window.clearTimeout(openingInfoTimerRef.current);
                }

                setActivePanel(null);
                setIsInfoMarkerClosing(false);

                if (isRead) {
                  setActiveInfoMarker(marker);
                  setOpeningInfoMarkerId(null);
                  return;
                }

                setOpeningInfoMarkerId(marker.id);
                openingInfoTimerRef.current = window.setTimeout(() => {
                  setReadMarkers((prev) => new Set(prev).add(markerKey));
                  setActiveInfoMarker(marker);
                  setOpeningInfoMarkerId(null);
                  openingInfoTimerRef.current = null;
                }, 520);
              }}
              aria-label={`Mở thư ${marker.title}`}
              title={marker.title}
            >
              {!isRead && (
                <>
                  <span className="tour-envelope-glow absolute inset-[-1.5rem] rounded-[42%]" />
                  <span className="tour-envelope-aura absolute bottom-5 left-1/2 h-7 w-[72%] -translate-x-1/2 rounded-full" />
                </>
              )}
              <EnvelopeLottie isOpening={isOpening} isRead={isRead} isHovered={isHovered} rotation={marker.rotation ?? 0} />
              <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.42rem)] max-w-[11rem] -translate-x-1/2 whitespace-nowrap rounded-[7px] border border-[rgb(232_207_170_/_0.24)] bg-[rgb(45_38_33_/_0.72)] px-3 py-1.5 text-[0.72rem] font-bold text-white opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.34)] backdrop-blur-xl transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {isRead ? marker.title : `Mở thư: ${marker.title}`}
              </span>
            </button>
          );
        })}
      </div>

      {activeInfoMarker ? (
        <div
          className={`fixed inset-0 z-40 grid place-items-center bg-[rgb(22_18_15_/_0.44)] px-3 py-4 backdrop-blur-[3px] sm:px-5 sm:py-6 ${
            isInfoMarkerClosing
              ? "animate-[tourModalBackdropOut_240ms_ease-in_both]"
              : "animate-[tourModalBackdrop_320ms_ease-out_both]"
          }`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={closeInfoMarker}
            aria-label="Đóng thư"
          />
          <article
            className={`tour-letter-shell relative h-[min(90dvh,820px)] w-[min(90vw,560px)] overflow-hidden rounded-[13px] text-[var(--foreground)] shadow-[0_38px_120px_rgb(0_0_0_/_0.46)] sm:w-[min(82vw,590px)] ${
              isInfoMarkerClosing ? "tour-letter-shell--closing" : ""
            }`}
          >
            <Image
              src={infoModalBackground}
              alt=""
              fill
              sizes="760px"
              className="pointer-events-none select-none object-fill"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(255_252_245_/_0.1),rgb(245_238_220_/_0.08))]" />
            <button
              type="button"
              onClick={closeInfoMarker}
              className="absolute right-[7.6%] top-[5.8%] z-10 grid h-8 w-8 place-items-center rounded-full border border-[rgb(58_47_35_/_0.18)] bg-[rgb(255_252_245_/_0.76)] text-[var(--tour-wood)] shadow-[0_8px_24px_rgb(74_63_53_/_0.12)] backdrop-blur-sm transition hover:bg-white active:scale-95 sm:h-9 sm:w-9"
              aria-label="Đóng thư"
              title="Đóng"
            >
              <X className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={2.2} />
            </button>
            <div className="tour-letter-content relative h-full overflow-y-auto px-[9%] pb-[11%] pt-[11%] sm:px-[10.5%] sm:pb-[10%] sm:pt-[10%]">
              <div className="mb-4 pr-10 animate-[tourTextFadeIn_420ms_ease-out_80ms_both] sm:mb-5">
                <div className="min-w-0">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--tour-gold)] sm:text-[0.66rem]">
                    {activeInfoMarker.eyebrow}
                  </p>
                  <h2 className="font-display-vn mt-0.5 text-[1.85rem] font-bold leading-tight text-[var(--tour-ink)] sm:text-[2.55rem]">
                    {activeInfoMarker.title}
                  </h2>
                </div>
              </div>
              <div className="space-y-3.5 border-y border-[rgb(166_124_82_/_0.2)] py-4 font-display-vn text-[0.92rem] leading-7 text-[rgb(74_63_53_/_0.92)] animate-[tourTextFadeIn_480ms_ease-out_180ms_both] sm:space-y-4 sm:py-5 sm:text-[0.98rem] sm:leading-8">
                {activeInfoMarker.content.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className="text-justify animate-[tourTextSlideIn_420ms_ease-out_both]"
                    style={{ animationDelay: `${280 + index * 60}ms` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[rgb(115_90_58_/_0.62)] animate-[tourTextFadeIn_380ms_ease-out_420ms_both] sm:mt-5 sm:text-[0.66rem]">
                <span>Đình Định Công Thượng</span>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,rgb(166_124_82_/_0.3),transparent)]" />
              </div>
            </div>
          </article>
        </div>
      ) : null}

      {activePanel === "map" ? (
        <div className="fixed inset-0 z-[25] grid place-items-center bg-[rgb(22_18_15_/_0.44)] px-3 pb-[6.8rem] pt-4 backdrop-blur-[3px] sm:px-5 sm:pb-[7.8rem] sm:pt-6">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setActivePanel(null)}
            aria-label="Đóng vị trí"
          />
          <section className="relative grid max-h-[calc(100dvh-8.5rem)] w-[calc(100vw-1.5rem)] max-w-[980px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[14px] border border-[rgb(232_207_170_/_0.2)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.13),rgb(255_252_245_/_0.045)_40%,transparent_72%),rgb(58_50_44_/_0.82)] text-white shadow-[0_38px_120px_rgb(0_0_0_/_0.46),inset_0_1px_0_rgb(255_255_255_/_0.16)] backdrop-blur-2xl sm:w-[calc(100vw-2.5rem)] sm:max-h-[calc(100dvh-9.5rem)] lg:max-w-[1080px]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <h2 className="text-xl font-black tracking-[-0.02em] sm:text-2xl">Vị trí</h2>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-white/12 bg-white/[0.06] text-white transition hover:bg-white/[0.12] active:scale-95"
                aria-label="Đóng vị trí"
                title="Đóng"
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>

            <div className="grid min-h-0 gap-3 overflow-y-auto p-3 [scrollbar-color:var(--tour-gold)_transparent] [scrollbar-width:thin] sm:p-4 lg:grid-cols-[minmax(0,7fr)_minmax(260px,3fr)] lg:overflow-hidden">
              <MiniMap
                activeScene={activeScene}
                onSceneSelect={(sceneId) => goToScene(sceneId, true)}
                cameraYaw={cameraYaw}
                mode="overview"
                className="min-h-[320px] lg:h-full"
                mapClassName="lg:min-h-[430px]"
              />
              <aside className="flex min-h-0 min-w-0 flex-col rounded-[7px] border border-[rgb(255_252_245_/_0.14)] bg-[rgb(255_252_245_/_0.06)] p-3 sm:p-4">
                <div className="shrink-0">
                  <p className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-[var(--tour-gold-light)]">
                    Bạn đang ở đây
                  </p>
                  <h3 className="mt-1 text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">
                    {activeScene.title}
                  </h3>
                  <p className="mt-1 text-[0.9rem] font-semibold text-white/62">{activeScene.location}</p>
                </div>

                <div className="mt-4 grid min-h-0 gap-2 overflow-y-auto pr-1 [scrollbar-color:var(--tour-gold)_transparent] [scrollbar-width:thin]">
                  {locationGroups.map((scene) => {
                    const isActiveLocation = scene.location === activeScene.location;

                    return (
                      <button
                        key={`location-${scene.location}`}
                        type="button"
                        onClick={() => goToScene(scene.id, true)}
                        aria-current={isActiveLocation ? "true" : undefined}
                        className={`group relative h-[5.8rem] overflow-hidden rounded-[7px] border text-left transition-[border-color,box-shadow,filter] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tour-gold-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(45_38_33_/_0.62)] active:scale-[0.99] ${
                          isActiveLocation
                            ? "border-[var(--tour-gold-light)] bg-[rgb(192_160_128_/_0.16)] shadow-[0_0_0_2px_rgb(232_207_170_/_0.22),0_16px_40px_rgb(0_0_0_/_0.24)]"
                            : "border-white/12 bg-white/[0.04] shadow-[0_12px_30px_rgb(0_0_0_/_0.16)] hover:border-[rgb(232_207_170_/_0.42)]"
                        }`}
                      >
                        <Image
                          src={scene.image}
                          alt={scene.location}
                          fill
                          sizes="340px"
                          className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:saturate-[1.06]"
                        />
                        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.18)_100%)]" />
                        <span className="absolute inset-x-3 bottom-3 min-w-0">
                          <span className="block truncate text-[1rem] font-black text-white">
                            {scene.location}
                          </span>
                        </span>
                        {isActiveLocation ? (
                          <span className="absolute right-2.5 top-2.5 rounded-full border border-[rgb(255_252_245_/_0.42)] bg-[rgb(232_48_48_/_0.86)] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgb(0_0_0_/_0.24)]">
                            Hiện tại
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          </section>
        </div>
      ) : null}

      <div
        className={`absolute left-1/2 z-30 -translate-x-1/2 transition-[bottom,width,max-width,transform] duration-300 ease-out ${
          activePanel === "scenes" ? "w-[calc(100vw-32px)] max-w-[1180px]" : "w-[min(92vw,448px)]"
        } ${activePanel === "scenes" ? "bottom-1 sm:bottom-2" : "bottom-2 sm:bottom-5"}`}
      >
        {activePanel && activePanel !== "map" ? (
          <section className="mb-1.5 max-h-[46dvh] animate-[tourPanelIn_260ms_cubic-bezier(.2,.9,.2,1)_both] overflow-hidden rounded-[6px] border border-[rgb(255_252_245_/_0.18)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.12),rgb(255_252_245_/_0.04)_38%,transparent_70%),rgb(45_38_33_/_0.48)] shadow-[0_24px_86px_rgb(0_0_0_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.18),inset_0_-1px_0_rgb(0_0_0_/_0.16)] backdrop-blur-xl backdrop-saturate-150 sm:mb-2.5">
            <div className="flex items-center justify-between border-b border-[rgb(255_252_245_/_0.1)] bg-[rgb(255_252_245_/_0.035)] px-3 py-2">
              <div className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-white">
                {panelTitle(activePanel)}
              </div>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="grid h-7 w-7 place-items-center rounded-[6px] text-white transition hover:bg-white/10 active:scale-95"
                aria-label="Đóng bảng"
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>

            {activePanel === "scenes" ? (
              <div className="flex w-full gap-2.5 overflow-x-auto overflow-y-hidden px-2.5 py-2.5 [scrollbar-color:var(--tour-gold)_transparent] [scrollbar-width:thin]">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => goToScene(scene.id, false)}
                    aria-current={scene.id === activeScene.id ? "true" : undefined}
                    className={`group relative h-20 w-[60vw] shrink-0 overflow-hidden rounded-[6px] border text-left transition-[border-color,box-shadow,filter] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tour-gold-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(45_38_33_/_0.62)] active:scale-[0.99] sm:h-24 sm:w-48 lg:w-56 ${
                      scene.id === activeScene.id
                        ? "border-[var(--tour-gold-light)] bg-[rgb(192_160_128_/_0.16)] shadow-[0_0_0_2px_rgb(232_207_170_/_0.28),0_16px_40px_rgb(0_0_0_/_0.28)]"
                        : "border-white/14 bg-white/[0.04] shadow-[0_12px_30px_rgb(0_0_0_/_0.18)] hover:border-[rgb(232_207_170_/_0.46)] hover:shadow-[0_16px_38px_rgb(0_0_0_/_0.24)]"
                    }`}
                  >
                    <Image src={scene.image} alt={scene.title} fill sizes="220px" className="object-cover transition duration-500 group-hover:saturate-[1.06]" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_22%,rgba(0,0,0,0.68)_100%)] opacity-90" />
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgb(255_252_245_/_0.18),transparent)] opacity-55" />
                    <span className="absolute inset-x-3 top-2 h-px bg-[linear-gradient(90deg,transparent,rgb(255_252_245_/_0.52),transparent)]" />
                    <span className="absolute left-2.5 top-2.5 grid h-6 min-w-8 place-items-center rounded-full bg-[rgb(255_252_245_/_0.84)] px-2 font-mono text-[10px] font-bold text-[var(--tour-wood)] shadow-[0_8px_22px_rgb(0_0_0_/_0.18)]">
                      {scene.order}
                    </span>
                    <span className="absolute inset-x-3 bottom-2 min-w-0">
                      <span className="block truncate text-[0.82rem] font-semibold text-white">
                        {scene.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.7rem] text-white/58">
                        {scene.location}
                      </span>
                    </span>
                    {scene.id === activeScene.id ? (
                      <span className="absolute right-2.5 top-2.5 rounded-full border border-[rgb(255_252_245_/_0.42)] bg-[rgb(49_95_80_/_0.86)] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgb(0_0_0_/_0.24)]">
                        Đang xem
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}

            {activePanel === "info" ? (
              <div className="space-y-2.5 p-3 text-[0.82rem] leading-5 text-white/76">
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

            {activePanel === "settings" ? (
              <div className="grid gap-2 p-2.5 sm:grid-cols-2">
                <ToggleButton
                  active={autoRotate}
                  icon={autoRotate ? Pause : Play}
                  label="Tự xoay"
                  onClick={() => setAutoRotate((value) => !value)}
                />
                <ToggleButton
                  active={wideAngle}
                  icon={Scan}
                  label="Góc rộng"
                  onClick={() => setWideAngle((value) => !value)}
                />
                <ToggleButton
                  active={!showItems}
                  icon={showItems ? Eye : EyeOff}
                  label={showItems ? "Ẩn vật phẩm" : "Hiện vật phẩm"}
                  onClick={() => setShowItems((value) => !value)}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {activePanel !== "scenes" ? (
          <nav className="grid grid-cols-5 gap-1 overflow-hidden rounded-[6px] border border-[rgb(255_252_245_/_0.2)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.14),transparent_36%),rgb(115_90_58_/_0.62)] p-1.5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.32),inset_0_1px_0_rgb(255_255_255_/_0.18)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out sm:gap-1.5">
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
              icon={MapPin}
              label="Vị trí"
              active={activePanel === "map"}
              onClick={() => setActivePanel(activePanel === "map" ? null : "map")}
            />
            <BottomButton
              icon={soundEnabled ? Volume2 : VolumeX}
              label="Âm thanh"
              active={soundEnabled}
              onClick={onToggleSound}
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

      <button
        type="button"
        onClick={() => void toggleVrMode()}
        disabled={!isSupported}
        className={`fixed right-3 top-1/2 z-20 inline-flex h-12 min-w-14 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border px-3 shadow-[0_18px_54px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 sm:right-4 sm:h-14 sm:min-w-16 ${
          vrMode
            ? "border-[var(--tour-gold-light)] bg-[rgb(232_207_170_/_0.24)] text-white"
            : "border-white/20 bg-[rgb(45_38_33_/_0.58)] text-white/88 hover:bg-[rgb(45_38_33_/_0.72)]"
        }`}
        aria-label={isSupported ? (vrMode ? "Tắt VR" : "Bật VR") : "Thiết bị không hỗ trợ VR"}
        title={isSupported ? (vrMode ? "Tắt VR" : "Bật VR") : "Thiết bị không hỗ trợ VR"}
      >
        <Scan className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
        <span className="text-[0.72rem] font-black uppercase tracking-[0.04em] sm:text-[0.78rem]">
          VR
        </span>
      </button>

      <button
        type="button"
        onClick={toggleFullscreen}
        className={`fixed right-4 top-4 z-20 hidden rounded-full border p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all active:scale-95 sm:p-3 lg:inline-flex lg:items-center lg:justify-center ${
          isFullscreen
            ? "border-[var(--tour-gold-light)] bg-[rgb(192_160_128_/_0.24)] text-white"
            : "border-white/20 bg-[rgb(45_38_33_/_0.48)] text-white/80 hover:bg-[rgb(45_38_33_/_0.62)]"
        }`}
        aria-label={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
        title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
      >
        {isFullscreen ? (
          <Minimize2 className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
        ) : (
          <Maximize2 className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
        )}
      </button>

      {loadError ? (
        <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center bg-[rgb(45_38_33_/_0.46)] backdrop-blur-sm">
          <div className="w-[min(82vw,280px)] rounded-[6px] border border-[rgb(255_252_245_/_0.16)] bg-[rgb(45_38_33_/_0.62)] p-4 text-center shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <p className="text-[0.82rem] font-semibold text-white">{loadError}</p>
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

        @keyframes welcomeCtaSheen {
          from {
            transform: translateX(-120%) skewX(-18deg);
          }
          to {
            transform: translateX(180%) skewX(-18deg);
          }
        }

        .welcome-cta-sheen {
          background: linear-gradient(90deg, transparent, rgba(255, 252, 245, 0.28), transparent);
          animation: welcomeCtaSheen 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .welcome-title-plaque {
          isolation: isolate;
          border: 2px solid rgba(185, 139, 86, 0.62);
          border-radius: 56px 56px 48px 48px / 42px 42px 36px 36px;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 252, 245, 0.94), transparent 24%),
            linear-gradient(180deg, rgba(255, 252, 245, 0.96), rgba(246, 234, 210, 0.96));
          box-shadow:
            0 28px 74px rgba(8, 10, 7, 0.42),
            0 0 0 5px rgba(255, 252, 245, 0.66),
            0 0 0 7px rgba(166, 124, 82, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -14px 28px rgba(166, 124, 82, 0.12);
        }

        .welcome-title-plaque::before,
        .welcome-title-plaque::after {
          content: "";
          position: absolute;
          top: 30%;
          z-index: -1;
          width: 5.25rem;
          height: 6.1rem;
          border: 2px solid rgba(185, 139, 86, 0.55);
          background:
            linear-gradient(180deg, rgba(255, 252, 245, 0.96), rgba(246, 234, 210, 0.96));
          box-shadow:
            0 0 0 5px rgba(255, 252, 245, 0.62),
            0 0 0 7px rgba(166, 124, 82, 0.34),
            0 22px 54px rgba(8, 10, 7, 0.28);
        }

        .welcome-title-plaque::before {
          left: -2.6rem;
          border-radius: 999px 0 0 999px;
          border-right: 0;
        }

        .welcome-title-plaque::after {
          right: -2.6rem;
          border-left: 0;
          border-radius: 0 999px 999px 0;
        }

        .welcome-plaque-crown {
          position: absolute;
          left: 50%;
          top: -3.05rem;
          z-index: -1;
          width: 9.5rem;
          height: 5.8rem;
          transform: translateX(-50%);
          border: 2px solid rgba(185, 139, 86, 0.58);
          border-bottom: 0;
          border-radius: 999px 999px 0 0;
          background:
            radial-gradient(circle at 50% 52%, rgba(185, 139, 86, 0.28) 0 0.34rem, transparent 0.36rem),
            linear-gradient(180deg, rgba(255, 252, 245, 0.96), rgba(246, 234, 210, 0.96));
          box-shadow:
            0 0 0 5px rgba(255, 252, 245, 0.62),
            0 0 0 7px rgba(166, 124, 82, 0.34);
        }

        .welcome-plaque-crown::before,
        .welcome-plaque-crown::after {
          content: "";
          position: absolute;
          left: 50%;
          background: rgba(185, 139, 86, 0.72);
          transform: translateX(-50%) rotate(45deg);
        }

        .welcome-plaque-crown::before {
          top: 1.45rem;
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 0.16rem;
        }

        .welcome-plaque-crown::after {
          top: 2.72rem;
          width: 4.4rem;
          height: 1px;
          border-radius: 999px;
          transform: translateX(-50%);
        }

        .welcome-plaque-ornament {
          position: absolute;
          top: 50%;
          width: 5.8rem;
          height: 2.8rem;
          transform: translateY(-8%);
          opacity: 0.34;
          background:
            radial-gradient(ellipse at 24% 54%, transparent 0 0.65rem, rgba(185, 139, 86, 0.76) 0.68rem 0.76rem, transparent 0.8rem),
            radial-gradient(ellipse at 44% 54%, transparent 0 0.44rem, rgba(185, 139, 86, 0.62) 0.47rem 0.54rem, transparent 0.58rem),
            linear-gradient(90deg, transparent 0%, rgba(185, 139, 86, 0.74) 52%, transparent 100%);
          background-size: 100% 100%, 100% 100%, 100% 1px;
          background-position: center, center, center;
          background-repeat: no-repeat;
        }

        .welcome-plaque-ornament--left {
          left: 2.4rem;
        }

        .welcome-plaque-ornament--right {
          right: 2.4rem;
          transform: translateY(-8%) scaleX(-1);
        }

        @keyframes tourLetterIn {
          from {
            opacity: 0;
            clip-path: inset(42% 12% 42% 12% round 14px);
            transform: translateY(22px) rotateX(72deg) scale(0.86);
            filter: brightness(1.14) saturate(0.92);
          }
          58% {
            opacity: 1;
            clip-path: inset(8% 4% 8% 4% round 14px);
            transform: translateY(0) rotateX(-5deg) scale(1.015);
            filter: brightness(1.05) saturate(1);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0 round 14px);
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: brightness(1) saturate(1);
          }
        }

        @keyframes tourLetterOut {
          from {
            opacity: 1;
            clip-path: inset(0 0 0 0 round 14px);
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: brightness(1) saturate(1);
          }
          to {
            opacity: 0;
            clip-path: inset(38% 10% 38% 10% round 14px);
            transform: translateY(18px) rotateX(52deg) scale(0.9);
            filter: brightness(1.08) saturate(0.92);
          }
        }

        @keyframes tourModalBackdrop {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(3px);
          }
        }

        @keyframes tourModalBackdropOut {
          from {
            opacity: 1;
            backdrop-filter: blur(3px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
        }

        @keyframes tourTextFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tourTextSlideIn {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes tourEnvelopeGlow {
          0%,
          100% {
            opacity: 0.34;
            transform: translate3d(0, 1px, 0) scale(0.98);
          }
          50% {
            opacity: 0.58;
            transform: translate3d(0, -1px, 0) scale(1.025);
          }
        }

        @keyframes tourEnvelopeOpenFlash {
          0% {
            opacity: 0.3;
            transform: scale(0.96);
          }
          36% {
            opacity: 0.72;
            transform: scale(1.06);
          }
          100% {
            opacity: 0;
            transform: scale(1.12);
          }
        }

        .tour-envelope-glow {
          background:
            radial-gradient(ellipse at 52% 58%, rgba(255, 225, 145, 0.42), rgba(217, 161, 86, 0.16) 38%, transparent 72%),
            linear-gradient(115deg, transparent 12%, rgba(255, 252, 245, 0.09) 42%, transparent 68%);
          filter: blur(14px);
          animation: tourEnvelopeGlow 4.4s cubic-bezier(0.34, 1, 0.64, 1) infinite;
        }

        .tour-envelope-aura {
          background: linear-gradient(90deg, transparent, rgba(255, 216, 132, 0.34), transparent);
          filter: blur(10px);
          opacity: 0.72;
        }

        [data-opening="true"] .tour-envelope-glow {
          animation: tourEnvelopeOpenFlash 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        [data-read="true"] .tour-envelope-glow,
        [data-read="true"] .tour-envelope-aura {
          opacity: 0;
          animation-play-state: paused;
        }

        .tour-letter-shell {
          animation: tourLetterIn 520ms cubic-bezier(0.16, 0.9, 0.22, 1) both;
          transform-origin: 50% 72%;
          transform-style: preserve-3d;
        }

        .tour-letter-shell--closing {
          animation: tourLetterOut 240ms cubic-bezier(0.4, 0, 0.8, 0.2) both;
          pointer-events: none;
        }

        .tour-letter-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(130deg, rgba(255, 255, 255, 0.26), transparent 34%, rgba(96, 70, 38, 0.09) 100%);
          mix-blend-mode: soft-light;
        }

        .tour-letter-content {
          scrollbar-color: rgba(166, 124, 82, 0.52) transparent;
          scrollbar-width: thin;
        }

        .tour-canvas {
          --tour-blur: 0px;
          --tour-scale: 1;
          --tour-vignette: 0;
          overflow: hidden;
        }

        .tour-canvas::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.18) 58%,
            rgba(0, 0, 0, 0.32) 100%
          );
          opacity: var(--tour-vignette);
          transition: opacity 120ms linear;
        }

        .tour-canvas canvas {
          display: block;
          filter: blur(var(--tour-blur));
          transform: scale(var(--tour-scale)) translateZ(0);
          will-change: transform, filter;
          transition: filter 120ms cubic-bezier(0.4, 0, 0.2, 1),
                      transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-cta-sheen {
            animation: none;
            opacity: 0;
          }
        }

        @media (prefers-reduced-transparency: reduce) {
          .welcome-title-plaque {
            background: rgb(255 252 245 / 0.94);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }

        @media (max-width: 640px) {
          .welcome-title-plaque::before,
          .welcome-title-plaque::after,
          .welcome-plaque-ornament {
            display: none;
          }

          .welcome-plaque-crown {
            top: -2.4rem;
            width: 7rem;
            height: 4.4rem;
          }
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

function MiniMap({
  activeScene,
  className = "",
  compact = false,
  onSceneSelect,
  cameraYaw = 0,
  mapClassName = "",
  mode = "radar",
  showLegend = false,
  showNames = false,
}: {
  activeScene: TourScene;
  className?: string;
  compact?: boolean;
  onSceneSelect: (sceneId: SceneId) => void;
  cameraYaw?: number;
  mapClassName?: string;
  mode?: "radar" | "overview";
  showLegend?: boolean;
  showNames?: boolean;
}) {
  const isOverview = mode === "overview";
  const nodeSize = compact ? 5.2 : 5.2;
  const edgeInset = nodeSize / 2;
  const clampMapPoint = (value: number) => THREE.MathUtils.clamp(value, edgeInset, 100 - edgeInset);
  const getMapPosition = (scene: TourScene) => {
    if (!scene.mapPosition || (!isOverview && !activeScene.mapPosition)) return null;

    if (isOverview) {
      return {
        x: clampMapPoint(scene.mapPosition.x),
        y: clampMapPoint(scene.mapPosition.y),
      };
    }

    const dx = scene.mapPosition.x - activeScene.mapPosition.x;
    const dy = scene.mapPosition.y - activeScene.mapPosition.y;
    const relativeYaw = cameraYaw - activeScene.initialYaw;
    const angleRad = (-relativeYaw * Math.PI) / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const rotatedX = dx * cos - dy * sin;
    const rotatedY = dx * sin + dy * cos;

    return {
      x: clampMapPoint(50 + rotatedX),
      y: clampMapPoint(50 + rotatedY),
    };
  };
  return (
    <section
      className={`relative overflow-hidden rounded-[6px] border border-[rgb(255_252_245_/_0.18)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.07),rgb(255_252_245_/_0.018)_45%,transparent),rgb(45_38_33_/_0.18)] shadow-[0_18px_70px_rgba(0,0,0,0.32),inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-xl backdrop-saturate-150 ${
        compact ? "p-2.5" : "min-h-[260px] p-3"
      } ${className}`}
      aria-label="Mini-map vị trí tham quan"
    >
      <div className={`mb-2 flex items-center justify-between gap-2 ${compact ? "pr-24" : ""}`}>
        <div className="min-w-0">
          <p className="truncate text-[0.68rem] font-black uppercase tracking-[0.12em] text-[var(--tour-gold-light)]">
            {isOverview ? "Sơ đồ tuyến" : "Mini-map"}
          </p>
          <p className="truncate text-[0.74rem] font-semibold text-white sm:text-[0.8rem]">
            {activeScene.title}
          </p>
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-[5px] border border-white/[0.07] bg-[radial-gradient(circle_at_50%_76%,rgb(232_207_170_/_0.055),transparent_24%),linear-gradient(180deg,rgb(255_252_245_/_0.026),rgb(0_0_0_/_0.025))] ${
          compact ? "aspect-[4/3]" : "aspect-[16/10] min-h-[240px]"
        } ${mapClassName}`}
      >
        <svg
          className="absolute inset-0 h-full w-full transition-opacity duration-200 ease-out"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {mapRoutes.map((edge, index) => {
            const fromScene = sceneById.get(edge.from);
            const toScene = sceneById.get(edge.to);

            if (!fromScene?.mapPosition || !toScene?.mapPosition) {
              return null;
            }

            const fromPos = !isOverview && fromScene.id === activeScene.id
              ? { x: 50, y: 50 }
              : getMapPosition(fromScene);
            const toPos = !isOverview && toScene.id === activeScene.id
              ? { x: 50, y: 50 }
              : getMapPosition(toScene);

            if (!fromPos || !toPos) return null;
            return (
              <line
                key={`${edge.from}-${edge.to}-${index}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="rgba(232,207,170,0.42)"
                strokeWidth={compact ? 0.9 : 1.05}
                strokeLinecap="round"
                className="transition-all duration-200"
              />
            );
          })}
        </svg>

        {scenes.map((scene) => {
          if (!scene?.mapPosition) {
            return null;
          }
          const isActive = scene.id === activeScene.id;
          const mapPos = !isOverview && isActive ? { x: 50, y: 50 } : getMapPosition(scene);
          if (!mapPos) return null;

          return (
            <div
              key={`map-point-wrap-${scene.id}`}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${mapPos.x}%`, top: `${mapPos.y}%` }}
            >
              <button
                type="button"
                onClick={() => onSceneSelect(scene.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${scene.order} - ${scene.title}`}
                title={scene.title}
                className={`group relative grid place-items-center rounded-full border text-[0.58rem] font-black transition-[transform,background-color,border-color,box-shadow] duration-200 active:scale-95 ${isActive ? "h-6 w-6 border-white bg-[#e83030] text-white shadow-[0_0_0_4px_rgb(232_48_48_/_0.22),0_10px_24px_rgb(0_0_0_/_0.38)]" : "h-5 w-5 border-[rgb(232_207_170_/_0.68)] bg-[rgb(45_38_33_/_0.82)] text-[var(--tour-gold-light)] hover:border-white hover:bg-[var(--tour-jade)]"} ${compact && !isActive ? "sm:h-5 sm:w-5" : "sm:h-6 sm:w-6"}`}
              >
                {scene.order}
              </button>
              {showNames ? (
                <span className={`max-w-[8.5rem] truncate rounded-[5px] border px-1.5 py-0.5 text-center text-[0.58rem] font-bold leading-none shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-xl ${isActive ? "border-[rgb(232_48_48_/_0.3)] bg-[rgb(232_48_48_/_0.22)] text-white" : "border-white/10 bg-[rgb(45_38_33_/_0.62)] text-white/82"}`}>
                  {scene.title}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      {showLegend ? (
        <div className="mt-3 grid max-h-[30dvh] gap-1.5 overflow-y-auto pr-1 [scrollbar-color:var(--tour-gold)_transparent] [scrollbar-width:thin] sm:grid-cols-2 lg:grid-cols-3">
          {scenes.map((scene) => (
            <button
              key={`map-note-${scene.id}`}
              type="button"
              onClick={() => onSceneSelect(scene.id)}
              aria-current={scene.id === activeScene.id ? "true" : undefined}
              className={`flex items-center gap-2 rounded-[7px] border px-2.5 py-2 text-left transition hover:border-[var(--tour-gold-light)] hover:bg-white/[0.08] active:scale-[0.99] ${scene.id === activeScene.id ? "border-[rgb(232_48_48_/_0.42)] bg-[rgb(232_48_48_/_0.16)]" : "border-white/10 bg-white/[0.04]"}`}
            >
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.62rem] font-black ${scene.id === activeScene.id ? "bg-[#e83030] text-white" : "bg-[rgb(45_38_33_/_0.86)] text-[var(--tour-gold-light)]"}`}>
                {scene.order}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.78rem] font-bold text-white">{scene.title}</span>
                <span className="block truncate text-[0.64rem] text-white/52">{scene.location}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function EnvelopeLottie({
  isOpening,
  isRead,
  isHovered,
  rotation,
}: {
  isOpening: boolean;
  isRead: boolean;
  isHovered: boolean;
  rotation: number;
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const wasHoveredRef = useRef(false);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    if (isOpening) {
      player.setSpeed(1);
      player.setDirection(1);
      player.playSegments([0, 65], true);
      wasHoveredRef.current = false;
      return;
    }

    if (isRead) {
      player.setSpeed(1);
      player.setDirection(1);
      player.goToAndStop(65, true);
      wasHoveredRef.current = false;
      return;
    }

    if (isHovered) {
      player.setSpeed(1);
      player.setDirection(1);
      player.playSegments([0, 42], true);
      wasHoveredRef.current = true;
      return;
    }

    if (wasHoveredRef.current) {
      player.setSpeed(1);
      player.setDirection(1);
      player.playSegments([42, 0], true);
      wasHoveredRef.current = false;
      return;
    }

    player.setSpeed(1);
    player.setDirection(1);
    player.goToAndStop(0, true);
  }, [isOpening, isRead, isHovered]);

  return (
    <span className="relative h-[6.75rem] w-[9.15rem] [transform:rotate(var(--marker-angle))] sm:h-[7.55rem] sm:w-[10.15rem]" style={{ "--marker-angle": `${rotation}deg` } as CSSProperties}>
      <Lottie
        lottieRef={lottieRef}
        animationData={letterAnimation}
        loop={false}
        autoplay={false}
        className="h-full w-full"
        style={{
          filter: isRead
            ? "brightness(0.9) saturate(0.86) sepia(0.2) hue-rotate(-12deg) drop-shadow(0 6px 12px rgba(0,0,0,0.28))"
            : "brightness(1.05) saturate(1.08) sepia(0.08) hue-rotate(-6deg) drop-shadow(0 0 12px rgba(255,224,150,0.2)) drop-shadow(0 9px 18px rgba(0,0,0,0.32))",
        }}
      />
    </span>
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
      className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-[6px] px-1.5 py-2 text-center transition active:scale-95 ${
        active ? "bg-[rgb(255_252_245_/_0.2)] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.18)]" : "text-white/92 hover:bg-white/12"
      }`}
      aria-label={label}
      title={label}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.1} />
      {hideLabel ? null : (
        <span className="w-full truncate text-[10px] font-semibold leading-tight sm:text-[0.82rem]">
          {label}
        </span>
      )}
    </button>
  );
}

function ToggleButton({
  active,
  disabled = false,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-between rounded-[6px] border px-2.5 py-2.5 text-[0.82rem] font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 ${
        active
          ? "border-[rgb(232_207_170_/_0.56)] bg-[rgb(192_160_128_/_0.16)] text-white"
          : "border-white/10 bg-white/[0.04] text-white/78 hover:border-white/24"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[var(--tour-gold-light)]" strokeWidth={1.9} />
        {label}
      </span>
      <span className="h-2 w-2 rounded-full bg-current opacity-80" />
    </button>
  );
}
