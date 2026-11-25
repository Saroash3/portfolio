import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading, revealDelay } from "@/components/section-heading";
import { SocialIcon } from "@/components/social-icon";
import { ContactForm } from "./contact-form";

export function Contact() {
  const order = ["email", "linkedin", "github"] as const;
  const cards = order
    .map((key) => site.socials.find((s) => s.key === key))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-14 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[480px] opacity-60"
        style={{ background: "radial-gradient(60% 70% at 50% 100%, rgb(63 185 80 / 0.12), transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="contact-title"
          path="~/contact"
          title={
            <>
              Let&apos;s <span className="text-gradient">talk</span>
            </>
          }
          intro="Hiring for an AI or full-stack internship, or want to talk about one of my projects? Send a message and I'll get back to you."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <ul className="grid min-w-0 grid-cols-1 content-start gap-4">
            {cards.map((s, i) => (
              <li key={s.key} data-reveal style={revealDelay(i * 80)}>
                <a
                  href={s.href}
                  {...(s.key !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-background/60 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <SocialIcon name={s.key} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs text-muted-foreground">{s.label}</span>
                    <span className="block truncate font-medium text-text">{s.handle}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                  {s.key !== "email" ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
            <li data-reveal style={revealDelay(240)} className="flex items-center gap-2 px-1 pt-2 font-mono text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {site.location} · PKT (UTC+5)
            </li>
          </ul>

          <div data-reveal style={revealDelay(120)}>
            <ContactForm email={site.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
