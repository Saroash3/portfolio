import { Brain, Cloud, Database, Layout, Server } from "lucide-react";
import { marquee, skillGroups } from "@/content/skills";
import { SectionHeading, revealDelay } from "@/components/section-heading";
import { SpotlightGroup } from "@/components/effects/spotlight-group";
import { TechIcon, techIcons } from "@/components/effects/tech-icon";
import { cn } from "@/lib/utils";

const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Layout,
  backend: Server,
  ai: Brain,
  data: Database,
  cloud: Cloud,
};

/** Bento layout on large screens for five groups */
const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="skills-title"
          path="~/skills"
          title="Tools I build with"
          intro="Grouped by where they sit in the stack. No percentage bars; the projects below show what I do with them."
        />

        <SpotlightGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => {
            const Icon = groupIcons[group.id] ?? Layout;
            return (
              <article
                key={group.id}
                data-reveal
                style={revealDelay(i * 70)}
                className={cn(
                  "spotlight group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong",
                  spans[i] ?? "lg:col-span-2",
                  i === skillGroups.length - 1 && skillGroups.length % 2 === 1 && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-accent">{group.path}</p>
                    <h3 className="mt-1.5 text-xl font-semibold text-text">{group.title}</h3>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-background/60 text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-background/50 px-2.5 py-1.5 font-mono text-xs text-text/90 transition-colors group-hover:border-line-strong"
                    >
                      <TechIcon name={skill} className="size-3.5" />
                      {skill}
                    </li>
                  ))}
                  {group.learning?.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-secondary/40 px-2.5 py-1.5 font-mono text-xs text-secondary"
                    >
                      <TechIcon name={skill} className="size-3.5" />
                      {skill}
                      <span className="text-muted-foreground">· learning</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </SpotlightGroup>
      </div>

      {/* Slow tech marquee */}
      <div className="mask-fade-x group/marquee relative mt-12 overflow-hidden" aria-label="Technologies" role="region">
        <ul
          className="animate-marquee flex w-max gap-[var(--marquee-gap)] [--marquee-duration:55s] [--marquee-gap:0.75rem] group-hover/marquee:[animation-play-state:paused]"
        >
          {[...marquee, ...marquee].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= marquee.length ? true : undefined}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-surface/60 px-4 py-3 font-mono text-sm text-muted-foreground"
            >
              {techIcons[name] ? <TechIcon name={name} className="size-5" /> : null}
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
