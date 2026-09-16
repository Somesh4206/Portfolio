import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience and education" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title={<>Where I&apos;ve<br />been building<span className="text-clay">.</span></>}
      />
      <ol className="border-t border-line">
        {EXPERIENCE.map((e, i) => (
          <Reveal as="li" key={e.org} delay={i * 90}>
            <article className="group grid gap-3 border-b border-line py-10 transition-all duration-500 hover:bg-parchment/50 md:grid-cols-12 md:gap-6 md:px-4">
              <p className="font-display text-6xl font-medium text-choco/15 transition-colors duration-500 group-hover:text-clay/60 md:col-span-2 md:text-7xl">
                0{i + 1}
              </p>
              <div className="md:col-span-6">
                <p className="label text-clay">{e.period} · Internship</p>
                <h3 className="font-display mt-2 text-3xl font-medium uppercase text-choco md:text-4xl">{e.org}</h3>
                <p className="font-display mt-1 text-xl italic text-bark">{e.role}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-fawn md:col-span-4 md:pt-8">{e.detail}</p>
            </article>
          </Reveal>
        ))}
      </ol>

      {/* education */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <p className="label text-clay">05 · The foundation</p>
          <h3 className="font-display mt-3 max-w-3xl text-4xl font-medium leading-tight text-choco md:text-5xl">
            B.Tech — Computer Science and Business Systems
          </h3>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 text-[15px] leading-relaxed text-fawn">
            V.S.B. Engineering College · Affiliated to Anna University · Expected graduation 2027
          </p>
        </Reveal>
      </div>
    </section>
  );
}
