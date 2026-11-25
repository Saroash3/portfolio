"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { featuredProjects, projectCategories, projects } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/types";
import { SectionHeading, revealDelay } from "@/components/section-heading";
import { ProjectCover } from "@/components/project-cover";
import { ProjectDialog, ProjectLinks } from "./project-dialog";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/** The grid lists only the projects that aren't already shown as featured cards. */
const moreProjects = projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return moreProjects
      .filter((p) => filter === "All" || p.categories.includes(filter))
      .filter(
        (p) =>
          !q ||
          [p.title, p.kicker, p.summary, ...p.stack, ...p.categories].join(" ").toLowerCase().includes(q),
      );
  }, [filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: moreProjects.length };
    for (const p of moreProjects) for (const cat of p.categories) c[cat] = (c[cat] ?? 0) + 1;
    return c;
  }, []);

  // Links like #project-skillsync (e.g. from the Experience section) must land
  // on a visible card, so clear any filter or search first.
  useEffect(() => {
    const reveal = () => {
      const slug = window.location.hash.match(/^#project-(.+)$/)?.[1];
      if (!slug || !moreProjects.some((p) => p.slug === slug)) return;
      setFilter("All");
      setQuery("");
      requestAnimationFrame(() =>
        document.getElementById(`project-${slug}`)?.scrollIntoView({ block: "center" }),
      );
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section id="projects" aria-labelledby="projects-title" className="relative py-14 md:py-20">
        <div aria-hidden="true" className="bg-grid mask-fade-y absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            id="projects-title"
            path="~/projects"
            title={
              <>
                Things I&apos;ve <span className="text-gradient">built</span>
              </>
            }
            intro="Three featured builds that put AI models behind real interfaces, then more projects below."
          />

          {/* Featured */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <FeaturedCard
                key={project.slug}
                project={project}
                wide={i === 0}
                index={i}
                onOpen={() => setSelected(project)}
              />
            ))}
          </div>

          {/* All projects */}
          <div className="mt-16" id="more-projects">
            <div data-reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-sm text-accent">
                  <span className="text-muted-foreground">$</span> ls ./projects --more
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-text sm:text-3xl">More projects</h3>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-surface/70 p-1">
                  {projectCategories.filter((cat) => (counts[cat] ?? 0) > 0).map((cat) => {
                    const active = filter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setFilter(cat)}
                        className={cn(
                          "relative rounded-lg px-3 py-1.5 font-mono text-xs transition-colors",
                          active ? "text-accent-foreground" : "text-muted-foreground hover:text-text",
                        )}
                      >
                        {active ? (
                          <motion.span
                            layoutId="project-filter-pill"
                            className="absolute inset-0 rounded-lg bg-accent"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        ) : null}
                        <span className="relative">
                          {cat} <span className={active ? "opacity-70" : "opacity-60"}>{counts[cat] ?? 0}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <label className="relative flex items-center">
                  <span className="sr-only">Search projects</span>
                  <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="grep projects…"
                    className="h-10 w-full rounded-xl border border-line bg-surface/70 pr-9 pl-9 font-mono text-sm text-text placeholder:text-muted-foreground focus:border-accent/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent sm:w-56 [&::-webkit-search-cancel-button]:hidden"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2 grid size-6 place-items-center rounded-md text-muted-foreground hover:text-text"
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  ) : null}
                </label>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {visible.length} {visible.length === 1 ? "project" : "projects"} shown
            </p>

            <motion.ul layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project) => (
                  <motion.li
                    key={project.slug}
                    id={`project-${project.slug}`}
                    className="scroll-mt-24 rounded-2xl target:ring-2 target:ring-accent/60"
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <GridCard project={project} onOpen={() => setSelected(project)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {visible.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-10 text-center font-mono text-sm text-muted-foreground">
                grep: no projects match &ldquo;{query}&rdquo;.{" "}
                <button
                  type="button"
                  className="text-secondary underline-offset-4 hover:underline"
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <ProjectDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
      </section>
    </MotionConfig>
  );
}

function FeaturedCard({
  project,
  wide,
  index,
  onOpen,
}: {
  project: Project;
  wide: boolean;
  index: number;
  onOpen: () => void;
}) {
  return (
    <article
      data-reveal
      style={revealDelay(index * 90)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_20px_80px_-30px_var(--tg-glow)]",
        wide && "md:col-span-2 lg:grid lg:grid-cols-[1.25fr_1fr]",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block overflow-hidden text-left"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectCover
          project={project}
          sizes={wide ? "(min-width: 1024px) 640px, (min-width: 768px) 100vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className={cn("border-b border-line", wide && "lg:h-full lg:border-r lg:border-b-0")}
        />
        <span className="absolute top-3 right-3 rounded-full border border-line-strong bg-background/80 px-2.5 py-1 font-mono text-[11px] text-accent backdrop-blur">
          featured · 0{index + 1}
        </span>
      </button>

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", wide && "lg:p-9")}>
        <p className="font-mono text-xs text-accent">
          {project.kicker}
          {project.status ? <span className="text-secondary"> · {project.status}</span> : null}
        </p>
        <h3 className={cn("mt-2 font-semibold text-text", wide ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl")}>
          {project.title}
        </h3>
        {project.context ? <p className="mt-1.5 text-sm text-muted-foreground">{project.context}</p> : null}
        <p className="mt-4 leading-relaxed text-text/85">{project.summary}</p>

        {wide && project.highlights ? (
          <ul className="mt-5 grid grid-cols-2 gap-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="rounded-xl border border-line bg-background/50 px-3 py-2 text-sm text-text/90">
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, wide ? 9 : 6).map((s) => (
            <li key={s} className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] text-accent">
              {s}
            </li>
          ))}
          {project.stack.length > (wide ? 9 : 6) ? (
            <li className="rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground">
              +{project.stack.length - (wide ? 9 : 6)}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3.5 text-sm font-medium text-accent transition hover:bg-accent/20"
          >
            Case study
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">: {project.title}</span>
          </button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function GridCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong">
      <button
        type="button"
        onClick={onOpen}
        className="block text-left"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectCover
          project={project}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="border-b border-line"
        />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-accent">{project.kicker}</p>
        </div>
        <h4 className="mt-1.5 font-heading text-lg font-semibold text-text">{project.title}</h4>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="rounded-md bg-background/70 px-2 py-0.5 font-mono text-[11px] text-text/80">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium text-secondary transition hover:text-text"
          >
            Details
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">: {project.title}</span>
          </button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
