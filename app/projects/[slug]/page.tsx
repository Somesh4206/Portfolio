import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS, SITE, type Project } from "@/lib/data";
import { VISUALS } from "@/components/ProjectVisuals";
import Reveal from "@/components/Reveal";

/** Step flows + takeaways derived strictly from each project's stated scope. */
const EXTRA: Record<string, { flow: string[]; lessons: string[] }> = {
  "skillvision-ai": {
    flow: ["Resume parsing", "ATS scoring (0–100)", "Skill-gap detection", "Roadmaps + interviews", "Job matching"],
    lessons: [
      "Grounding guidance in the user's own parsed resume beats generic career advice.",
      "A quantified ATS score turns vague resume feedback into actionable fixes.",
      "Mock interviews need structured critique loops, not just Q&A.",
      "RAG keeps fast-moving career knowledge current without retraining.",
      "Milestones and streaks keep long learning journeys alive.",
    ],
  },
  openblueprint: {
    flow: ["Plot measurements", "Room requirements", "AI analysis", "Design strategies", "2D blueprint + 3D view", "Cost estimation"],
    lessons: [
      "Encoding domain rules — zones, ventilation, Vastu — before generating beats freeform output.",
      "A visible step-by-step pipeline builds trust in AI-assisted design.",
      "Preliminary layouts must be framed as starting points, never final plans.",
    ],
  },
  diagnorax: {
    flow: ["Symptoms", "AI analysis", "Guidance", "Doctor discovery", "Reminders + follow-up"],
    lessons: [
      "Health UX must guide people toward professionals, never replace them.",
      "Converting a web app to mobile forces ruthless prioritization of flows.",
      "OCR plus reminders solves unglamorous but real adherence problems.",
      "Sensitive data demands careful auth, storage, and privacy defaults.",
    ],
  },
  "jeduai-connect": {
    flow: ["Languages", "Students", "Teachers", "AI assistance"],
    lessons: [
      "Roles shape everything in edtech — student, teacher, and admin see different products.",
      "Translation is a feature; multilingual thinking is the product.",
      "Automating attendance buys back teaching time.",
    ],
  },
  "applesupport-ai": {
    flow: ["Conversation", "Classification", "Retrieval", "AI response", "Escalation"],
    lessons: [
      "A TF-IDF baseline keeps embedding claims honest.",
      "An explicit escalation policy beats a confident wrong answer.",
      "Human validation belongs inside the pipeline, not after it.",
    ],
  },
  "adventure-game": {
    flow: ["Sign in (JWT)", "Explore three chapters", "Make story choices", "Unlock achievements", "Climb the leaderboard"],
    lessons: [
      "Auth and persistence turn a toy game into a real product.",
      "Content and systems ship together — chapters plus achievements and leaderboard.",
      "Deploying live forces engineering discipline no localhost demo can.",
    ],
  },
};

function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = `${p.tagline}. ${p.description}`.slice(0, 160);
  return {
    title: `${p.name} — Case Study`,
    description,
    alternates: { canonical: `${SITE.url}projects/${p.id}` },
    openGraph: {
      title: `${p.name} — Case Study · Somesh M`,
      description,
      url: `${SITE.url}projects/${p.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — Case Study · Somesh M`,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = PROJECTS.indexOf(p);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const Visual = VISUALS[p.visual];
  const extra = EXTRA[p.id];
  const repo = p.links.find((l) => l.href.includes("github.com"))?.href;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: p.name,
        description: `${p.tagline} ${p.description}`,
        ...(repo ? { codeRepository: repo } : {}),
        programmingLanguage: p.stack,
        author: { "@id": `${SITE.url}#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE.url}projects` },
          { "@type": "ListItem", position: 3, name: p.name },
        ],
      },
    ],
  };

  return (
    <main id="main" className="bg-cream text-choco">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <Reveal>
          <nav aria-label="Breadcrumb" className="label flex items-center gap-3 text-bark/70">
            <Link href="/" className="u-link">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects" className="u-link">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-clay">{p.index}</span>
          </nav>
        </Reveal>

        <Reveal delay={80}>
          <p className="label mt-10 text-clay">Case study · {p.index} / 06</p>
          <h1 className="font-display mt-4 text-[clamp(2.8rem,9vw,7rem)] font-medium uppercase leading-[0.95] tracking-tight">
            {p.name}
          </h1>
          <p className="font-display mt-4 text-2xl italic text-bark md:text-3xl">{p.tagline}</p>
        </Reveal>

        <Reveal delay={140}>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-6">
            <div>
              <dt className="label !text-[10px] text-fawn">Stack</dt>
              <dd className="mt-1.5 text-sm text-choco">{p.stack.join(" · ")}</dd>
            </div>
            {p.links.length > 0 && (
              <div>
                <dt className="label !text-[10px] text-fawn">Links</dt>
                <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="u-link inline-flex items-center gap-1 text-sm font-semibold text-choco">
                      {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10">
            <Visual />
            <p className="label mt-3 !text-[10px] text-fawn/70">Fig. {p.index} — {p.name} · conceptual render</p>
          </div>
        </Reveal>

        {p.screenshots && p.screenshots.length > 0 && (
          <Reveal>
            <section aria-label="Screenshots" className="mt-14 border-t border-line pt-10">
              <h2 className="label text-clay">Screenshots</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fawn">
                Actual captures from the running application.
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {p.screenshots.map((s, i) => (
                  <figure key={s.src} className={i === 0 ? "md:col-span-2" : ""}>
                    <span className="block overflow-hidden border border-line">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={s.width}
                        height={s.height}
                        sizes="(max-width: 768px) 100vw, 1152px"
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-700 hover:scale-[1.015]"
                      />
                    </span>
                    <figcaption className="label mt-3 !text-[10px] text-fawn/70">
                      Fig. {p.index}.{i + 1} — {s.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <section aria-label="Overview">
              <h2 className="label text-clay">Overview</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-bark">{p.description}</p>
            </section>
          </Reveal>
          <Reveal delay={90}>
            <section aria-label="Problem">
              <h2 className="label text-clay">Problem</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-bark">{p.problem}</p>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <section aria-label="How it works" className="mt-14 border-t border-line pt-10">
            <h2 className="label text-clay">How it works</h2>
            <ol className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {extra.flow.map((s, i) => (
                <li key={s} className="bg-cream p-6">
                  <p className="font-display text-4xl font-medium text-choco/20">0{i + 1}</p>
                  <p className="font-display mt-2 text-xl font-medium text-choco">{s}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-bark">{p.solution}</p>
          </section>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <section aria-label="Key features">
              <h2 className="label text-clay">Key features</h2>
              <ul className="mt-4 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-bark">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={90}>
            <section aria-label="Lessons learned">
              <h2 className="label text-clay">Lessons learned</h2>
              <ul className="mt-4 space-y-4">
                {extra.lessons.map((l, i) => (
                  <li key={l} className="border-l-2 border-clay/50 pl-4 text-[15px] italic leading-relaxed text-bark">
                    <span className="sr-only">Lesson {i + 1}: </span>{l}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl border-l-2 border-clay/50 pl-5 text-[15px] italic leading-relaxed text-bark">
            My contribution — {p.contribution}
          </p>
        </Reveal>
        {p.note && (
          <Reveal>
            <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-fawn">Note — {p.note}</p>
          </Reveal>
        )}

        <Reveal>
          <nav aria-label="More projects" className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {[
              { d: prev, label: "Previous", Icon: ArrowLeft },
              { d: next, label: "Next", Icon: ArrowRight },
            ].map(({ d, label, Icon }) => (
              <Link key={label} href={`/projects/${d.id}`} className="group bg-cream p-7 transition-colors duration-300 hover:bg-parchment">
                <p className="label !text-[10px] text-clay">{label} · {d.index}</p>
                <p className="font-display mt-2 flex items-center gap-2 text-2xl font-medium uppercase text-choco">
                  <Icon size={20} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
                  {d.name}
                </p>
              </Link>
            ))}
          </nav>
        </Reveal>
      </div>
    </main>
  );
}
