"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Menu, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site } from "@/content/site";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { SocialIcon } from "@/components/social-icon";
import { cn } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = ids.find((id) => visible.get(id));
        setActive(current ?? "");
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <a
        href="#main"
        className="sr-only rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-line bg-background/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-1 rounded-md font-mono text-[15px] font-medium text-text">
            <span className="text-accent">~/</span>
            <span>{site.shortName.toLowerCase()}</span>
            <span aria-hidden="true" className="caret ml-0.5 inline-block h-4 w-2 bg-accent/90" />
            <span className="sr-only">, back to top</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-sm transition-colors",
                      isActive ? "text-text" : "text-muted-foreground hover:text-text",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg border border-line-strong bg-surface"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-dot"
                        aria-hidden="true"
                        className="absolute -bottom-px left-1/2 h-px w-6 -translate-x-1/2 bg-accent shadow-[0_0_8px_var(--tg-accent)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:bg-[#4fd162] sm:inline-flex"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              Let&apos;s chat
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="grid size-10 place-items-center rounded-xl border border-line bg-surface/60 text-text md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-sm border-line bg-surface/95 p-0 backdrop-blur-xl"
              >
                <div className="border-b border-line px-6 py-5">
                  <SheetTitle className="font-mono text-sm font-medium text-text">
                    <span className="text-accent">~/</span>
                    {site.shortName.toLowerCase()}
                  </SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </div>
                <nav aria-label="Mobile">
                  <ul className="px-3 py-4">
                    {navItems.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={active === item.id ? "location" : undefined}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3.5 text-lg transition-colors",
                            active === item.id ? "bg-background/60 text-text" : "text-muted-foreground hover:text-text",
                          )}
                        >
                          <span className="font-mono text-xs text-accent">0{i + 1}</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto border-t border-line px-6 py-5">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-accent font-medium text-accent-foreground"
                  >
                    <MessageSquare className="size-4" aria-hidden="true" />
                    Let&apos;s chat
                  </a>
                  <ul className="mt-4 flex justify-center gap-3">
                    {site.socials.map((s) => (
                      <li key={s.key}>
                        <a
                          href={s.href}
                          {...(s.key !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          aria-label={s.label}
                          className="grid size-11 place-items-center rounded-xl border border-line text-muted-foreground hover:text-accent"
                        >
                          <SocialIcon name={s.key} className="size-[18px]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent to-secondary"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
