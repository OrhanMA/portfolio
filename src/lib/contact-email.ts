import type { Locale } from "@/lib/i18n";
import { escapeHtml } from "@/lib/utils";

type ContactEmailContent = {
  locale: Locale;
  copy: ContactEmailCopy;
  name: string;
  email: string;
  reasonLabel: string;
  message: string;
};

type ContactEmailCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  reply: string;
  footer: string;
  preheader: string;
};

function formatMessage(message: string) {
  return escapeHtml(message).replace(/\r?\n/g, "<br />");
}

function detailRow(label: string, value: string, muted = false) {
  return `
    <tr${muted ? ' style="background-color: #f4f2ed;"' : ""}>
      <td style="width: 34%; padding: 13px 16px; border-bottom: 1px solid #e5e1d8; color: #5d6472; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; line-height: 16px; text-transform: uppercase; vertical-align: top;">${label}</td>
      <td style="padding: 13px 16px; border-bottom: 1px solid #e5e1d8; color: #151c2d; font-size: 15px; font-weight: 600; line-height: 22px; vertical-align: top;">${value}</td>
    </tr>`;
}

export function createContactEmailHtml({
  locale,
  copy,
  name,
  email,
  reasonLabel,
  message,
}: ContactEmailContent) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeReason = escapeHtml(reasonLabel);
  const replySubject = encodeURIComponent(`Re: ${reasonLabel}`);

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin: 0; padding: 0; background-color: #ececf2; color: #151c2d; font-family: Arial, Helvetica, sans-serif;">
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all; opacity: 0;">${copy.preheader} ${safeName}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background-color: #ececf2; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #fffdf9; border-collapse: collapse; border-radius: 12px; overflow: hidden;">
            <tr>
              <td style="height: 6px; background-color: #e65a38; font-size: 0; line-height: 0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 30px 32px 28px; background-color: #151c2d;">
                <p style="margin: 0 0 16px; color: #f17a5c; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; line-height: 16px; text-transform: uppercase;">${copy.eyebrow}</p>
                <h1 style="margin: 0; color: #fffdf9; font-size: 30px; font-weight: 700; letter-spacing: -0.03em; line-height: 36px;">${copy.title}</h1>
                <p style="margin: 10px 0 0; color: #c9cedb; font-size: 15px; line-height: 23px;">${copy.intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; border: 1px solid #e5e1d8; border-collapse: separate; border-radius: 8px; border-spacing: 0; overflow: hidden;">
                  ${detailRow(copy.name, safeName)}
                  ${detailRow(copy.email, `<a href="mailto:${safeEmail}" style="color: #3157cf; text-decoration: underline;">${safeEmail}</a>`, true)}
                  ${detailRow(copy.reason, safeReason)}
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-top: 24px; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 20px; background-color: #f4f2ed; border-left: 4px solid #3157cf; border-radius: 0 8px 8px 0;">
                      <p style="margin: 0 0 10px; color: #151c2d; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; line-height: 16px; text-transform: uppercase;">${copy.message}</p>
                      <p style="margin: 0; color: #363d4b; font-size: 15px; line-height: 24px;">${formatMessage(message)}</p>
                    </td>
                  </tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px; border-collapse: collapse;">
                  <tr>
                    <td style="border-radius: 6px; background-color: #3157cf;">
                      <a href="mailto:${safeEmail}?subject=${replySubject}" style="display: inline-block; padding: 13px 18px; color: #ffffff; font-size: 14px; font-weight: 700; line-height: 20px; text-decoration: none;">${copy.reply} ${safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 32px; background-color: #f4f2ed; border-top: 1px solid #e5e1d8; color: #737989; font-size: 12px; line-height: 18px;">
                ${copy.footer} <a href="https://orhanmadiassani.com" style="color: #3157cf; text-decoration: underline;">orhanmadiassani.com</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function createContactEmailText({
  copy,
  name,
  email,
  reasonLabel,
  message,
}: ContactEmailContent) {
  return `${copy.title}\n\n${copy.name}: ${name}\n${copy.email}: ${email}\n${copy.reason}: ${reasonLabel}\n\n${copy.message}:\n${message}\n\n${copy.footer} orhanmadiassani.com.`;
}
