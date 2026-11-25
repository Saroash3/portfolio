import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { about } from "@/content/about";
import type { AboutFact } from "@/content/types";
import { SectionHeading, revealDelay } from "@/components/section-heading";
import { AboutBio } from "./about-bio";
import { cn } from "@/lib/utils";

const icons: Record<AboutFact["icon"], React.ComponentType<{ className?: string }>> = {
  education: GraduationCap,
  location: MapPin,
  work: Briefcase,
  focus: Sparkles,
};

/** Bento spans for up to four facts */
const spans = ["sm:col-span-2", "", "", "sm:col-span-2"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="about-title" path="~/about" title={<>A builder who ships the whole stack</>} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div data-reveal>
            <AboutBio paragraphs={about.bio} />
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {about.facts.map((fact, i) => {
              const Icon = icons[fact.icon];
              return (
                <li
                  key={fact.label}
                  data-reveal
                  style={revealDelay(i * 80)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40",
                    spans[i] ?? "",
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 size-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
                    <Icon className="size-4 text-accent" aria-hidden="true" />
                    {fact.label}
                  </div>
                  <p className="mt-3 font-heading text-lg font-semibold text-text sm:text-xl">{fact.value}</p>
                  {fact.detail ? <p className="mt-1 text-sm text-muted-foreground">{fact.detail}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
