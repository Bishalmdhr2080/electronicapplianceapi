import { Resend } from "resend";

const sendEmail = async (recipient, subject, html) => {
  const resend = new Resend(config.emailApiKey);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [recipient],
    subject,
    html,
  });
};

export default sendEmail;
