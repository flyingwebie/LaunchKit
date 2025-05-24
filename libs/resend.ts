import { Resend } from "resend";
import config from "@/config";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string | string[];
}) => {
  const { data, error } = await resend.emails.send({
    from: config.resend.fromAdmin,
    to,
    subject,
    text,
    html,
    ...(replyTo && { replyTo }),
  });

  if (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }

  return data;
};
