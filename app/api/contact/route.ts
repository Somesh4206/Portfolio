import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// ————— limits —————
const LIMITS = {
  name: [2, 100],
  email: 254,
  subject: [3, 150],
  message: [10, 5000],
  company: 150,
  phone: 30,
} as const;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// ————— helpers —————
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF to block header injection; collapse stray whitespace. */
function cleanHeader(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

function isValidEmail(s: string): boolean {
  return s.length <= LIMITS.email && EMAIL_RE.test(s) && !/[\r\n]/.test(s);
}

type Fields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  phone: string;
};

function validate(body: unknown): { fields: Fields; errors: Record<string, string> } {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const fields: Fields = {
    name: str(b.name),
    email: str(b.email),
    subject: str(b.subject),
    message: str(b.message),
    company: str(b.company ?? b.organization),
    phone: str(b.phone),
  };
  const errors: Record<string, string> = {};
  if (fields.name.length < LIMITS.name[0] || fields.name.length > LIMITS.name[1])
    errors.name = "Please add your name (2–100 characters).";
  if (!isValidEmail(fields.email)) errors.email = "That email doesn’t look valid.";
  if (fields.subject.length < LIMITS.subject[0] || fields.subject.length > LIMITS.subject[1])
    errors.subject = "Please add a subject (3–150 characters).";
  if (fields.message.length < LIMITS.message[0] || fields.message.length > LIMITS.message[1])
    errors.message = "Please write a little more (10–5000 characters).";
  if (fields.company.length > LIMITS.company) errors.company = "Keep company under 150 characters.";
  if (fields.phone && !/^[+()\-.\s\d]{7,30}$/.test(fields.phone))
    errors.phone = "That phone number doesn’t look valid.";
  return { fields, errors };
}

// ————— lightweight in-memory rate limit (per server instance) —————
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  // occasional prune so the map can't grow unbounded
  if (hits.size > 2000) {
    for (const [k, v] of hits) {
      if (v.length === 0 || now - v[v.length - 1] > RATE_WINDOW_MS) hits.delete(k);
      if (hits.size <= 1000) break;
    }
  }
  return false;
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// ————— email templates (table-based, image-free, editorial) —————
const INK = "#241914";
const CREAM = "#F5EFE5";
const PAPER = "#F3EDE2";
const MUTED = "#6E5C50";
const CLAY = "#9E6B4A";

function notificationHtml(f: Fields): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:10px 0;border-bottom:1px solid #E3D8C6;font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${CLAY};">${k}</td></tr>` +
    `<tr><td style="padding:6px 0 14px 0;font-family:Georgia,serif;font-size:17px;color:${INK};">${v}</td></tr>`;
  const opt =
    (f.company ? row("Company", escapeHtml(f.company)) : "") +
    (f.phone ? row("Phone", escapeHtml(f.phone)) : "");
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background-color:${PAPER};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PAPER};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${CREAM};border:1px solid #D9CBB6;">
<tr><td style="background-color:${INK};padding:28px 32px;text-align:center;">
<p style="margin:0;font-family:Georgia,serif;font-size:22px;letter-spacing:4px;color:${CREAM};">SOMESH M</p>
<p style="margin:6px 0 0 0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9BBA6;">Portfolio Contact</p>
</td></tr>
<tr><td style="padding:28px 32px;">
<p style="margin:0 0 18px 0;font-family:Georgia,serif;font-style:italic;font-size:18px;color:${MUTED};">New message from your portfolio</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", escapeHtml(f.name))}
${row("Email", `<a href="mailto:${escapeHtml(f.email)}" style="color:${INK};">${escapeHtml(f.email)}</a>`)}
${row("Subject", escapeHtml(f.subject))}
${opt}
${row("Message", escapeHtml(f.message).replace(/\n/g, "<br>"))}
</table>
<p style="margin:22px 0 0 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;color:${MUTED};">Hit Reply — your response goes straight to the visitor.</p>
</td></tr>
<tr><td style="padding:16px 32px;border-top:1px solid #D9CBB6;text-align:center;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">Sent from Somesh M Portfolio</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function notificationText(f: Fields): string {
  return [
    "SOMESH M — Portfolio Contact",
    "New message from your portfolio",
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Subject: ${f.subject}`,
    ...(f.company ? [`Company: ${f.company}`] : []),
    ...(f.phone ? [`Phone: ${f.phone}`] : []),
    "",
    f.message,
    "",
    "--------------------------------",
    "Hit Reply — your response goes straight to the visitor.",
    "Sent from Somesh M Portfolio",
  ].join("\n");
}

function autoreplyHtml(firstName: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background-color:${PAPER};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PAPER};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${CREAM};border:1px solid #D9CBB6;">
<tr><td style="background-color:${INK};padding:28px 32px;text-align:center;">
<p style="margin:0;font-family:Georgia,serif;font-size:22px;letter-spacing:4px;color:${CREAM};">SOMESH M</p>
<p style="margin:6px 0 0 0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9BBA6;">Portfolio</p>
</td></tr>
<tr><td style="padding:28px 32px;font-family:Georgia,serif;font-size:17px;line-height:1.7;color:${INK};">
<p style="margin:0;">Hi ${escapeHtml(firstName)},</p>
<p>Thank you for reaching out through my portfolio. I&apos;ve received your message and will get back to you as soon as possible.</p>
<p>Best regards,<br>Somesh M</p>
<p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">AI Developer | Full Stack Engineer</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function autoreplyText(firstName: string): string {
  return [
    `Hi ${firstName},`,
    "",
    "Thank you for reaching out through my portfolio.",
    "",
    "I’ve received your message and will get back to you as soon as possible.",
    "",
    "Best regards,",
    "Somesh M",
    "",
    "AI Developer | Full Stack Engineer",
    "https://somesh-m.vercel.app/",
  ].join("\n");
}

// ————— route —————
export async function POST(req: NextRequest) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Please review the highlighted fields." },
      { status: 400 }
    );
  }

  // honeypot — bots fill it; humans never see it. Pretend success.
  const trap = body as Record<string, unknown>;
  if (typeof trap.website === "string" && trap.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const { fields, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Please review the highlighted fields.", errors },
      { status: 400 }
    );
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { success: false, message: "Too many messages — please try again in a few minutes." },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !isValidEmail(to) || !fromEmail || !isValidEmail(fromEmail)) {
    console.error("contact: email service is not configured");
    return NextResponse.json(
      { success: false, message: "Unable to send your message." },
      { status: 500 }
    );
  }

  const from = `Somesh M Portfolio <${fromEmail}>`;
  const visitorEmail = cleanHeader(fields.email);
  const subject = cleanHeader(fields.subject);
  const resend = new Resend(apiKey);

  const [notify, ack] = await Promise.allSettled([
    resend.emails.send({
      from,
      to,
      replyTo: visitorEmail,
      subject,
      html: notificationHtml(fields),
      text: notificationText(fields),
    }),
    resend.emails.send({
      from,
      to: visitorEmail,
      replyTo: to,
      subject: "Thanks for reaching out — Somesh M",
      html: autoreplyHtml(fields.name.split(" ")[0] || fields.name),
      text: autoreplyText(fields.name.split(" ")[0] || fields.name),
    }),
  ]);

  if (notify.status === "rejected") {
    console.error("contact: notification send failed");
    return NextResponse.json(
      { success: false, message: "Unable to send your message." },
      { status: 500 }
    );
  }
  if (ack.status === "rejected") {
    // notification landed; acknowledgement is best-effort
    console.error("contact: acknowledgement send failed");
  }

  return NextResponse.json({ success: true });
}
