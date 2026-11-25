import Image from "next/image";
import { ArrowDown, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { TypingRoles } from "@/components/effects/typing-roles";
import { SocialIcon } from "@/components/social-icon";
import { TechIcon } from "@/components/effects/tech-icon";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Small tech badges that float around the hero photo */
const floatingBadges = [
  { name: "Next.js", className: "-right-4 top-[9%] sm:-right-6", delay: "0s" },
  { name: "Python", className: "-right-5 top-[46%] sm:-right-8", delay: "-2s" },
  { name: "FastAPI", className: "-left-4 top-[66%] sm:-left-7", delay: "-4s" },
];

/** Live demo shown as the hero's secondary button (taken from the Structura project entry) */
const STRUCTURA_URL = projects.find((p) => p.slug === "structura")?.links.live ?? "https://structura-gules.vercel.app";

export function Hero({ hasPhoto }: { hasPhoto: boolean }) {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-8 sm:pt-28 md:pb-10 lg:pt-32 lg:pb-8"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div>
          <p className="hero-in font-mono text-sm text-muted-foreground" style={d(0)}>
            <span className="text-accent">saroash@islamabad</span>
            <span className="text-secondary">:~</span>$ whoami
          </p>

          <h1
            id="hero-title"
            className="hero-rise mt-5 text-[2.75rem] leading-[1.02] font-bold text-text sm:text-6xl md:text-7xl"
            style={d(80)}
          >
            {site.name}
          </h1>

          <p
            className="hero-rise mt-4 min-h-[1.3em] font-heading text-2xl font-semibold sm:text-3xl md:text-4xl"
            style={d(180)}
          >
            <TypingRoles roles={site.roles} />
          </p>

          <p
            className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={d(280)}
          >
            {site.tagline}
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={d(380)}>
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 font-medium text-accent-foreground transition hover:-translate-y-0.5 hover:bg-[#4fd162]"
            >
              View projects
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={STRUCTURA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-line-strong bg-surface px-6 font-medium text-text transition hover:-translate-y-0.5 hover:border-secondary/60 hover:text-secondary"
            >
              Try Structura
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <ul className="hero-in mt-8 flex items-center gap-3" style={d(460)} aria-label="Social links">
            {site.socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  {...(s.key !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-xl border border-line bg-surface/50 text-muted-foreground transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon name={s.key} className="size-[18px]" />
                </a>
              </li>
            ))}
            <li className="ml-2 hidden items-center gap-1.5 font-mono text-xs text-muted-foreground sm:flex">
              <MapPin className="size-3.5" aria-hidden="true" />
              {site.location}
            </li>
          </ul>
        </div>

        {/* Photo: full portrait; a light travels around the border and badges float nearby */}
        <div className="hero-in mx-auto flex flex-col items-center" style={d(200)}>
          <div className="group relative w-[250px] sm:w-[290px] lg:w-[312px]">
            <div className="photo-border relative rounded-[24px] p-[2px]">
              <div className="overflow-hidden rounded-[22px] bg-surface">
                <div className="relative aspect-[9/16] overflow-hidden">
                  {hasPhoto ? (
                    <Image
                      src={site.photoPath}
                      alt={site.photoAlt}
                      fill
                      preload
                      quality={90}
                      sizes="(min-width: 1024px) 312px, (min-width: 640px) 290px, 250px"
                      className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="bg-grid grid size-full place-items-center" role="img" aria-label={site.photoAlt}>
                      <span className="font-heading text-7xl font-bold text-gradient">{initials}</span>
                    </div>
                  )}
                  {/* Soft fade at the bottom so the status card sits on the photo naturally */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface via-surface/50 to-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Floating tech badges (decorative) */}
            {floatingBadges.map((b) => (
              <div
                key={b.name}
                aria-hidden="true"
                className={`float absolute grid size-11 place-items-center rounded-xl border border-line-strong bg-surface sm:size-12 ${b.className}`}
                style={{ "--fd": b.delay } as React.CSSProperties}
              >
                <TechIcon name={b.name} className="size-5 sm:size-6" />
              </div>
            ))}

            {/* Education chip, overlapping the left edge */}
            <div
              className="float absolute top-[22%] -left-10 hidden items-center gap-2 rounded-xl border border-line-strong bg-surface px-3 py-2 sm:flex"
              style={{ "--fd": "-1.5s" } as React.CSSProperties}
            >
              <GraduationCap className="size-4 text-accent" aria-hidden="true" />
              <span className="font-mono text-[11.5px] leading-tight text-text">
                BS Software Eng.
                <span className="block text-muted-foreground">FAST-NUCES</span>
              </span>
            </div>
          </div>

          <div className="relative z-10 -mt-9 flex flex-col items-center gap-1.5 rounded-2xl border border-line-strong bg-surface px-5 py-3 font-mono text-[12.5px]">
            {site.availability ? (
              <p className="flex items-center gap-2 text-text">
                <span className="relative inline-flex size-2">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
                  <span className="relative size-2 rounded-full bg-accent" />
                </span>
                {site.availability}
              </p>
            ) : null}
            <p className="text-muted-foreground">
              stack: <span className="text-secondary">Next.js · FastAPI · LLMs</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
