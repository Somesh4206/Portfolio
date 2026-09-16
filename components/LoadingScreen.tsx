"use client";

import { useEffect, useRef, useState } from "react";
import { SIGN_GLYPHS, SIGN_VIEWBOX } from "./signature";

type Props = {
  duration?: number;
  brandName?: string;
  year?: string;
  role?: string;
  onComplete?: () => void;
};

const HOLD_MS = 600;
const EXIT_MS = 650;
const WRITE_START = 400;
const PROGRESS_DELAY = 250;
const STROKE_W = 26; // font units ≈ 2.4px at rendered size

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeInOut = (t: number) => {
  t = clamp01(t);
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};
const smooth = (t: number) => {
  t = clamp01(t);
  return t * t * (3 - 2 * t);
};

/**
 * Compact editorial loader. The signature is authored vector outlines
 * (Caveat 600) drawn stroke-by-stroke, then ink-filled — a true
 * handwriting reveal, not a fade or typewriter.
 */
export default function LoadingScreen({
  duration = 2800,
  brandName = "Somesh M",
  year = "2026",
  role = "AI Developer · Full Stack Engineer",
  onComplete,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"run" | "exit">("run");
  const [calm] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const boxRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const nibRef = useRef<SVGCircleElement>(null);
  const lastInt = useRef(-1);
  const finished = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    const prevOverflow = document.body.style.overflow;
    let raf = 0;
    let holdTimer = 0;
    let exitTimer = 0;
    let alive = true;

    // lock interaction with the page behind the loader
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    boxRef.current?.focus({ preventScroll: true });

    const progSpan = calm ? 600 : duration;
    const t100 = PROGRESS_DELAY + progSpan;
    const w0 = calm ? 0 : WRITE_START;
    const w1 = w0 + (calm ? 0 : Math.min(1500, duration * 0.55));
    const holdMs = calm ? 200 : HOLD_MS;
    const exitMs = calm ? 350 : EXIT_MS;

    // reveal the ink layer (fallback script text stays for no-JS)
    if (!calm) root.classList.add("ink-live");

    // cache stroke lengths for the pen nib (offsets use pathLength normalization)
    let lengths: (number | null)[] = SIGN_GLYPHS.map(() => null);
    try {
      lengths = pathsRef.current.map((p) => (p ? p.getTotalLength() : null));
    } catch {
      lengths = SIGN_GLYPHS.map(() => null);
    }
    let nibDead = false;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      if (alive) onComplete?.();
    };

    const t0 = performance.now();
    const tick = (now: number) => {
      if (!alive) return;
      const t = now - t0;

      // — progress (state only when the integer changes) —
      const p = t < PROGRESS_DELAY ? 0 : Math.round(easeInOut((t - PROGRESS_DELAY) / progSpan) * 100);
      if (p !== lastInt.current) {
        lastInt.current = p;
        setProgress(p);
      }

      // — handwriting —
      const wspan = Math.max(1, w1 - w0);
      let active = -1;
      SIGN_GLYPHS.forEach((g, i) => {
        const local = smooth((t - (w0 + g.w0 * wspan)) / ((g.w1 - g.w0) * wspan));
        const el = pathsRef.current[i];
        if (el) {
          el.setAttribute("stroke-dashoffset", String(100 * (1 - local)));
          el.setAttribute("fill-opacity", String(smooth((local - 0.45) / 0.55)));
        }
        if (local > 0 && local < 1) active = i;
      });

      // — pen nib follows the writing frontier —
      const nib = nibRef.current;
      if (nib && !nibDead) {
        try {
          if (active >= 0 && lengths[active]) {
            const g = SIGN_GLYPHS[active];
            const local = smooth((t - (w0 + g.w0 * wspan)) / ((g.w1 - g.w0) * wspan));
            const el = pathsRef.current[active];
            const pt = el!.getPointAtLength(clamp01(local) * (lengths[active] as number));
            nib.setAttribute("cx", String(pt.x));
            nib.setAttribute("cy", String(pt.y));
            nib.setAttribute("opacity", "0.9");
          } else {
            nib.setAttribute("opacity", "0");
          }
        } catch {
          nibDead = true;
          nib.setAttribute("opacity", "0");
        }
      }

      if (t < t100) {
        raf = requestAnimationFrame(tick);
      } else {
        nib?.setAttribute("opacity", "0");
        holdTimer = window.setTimeout(() => {
          if (!alive) return;
          setPhase("exit");
          exitTimer = window.setTimeout(finish, exitMs);
        }, holdMs);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
      document.body.style.overflow = prevOverflow;
      main?.removeAttribute("inert");
      root.classList.remove("ink-live");
    };
  }, [duration, onComplete, calm]);

  const exiting = phase === "exit";

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="status"
      aria-label={`${brandName} — loading portfolio`}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cream outline-none transition-opacity duration-700 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`loader-panel w-[min(440px,86vw)] bg-choco px-8 py-10 text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 ${
          exiting ? (calm ? "opacity-0" : "scale-[1.03] opacity-0") : "scale-100 opacity-100"
        }`}
        style={{ borderRadius: 3, boxShadow: "0 30px 80px -40px rgba(36,25,20,0.5)" }}
      >
        <p className="loader-label label !text-[10px] text-latte/50">Portfolio · {year}</p>

        {/* signature — vector stroke-draw when live, real text otherwise */}
        <div className="mt-6" aria-hidden="true">
          <p className="ink-fallback font-script text-5xl leading-none text-latte sm:text-6xl">{brandName}</p>
          <svg viewBox={SIGN_VIEWBOX} className="ink-svg mx-auto w-full max-w-[320px]" role="presentation">
            {SIGN_GLYPHS.map((g, i) => (
              <path
                key={g.ch}
                ref={(el) => {
                  pathsRef.current[i] = el;
                }}
                d={g.d}
                fill="#F5EFE5"
                fillOpacity={0}
                stroke="#F5EFE5"
                strokeWidth={STROKE_W}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={100}
              />
            ))}
            <circle ref={nibRef} r={30} fill="#F5EFE5" opacity={0} />
          </svg>
        </div>

        <p aria-hidden="true" className="font-display mt-5 text-[22px] tabular-nums text-latte/90">
          {progress}%
        </p>
        <div aria-hidden="true" className="mx-auto mt-4 h-[2px] w-[62%] overflow-hidden rounded-full bg-latte/15">
          <div className="h-full rounded-full bg-latte" style={{ width: `${progress}%` }} />
        </div>
        <p className="label mt-6 !text-[10px] text-latte/45">{role}</p>
      </div>
    </div>
  );
}
