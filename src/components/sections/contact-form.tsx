"use client";

import { CheckCircle2, Loader2, Mail, Send, TriangleAlert } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { ContactField, ContactResponse } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string };

type Values = Record<ContactField, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Mirrors src/lib/contact-schema.ts so the browser doesn't download zod. The server re-validates. */
function validate(v: Values): Partial<Values> {
  const e: Partial<Values> = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();
  if (name.length < 2) e.name = "Please enter your name.";
  else if (name.length > 80) e.name = "Name is too long.";
  if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";
  if (message.length < 10) e.message = "Please write at least 10 characters.";
  else if (message.length > 4000) e.message = "Please keep it under 4,000 characters.";
  return e;
}

export function ContactForm({ email }: { email: string }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    values.name ? `Hello from ${values.name.trim()}` : "Hello Saroash",
  )}&body=${encodeURIComponent(values.message.trim())}`;

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    const firstBad = (["name", "email", "message"] as const).find((f) => found[f]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "" }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && data?.ok) {
        setStatus({ state: "success" });
        setValues({ name: "", email: "", message: "" });
        setTouched({});
        setErrors({});
        return;
      }
      if (data && !data.ok && data.fieldErrors) setErrors(data.fieldErrors);
      setStatus({
        state: "error",
        message:
          data && !data.ok ? data.message : "Something went wrong. Please email me directly.",
      });
    } catch {
      setStatus({ state: "error", message: "You seem to be offline. Please try again or email me directly." });
    }
  }

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-accent/40 bg-surface p-8 text-center"
      >
        <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
        <p className="mt-4 font-heading text-2xl font-semibold text-text">Message sent</p>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thanks for reaching out. I&apos;ll reply to the email you gave as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 font-mono text-sm text-secondary underline-offset-4 hover:underline"
        >
          send another
        </button>
      </div>
    );
  }

  const field = (name: ContactField) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    "aria-invalid": Boolean(touched[name] && errors[name]) || undefined,
    "aria-describedby": touched[name] && errors[name] ? `${uid}-${name}-error` : undefined,
    onBlur: () => {
      setTouched((t) => ({ ...t, [name]: true }));
      setErrors(validate(values));
    },
  });

  const inputClass =
    "w-full rounded-xl border border-line-strong bg-background/60 px-4 text-text placeholder:text-muted-foreground/70 transition-colors focus:border-accent/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-destructive/80";

  const sending = status.state === "sending";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${uid}-hint`}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <p id={`${uid}-hint`} className="mb-6 font-mono text-xs text-muted-foreground">
        <span className="text-accent">$</span> ./send-message --to saroash
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium text-text">
            Name
          </label>
          <input
            {...field("name")}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={cn(inputClass, "h-12")}
            onChange={(e) => update("name", e.target.value)}
          />
          <FieldError id={`${uid}-name-error`} message={touched.name ? errors.name : undefined} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium text-text">
            Email
          </label>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            className={cn(inputClass, "h-12")}
            onChange={(e) => update("email", e.target.value)}
          />
          <FieldError id={`${uid}-email-error`} message={touched.email ? errors.email : undefined} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${uid}-message`} className="mb-2 block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          {...field("message")}
          rows={6}
          placeholder="What would you like to talk about?"
          className={cn(inputClass, "min-h-36 resize-y py-3 leading-relaxed")}
          onChange={(e) => update("message", e.target.value)}
        />
        <FieldError id={`${uid}-message-error`} message={touched.message ? errors.message : undefined} />
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input ref={honeypot} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status.state === "error" ? (
          <div className="mt-5 flex gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <div>
              <p className="text-text">{status.message}</p>
              <a href={mailto} className="mt-1.5 inline-flex items-center gap-1.5 font-medium text-secondary hover:underline">
                <Mail className="size-4" aria-hidden="true" />
                Email {email}
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a href={mailto} className="text-sm text-muted-foreground underline-offset-4 hover:text-secondary hover:underline">
          Prefer your mail app? Email me instead
        </a>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 font-medium text-accent-foreground transition hover:bg-[#4fd162] disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send message
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-[#ff7b72]">
      {message}
    </p>
  );
}
