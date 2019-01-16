import * as sgMail from "@sendgrid/mail";

import { SENDGRID_API_KEY } from "./config";

if (SENDGRID_API_KEY === undefined) {
  throw Error("No API key found for send grid mail service!");
}
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (recipient: string, url: string) => {
  const response = await sgMail.send({
    to: recipient,
    from: "test@example.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>and easy to do anywhere, even with Node.js</strong>
    <a href="${url}">confirm email</a>`
  });

  console.log(response, recipient);
};
