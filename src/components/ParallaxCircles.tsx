"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Circle = {
  size: number;
  /** Horizontal position in percent of the viewport width. */
  left: string;
  /** Initial vertical position as a fraction of the viewport height (0..1). */
  start: number;
  /**
   * Extra speed on top of the page scroll. The circle moves (1 + factor) times
   * as fast as the content, so higher values look more "fast".
   */
  factor: number;
  tone: "fill" | "ring";
};

const CIRCLES: Circle[] = [
  { size: 360, left: "-8%", start: 0.05, factor: 0.45, tone: "fill" },
  { size: 150, left: "84%", start: 0.2, factor: 0.9, tone: "ring" },
  { size: 96, left: "10%", start: 0.35, factor: 0.7, tone: "fill" },
  { size: 260, left: "74%", start: 0.5, factor: 0.35, tone: "fill" },
  { size: 130, left: "3%", start: 0.62, factor: 1.1, tone: "ring" },
  { size: 90, left: "48%", start: 0.78, factor: 0.6, tone: "fill" },
  { size: 210, left: "64%", start: 0.9, factor: 0.5, tone: "ring" },
  { size: 64, left: "90%", start: 0.12, factor: 1.3, tone: "fill" },
];

const FILL_STYLE: CSSProperties = {
  background:
    "radial-gradient(circle at 35% 35%, rgba(96, 165, 250, 0.42), rgba(59, 130, 246, 0.08) 70%)",
};

const RING_STYLE: CSSProperties = {
  border: "1px solid rgba(59, 130, 246, 0.22)",
  background: "rgba(191, 219, 254, 0.08)",
};

export default function ParallaxCircles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-circle]"));
    let frame = 0;

    const render = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scroll = window.scrollY;

      nodes.forEach((node, index) => {
        const circle = CIRCLES[index];
        // Vertical cycle length: the circle wraps around once it leaves the screen,
        // so there are always circles visible while the user scrolls.
        const cycle = viewport + circle.size * 2;
        const raw = circle.start * viewport - (1 + circle.factor) * scroll;
        const wrapped = ((raw % cycle) + cycle) % cycle;
        const y = wrapped - circle.size;
        node.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });
    };

    const requestRender = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {CIRCLES.map((circle, index) => (
        <div
          key={index}
          data-circle
          className="absolute top-0 rounded-full will-change-transform"
          style={{
            left: circle.left,
            width: circle.size,
            height: circle.size,
            transform: `translate3d(0, ${circle.start * 100}vh, 0)`,
            ...(circle.tone === "fill" ? FILL_STYLE : RING_STYLE),
          }}
        />
      ))}
    </div>
  );
}
