import type { About } from "./types";

export const about: About = {
  // TODO: review the bio and make it sound like you. Every claim here comes from your projects.
  bio: [
    "I'm a software engineering student at FAST-NUCES Islamabad who builds AI-integrated web products. I like owning the whole path: the model pipeline in Python, the API in FastAPI or Node, and the Next.js interface people actually use.",
    "My final year project, ActorPro AI, coaches actors by listening to their voice and watching their face and posture as they rehearse real screenplay scenes. For my NLP coursework I built Structura, which turns a question into a narrated lesson where every sentence is checked against real data structures, and Nova, a voice assistant that runs entirely on a local machine.",
    "I completed a Full Stack Web Development internship at CodeAlpha, building three full-stack apps with Node, Express and MongoDB, and took FAST-NUCES's Power5 intensive workshops on automation, full-stack development, AI tools and data. I'm currently learning Flutter.",
  ],
  facts: [
    {
      icon: "education",
      label: "Education",
      value: "BS Software Engineering",
      detail: "FAST-NUCES Islamabad · 2022 – 2026",
    },
    {
      icon: "location",
      label: "Based in",
      value: "Islamabad, Pakistan",
    },
    {
      icon: "work",
      label: "Internship",
      value: "CodeAlpha",
      detail: "Full Stack Web Development Intern · 2026",
    },
    {
      icon: "focus",
      label: "Current focus",
      value: "AI-integrated web apps",
      detail: "Speech, emotion and RAG pipelines behind real UIs",
    },
  ],
};
