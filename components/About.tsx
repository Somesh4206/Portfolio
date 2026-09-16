import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const META = [
  { k: "Discipline", v: "Computer Science & Business Systems" },
  { k: "Focus", v: "AI / ML / Full Stack" },
  { k: "Currently", v: "Building intelligent software systems" },
];

export default function About() {
  return (
    <section id="about" aria-label="About" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="02"
        eyebrow="About"
        title={<>A little<br />about me<span className="text-clay">.</span></>}
      />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-3xl font-medium leading-[1.15] text-choco md:text-[2.6rem]">
              “I build software at the intersection of{" "}
              <em className="italic text-bark">artificial intelligence</em>, full-stack
              engineering and <em className="italic text-bark">product development</em>.”
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 text-[15px] leading-relaxed text-fawn sm:grid-cols-2">
            <Reveal delay={100}>
              <p>
                I&apos;m a CS &amp; Business Systems undergraduate who learns by shipping —
                RAG assistants, career-intelligence tools, planning platforms, and
                full-stack apps, from retrieval pipeline to finished interface.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                I care about useful over flashy: honest scope, clean architecture, and
                systems that respect the people using them. Currently interning,
                studying, and keeping a daily problem-solving streak.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={140} className="lg:col-span-5">
          <aside aria-label="Profile metadata" className="border-y border-line lg:border-l lg:border-y-0 lg:pl-10">
            {META.map((m) => (
              <div key={m.k} className="border-b border-line py-5 last:border-b-0">
                <p className="label text-clay">{m.k}</p>
                <p className="font-display mt-2 text-2xl font-medium text-choco">{m.v}</p>
              </div>
            ))}
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
