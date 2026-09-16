"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ start }: { start: boolean }) {
  const reduce = useReducedMotion();
  const state = reduce ? "show" : start ? "show" : "hidden";

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-44">
        {/* top meta rule */}
        <motion.div variants={rise} initial="hidden" animate={state} custom={0} className="flex items-end justify-between border-b border-line pb-5">
          <p className="label text-bark/70">Somesh M — Portfolio</p>
          <p className="label hidden text-bark/70 sm:block">Vol. 01 · Intelligent Systems</p>
          <p className="label text-clay">EST. 2026</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <motion.p variants={rise} initial="hidden" animate={state} custom={1} className="font-script mt-10 text-4xl text-bark md:text-5xl">
              Somesh M
            </motion.p>
            <motion.h1
              variants={rise}
              initial="hidden"
              animate={state}
              custom={2}
              className="font-display mt-4 text-[clamp(3.4rem,11vw,8.5rem)] font-medium leading-[0.92] tracking-tight text-choco"
            >
              BUILDING
              <br />
              <em className="font-light italic text-bark">Intelligent</em>
              <br />
              SYSTEMS.
            </motion.h1>
            <motion.p variants={rise} initial="hidden" animate={state} custom={3} className="mt-8 max-w-xl text-base leading-relaxed text-fawn md:text-lg">
              Computer Science student and developer building AI-powered, full-stack
              and intelligent software systems.
            </motion.p>
            <motion.div variants={rise} initial="hidden" animate={state} custom={4} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-choco px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-bark"
              >
                Explore work
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-choco/30 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-choco transition-colors duration-300 hover:border-choco hover:bg-choco hover:text-cream"
              >
                View resume
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </div>

          {/* asymmetric side rail */}
          <motion.aside
            variants={rise}
            initial="hidden"
            animate={state}
            custom={5}
            aria-label="Roles"
            className="flex flex-row gap-8 border-t border-line pt-6 lg:col-span-3 lg:flex-col lg:justify-end lg:gap-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            {["AI Developer", "Full Stack Engineer", "Cybersecurity Enthusiast"].map((r, i) => (
              <div key={r}>
                <p className="text-xs text-clay">0{i + 1}</p>
                <p className="font-display mt-1 text-2xl font-medium leading-tight text-choco">{r}</p>
              </div>
            ))}
          </motion.aside>
        </div>

        {/* bottom meta rule */}
        <motion.div variants={rise} initial="hidden" animate={state} custom={6} className="mt-14 flex items-end justify-between border-t border-line pt-5">
          <p className="max-w-[220px] text-[13px] leading-relaxed text-fawn">
            Based in India
            <br />
            Computer Science & Business Systems
          </p>
          <p className="label hidden text-bark/70 sm:block">Fig. 01 — The Engineer</p>
          <a href="#about" className="u-link label text-choco">
            Scroll to explore ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
