import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { SocialKey } from "@/content/types";

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  switch (name) {
    case "github":
      return <FaGithub aria-hidden="true" className={className} />;
    case "linkedin":
      return <FaLinkedinIn aria-hidden="true" className={className} />;
    case "email":
      return <Mail aria-hidden="true" className={className} />;
  }
}
