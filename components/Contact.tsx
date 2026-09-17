"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

const LIMITS = {
  name: [2, 100],
  subject: [3, 150],
  message: [10, 5000],
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
  phone: "",
  website: "", // honeypot — humans never fill this
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const sending = useRef(false);

  const set = (k: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setFieldErrors((errs) => {
      if (!errs[k]) return errs;
      const next = { ...errs };
      delete next[k];
      return next;
    });
  };

  function clientValidate(): Record<string, string> {
    const errs: Record<string, string> = {};
    const f = { ...form, name: form.name.trim(), email: form.email.trim() };
    if (f.name.length < LIMITS.name[0] || f.name.length > LIMITS.name[1])
      errs.name = "Please add your name (2–100 characters).";
    if (!EMAIL_RE.test(f.email) || f.email.length > 254) errs.email = "That email doesn’t look valid.";
    if (f.subject.trim().length < LIMITS.subject[0] || f.subject.trim().length > LIMITS.subject[1])
      errs.subject = "Please add a subject (3–150 characters).";
    if (f.message.trim().length < LIMITS.message[0] || f.message.trim().length > LIMITS.message[1])
      errs.message = "Please write a little more (10–5000 characters).";
    if (f.company.trim().length > 150) errs.company = "Keep company under 150 characters.";
    if (f.phone.trim() && !/^[+()\-.\s\d]{7,30}$/.test(f.phone.trim()))
      errs.phone = "That phone number doesn’t look valid.";
    return errs;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending.current) return; // duplicate-submission guard
    const errs = clientValidate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setServerMessage("Please review the highlighted fields.");
      return;
    }
    sending.current = true;
    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        errors?: Record<string, string>;
      } | null;
      if (res.ok && data?.success) {
        setStatus("success");
        setForm(initialForm);
        setFieldErrors({});
      } else {
        setStatus("error");
        setFieldErrors(data?.errors ?? {});
        setServerMessage(data?.message || "Something went wrong while sending your message.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Something went wrong while sending your message.");
    } finally {
      sending.current = false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setServerMessage("");
    setFieldErrors({});
  };

  const inputCls =
    "w-full rounded-none border-b border-latte/25 bg-transparent px-1 py-3 text-[15px] text-latte placeholder:text-latte/35 transition-colors focus:border-latte/70 focus:outline-none";
  const errCls = "mt-1.5 text-[13px] text-red-200";

  const field = (
    id: string,
    label: string,
    required: boolean,
    control: React.ReactNode,
    error?: string,
    hint?: string
  ) => (
    <div>
      <label htmlFor={id} className="label !text-[10px] text-latte/60">
        {label} {required ? "" : <span className="normal-case tracking-normal text-latte/40">(optional)</span>}
      </label>
      {control}
      {error ? (
        <p id={`${id}-error`} className={errCls}>
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-latte/40">{hint}</p>
      ) : null}
    </div>
  );

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
              Prefer email?{" "}
              <a href={`mailto:${SITE.email}`} className="u-link font-semibold uppercase tracking-[0.14em] text-latte">
                Email me →
              </a>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-linelt p-7 md:p-9" aria-live="polite">
              {status === "success" ? (
                <div className="flex min-h-[320px] flex-col items-start justify-center">
                  <p className="flex h-11 w-11 items-center justify-center rounded-full border border-latte/30 text-latte" aria-hidden="true">
                    <Check size={20} />
                  </p>
                  <h3 className="label mt-5 !text-sm text-latte">Message sent.</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-latte/65">
                    Thank you for reaching out. Your message has been delivered successfully.
                    I&apos;ll get back to you through email.
                  </p>
                  <button type="button" onClick={reset} className="mt-6 text-sm text-latte/60 underline-offset-4 hover:text-latte hover:underline">
                    Write another
                  </button>
                </div>
              ) : status === "error" ? (
                <div className="flex min-h-[320px] flex-col items-start justify-center">
                  <h3 className="label !text-sm text-red-200">Message could not be sent.</h3>
                  <p role="alert" className="mt-3 max-w-sm text-[15px] leading-relaxed text-latte/65">
                    {serverMessage} Please try again or contact me directly by email.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={reset} className="inline-flex min-h-[52px] items-center rounded-full bg-latte px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-choco">
                      Try again
                    </button>
                    <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(form.subject || "Hello")}`} className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-latte/30 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] hover:border-latte/70">
                      Email me <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate aria-label="Contact form">
                  <p className="label text-latte/50">Write to me</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {field(
                      "ct-name",
                      "Your name",
                      true,
                      <input id="ct-name" name="name" autoComplete="name" maxLength={100} value={form.name} onChange={set("name")} placeholder="Ada Lovelace" aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "ct-name-error" : undefined} className={inputCls} />,
                      fieldErrors.name
                    )}
                    {field(
                      "ct-email",
                      "Your email",
                      true,
                      <input id="ct-email" name="email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={set("email")} placeholder="you@company.com" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "ct-email-error" : undefined} className={inputCls} />,
                      fieldErrors.email,
                      "Replies land here — double-check it."
                    )}
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {field(
                      "ct-company",
                      "Company / organization",
                      false,
                      <input id="ct-company" name="company" autoComplete="organization" maxLength={150} value={form.company} onChange={set("company")} placeholder="Acme Inc." aria-invalid={!!fieldErrors.company} aria-describedby={fieldErrors.company ? "ct-company-error" : undefined} className={inputCls} />,
                      fieldErrors.company
                    )}
                    {field(
                      "ct-phone",
                      "Phone",
                      false,
                      <input id="ct-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} value={form.phone} onChange={set("phone")} placeholder="+91 …" aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "ct-phone-error" : undefined} className={inputCls} />,
                      fieldErrors.phone
                    )}
                  </div>
                  <div className="mt-6">
                    {field(
                      "ct-subject",
                      "Subject",
                      true,
                      <input id="ct-subject" name="subject" maxLength={150} value={form.subject} onChange={set("subject")} placeholder="AI project discussion" aria-invalid={!!fieldErrors.subject} aria-describedby={fieldErrors.subject ? "ct-subject-error" : undefined} className={inputCls} />,
                      fieldErrors.subject
                    )}
                  </div>
                  <div className="mt-6">
                    {field(
                      "ct-msg",
                      "Message",
                      true,
                      <textarea id="ct-msg" name="message" rows={5} maxLength={5000} value={form.message} onChange={set("message")} placeholder="Hello Somesh, I’d like to discuss…" aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? "ct-msg-error" : undefined} className={`${inputCls} resize-y`} />,
                      fieldErrors.message
                    )}
                  </div>
                  {/* honeypot — invisible to humans, irresistible to bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0">
                    <label htmlFor="ct-website">Website</label>
                    <input id="ct-website" name="website" type="text" autoComplete="off" tabIndex={-1} value={form.website} onChange={set("website")} />
                  </div>
                  {serverMessage && status === "idle" && (
                    <p role="alert" className="mt-4 border border-red-300/30 bg-red-300/10 px-4 py-2.5 text-sm text-red-200">
                      {serverMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-latte px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-choco transition-all duration-300 hover:bg-cream disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
