"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "@/lib/data";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Please add your name (2+ characters).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("That email doesn’t look valid yet.");
    if (message.trim().length < 10) return setError("Tell me a little more (10+ characters).");
    setError("");
    setSent(true);
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(`Hi Somesh,\n\n${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Clipboard blocked — select the text manually.");
    }
  };

  const inputCls =
    "w-full rounded-none border-b border-latte/25 bg-transparent px-1 py-3 text-[15px] text-latte placeholder:text-latte/35 transition-colors focus:border-latte/70 focus:outline-none";

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-20 bg-choco text-latte">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <Reveal>
          <p className="label text-latte/50">07 · Contact — © Somesh M 2026</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="font-display mt-6 text-[clamp(3.2rem,10vw,8rem)] font-medium leading-[0.92] tracking-tight">
            Let&apos;s
            <br />
            build
            <br />
            <em className="font-light italic text-latte/85">something</em>
            <br />
            intelligent<span className="text-clay">.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-latte/65">
            Available for software engineering, AI and full-stack opportunities.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <ul className="border-t border-linelt">
              {[
                { label: "LinkedIn", href: SITE.linkedin, note: "Fastest response" },
                { label: "GitHub", href: SITE.github, note: "@Somesh4206" },
                { label: "LeetCode", href: SITE.leetcode, note: "100-day streak" },
              ].map((l) => (
                <li key={l.label} className="border-b border-linelt">
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-4 py-5">
                    <span className="font-display text-3xl font-medium uppercase transition-all duration-500 group-hover:translate-x-2 group-hover:italic md:text-4xl">
                      {l.label}
                    </span>
                    <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    <span className="ml-auto text-[13px] text-latte/50">{l.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-latte/50">
              Prefer email? Send a LinkedIn message with your address and I&apos;ll reply within a day.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-linelt p-7 md:p-9">
              {!sent ? (
                <form onSubmit={onSubmit} noValidate aria-label="Contact form">
                  <p className="label text-latte/50">Write to me</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className="label !text-[10px] text-latte/60">Your name</label>
                      <input id="ct-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="ct-email" className="label !text-[10px] text-latte/60">Your email</label>
                      <input id="ct-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputCls} />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label htmlFor="ct-msg" className="label !text-[10px] text-latte/60">Project / message</label>
                    <textarea id="ct-msg" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="We’re hiring interns for…" className={`${inputCls} resize-y`} />
                  </div>
                  {error && (
                    <p role="alert" className="mt-4 border border-red-300/30 bg-red-300/10 px-4 py-2.5 text-sm text-red-200">
                      {error}
                    </p>
                  )}
                  <button type="submit" className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-latte px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-choco transition-colors duration-300 hover:bg-cream">
                    Compose message <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="flex min-h-[300px] flex-col items-start justify-center">
                  <p className="flex h-11 w-11 items-center justify-center rounded-full border border-latte/30 text-latte" aria-hidden="true">
                    <Check size={20} />
                  </p>
                  <h3 className="font-display mt-4 text-3xl font-medium">Draft ready, {name.split(" ")[0]}.</h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-latte/65">
                    Copy it and send it via LinkedIn — the fastest way to reach me.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={copyDraft} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-latte px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-choco">
                      <Copy size={14} aria-hidden="true" /> {copied ? "Copied!" : "Copy message"}
                    </button>
                    <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-latte/30 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] hover:border-latte/70">
                      Open LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                  <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm text-latte/50 underline-offset-4 hover:text-latte hover:underline">
                    Write another
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
