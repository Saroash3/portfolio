import type { ExperienceItem } from "./types";

/** Shown top to bottom in the timeline. */
export const experience: ExperienceItem[] = [
  {
    id: "power5",
    kind: "training",
    role: "Power5 Intensive Workshops",
    org: "FAST-NUCES Career Services Office, Islamabad",
    period: "13–17 Nov 2026 · 5 evenings, 8 PM – 12 AM · Google Meet",
    summary:
      "Intensive 5-night, hands-on program with guided projects across automation, full-stack development, AI tools and data.",
    points: [],
    tags: [],
    modules: [
      {
        title: "n8n Automation",
        description:
          "Built skillSYNC (AutoRecruitmentBot), an AI hiring automation that reads job applications, scores candidates with AI and sends follow-up emails.",
        projectSlug: "skillsync",
      },
      {
        title: "Full-Stack Web Development",
        description: "Building a live full-stack website with a database.",
      },
      {
        title: "Secure AI Tools",
        description: "Building a secure AI tool using LLMs.",
      },
      {
        title: "SQL Analysis",
        description: "Analysing 20 real business questions with SQL.",
      },
      {
        title: "Hugging Face",
        description: "Building a working AI tool with Hugging Face.",
      },
    ],
  },
  {
    id: "codealpha",
    kind: "work",
    role: "Full Stack Web Development Intern",
    org: "CodeAlpha",
    period: "May – June 2026",
    summary: "Three full-stack apps built as internship tasks.",
    points: [
      "E-commerce store with a product catalog, cart, JWT sign-in and order management.",
      "Mini social media app with profiles, image posts, comments, likes and follows.",
      "Trello-style project management tool with boards, task cards, comments and real-time updates over Socket.io.",
    ],
    tags: ["Node.js", "Express", "MongoDB", "JavaScript", "Socket.io", "JWT"],
    links: [
      {
        label: "E-commerce store",
        href: "https://github.com/Saroash3/CodeAlpha_ecommerce_Task",
      },
      {
        label: "Mini social media app",
        href: "https://github.com/Saroash3/Code_alpha_mini_social_media_platform",
      },
      {
        label: "Project management tool",
        href: "https://github.com/Saroash3/code_alpha_project_management_tool",
      },
    ],
  },
  {
    id: "fast",
    kind: "education",
    role: "BS Software Engineering",
    org: "FAST-NUCES Islamabad",
    period: "2022 – 2026",
    location: "Islamabad, Pakistan",
    summary:
      "Final year project: ActorPro AI. NLP coursework: Structura and the Nova voice assistant.",
    points: [],
    tags: ["Software Engineering", "NLP"],
  },
];
