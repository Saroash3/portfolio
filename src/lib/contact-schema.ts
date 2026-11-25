import { z } from "zod";

/** Shared by the contact form (instant feedback) and the API route (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email("Please enter a valid email address.").trim().max(160, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(4000, "Please keep it under 4,000 characters."),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";

export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "not_configured" | "rate_limited" | "send_failed";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
    };
