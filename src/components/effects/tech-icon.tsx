import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiExpress,
  SiFastapi,
  SiFlutter,
  SiGooglegemini,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

/** Brand icon + brand colour for each technology name used in content files. */
export const techIcons: Record<string, { Icon: IconType; color: string }> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#E6EDF3" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Express: { Icon: SiExpress, color: "#E6EDF3" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  Python: { Icon: SiPython, color: "#FFD43B" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  PostgreSQL: { Icon: SiPostgresql, color: "#699ECA" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  MySQL: { Icon: SiMysql, color: "#00A2D9" },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  AWS: { Icon: FaAws, color: "#FF9900" },
  "C#": { Icon: TbBrandCSharp, color: "#A179DC" },
  Ollama: { Icon: SiOllama, color: "#E6EDF3" },
  Flutter: { Icon: SiFlutter, color: "#54C5F8" },
  "Gemini API": { Icon: SiGooglegemini, color: "#8E75FF" },
  Vercel: { Icon: SiVercel, color: "#E6EDF3" },
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const entry = techIcons[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return <Icon aria-hidden="true" className={className} style={{ color }} />;
}
