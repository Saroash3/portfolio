import type { Project, ProjectCategory } from "./types";

/**
 * Every figure below is taken from the project's live site or README.
 * Do not link https://streakup.vercel.app or https://ai-actor-coach.vercel.app:
 * they are not your deployments.
 */
export const projects: Project[] = [
  {
    slug: "actorpro-ai",
    title: "ActorPro AI",
    kicker: "AI acting coach",
    summary:
      "Rehearse real screenplay scenes out loud and get a director's notes on the emotion in your voice and face, your delivery, pacing and posture.",
    featured: true,
    order: 1,
    categories: ["AI", "Full-stack"],
    context: "Final year project · team project",
    status: "In development",
    problem:
      "Actors rehearsing alone get no feedback on how a line actually lands. ActorPro AI listens to and watches each take and scores it against the emotion the script calls for, relative to the actor's own normal voice.",
    built: [
      "Pick a scene from 30 screenplays (3,582 dialogue scenes); a narrator reads the stage directions while you speak your character's lines.",
      "Voice emotion with emotion2vec+, line accuracy with Whisper transcription matched word by word against the script.",
      "Facial expression with HSEmotion and body language with MediaPipe pose tracking, running in the browser so video never leaves the device.",
      "Each line gets a score out of 100 from emotion match, face expression, voice pattern and line accuracy, plus a scene report with exercises.",
    ],
    // TODO: confirm or edit. Drafted from your commits in the repo.
    role: "Built the voice pipeline (Whisper speech-to-text, emotion2vec+ voice emotion, voice pattern scoring), switched face emotion to HSEmotion, added body posture analysis, the script parser and practice flow, and redesigned the UI.",
    highlights: ["30 screenplays", "3,582 dialogue scenes", "7 emotions in voice and face", "33 body points tracked"],
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "HSEmotion",
      "Whisper",
      "emotion2vec+",
      "MediaPipe",
    ],
    links: {
      live: "https://ai-actor-coach-roan.vercel.app",
      code: "https://github.com/Saroash3/AI-Actor-Coach",
    },
    media: {
      src: "/images/projects/actorpro.jpg",
      alt: "ActorPro AI landing page with a live take scored for emotion match, face expression, voice pattern and line accuracy",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "structura",
    title: "Structura",
    kicker: "Data structure explainer",
    summary:
      "Type a topic and get an animated, narrated lesson with a quiz. The LLM only plans operations; real Python data structures compute every state.",
    featured: true,
    order: 2,
    categories: ["AI", "Full-stack"],
    context: "NLP course project · with Agha Ahsan",
    problem:
      "LLM explanations of data structures can sound right while getting the state wrong. Structura never lets the model describe a state it did not compute.",
    built: [
      "Gemini turns the question into a plan made of operations only, such as enqueue(5); real implementations (array, queue, stack, linked list, BST, graph BFS, bubble sort) record the true state after every step.",
      "A verifier checks every sentence of narration against those states, sends failing scenes back for repair, and falls back to code-generated narration so no unverified scene ships.",
      "Local Piper text-to-speech narrates each scene, and each animation lasts exactly as long as its audio.",
      "Quiz answers are computed by code on the lesson's own data, and lessons export to MP4 with headless Chromium and ffmpeg.",
    ],
    highlights: ["Verified narration", "Code-computed quiz answers", "MP4 export"],
    stack: ["Next.js", "TypeScript", "FastAPI", "Gemini API", "Piper TTS", "MongoDB"],
    links: {
      live: "https://structura-gules.vercel.app",
      code: "https://github.com/Saroash3/structura",
    },
    media: {
      src: "/images/projects/structura.jpg",
      alt: "Structura landing page with a live queue lesson showing enqueue(8), the narration and a verified badge",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "nova",
    title: "Nova",
    kicker: "Local voice fitness assistant",
    summary:
      "A fully local, streaming assistant for a fictional gym: chat, RAG with citations, voice in and out, and fitness tools through function calling.",
    featured: true,
    order: 3,
    categories: ["AI"],
    context: "NLP coursework · 3 assignments",
    problem:
      "A gym front desk assistant that answers from the gym's own documents, talks back in real time, and runs with no cloud APIs at all.",
    built: [
      "Assignment 1: FastAPI WebSocket token streaming with a local qwen2.5:3b via Ollama, conversation memory and an off-topic gate.",
      "Assignment 2: RAG over 82 gym documents with MiniLM embeddings and Chroma, with visible source citations.",
      "Assignment 3: talk to Nova through Silero VAD, faster-whisper and Piper TTS, which speaks each sentence as it streams; spoken and typed turns share one pipeline.",
      "Three fitness tools (metrics, nutrition, workouts) plus member memory through prompt-based function calling, each with a 5 s timeout.",
    ],
    highlights: [
      "Median ~0.8 s from end of speech to first audio (README benchmark, RTX 4080 laptop)",
      "No cloud APIs",
    ],
    stack: ["FastAPI", "WebSockets", "React", "Vite", "Ollama", "qwen2.5:3b", "Chroma", "MiniLM", "faster-whisper", "Piper"],
    links: {
      code: "https://github.com/Saroash3/NLP-Assignment-3",
    },
    media: {
      src: "/images/projects/nova.png",
      alt: "Nova chat answering membership and guest policy questions with source document citations",
      width: 1280,
      height: 900,
    },
  },
  {
    slug: "chaupal",
    title: "Chaupal",
    kicker: "Live polls",
    summary:
      "Create a poll, share one link or QR code, and watch votes land live. Sign in with Google or as a guest.",
    featured: false,
    order: 4,
    categories: ["Full-stack"],
    problem: "A quick way to ask a room a question and see the answers come in live.",
    built: [
      "Polls with 2 to 6 answers, one changeable vote per person and live-updating results.",
      "Google sign-in or guest mode with a random avatar; share via link, QR code or the phone's share menu.",
      "Express API with server-side validation over Neon PostgreSQL; plain HTML, CSS and JavaScript frontend.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Express", "Neon PostgreSQL"],
    links: {
      live: "https://chaupal-tawny.vercel.app",
      code: "https://github.com/Saroash3/chaupal",
    },
    media: {
      src: "/images/projects/chaupal.jpg",
      alt: "Chaupal landing page with a live poll about the best chai in Islamabad",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "skillsync",
    title: "skillSYNC hiring automation",
    kicker: "n8n workflow · AutoRecruitmentBot",
    summary:
      "An AI hiring automation that reads job applications, scores candidates with AI and sends follow-up emails.",
    featured: false,
    order: 5,
    categories: ["Automation", "AI"],
    context: "Built in the Power5 n8n Automation workshop",
    problem: "Automating the repetitive parts of screening job applications.",
    built: [
      "Reads incoming job applications and scores each candidate with AI.",
      "Application scoring and follow-up emails run on separate schedules.",
      "Emails go out over SMTP.",
    ],
    stack: ["n8n", "SMTP"],
    links: {},
    coverLines: [
      "trigger: schedule → score_applications",
      "trigger: schedule → send_emails (smtp)",
      "status: workflow active",
    ],
  },
  {
    slug: "streakup",
    title: "StreakUp",
    kicker: "Habit tracker",
    summary:
      "A daily habit tracker for university students: tick habits off each day, keep streaks alive and see weekly progress.",
    featured: false,
    order: 6,
    categories: ["Full-stack"],
    problem: "A habit tracker whose streaks respect your schedule, so skipping an unscheduled day never breaks one.",
    built: [
      "Sign in with Google or an email magic link; habits run every day, on weekdays or on custom days.",
      "Today checklist, current and longest streaks, a 12-week history grid and weekly completion rates.",
      "Next.js 16 Server Components and Server Actions over Supabase with Row Level Security and zod validation.",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS"],
    links: {
      live: "https://streakup-azure.vercel.app",
      code: "https://github.com/Saroash3/streakup",
    },
    media: {
      src: "/images/projects/streakup.jpg",
      alt: "StreakUp landing page with a habit checklist and streak counters",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "seo-optimizer-agent",
    title: "SEO Optimizer Agent",
    kicker: "Flask agent",
    summary:
      "A Flask agent that analyses content and recommends SEO improvements, built as a worker in a supervisor-worker agent system.",
    featured: false,
    order: 7,
    categories: ["AI"],
    context: "Semester project",
    problem: "Giving writers concrete, measurable SEO fixes instead of generic advice.",
    built: [
      "Keyword density, Flesch readability, title length, heading structure and content length checks with an overall score.",
      "Registers with a supervisor, keeps short- and long-term memory, and exposes health and status endpoints.",
      "Interactive Swagger UI documentation for every endpoint.",
    ],
    stack: ["Python", "Flask", "Swagger"],
    links: {
      code: "https://github.com/Saroash3/seo-optimizer-agent",
    },
    coverLines: [
      "POST /analyze",
      '{ "overall_score": 75,',
      '  "recommendations": [...] }',
    ],
  },
  {
    slug: "cs-study-hub",
    title: "CS Study Hub",
    kicker: "Study planner",
    summary:
      "A PHP and MySQL web app for managing study resources, schedules, progress tracking and notes.",
    featured: false,
    order: 8,
    categories: ["Full-stack"],
    problem: "Keeping CS study resources, schedules and progress in one place.",
    built: [
      "RESTful PHP backend API over MySQL.",
      "Vanilla JavaScript frontend for resources, schedules, progress tracking and notes.",
    ],
    stack: ["PHP", "MySQL", "JavaScript"],
    links: {
      code: "https://github.com/Saroash3/Cs-Study-Hub",
    },
    coverLines: ["GET /api/resources", "GET /api/schedule", "PUT /api/progress"],
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = ["All", "AI", "Full-stack", "Automation"];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
