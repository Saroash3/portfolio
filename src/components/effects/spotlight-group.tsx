"use client";

import { useRef } from "react";

/**
 * One pointer listener for a group of `.spotlight` cards: sets --mx/--my on the
 * card under the cursor. The CSS only shows the glow on hover-capable,
 * fine-pointer devices, so touch screens get plain cards.
 */
export function SpotlightGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const card = (e.target as HTMLElement).closest<HTMLElement>(".spotlight");
        if (!card || !ref.current?.contains(card)) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
