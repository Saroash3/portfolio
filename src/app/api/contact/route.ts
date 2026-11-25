import { Resend } from "resend";
import { contactSchema, type ContactField, type ContactResponse } from "@/lib/contact-schema";
import { site } from "@/content/site";

/**
 * POST /api/contact
 * Env (see .env.example):
 *   RESEND_API_KEY      required to send
 *   CONTACT_TO_EMAIL    where messages go (defaults to the email in src/content/site.ts)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *                       (defaults to Resend's test sender, which only delivers to your own Resend account email)
 */

// Best-effort rate limit per server instance: 5 messages per 10 minutes per IP.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, code: "invalid", message: "Invalid request." }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (payload && typeof payload === "object" && "website" in payload && (payload as { website?: unknown }).website) {
    return json({ ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === "name" || key === "email" || key === "message") && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return json(
      { ok: false, code: "invalid", message: "Please check the highlighted fields.", fieldErrors },
      400,
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip, Date.now())) {
    return json(
      { ok: false, code: "rate_limited", message: "Too many messages in a short time. Please try again later or email me directly." },
      429,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { ok: false, code: "not_configured", message: "The contact form isn't connected yet. Please email me directly." },
      503,
    );
  }

  const { name, email, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error.name, error.message);
      return json(
        { ok: false, code: "send_failed", message: "Your message couldn't be sent right now. Please email me directly." },
        502,
      );
    }
  } catch (err) {
    console.error("Contact form failed:", err instanceof Error ? err.message : err);
    return json(
      { ok: false, code: "send_failed", message: "Your message couldn't be sent right now. Please email me directly." },
      502,
    );
  }

  return json({ ok: true }, 200);
}
