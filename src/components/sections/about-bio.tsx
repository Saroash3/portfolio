"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/** First paragraph always visible; the rest expands. Without JS everything is shown (see globals.css). */
export function AboutBio({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const [first, ...rest] = paragraphs;

  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
      <p className="text-text/90">{first}</p>
      {rest.length > 0 ? (
        <>
          <div
            id={id}
            data-bio-rest
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
            inert={!open}
          >
            <div className="space-y-4 overflow-hidden">
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md font-mono text-sm text-secondary transition hover:text-text"
          >
            {open ? "show less" : "read more"}
            <ChevronDown
              aria-hidden="true"
              className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
            />
          </button>
        </>
      ) : null}
    </div>
  );
}
