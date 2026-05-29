"use client";

import {
  Info,
  Layers3,
  LucideIcon,
  MapPin,
  Maximize2,
  Minimize2,
  Pause,
  Play,
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
};

type Panel = "scenes" | "info" | "map" | "settings" | null;

const basePath = "/images-tour/Đình Làng-Đền Thờ";
const hotspotIcon = encodeURI("/icon/hotspotelement.png");
const heroImage = encodeURI(`${basePath}/6 Trung Đình.jpg`);
const dinhCardImage = encodeURI(`${basePath}/1 Cổng Đình.jpg`);
const shrineCardImage = encodeURI(`${basePath}/13 Chính điện Đền thờ Tổ nghề.jpg`);
const backgroundAudio = encodeURI("/media/Nhạc Phật Giáo sâu lắng.mp3");

const panoramaPath = (fileName: string) => encodeURI(`${basePath}/${fileName}`);

const PANORAMA_CAMERA_DISTANCE = 0.12;
const DEFAULT_FOV = 76;
const WIDE_FOV = 88;
const MIN_ZOOM_FOV = 36;
const MAX_ZOOM_FOV = 96;
const AUDIO_TARGET_VOLUME = 0.2;
const AUDIO_FADE_DURATION = 650;

const clampFov = (fov: number) => THREE.MathUtils.clamp(fov, MIN_ZOOM_FOV, MAX_ZOOM_FOV);


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
    mapPosition: { x: 50, y: 88 },
    hotspots: [{ targetId: "scene-2", label: "Tiền Đình", yaw: 115, pitch: -20 }],
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
    mapPosition: { x: 30, y: 65 },
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
const mapEdges = scenes.flatMap((scene) =>
  scene.hotspots.map((hotspot) => ({
    from: scene.id,
    to: hotspot.targetId,
  })),
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

    let isDisposed = false;
    preloadSceneAndHotspots(sceneById.get("scene-1")!);

    loadPanoramaTexture(heroImage)
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
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          isPanoramaReady ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,245,0.9)_0%,rgba(245,241,230,0.64)_36%,rgba(45,38,33,0.34)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[46dvh] bg-[radial-gradient(ellipse_at_center,rgba(255,252,245,0.96)_0%,rgba(255,252,245,0.78)_45%,rgba(255,252,245,0)_76%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_86%,rgba(166,124,82,0.26),transparent_36%),radial-gradient(circle_at_84%_12%,rgba(49,95,80,0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(74,63,53,0.08)_0_1px,transparent_1px)] bg-[length:92px_100%] opacity-60" />

      <div
        className={`absolute inset-0 z-20 grid place-items-center bg-[var(--background)] text-[var(--tour-ink)] transition-opacity duration-500 ${
          isPanoramaReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="rounded-full border border-[rgb(166_124_82_/_0.22)] bg-[rgb(255_252_245_/_0.72)] px-5 py-2 text-[0.82rem] font-black uppercase tracking-[0.18em] shadow-[0_18px_52px_rgb(74_63_53_/_0.16)]">
          Đang tải không gian 360°
        </div>
      </div>

      <section
        className={`relative z-10 grid min-h-[100dvh] place-items-center px-4 py-8 transition-[opacity,transform] duration-500 ${
          isPanoramaReady ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          <div className="max-w-4xl">

            <h1 className="font-display-vn mt-4 text-balance text-[2.4rem] font-bold uppercase leading-[0.98] text-[var(--tour-ink)] drop-shadow-[0_2px_0_rgba(255,252,245,0.86)] sm:text-[3.6rem] lg:text-[4.8rem]">
              Số hóa di tích
              <span className="block text-[var(--primary)]">lịch sử văn hóa</span>
            </h1>
            <p className="mt-4 text-[0.85rem] font-extrabold text-[rgb(74_63_53_/_0.9)] sm:text-[1.2rem]">
              Đình Làng Định Công Thượng · Đền thờ Tổ nghề Kim hoàn
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            disabled={isEntering || !isPanoramaReady}
            className="mt-[8dvh] rounded-full border border-[rgb(255_252_245_/_0.48)] bg-[linear-gradient(135deg,#315f50,#a67c52_58%,#735a3a)] px-7 py-3 text-[0.95rem] font-extrabold text-white shadow-[0_22px_58px_rgb(74_63_53_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.28)] transition hover:scale-[1.03] hover:shadow-[0_28px_70px_rgb(74_63_53_/_0.42)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:px-9 sm:text-[1.25rem]"
          >
            Khám phá ngay
          </button>

          <div className="relative mt-[6dvh] grid w-full max-w-[520px] grid-cols-2 gap-4 px-4 sm:gap-7">
            <span className="pointer-events-none absolute -left-8 -right-8 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(185,139,86,0.55),transparent)]" />
            <WelcomeCard image={dinhCardImage} label="Đình Làng" rotate="-rotate-6" />
            <WelcomeCard image={shrineCardImage} label="Đền thờ Tổ nghề" rotate="rotate-5" />
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
  const vrPointerRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const transitionFrameRef = useRef<number | null>(null);
  const transitionTokenRef = useRef(0);
  const initialSceneRef = useRef(true);
  const transitionLockRef = useRef(false);
  const currentFovRef = useRef(DEFAULT_FOV);
  const targetFovRef = useRef(DEFAULT_FOV);
  const lastPinchDistanceRef = useRef<number | null>(null);

  const { orientation, isSupported, requestPermission, startListening } = useDeviceOrientation();

  useEffect(() => {
    vrModeRef.current = vrMode;
  }, [vrMode]);

  const activeScene = useMemo(
    () => sceneById.get(currentSceneId) ?? sceneById.get("scene-1")!,
    [currentSceneId],
  );

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
    controls.dampingFactor = 0.075;
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
      controls.autoRotateSpeed = 0.35;
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

          camera.position.lerpVectors(startPosition, targetPosition, eased);
          camera.rotation.x = THREE.MathUtils.lerp(startRotation.x, 0, eased);
          camera.rotation.y = THREE.MathUtils.lerp(startRotation.y, THREE.MathUtils.degToRad(targetYaw), eased);
          camera.rotation.z = THREE.MathUtils.lerp(startRotation.z, 0, eased);

          camera.position.setLength(PANORAMA_CAMERA_DISTANCE);
          controls.update();

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
          positionCamera(scene, PANORAMA_CAMERA_DISTANCE, targetYaw);
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

      setIsLoading(true);
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
    const dragCorrection = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        THREE.MathUtils.degToRad(dragOffset.pitch),
        THREE.MathUtils.degToRad(dragOffset.yaw),
        0,
        "YXZ",
      ),
    );

    camera.quaternion.setFromEuler(euler);
    camera.quaternion.multiply(headsetCorrection);
    camera.quaternion.multiply(screenCorrection);
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
            <MiniMap activeScene={activeScene} onSceneSelect={(sceneId) => goToScene(sceneId, true)} compact />
            <button
              type="button"
              onClick={() => setIsMiniMapExpanded(false)}
              className="absolute right-2 top-2 rounded-[5px] border border-white/14 bg-[rgb(45_38_33_/_0.72)] px-2 py-1 text-[0.62rem] font-bold text-white/86 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-[rgb(45_38_33_/_0.86)] active:scale-95"
              aria-label="Thu gọn mini-map"
              title="Thu gọn mini-map"
            >
              Thu gọn
            </button>
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
      </div>

      <div
        className={`absolute left-1/2 z-30 -translate-x-1/2 transition-[bottom,width,max-width,transform] duration-300 ease-out ${
          activePanel === "scenes" ? "w-[calc(100vw-32px)] max-w-[1180px]" : "w-[min(92vw,448px)]"
        } ${activePanel === "scenes" ? "bottom-1 sm:bottom-2" : "bottom-2 sm:bottom-5"}`}
      >
        {activePanel ? (
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
                    onClick={() => goToScene(scene.id, true)}
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

            {activePanel === "map" ? (
              <div className="grid gap-3 p-3 text-[0.82rem] text-white/76 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <MiniMap activeScene={activeScene} onSceneSelect={(sceneId) => goToScene(sceneId, true)} />
                <div className="min-w-0 rounded-[6px] border border-[rgb(255_252_245_/_0.14)] bg-[rgb(255_252_245_/_0.06)] p-3">
                  <p className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-[var(--tour-gold-light)]">
                    Bạn đang ở đây
                  </p>
                  <p className="mt-1 text-base font-bold text-white">{activeScene.title}</p>
                  <p className="mt-0.5 text-[0.76rem] text-white/58">{activeScene.location}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeScene.hotspots.length > 0 ? (
                      activeScene.hotspots.map((hotspot) => (
                        <button
                          key={`${activeScene.id}-map-${hotspot.targetId}`}
                          type="button"
                          onClick={() => goToScene(hotspot.targetId, true, hotspot.nextYaw ?? hotspot.yaw)}
                          className="rounded-[6px] border border-white/12 bg-white/[0.06] px-2.5 py-1.5 text-[0.76rem] font-semibold text-white transition hover:border-[var(--tour-gold-light)] hover:bg-white/[0.12] active:scale-95"
                        >
                          {hotspot.label}
                        </button>
                      ))
                    ) : (
                      <span className="rounded-[6px] border border-white/12 bg-white/[0.06] px-2.5 py-1.5 text-[0.76rem] text-white/68">
                        Điểm cuối tuyến tham quan
                      </span>
                    )}
                  </div>
                </div>
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
                  active={vrMode}
                  disabled={!isSupported}
                  icon={Scan}
                  label={isSupported ? "VR" : "Không hỗ trợ VR"}
                  onClick={() => void toggleVrMode()}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {activePanel !== "scenes" ? (
          <nav className="grid grid-cols-5 gap-1.5 overflow-hidden rounded-[6px] border border-[rgb(255_252_245_/_0.2)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.14),transparent_36%),rgb(115_90_58_/_0.62)] p-1.5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.32),inset_0_1px_0_rgb(255_255_255_/_0.18)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out sm:gap-2">
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
              onClick={onToggleSound}
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
  compact = false,
  onSceneSelect,
}: {
  activeScene: TourScene;
  compact?: boolean;
  onSceneSelect: (sceneId: SceneId) => void;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-[6px] border border-[rgb(255_252_245_/_0.18)] bg-[linear-gradient(135deg,rgb(255_252_245_/_0.07),rgb(255_252_245_/_0.018)_45%,transparent),rgb(45_38_33_/_0.36)] shadow-[0_18px_70px_rgba(0,0,0,0.32),inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-xl backdrop-saturate-150 ${
        compact ? "p-2.5" : "min-h-[260px] p-3"
      }`}
      aria-label="Mini-map vị trí tham quan"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[0.68rem] font-black uppercase tracking-[0.12em] text-[var(--tour-gold-light)]">
            Mini-map
          </p>
          <p className="truncate text-[0.74rem] font-semibold text-white sm:text-[0.8rem]">
            {activeScene.title}
          </p>
        </div>
      </div>

      <div
        className={`relative rounded-[5px] border border-white/[0.07] bg-[radial-gradient(circle_at_50%_76%,rgb(232_207_170_/_0.055),transparent_24%),linear-gradient(180deg,rgb(255_252_245_/_0.026),rgb(0_0_0_/_0.025))] ${
          compact ? "aspect-[4/3]" : "aspect-[5/4]"
        }`}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          {mapEdges.map((edge, index) => {
            const fromScene = sceneById.get(edge.from);
            const toScene = sceneById.get(edge.to);

            if (!fromScene?.mapPosition || !toScene?.mapPosition) {
              return null;
            }

            return (
              <line
                key={`${edge.from}-${edge.to}-${index}`}
                x1={fromScene.mapPosition.x}
                y1={fromScene.mapPosition.y}
                x2={toScene.mapPosition.x}
                y2={toScene.mapPosition.y}
                stroke="rgba(232,207,170,0.38)"
                strokeWidth={compact ? 1.2 : 1.5}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {scenes.map((scene) => {
          if (!scene?.mapPosition) {
            return null;
          }
          const isActive = scene.id === activeScene.id;

          return (
            <button
              key={`map-point-${scene.id}`}
              type="button"
              onClick={() => onSceneSelect(scene.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={scene.title}
              title={scene.title}
              className={`group absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[0.58rem] font-black transition active:scale-95 ${
                isActive
                  ? "h-5 w-5 border-white bg-[#e83030] text-white shadow-[0_0_0_4px_rgb(232_48_48_/_0.22),0_10px_24px_rgb(0_0_0_/_0.38)]"
                  : "h-5 w-5 border-[rgb(232_207_170_/_0.68)] bg-[rgb(45_38_33_/_0.82)] text-[var(--tour-gold-light)] hover:border-white hover:bg-[var(--tour-jade)]"
              } ${compact ? "sm:h-5 sm:w-5" : "sm:h-6 sm:w-6"}`}
              style={{ left: `${scene.mapPosition.x}%`, top: `${scene.mapPosition.y}%` }}
            >
              {scene.order}
              <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.32rem)] z-10 max-w-[8rem] -translate-x-1/2 truncate rounded-[5px] border border-white/12 bg-[rgb(45_38_33_/_0.82)] px-2 py-1 text-[0.65rem] font-bold text-white opacity-0 shadow-[0_10px_24px_rgba(0,0,0,0.36)] backdrop-blur-xl transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {scene.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
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
