import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, SITE } from "@/lib/data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects — Case Studies",
  description:
    "Case studies of systems built by Somesh M: SkillVision AI, OpenBlueprint, DiagnoraX, JeduAI Connect, AppleSupport AI and more.",
  alternates: { canonical: `${SITE.url}projects` },
  openGraph: {
    title: "Projects — Case Studies · Somesh M",
    description:
      "Case studies of systems built by Somesh M: SkillVision AI, OpenBlueprint, DiagnoraX, JeduAI Connect, AppleSupport AI and more.",
    url: `${SITE.url}projects`,
    type: "website",
  },
};

export default function ProjectsIndex() {
  return (
    <main id="main" className="bg-cream text-choco">
      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <Reveal>
          <nav aria-label="Breadcrumb" className="label flex items-center gap-3 text-bark/70">
            <Link href="/" className="u-link">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-clay">Projects</span>
          </nav>
        </Reveal>
        <Reveal delay={80}>
          <p className="label mt-10 text-clay">Index · 06 entries</p>
          <h1 className="font-display mt-4 text-[clamp(2.8rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight">
            All<br />projects<span className="text-clay">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fawn md:text-lg">
            Every system, one shelf. Pick a case study to read the full story —
            problem, approach, stack, and lessons.
          </p>
        </Reveal>
        <ol className="mt-12 border-t border-line">
          {PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.id} delay={Math.min(i, 5) * 60}>
              <Link
                href={`/projects/${p.id}`}
                className="group grid gap-2 border-b border-line py-8 transition-all duration-500 hover:bg-parchment/50 md:grid-cols-12 md:items-baseline md:gap-6 md:px-4"
              >
                <span className="font-display text-5xl font-medium text-choco/15 transition-colors duration-500 group-hover:text-clay/60 md:col-span-2 md:text-6xl">
                  {p.index}
                </span>
                <span className="md:col-span-6">
                  <span className="font-display block text-3xl font-medium uppercase text-choco transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {p.name}
                  </span>
                  <span className="font-display mt-1 block text-lg italic text-bark">{p.tagline}</span>
                </span>
                <span className="text-sm leading-relaxed text-fawn md:col-span-3">{p.stack.slice(0, 4).join(" · ")}</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-choco md:col-span-1 md:justify-self-end">
                  Open <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </main>
  );
}
