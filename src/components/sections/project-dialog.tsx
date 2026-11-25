"use client";

import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/content/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectCover } from "@/components/project-cover";

export function ProjectDialog({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      {project ? (
        <DialogContent
          className="flex max-h-[90dvh] flex-col gap-0 overflow-y-auto overscroll-contain border border-line-strong bg-surface p-0 ring-0 sm:max-w-3xl"
        >
          <ProjectCover project={project} sizes="(min-width: 768px) 768px, 100vw" className="shrink-0 border-b border-line" />

          <div className="space-y-7 p-6 sm:p-8">
            <DialogHeader className="gap-3 text-left">
              <p className="font-mono text-xs text-accent">
                {project.kicker}
                {project.context ? <span className="text-muted-foreground"> · {project.context}</span> : null}
              </p>
              <DialogTitle className="font-heading text-2xl font-semibold text-text sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                {project.summary}
              </DialogDescription>
              {project.status ? (
                <span className="w-fit rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] text-secondary">
                  {project.status}
                </span>
              ) : null}
            </DialogHeader>

            <DetailBlock label="the problem">
              <p className="leading-relaxed text-text/90">{project.problem}</p>
            </DetailBlock>

            <DetailBlock label="what I built">
              <ul className="space-y-2.5">
                {project.built.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed text-text/90">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </DetailBlock>

            {project.role ? (
              <DetailBlock label="my role">
                <p className="leading-relaxed text-text/90">{project.role}</p>
              </DetailBlock>
            ) : null}

            {project.highlights && project.highlights.length > 0 ? (
              <DetailBlock label="numbers">
                <ul className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="rounded-lg border border-line bg-background/60 px-3 py-1.5 text-sm text-text/90">
                      {h}
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            ) : null}

            <DetailBlock label="stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-md bg-accent/10 px-2 py-1 font-mono text-xs text-accent">
                    {s}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <ProjectLinks project={project} size="lg" />
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2.5 font-mono text-xs tracking-wide text-muted-foreground">
        <span className="text-accent">#</span> {label}
      </h3>
      {children}
    </section>
  );
}

export function ProjectLinks({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const { live, code } = project.links;
  if (!live && !code) return null;
  const base =
    size === "lg"
      ? "inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium transition"
      : "inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-medium transition";
  return (
    <div className="flex flex-wrap gap-2.5">
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-accent text-accent-foreground hover:bg-[#4fd162]`}
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          Live demo
          <span className="sr-only"> of {project.title} (opens in a new tab)</span>
        </a>
      ) : null}
      {code ? (
        <a
          href={code}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-line-strong bg-background/40 text-text hover:border-secondary/60 hover:text-secondary`}
        >
          <FaGithub className="size-4" aria-hidden="true" />
          Code
          <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}
