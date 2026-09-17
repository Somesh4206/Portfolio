import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { VISUALS, GameVisual } from "./ProjectVisuals";

const DARK = new Set(["skillvision", "diagnorax", "support"]);

function Meta({ k, v, dark }: { k: string; v: string; dark: boolean }) {
  return (
    <div>
      <dt className={`label ${dark ? "text-latte/50" : "text-clay"}`}>{k}</dt>
      <dd className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-latte/80" : "text-bark"}`}>{v}</dd>
    </div>
  );
}

function Spread({ p, flip }: { p: Project; flip: boolean }) {
  const dark = DARK.has(p.visual);
  const Visual = VISUALS[p.visual];
  const ink = dark ? "text-latte" : "text-choco";
  const sub = dark ? "text-latte/65" : "text-fawn";
  const hair = dark ? "border-linelt" : "border-line";

  return (
    <div className={dark ? "bg-choco text-latte" : "bg-cream"}>
      <article aria-label={`${p.name} case study`} className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="group" data-hover>
            <p className={`font-display text-[clamp(4rem,12vw,9rem)] font-medium leading-none tracking-tight transition-transform duration-700 group-hover:translate-x-3 ${dark ? "text-latte/15" : "text-choco/10"}`} aria-hidden="true">
              {p.index}
            </p>
            <h3 className={`font-display -mt-6 text-4xl font-medium uppercase leading-[0.95] tracking-tight transition-all duration-700 group-hover:tracking-normal sm:text-6xl md:-mt-10 md:text-7xl ${ink}`}>
              {p.name}
            </h3>
            <p className="font-display mt-3 text-xl italic md:text-2xl" style={{ color: dark ? "rgba(245,239,229,0.7)" : "#4A3529" }}>
              {p.tagline}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 md:mt-14">
            <Visual />
          </div>
        </Reveal>

        <div className={`mt-10 grid gap-8 border-t ${hair} pt-8 md:grid-cols-3 md:gap-10`}>
          <Reveal>
            <Meta k="Problem" v={p.problem} dark={dark} />
          </Reveal>
          <Reveal delay={100}>
            <Meta k="Solution" v={p.solution} dark={dark} />
          </Reveal>
          <Reveal delay={180}>
            <div>
              <dt className={`label ${dark ? "text-latte/50" : "text-clay"}`}>Technology</dt>
              <dd className={`mt-2 text-[15px] leading-loose ${dark ? "text-latte/80" : "text-bark"}`}>
                {p.stack.join(" · ")}
              </dd>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className={`mt-8 max-w-3xl border-l-2 pl-5 text-[15px] italic leading-relaxed ${dark ? "border-latte/30 text-latte/70" : "border-clay/50 text-bark"}`}>
            My contribution — {p.contribution}
          </p>
        </Reveal>

        {p.note && (
          <Reveal delay={140}>
            <p className={`mt-5 max-w-3xl text-[13px] leading-relaxed ${sub}`}>Note — {p.note}</p>
          </Reveal>
        )}

        <Reveal delay={160}>
          <div className={`mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t ${hair} pt-6`}>
            <a
              href={`/projects/${p.id}`}
              className="u-link group inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.18em]"
            >
              View case study
              <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link group inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] opacity-70 hover:opacity-100"
              >
                {l.label}
                <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            {p.links.length === 0 && (
              <span className={`text-[13px] ${sub}`}>Code available on request.</span>
            )}
            <span className={`label ml-auto hidden sm:block ${dark ? "text-latte/40" : "text-fawn/70"}`}>
              {flip ? "Spread" : "Story"} · {p.index} / 06
            </span>
          </div>
        </Reveal>
      </article>
    </div>
  );
}

export default function Projects() {
  const [main, mini] = [PROJECTS.slice(0, 5), PROJECTS.slice(5)];
  return (
    <section id="work" aria-label="Selected work" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 pb-4 pt-20 sm:px-8 md:pt-28">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title={<>Selected<br />work<span className="text-clay">.</span></>}
          lede="Six builds, each told as a magazine spread with its own case-study page. Hover a title; it leans closer."
        />
      </div>
      {main.map((p, i) => (
        <Spread key={p.id} p={p} flip={i % 2 === 1} />
      ))}
      {/* compact experiment strip */}
      <div className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <article aria-label={`${mini[0].name}`} className="grid gap-8 border-y border-line py-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="label text-clay">[06 — Live project]</p>
                <h3 className="font-display mt-3 text-4xl font-medium uppercase text-choco">{mini[0].name}</h3>
                <p className="font-display mt-1 text-lg italic text-bark">{mini[0].tagline}</p>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fawn">{mini[0].description}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <a href={`/projects/${mini[0].id}`} className="u-link inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-choco">
                    View case study <ArrowUpRight size={15} />
                  </a>
                  {mini[0].links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="u-link inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-choco opacity-70 hover:opacity-100">
                      {l.label} <ArrowUpRight size={15} />
                    </a>
                  ))}
                </div>
              </div>
              <GameVisual />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
