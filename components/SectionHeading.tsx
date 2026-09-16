import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  dark = false,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  dark?: boolean;
}) {
  const sub = dark ? "text-latte/60" : "text-fawn";
  const ink = dark ? "text-latte" : "text-choco";
  return (
    <div className="mb-12 md:mb-20">
      <Reveal>
        <p className={`label flex items-center gap-4 ${dark ? "text-latte/60" : "text-bark/70"}`}>
          <span aria-hidden="true">{index}</span>
          <span aria-hidden="true" className={`h-px w-12 ${dark ? "bg-latte/30" : "bg-choco/25"}`} />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className={`font-display mt-5 max-w-5xl text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-7xl ${ink}`}>
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={170}>
          <p className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${sub}`}>{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
