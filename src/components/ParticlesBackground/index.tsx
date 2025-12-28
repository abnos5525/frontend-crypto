"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { useTheme } from "@/src/contexts/ThemeContext";
import tailwindConfig from "@/tailwind.config";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  const particleColor = theme === "dark" ? colors.xcolor21 : colors.xcolor6;
  const backgroundColor = theme === "dark" ? colors.xcolor23 : colors.xcolor3;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      options={{
        background: {
          color: {
            value: backgroundColor,
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
          },
          color: {
            value: particleColor,
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.2, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 2.5 },
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          links: {
            enable: false,
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            bubble: {
              distance: 100,
              size: 4,
              duration: 2,
              opacity: 1,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
