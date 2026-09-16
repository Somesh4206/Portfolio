"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
};

/** GPU-friendly scroll reveal; static final state when reduced motion. */
export default function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const elRef = useRef<HTMLElement | null>(null);
  const setRef = (el: HTMLElement | null) => {
    elRef.current = el;
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `reveal ${className}`;
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  if (as === "li") {
    return (
      <li ref={setRef} className={cls} style={style}>
        {children}
      </li>
    );
  }
  if (as === "span") {
    return (
      <span ref={setRef} className={cls} style={style}>
        {children}
      </span>
    );
  }
  if (as === "section") {
    return (
      <section ref={setRef} className={cls} style={style}>
        {children}
      </section>
    );
  }
  if (as === "article") {
    return (
      <article ref={setRef} className={cls} style={style}>
        {children}
      </article>
    );
  }
  return (
    <div ref={setRef} className={cls} style={style}>
      {children}
    </div>
  );
}
