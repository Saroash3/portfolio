"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowDownRight, Briefcase, ExternalLink, GraduationCap, Presentation } from "lucide-react";
import type { ExperienceItem } from "@/content/types";
import { useRef } from "react";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

const kindMeta: Record<ExperienceItem["kind"], { label: string; Icon: typeof Briefcase; className: string }> = {
  work: { label: "Internship", Icon: Briefcase, className: "border-accent/40 text-accent" },
  training: { label: "Training", Icon: Presentation, className: "border-secondary/40 text-secondary" },
  education: { label: "Education", Icon: GraduationCap, className: "border-line-strong text-muted-foreground" },
};

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="experience-title"
          path="~/experience"
          title="Experience and training"
        />

        <div ref={listRef} className="relative max-w-4xl">
          {/* Track and the line that draws on scroll */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-px bg-line-strong"
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-[2px] origin-top -translate-x-[0.5px] bg-gradient-to-b from-accent via-accent to-secondary shadow-[0_0_12px_var(--tg-glow)]"
            style={{ scaleY: reduce ? 1 : progress }}
          />

          <ol className="relative space-y-8">

          {experience.map((item) => {
            const { label, Icon, className: kindClass } = kindMeta[item.kind];
            return (
              <li key={item.id} className="relative pl-12 sm:pl-14">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-0 grid size-8 place-items-center rounded-full border border-accent/50 bg-background text-accent shadow-[0_0_0_4px_var(--tg-background)]"
                >
                  <Icon className="size-4" />
                </span>

                <article
                  data-reveal
                  className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[11px]", kindClass)}>
                      {label}
                    </span>
                    {item.period ? <p className="font-mono text-xs text-muted-foreground">{item.period}</p> : null}
                  </div>
                  <h3 className="mt-2.5 text-xl font-semibold text-text">{item.role}</h3>
                  <p className="mt-0.5 text-secondary">
                    {item.orgUrl ? (
                      <a href={item.orgUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.org}
                      </a>
                    ) : (
                      item.org
                    )}
                    {item.location ? <span className="text-muted-foreground"> · {item.location}</span> : null}
                  </p>
                  {item.summary ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                  ) : null}
                  {item.points.length > 0 ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text/85">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.links && item.links.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-background/50 px-2.5 py-1.5 text-xs text-secondary transition hover:border-secondary/50 hover:text-text"
                          >
                            {link.label}
                            <ExternalLink className="size-3" aria-hidden="true" />
                            <span className="sr-only">(GitHub, opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.modules && item.modules.length > 0 ? (
                    <ol className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Workshops">
                      {item.modules.map((m, n) => {
                        const body = (
                          <>
                            <span className="font-mono text-[11px] text-muted-foreground">night 0{n + 1}</span>
                            <span className="mt-0.5 flex items-center gap-1.5 font-heading text-[15px] font-semibold text-text">
                              {m.title}
                              {m.projectSlug ? (
                                <ArrowDownRight className="size-4 text-accent" aria-hidden="true" />
                              ) : null}
                            </span>
                            <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                              {m.description}
                            </span>
                            {m.projectSlug ? (
                              <span className="mt-2 block font-mono text-[11px] text-accent">view project</span>
                            ) : null}
                          </>
                        );
                        const cardClass =
                          "flex h-full flex-col rounded-xl border border-line bg-background/50 p-3.5";
                        return (
                          <li key={m.title} className={cn(m.projectSlug && "sm:col-span-2")}>
                            {m.projectSlug ? (
                              <a
                                href={`#project-${m.projectSlug}`}
                                className={cn(cardClass, "border-accent/30 transition-colors hover:border-accent/60 hover:bg-accent/5")}
                              >
                                {body}
                              </a>
                            ) : (
                              <div className={cardClass}>{body}</div>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  ) : null}
                  {item.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] text-accent">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
