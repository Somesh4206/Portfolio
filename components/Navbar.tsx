"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4 sm:px-6">
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-6xl items-center justify-between px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "rounded-full bg-choco text-latte shadow-[0_18px_50px_-20px_rgba(36,25,20,0.55)]"
              : "border-b border-line bg-transparent text-choco"
          }`}
        >
          <a href="#home" className="flex items-center gap-3" aria-label="Somesh M — home">
            <span
              aria-hidden="true"
              className={`font-display flex h-9 w-9 items-center justify-center rounded-full border text-[15px] font-semibold tracking-tight transition-colors duration-500 ${
                scrolled ? "border-latte/30" : "border-choco/30"
              }`}
            >
              SM
            </span>
            <span className="label hidden !text-[10px] sm:inline">Somesh M</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="u-link group text-[12px] font-semibold uppercase tracking-[0.18em]">
                  <span aria-hidden="true" className={`mr-1.5 text-[10px] font-normal ${scrolled ? "text-latte/50" : "text-clay"}`}>
                    {item.n}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className={`hidden rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 md:inline-block ${
              scrolled
                ? "bg-latte text-choco hover:bg-cream"
                : "bg-choco text-cream hover:bg-bark"
            }`}
          >
            Hire me
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[65] flex flex-col bg-cream px-6 pb-10 pt-28 md:hidden">
          <p className="label text-bark/60">Menu</p>
          <ul className="mt-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="text-xs text-clay">{item.n}</span>
                  <span className="font-display text-4xl font-medium text-choco">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-auto rounded-full bg-choco px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-cream"
          >
            Hire me
          </a>
        </div>
      )}
    </>
  );
}
