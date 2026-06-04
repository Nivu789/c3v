"use server";

import { CONTACT_EMAIL } from "../lib/constants";
import type { PocPayload } from "../lib/types";

export async function pocAction(data: PocPayload) {
  try {
    console.log("FREE POC APPLICATION:", data);

    if (process.env.RESEND_API_KEY) {
      const { sendMail } = await import("../lib/mail/sendMail");
      const { PocEmail } = await import("../templates/PocTemplate");

      await sendMail<PocPayload>({
        to: CONTACT_EMAIL,
        subject: `New Free POC Application — ${data.name} (${data.company})`,
        template: (p: PocPayload) => PocEmail(p),
        props: data,
      });
    } else {
      return {
        success: false,
        message: "Submission failed. Please reach out on WhatsApp instead.",
      };
    }

    return { success: true, message: "Application received" };
  } catch (error) {
    console.error("pocAction failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please reach out on WhatsApp instead.",
    };
  }
}
