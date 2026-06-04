// Shared payload types for the lead-magnet server actions and email templates.

export type AuditPayload = {
  name: string;
  whatsapp: string;
  email?: string;
  company?: string;
  readiness: string;
  answers: { question: string; answer: string }[];
  gaps: string[];
};

export type PocPayload = {
  name: string;
  whatsapp: string;
  email: string;
  company: string;
  description: string;
  budget: string;
  workedWithAgency: string;
  timeline: string;
};
