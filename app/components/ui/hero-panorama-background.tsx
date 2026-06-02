"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroPanoramaBackgroundProps {
  imageSrc: string;
}

export function HeroPanoramaBackground({ imageSrc }: HeroPanoramaBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.className = "h-full w-full";
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      58,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      1000,
    );
    camera.position.set(0, 0, 0.1);

    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(500, 96, 64);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.y = -0.28;
    scene.add(sphere);

    let frame = 0;
    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loader = new THREE.TextureLoader();

    loader.load(
      imageSrc,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        material.map = texture;
        material.opacity = 1;
        material.needsUpdate = true;
      },
      undefined,
      () => {
        material.opacity = 0;
      },
    );

    const resize = () => {
      const width = mount.clientWidth;
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const animate = () => {
      if (!reduceMotion) {
        sphere.rotation.y += 0.00075;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [imageSrc]);

  return <div ref={mountRef} aria-hidden className="absolute inset-0" />;
}
