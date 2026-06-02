"use client";

import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import type React from "react";
import { HeroPanoramaBackground } from "@/app/components/ui/hero-panorama-background";

interface HeroShaderBackgroundProps {
  children: React.ReactNode;
  imageSrc: string;
}

export function HeroShaderBackground({ children, imageSrc }: HeroShaderBackgroundProps) {
  return (
    <div className="relative isolate overflow-hidden border-b border-[var(--surface-border)]">
      <svg aria-hidden className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="heritage-glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.03
                      0 1 0 0 0.04
                      0 0 1 0 0.02
                      0 0 0 0.88 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.2] saturate-[0.9]"
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
      <HeroPanoramaBackground imageSrc={imageSrc} />
      <div aria-hidden className="absolute inset-0 bg-[rgb(18_21_16_/_0.34)]" />

      <div aria-hidden className="absolute inset-0 overflow-hidden opacity-75 mix-blend-soft-light">
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={["#121510", "#c8a46a", "#f8f2e5", "#2b332b", "#6b5030"]}
          speed={0.28}
        />
        <MeshGradient
          className="absolute inset-0 h-full w-full opacity-70"
          colors={["#0d100c", "#f8f2e5", "#c8a46a", "#171a14"]}
          speed={0.2}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(18_21_17_/_0.94)_0%,rgb(18_21_17_/_0.74)_39%,rgb(18_21_17_/_0.30)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgb(18_21_17_/_0.96))]"
      />

      {children}

      <div aria-hidden className="absolute bottom-8 right-8 z-10 hidden h-20 w-20 items-center justify-center lg:flex">
        <PulsingBorder
          colors={["#f8f2e5", "#c8a46a", "#8d9276", "#f0eadc"]}
          colorBack="#00000000"
          speed={0.8}
          roundness={1}
          thickness={0.08}
          softness={0.28}
          intensity={2.8}
          bloom={0.22}
          spots={3}
          spotSize={0.12}
          pulse={0.08}
          smoke={0.28}
          smokeSize={3}
          scale={0.64}
          rotation={0}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
          }}
        />
        <span className="absolute text-xs font-semibold tracking-[0.18em] text-[var(--tour-ink)]/85">VR360</span>
      </div>
    </div>
  );
}
