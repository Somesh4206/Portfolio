"use client";

import { useEffect, useRef, useState } from "react";

/** Small dot + ring; difference-blend so it inverts on cream and chocolate. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("a, button, [data-hover]");
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${hovering ? 1.6 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[96] hidden mix-blend-difference [@media(pointer:fine)]:block">
      <div ref={dotRef} className="absolute left-0 top-0 -ml-[3px] -mt-[3px]">
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>
      <div ref={ringRef} className="absolute left-0 top-0 -ml-4 -mt-4">
        <div className="h-8 w-8 rounded-full border border-white/70" />
      </div>
    </div>
  );
}

/** Slim clay scroll-progress bar — legible on cream and chocolate. */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-[2px]">
      <div className="h-full origin-left bg-clay" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
