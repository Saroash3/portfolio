# Saroash Waseem: portfolio

A single-page portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and shadcn/ui, with native scrolling. The design system is "Terminal Green": dark only, with Space Grotesk, Inter and JetBrains Mono.

```bash
npm install
cp .env.example .env.local   # optional: only needed for the contact form
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Editing your content

All text lives in typed files under `src/content/`. You never need to touch a component to change what the site says. TypeScript flags a typo in a field name as soon as you save.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Name, typing roles, hero tagline, availability pill, email, social links, photo path, a hidden `resumeUrl` kept for later, site URL, SEO description |
| `src/content/about.ts` | Bio paragraphs (the first is always shown, the rest sit behind "read more") and the four bento facts |
| `src/content/skills.ts` | Skill groups (cards) and the scrolling logo marquee |
| `src/content/experience.ts` | Timeline entries, top to bottom. `kind` is `work`, `training` or `education` (shown as a label); `modules` adds compact cards, and a module with `projectSlug` links to that project |
| `src/content/projects.ts` | Every project: card text, case study dialog, stack, links, screenshot |
| `src/content/types.ts` | The shape of all of the above |

Rules the components follow:

- **Empty means hidden.** Leave `period`, `summary`, `role` or a link `undefined` (or an array empty) and that part simply doesn't render. Nothing shows a "TODO" to visitors.
- **Search for `TODO`** in `src/content/` to find every gap still to fill.
- **Featured projects** have `featured: true` and are sorted by `order` (lowest first). Every other project appears in the filterable "More projects" grid below them.
- **Project images:** put a screenshot in `public/images/projects/` and set `media` (with its real `width`/`height`). Without `media`, the card shows a generated code-style cover built from `coverLines`.
- **Skill and marquee icons** come from `src/components/effects/tech-icon.tsx`. A name without an icon still shows as text; add a `react-icons` entry there to give it a logo.

### Photo

- **Photo:** `public/images/profile.jpg`, a portrait photo (9:16, e.g. 720×1280 or larger), shown in full in a rounded card. If the file is missing, a monogram placeholder is shown. The Open Graph image embeds the same photo. After replacing it, delete `.next/cache/images` if the dev server keeps serving the old one.

### Design tokens

The five brand colours are defined once at the top of `src/app/globals.css` (`--tg-background`, `--tg-surface`, `--tg-text`, `--tg-accent`, `--tg-secondary`) and exposed to Tailwind as `bg-background`, `bg-surface`, `text-text`, `bg-accent`, `text-secondary` and so on. Fonts are loaded with `next/font` in `src/app/layout.tsx`.

---

## Contact form

The form posts to `src/app/api/contact/route.ts`, which:

1. Validates with zod (`src/lib/contact-schema.ts`); the browser runs the same rules first for instant feedback.
2. Silently accepts and drops submissions that fill the hidden honeypot field.
3. Rate-limits to 5 messages per 10 minutes per IP (best effort, per server instance).
4. Sends the message through [Resend](https://resend.com) with `replyTo` set to the visitor, so you can just hit Reply.

Every failure shows a clear message plus a `mailto:` fallback, and the form always offers "Email me instead". Without `RESEND_API_KEY` the form answers "isn't connected yet" and points to your email, so nothing breaks before you set it up.

**Setting up Resend:**

1. Sign up at [resend.com](https://resend.com) and create an API key (**API Keys → Create**, "Sending access").
2. Put it in `.env.local` as `RESEND_API_KEY=re_...`.
3. **Sender:** with no `CONTACT_FROM_EMAIL`, mail is sent from `onboarding@resend.dev`. That test sender only delivers to the email address you signed up to Resend with, so either sign up with `sarooshwaseem619@gmail.com`, or verify a domain you own under **Domains** and set `CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"`.

---

## Deploying to Vercel

1. **Push to GitHub.** The folder is already a git repository.
   ```bash
   git add -A
   git commit -m "Portfolio"
   gh repo create portfolio --public --source=. --push   # or create the repo on github.com and push
   ```
2. **Import the project.** Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub and import the repository. Vercel detects Next.js; keep the default build settings (`npm run build`, output `.next`).
3. **Add environment variables** under *Environment Variables* on the import screen (or later in **Project → Settings → Environment Variables**), for the **Production** and **Preview** environments:

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | your Resend key (`re_...`) |
   | `CONTACT_TO_EMAIL` | `sarooshwaseem619@gmail.com` (optional, this is the default) |
   | `CONTACT_FROM_EMAIL` | `Portfolio <hello@yourdomain.com>` once you verify a domain (optional) |
   | `NEXT_PUBLIC_SITE_URL` | your live URL, e.g. `https://saroash-waseem.vercel.app` |

4. **Deploy.** Click **Deploy**, then open the URL Vercel gives you.
5. **Set the real URL.** If the final URL differs from the one you entered, update `NEXT_PUBLIC_SITE_URL` (and `url` in `src/content/site.ts`), then **Deployments → ⋯ → Redeploy**. `NEXT_PUBLIC_*` values are baked in at build time, so a redeploy is required after changing them.
6. **Check:** send yourself a test message from the form; visit `/sitemap.xml`, `/robots.txt` and `/opengraph-image`; paste the URL into a LinkedIn post composer to preview the card.
7. **Optional custom domain:** **Project → Settings → Domains → Add**, follow the DNS instructions, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

Every push to `main` deploys to production; other branches get preview URLs.

---

## How it's built

- `src/app/page.tsx` composes the sections and checks (at build time) whether the photo exists.
- `src/components/sections/`: Hero, About, Skills, Experience, Projects (featured cards, filterable grid, case study dialog), Contact.
- `src/components/layout/`: sticky frosted nav with scroll progress, active-section indicator and mobile drawer; footer; back-to-top.
- `src/components/effects/`: CSS-driven scroll reveal, cursor spotlight, typing roles, tech icons.
- Metadata: `layout.tsx` (title, description, Open Graph, Twitter), `opengraph-image.tsx` (generated card), `icon.svg`, `sitemap.ts`, `robots.ts`, JSON-LD `Person` in `page.tsx`.

**Motion and accessibility.** Reveals are short (0.35 s) CSS transitions that play once, toggled by an IntersectionObserver. Content is only hidden once JavaScript has run, and a 3-second fail-safe shows everything if the observer never starts. The hero's key text paints immediately; only a transform eases it in. Scrolling is native; only anchor links glide (`scroll-behavior: smooth`, offset for the sticky nav). `prefers-reduced-motion` turns off anchor gliding, reveals, typing and the marquee. The cursor spotlight is disabled on touch devices. The page has a skip link, visible focus rings, labelled controls and a live region for filter results and form status.

**Measured** on a local production build (Lighthouse, Chromium): 100 / 100 / 100 / 100 for performance, accessibility, best practices and SEO, on both mobile and desktop presets. No horizontal scroll at 360, 768, 1024 and 1440 px.
