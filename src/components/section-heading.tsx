import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Mono label, e.g. "~/projects" */
  path: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({ path, title, intro, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 max-w-2xl md:mb-10", className)} data-reveal>
      <p className="mb-3 font-mono text-sm text-accent">
        <span aria-hidden="true" className="text-muted-foreground">
          ${" "}
        </span>
        cd {path}
      </p>
      <h2 id={id} className="text-3xl font-semibold text-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p> : null}
    </div>
  );
}

/** Inline style helper for staggered reveals */
export function revealDelay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}
