import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    path: "frontend/",
    description: "Typed, accessible interfaces with the App Router.",
    skills: ["React", "Next.js", "TypeScript"],
    learning: ["Flutter"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    path: "backend/",
    description: "REST and WebSocket services in Node, Python and PHP.",
    skills: ["Node.js", "Express", "FastAPI", "Python", "Laravel", "C#"],
  },
  {
    id: "ai",
    title: "AI & LLMs",
    path: "ai/",
    description: "Local and hosted models wired into real products.",
    skills: ["Ollama", "RAG", "Whisper", "Gemini API"],
  },
  {
    id: "data",
    title: "Databases",
    path: "data/",
    description: "Relational and document stores, hosted or local.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
  },
  {
    id: "cloud",
    title: "Cloud & Deploy",
    path: "cloud/",
    description: "Shipping and hosting what I build.",
    skills: ["AWS", "Vercel"],
  },
];

/**
 * Logos for the scrolling marquee. Each name must exist in
 * src/components/effects/tech-icon.tsx (unknown names show a text badge).
 */
export const marquee: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Python",
  "FastAPI",
  "Laravel",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Supabase",
  "AWS",
  "C#",
  "Ollama",
  "Flutter",
];
