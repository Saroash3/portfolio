import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Shows the project's real screenshot, or an original generated code-style
 * cover when there is none. Never renders a broken image.
 */
export function ProjectCover({
  project,
  sizes,
  className,
  preload,
}: {
  project: Project;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  if (project.media) {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface-2", className)}>
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const lines = project.coverLines ?? [project.kicker];
  const slugFile = `${project.slug}.${project.categories.includes("AI") ? "py" : "ts"}`;

  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] flex-col overflow-hidden bg-[#0b0f14]",
        className,
      )}
      role="img"
      aria-label={`${project.title} cover`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 90% at 0% 0%, rgb(63 185 80 / 0.22), transparent 55%), radial-gradient(90% 80% at 100% 100%, rgb(88 166 255 / 0.22), transparent 55%)",
        }}
      />
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="relative flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#f85149]/80" />
        <span className="size-2.5 rounded-full bg-[#d29922]/80" />
        <span className="size-2.5 rounded-full bg-accent/80" />
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">{slugFile}</span>
      </div>
      <div aria-hidden="true" className="relative flex flex-1 flex-col justify-center gap-1.5 px-5 py-4 font-mono text-[12px] leading-relaxed sm:text-[13px]">
        {lines.map((line, i) => (
          <p key={i} className="truncate">
            <span className="mr-3 inline-block w-4 text-right text-muted-foreground/60">{i + 1}</span>
            <span className={i === lines.length - 1 ? "text-accent" : "text-text/85"}>{line}</span>
          </p>
        ))}
      </div>
      <p className="relative px-5 pb-4 font-heading text-2xl font-semibold text-text/95 sm:text-3xl">
        {project.title}
      </p>
    </div>
  );
}
