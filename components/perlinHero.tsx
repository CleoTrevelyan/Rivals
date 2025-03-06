import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";

const PerlinNoiseBackground: React.FC = () => {
  if (Platform.OS !== "web") {
    return <View style={[styles.container, { backgroundColor: "#101025" }]} />;
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js";
    script.async = true;

    script.onload = () => {
      const startSketch = () => {
        const p5 = (window as any).p5;
        new p5((p: any) => {
          const isMobile = window.innerWidth <= 768;
          const config = {
            numberOfParticles: isMobile ? 800 : 1500,
            scale: 0.005,
            particleSpeed: { min: 0.8, max: 1.2 },
            strokeWeight: isMobile ? 0.8 : 1,
            backgroundColor: [16, 16, 37],
            strokeColor: [2, 241, 153, 200],
          };

          let particles: any[] = [];
          const TAU = p.TAU || 2 * Math.PI;

          const onScreen = ({ x, y }: { x: number; y: number }) =>
            x >= 0 && x <= p.width && y >= 0 && y <= p.height;

          const initializeParticles = () => {
            const parts = new Array(config.numberOfParticles);
            for (let i = 0; i < config.numberOfParticles; i++) {
              parts[i] = {
                pos: p.createVector(p.random(p.width), p.random(p.height)),
                speed: p.random(
                  config.particleSpeed.min,
                  config.particleSpeed.max
                ),
              };
            }
            return parts;
          };

          p.setup = () => {
            const canvas = p.createCanvas(
              window.innerWidth,
              window.innerHeight
            );
            canvas.style("position", "absolute");
            canvas.style("left", "0");
            canvas.style("top", "0");
            canvas.style("z-index", "0");
            canvas.style("opacity", "0.8");

            particles = initializeParticles();

            p.stroke(...config.strokeColor);
            p.strokeWeight(config.strokeWeight);
            p.pixelDensity(1);
            p.frameRate(30);
          };

          p.draw = () => {
            p.background(...config.backgroundColor);

            const width = p.width;
            const height = p.height;

            for (let i = 0; i < particles.length; i++) {
              const particle = particles[i];
              const { pos, speed } = particle;

              p.point(pos.x, pos.y);

              const n = p.noise(pos.x * config.scale, pos.y * config.scale);
              const a = TAU * n;

              pos.x += p.cos(a) * speed;
              pos.y += p.sin(a) * speed;

              if (!onScreen(pos)) {
                pos.x = p.random(width);
                pos.y = p.random(height);
              }
            }
          };

          p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            for (let particle of particles) {
              if (!onScreen(particle.pos)) {
                particle.pos.x = p.random(p.width);
                particle.pos.y = p.random(p.height);
              }
            }
          };
        }, containerRef.current);
      };

      startSketch();
    };

    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        const canvases = containerRef.current.querySelectorAll("canvas");
        canvases.forEach((canvas) => canvas.remove());
      }

      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={webStyles.container as React.CSSProperties}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
});

const webStyles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    backgroundColor: "rgb(16, 16, 37)",
  },
};

export default PerlinNoiseBackground;
