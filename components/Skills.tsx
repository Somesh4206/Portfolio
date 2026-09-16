import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { SKILL_CLUSTERS } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="06"
        eyebrow="Skills"
        title={<>The tools<br />behind the work<span className="text-clay">.</span></>}
        lede="A typographic wall, not a report card. Hover any technology for context."
      />
      <div className="border-t border-line">
        {SKILL_CLUSTERS.map((c, ci) => (
          <div key={c.title} className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:py-12">
            <Reveal className="md:col-span-3">
              <p className="label text-clay">0{ci + 1}</p>
              <h3 className="font-display mt-2 text-3xl font-medium uppercase tracking-wide text-choco">
                {c.title}
              </h3>
            </Reveal>
            <ul className="md:col-span-9">
              {c.items.map((s, i) => (
                <Reveal as="li" key={s.name} delay={i * 60} className="group border-b border-line/60 py-4 last:border-b-0 md:py-5">
                  <div data-hover className="flex cursor-default items-baseline gap-4">
                    <span className="font-display text-3xl font-medium text-choco transition-all duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-bark sm:text-4xl md:text-[2.75rem]">
                      {s.name}
                    </span>
                    <span className="ml-auto hidden text-right text-[13px] text-fawn opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
                      {s.blurb}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-fawn sm:hidden">{s.blurb}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Reveal delay={100}>
        <p className="label mt-10 text-center text-fawn">
          Currently deepening — RAG evaluation · Docker workflows · Secure API design
        </p>
      </Reveal>
    </section>
  );
}
