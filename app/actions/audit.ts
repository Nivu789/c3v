"use server";

import { CONTACT_EMAIL } from "../lib/constants";
import type { AuditPayload } from "../lib/types";

export async function auditAction(data: AuditPayload) {
  try {
    console.log("TECH AUDIT LEAD:", data);

    // Only attempt to email if Resend is configured. Dynamic import keeps the
    // mailer (which throws when the key is missing) from breaking the action.
    if (process.env.RESEND_API_KEY) {
      const { sendMail } = await import("../lib/mail/sendMail");
      const { AuditEmail } = await import("../templates/AuditTemplate");

      await sendMail<AuditPayload>({
        to: CONTACT_EMAIL,
        subject: `New Tech Audit Lead — ${data.name} (${data.readiness})`,
        template: (p: AuditPayload) => AuditEmail(p),
        props: data,
      });
    }

    return { success: true };
  } catch (error) {
    // The audit results are generated client-side, so the visitor still gets
    // value even if the notification email fails. We log the lead above.
    console.error("auditAction email failed:", error);
    return { success: true };
  }
}
