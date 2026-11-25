"use client";

import { useEffect, useState } from "react";

/**
 * Types and deletes each role in turn. The first role is rendered on the
 * server, so the hero reads correctly before (or without) JavaScript.
 * Screen readers get the full list once, not the animation.
 */
export function TypingRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [phase, setPhase] = useState<"hold" | "deleting" | "typing">("hold");

  useEffect(() => {
    if (roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Swap whole words slowly instead of typing.
      const id = window.setInterval(() => {
        setIndex((i) => {
          const next = (i + 1) % roles.length;
          setText(roles[next]);
          return next;
        });
      }, 3200);
      return () => window.clearInterval(id);
    }

    const current = roles[index];
    let timeout: number;

    if (phase === "hold") {
      timeout = window.setTimeout(() => setPhase("deleting"), 2600);
    } else if (phase === "deleting") {
      if (text.length === 0) {
        timeout = window.setTimeout(() => {
          setIndex((i) => (i + 1) % roles.length);
          setPhase("typing");
        }, 250);
      } else {
        timeout = window.setTimeout(() => setText(current.slice(0, text.length - 1)), 38);
      }
    } else {
      const target = roles[index];
      if (text === target) {
        timeout = window.setTimeout(() => setPhase("hold"), 0);
      } else {
        timeout = window.setTimeout(() => setText(target.slice(0, text.length + 1)), 70);
      }
    }
    return () => window.clearTimeout(timeout);
  }, [roles, index, text, phase]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        <span className="text-gradient">{text || " "}</span>
        <span className="caret ml-1 inline-block h-[0.9em] w-[0.08em] min-w-[3px] translate-y-[0.04em] bg-accent" />
      </span>
    </>
  );
}
