"use client";

import { MeshGradient } from "@paper-design/shaders-react";
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
        className="absolute inset-0 bg-cover bg-center opacity-[0.58] saturate-[1.12] contrast-[1.04]"
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
      <HeroPanoramaBackground imageSrc={imageSrc} />
      <div aria-hidden className="absolute inset-0 bg-[rgb(243_247_240_/_0.12)]" />

      <div aria-hidden className="absolute inset-0 overflow-hidden opacity-48 mix-blend-soft-light">
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={["#f8fbf2", "#d6b468", "#e0eddf", "#245f4b", "#ffffff"]}
          speed={0.28}
        />
        <MeshGradient
          className="absolute inset-0 h-full w-full opacity-45"
          colors={["#ffffff", "#e7cb81", "#dcebdd", "#0e3427"]}
          speed={0.2}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(243_247_240_/_0.93)_0%,rgb(243_247_240_/_0.72)_42%,rgb(243_247_240_/_0.14)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgb(243_247_240_/_0.98))]"
      />

      {children}
    </div>
  );
}
