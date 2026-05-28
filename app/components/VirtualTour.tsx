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

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="fixed inset-0 min-h-[100dvh] overflow-hidden bg-[#edf7fb] text-[#20252a]">
      <div
        className="absolute inset-0 scale-[1.04] bg-cover bg-center"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />
      <div className="absolute inset-0 bg-white/58" />
      <div className="absolute inset-x-0 top-0 h-[42dvh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_42%,rgba(255,255,255,0)_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_92%,rgba(32,118,148,0.18),transparent_38%)]" />

      <section className="relative z-10 grid min-h-[100dvh] place-items-center px-4 py-8">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          <div className="max-w-4xl">
            <p className="mx-auto text-balance text-3xl font-black uppercase leading-[1.08] text-[#1d2820] drop-shadow-[0_2px_0_rgba(255,255,255,0.9)] sm:text-5xl lg:text-6xl">
              Số hóa di tích lịch sử văn hóa
            </p>
            <h1 className="mt-2 text-balance text-2xl font-black uppercase leading-[1.06] text-[#22302a] sm:text-4xl lg:text-5xl">
              Đình và Chùa
            </h1>
            <p className="mt-5 text-base font-bold text-[#3f4146] sm:text-2xl">
              Phường Định Công, TP. Hà Nội
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="mt-[14dvh] rounded-full bg-gradient-to-r from-[#2577ff] to-[#49d5e8] px-9 py-4 text-lg font-bold text-white shadow-[0_18px_42px_rgba(37,119,255,0.38)] transition hover:scale-[1.03] hover:shadow-[0_24px_54px_rgba(37,119,255,0.42)] active:scale-[0.98] sm:px-12 sm:text-2xl"
          >
            Khám Phá Ngay!
          </button>

          <div className="mt-[9dvh] grid w-full max-w-xl grid-cols-2 gap-5 px-4 sm:gap-8">
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
      className={`rounded-[8px] bg-white p-2 shadow-[0_18px_42px_rgba(29,42,52,0.24)] ${rotate}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
        <Image src={image} alt={label} fill sizes="240px" className="object-cover" priority />
      </div>
      <p className="py-2 text-sm font-semibold text-[#4b403d] sm:text-base">{label}</p>
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

  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const textureCacheRef = useRef<Map<string, THREE.Texture>>(new Map());
  const hotspotRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const currentSceneRef = useRef<TourScene>(sceneById.get("scene-5")!);

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
    controls.rotateSpeed = 0.42;
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
    positionCamera(activeScene);

    const material = materialRef.current;

    if (!material) {
      return;
    }

    const cachedTexture = textureCacheRef.current.get(activeScene.image);

    if (cachedTexture) {
      material.map = cachedTexture;
      material.needsUpdate = true;
      requestAnimationFrame(() => setIsLoading(false));
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
        setIsLoading(false);
        updateHotspots();
      },
      undefined,
      () => {
        if (!cancelled) {
          setLoadError("Không tải được ảnh panorama cho cảnh này.");
          setIsLoading(false);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [activeScene, positionCamera, updateHotspots]);

  const goToScene = (sceneId: SceneId) => {
    if (sceneId !== currentSceneId) {
      setLoadError(null);
      setIsLoading(true);
    }

    setCurrentSceneId(sceneId);
    setActivePanel(null);
  };

  return (
    <main className="fixed inset-0 min-h-[100dvh] overflow-hidden bg-[#090b0d] text-white">
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.08)_0%,rgba(5,7,10,0.02)_42%,rgba(5,7,10,0.58)_100%)]" />

      <div className="absolute inset-0 z-10">
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

      <div className="absolute bottom-3 left-1/2 z-30 w-[min(94vw,560px)] -translate-x-1/2 sm:bottom-6">
        {activePanel ? (
          <section className="mb-3 max-h-[58dvh] overflow-hidden rounded-[8px] border border-white/16 bg-[#111418]/88 shadow-[0_22px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Compass className="h-4 w-4 text-cyan-200" strokeWidth={1.9} />
                {panelTitle(activePanel)}
              </div>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="grid h-8 w-8 place-items-center rounded-[8px] text-white/70 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Đóng bảng"
              >
                <X className="h-4 w-4" strokeWidth={1.9} />
              </button>
            </div>

            {activePanel === "scenes" ? (
              <div className="grid max-h-[46dvh] gap-2 overflow-auto p-3 sm:grid-cols-2">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => goToScene(scene.id)}
                    className={`flex items-center gap-3 rounded-[8px] border p-3 text-left transition active:scale-[0.99] ${
                      scene.id === activeScene.id
                        ? "border-cyan-200/56 bg-cyan-300/16"
                        : "border-white/10 bg-white/[0.04] hover:border-white/24 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-white/10 font-mono text-xs font-semibold text-white">
                      {scene.order}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">
                        {scene.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-white/58">
                        {scene.location}
                      </span>
                    </span>
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

        <nav className="grid grid-cols-5 overflow-hidden rounded-[8px] border border-white/18 bg-[#d0a393]/94 p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
          <BottomButton
            icon={Layers3}
            label="Cảnh"
            active={activePanel === "scenes"}
            onClick={() => setActivePanel(activePanel === "scenes" ? null : "scenes")}
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
      </div>

      {isLoading || loadError ? (
        <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center bg-[#090b0d]/46 backdrop-blur-sm">
          <div className="w-[min(82vw,340px)] rounded-[8px] border border-white/16 bg-black/48 p-5 text-center shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="mx-auto h-1.5 w-36 overflow-hidden rounded-full bg-white/12">
              <div className="h-full w-1/2 animate-[tourLoading_1.15s_ease-in-out_infinite] rounded-full bg-cyan-200" />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">
              {loadError ?? "Đang tải panorama"}
            </p>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes tourLoading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(220%);
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
    <div className="rounded-[8px] border border-white/10 bg-white/[0.05] p-3">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-1 leading-6 text-white/68">{detail}</p>
    </div>
  );
}

function BottomButton({
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
      className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-[8px] px-1.5 py-2.5 text-center transition active:scale-95 ${
        active ? "bg-white/18 text-white" : "text-white/92 hover:bg-white/12"
      }`}
      aria-label={label}
    >
      <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
      <span className="w-full truncate text-[11px] font-semibold leading-tight sm:text-sm">
        {label}
      </span>
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
          ? "border-cyan-200/52 bg-cyan-300/14 text-white"
          : "border-white/10 bg-white/[0.04] text-white/78 hover:border-white/24"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyan-100" strokeWidth={1.9} />
        {label}
      </span>
      <span className="h-2.5 w-2.5 rounded-full bg-current opacity-80" />
    </button>
  );
}
