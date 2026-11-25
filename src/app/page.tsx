import { existsSync } from "node:fs";
import { join } from "node:path";
import { getSiteUrl, site } from "@/content/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { RevealObserver } from "@/components/effects/reveal-observer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

/** True if a file exists under /public. Checked at build time, so missing files never produce broken links. */
function publicFileExists(path: string) {
  return existsSync(join(process.cwd(), "public", path));
}

export default function Home() {
  const hasPhoto = publicFileExists(site.photoPath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: getSiteUrl(),
    email: `mailto:${site.email}`,
    jobTitle: "Software Engineer",
    address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "FAST-NUCES Islamabad" },
    sameAs: site.socials.filter((s) => s.key !== "email").map((s) => s.href),
  };

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero hasPhoto={hasPhoto} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
