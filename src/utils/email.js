import { Resend } from "resend";
import config from "../config/config.js";

const sendEmail = async (recipient, { subject, html }) => {
  const resend = new Resend(config.emailApiKey);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [recipient],
    subject,
    html,
  });
};

export default sendEmail;
