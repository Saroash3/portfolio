import type { Site } from "./types";

export const site: Site = {
  name: "Saroash Waseem",
  shortName: "Saroash",
  roles: ["Software Engineer", "Full-Stack AI Engineer", "AI/ML Engineer"],
  tagline:
    "Software engineering student building AI-integrated web products, from the model pipeline to the interface people use.",
  // Shown as a small status pill in the hero. Set to undefined to hide it.
  availability: "Open to AI internships",
  location: "Islamabad, Pakistan",
  email: "sarooshwaseem619@gmail.com",
  socials: [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/Saroash3",
      handle: "github.com/Saroash3",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saroash-waseem-298027236/",
      handle: "in/saroash-waseem",
    },
    {
      key: "email",
      label: "Email",
      href: "mailto:sarooshwaseem619@gmail.com",
      handle: "sarooshwaseem619@gmail.com",
    },
  ],
  // Kept for later; not shown anywhere on the site yet.
  resumeUrl: "",
  // Your photo. Replace the file to change it; a monogram is shown if it is missing.
  photoPath: "/images/profile.jpg",
  photoAlt: "Portrait of Saroash Waseem",
  // TODO: replace with your real domain after the first Vercel deploy
  // (or set NEXT_PUBLIC_SITE_URL in Vercel, which takes priority).
  url: "https://saroash-waseem.vercel.app",
  description:
    "Saroash Waseem, software engineering student at FAST-NUCES Islamabad, building AI-integrated web products: an AI acting coach, a fact-checked data structure explainer and a fully local voice assistant.",
  keywords: [
    "Saroash Waseem",
    "software engineer",
    "full-stack developer",
    "AI engineer",
    "Next.js",
    "FastAPI",
    "FAST-NUCES",
    "Islamabad",
    "portfolio",
  ],
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (fromEnv || site.url).replace(/\/$/, "");
}
