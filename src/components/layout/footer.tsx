import { navItems, site } from "@/content/site";
import { SocialIcon } from "@/components/social-icon";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#home" className="rounded-md font-mono text-[15px] font-medium text-text">
            <span className="text-accent">~/</span>
            {site.shortName.toLowerCase()}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            © {site.name}. Built with Next.js, Tailwind CSS and Motion.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="rounded transition-colors hover:text-text">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2.5" aria-label="Social links">
          {site.socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                {...(s.key !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-xl border border-line text-muted-foreground transition hover:border-accent/50 hover:text-accent"
              >
                <SocialIcon name={s.key} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
