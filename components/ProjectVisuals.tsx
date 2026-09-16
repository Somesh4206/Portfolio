/** Decorative editorial visuals in chocolate / cream ink. No screenshots, no fabricated data. */

export function SkillVisionVisual() {
  const nodes: [number, number, string][] = [
    [110, 70, "SKILLS"],
    [280, 45, "KNOWLEDGE"],
    [450, 70, "CAREER"],
    [280, 200, "LEARNING"],
  ];
  return (
    <div aria-hidden="true" className="relative h-64 overflow-hidden rounded-sm border border-linelt bg-[#1c130e] sm:h-80">
      <svg viewBox="0 0 560 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {nodes.map(([x, y], i) => (
          <line key={i} x1={280} y1={125} x2={x} y2={y} stroke="rgba(245,239,229,0.35)" strokeWidth="1" className="flow-line" />
        ))}
        <circle cx="280" cy="125" r="30" fill="none" stroke="#F5EFE5" strokeWidth="1.2" />
        <circle cx="280" cy="125" r="4" fill="#F5EFE5" className="pulse-soft" />
        {nodes.map(([x, y, t]) => (
          <g key={t}>
            <circle cx={x} cy={y} r="15" fill="none" stroke="rgba(245,239,229,0.6)" strokeWidth="1" />
            <text x={x} y={y + 30} textAnchor="middle" fontSize="9" letterSpacing="2" fill="rgba(245,239,229,0.65)" fontFamily="Inter,sans-serif">{t}</text>
          </g>
        ))}
      </svg>
      <p className="label absolute left-5 top-5 text-latte/50">Fig. 01 — Career intelligence</p>
    </div>
  );
}

export function BlueprintVisual() {
  return (
    <div aria-hidden="true" className="relative h-64 overflow-hidden rounded-sm border border-choco/25 bg-parchment sm:h-80">
      <svg viewBox="0 0 560 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="bpgrid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0v26" fill="none" stroke="rgba(74,53,41,0.18)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="560" height="300" fill="url(#bpgrid)" />
        <g fill="none" stroke="#4A3529" strokeWidth="1.6">
          <rect x="100" y="60" width="360" height="150" />
          <line x1="230" y1="60" x2="230" y2="210" />
          <line x1="360" y1="60" x2="360" y2="210" />
          <line x1="100" y1="135" x2="230" y2="135" />
        </g>
        <g fontSize="10" fill="#4A3529" fontFamily="Inter,sans-serif" letterSpacing="1.5">
          <text x="130" y="100">LIVING</text>
          <text x="260" y="100">KITCHEN</text>
          <text x="385" y="100">BED</text>
          <text x="130" y="175">STUDY</text>
        </g>
        <g stroke="#9E6B4A" strokeWidth="1">
          <line x1="100" y1="228" x2="460" y2="228" />
          <line x1="100" y1="223" x2="100" y2="233" />
          <line x1="460" y1="223" x2="460" y2="233" />
        </g>
        <text x="280" y="244" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#9E6B4A" fontFamily="Inter,sans-serif">12.4 M — PLOT WIDTH</text>
      </svg>
      <div className="label absolute bottom-4 left-5 right-5 flex flex-wrap gap-x-3 gap-y-1 text-bark/80">
        {["Measure", "Analyze", "Plan", "Visualize", "Estimate"].map((s, i, a) => (
          <span key={s}>{s}{i < a.length - 1 ? " →" : ""}</span>
        ))}
      </div>
    </div>
  );
}

export function DiagnoraXVisual() {
  const steps = ["SYMPTOMS", "AI ANALYSIS", "GUIDANCE", "DOCTOR", "FOLLOW-UP"];
  return (
    <div aria-hidden="true" className="relative flex h-64 flex-col justify-center overflow-hidden rounded-sm border border-linelt bg-[#1c130e] px-6 sm:h-80 sm:px-12">
      <div className="flex items-stretch justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex-1 text-center">
              <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-latte/40 font-display text-lg text-latte sm:h-14 sm:w-14">0{i + 1}</p>
              <p className="label mt-3 text-[9px] text-latte/60">{s}</p>
            </div>
            {i < steps.length - 1 && <span className="mx-1 mb-8 text-latte/40">→</span>}
          </div>
        ))}
      </div>
      <p className="label mt-8 text-center text-latte/40">Fig. 03 — Care flow, conceptual</p>
    </div>
  );
}

export function JeduVisual() {
  return (
    <div aria-hidden="true" className="relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-sm border border-choco/25 bg-parchment px-6 text-center sm:h-80">
      <p className="font-display text-4xl font-medium text-choco sm:text-6xl">
        EN <span className="text-clay">·</span> TA <span className="text-clay">·</span> HI
      </p>
      <p className="font-display mt-2 text-2xl italic text-bark sm:text-3xl">+ every classroom in between</p>
      <div className="label mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-bark/80">
        <span>Languages</span><span>↔</span><span>Students</span><span>↔</span><span>Teachers</span><span>↔</span><span>AI</span>
      </div>
    </div>
  );
}

export function SupportVisual() {
  const steps = ["CUSTOMER", "CONVERSATION", "RETRIEVAL", "AI RESPONSE", "ESCALATION"];
  return (
    <div aria-hidden="true" className="relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-sm border border-linelt bg-[#1c130e] px-6 sm:h-80">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center">
          <p className={`border px-6 py-2 text-[12px] tracking-[0.22em] ${i === steps.length - 1 ? "border-clay bg-clay/15 text-latte" : "border-latte/25 text-latte/85"}`}>
            {s}
          </p>
          {i < steps.length - 1 && <span aria-hidden="true" className="my-1 text-latte/40">↓</span>}
        </div>
      ))}
    </div>
  );
}

export function GameVisual() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden rounded-sm border border-choco/25 bg-choco p-6">
      <p className="text-[12px] tracking-[0.2em] text-latte/60">$ ./adventure --start</p>
      <p className="font-display mt-3 text-2xl italic text-latte">
        “Two doors glow faintly. Choose wisely…”
      </p>
      <p className="mt-3 text-[12px] tracking-[0.2em] text-latte/60">[1] Blue door&nbsp;&nbsp;&nbsp;[2] Follow the signal</p>
    </div>
  );
}

export const VISUALS = {
  skillvision: SkillVisionVisual,
  blueprint: BlueprintVisual,
  diagnorax: DiagnoraXVisual,
  jedu: JeduVisual,
  support: SupportVisual,
  game: GameVisual,
} as const;
