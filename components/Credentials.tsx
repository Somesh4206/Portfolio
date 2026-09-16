import Reveal from "./Reveal";
import { CERTIFICATIONS, MILESTONES } from "@/lib/data";

export default function Credentials() {
  return (
    <section aria-label="Certifications and milestones" className="border-t border-line bg-parchment/60">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="label text-clay">Things I&apos;ve learned</p>
            <h2 className="font-display mt-3 text-4xl font-medium text-choco md:text-5xl">Certifications<span className="text-clay">.</span></h2>
          </Reveal>
          <ol className="mt-8 border-t border-line">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal as="li" key={`${c.title}-${i}`} delay={i * 50}>
                <div data-hover className="group flex cursor-default items-baseline gap-5 border-b border-line py-4 transition-all duration-500 hover:pl-3">
                  <span className="font-display text-lg text-choco/30 transition-colors duration-500 group-hover:text-clay">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-choco">{c.title}</p>
                    <p className="text-[13px] text-fawn">{c.org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div>
          <Reveal>
            <p className="label text-clay">Milestones</p>
            <h2 className="font-display mt-3 text-4xl font-medium leading-[1.02] text-choco md:text-5xl">
              Built<span className="text-clay">.</span> Learned<span className="text-clay">.</span> Solved<span className="text-clay">.</span>
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
            {MILESTONES.map((m, i) => (
              <Reveal as="li" key={m.label} delay={i * 60} className="bg-cream">
                <div data-hover className="group h-full p-6 transition-colors duration-500 hover:bg-choco md:p-7">
                  <p className="font-display text-4xl font-medium text-choco transition-colors duration-500 group-hover:text-latte md:text-5xl">
                    {m.value}
                  </p>
                  <p className="label mt-2 !text-[10px] text-fawn transition-colors duration-500 group-hover:text-latte/60">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <p className="mt-5 text-sm leading-relaxed text-fawn">
              Only what&apos;s verifiable is listed — profiles linked below.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
