export interface ContactPayload {
  name: string;
  email: string;
  industry?: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(
  payload: ContactPayload,
  apiKey: string,
  toEmail: string = 'fatimamansoor529@gmail.com',
  fromEmail: string = 'Portfolio Contact <onboarding@resend.dev>'
) {
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #080808; color: #E9E5D8; border: 1px solid #222222; border-radius: 12px;">
      <div style="margin-bottom: 20px; border-bottom: 1px solid #1f1f1f; padding-bottom: 16px;">
        <span style="font-family: monospace; font-size: 10px; letter-spacing: 0.2em; color: #D94B4B; text-transform: uppercase;">
          PORTFOLIO INQUIRY // FATIMA MANSOOR
        </span>
        <h2 style="color: #FFFFFF; margin: 8px 0 0; font-size: 22px; font-weight: 600; letter-spacing: -0.02em;">
          ${payload.subject ? payload.subject : 'New Project / Engineering Inquiry'}
        </h2>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #888888; width: 110px; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">Sender:</td>
          <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600; font-size: 14px;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888888; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">Reply-To:</td>
          <td style="padding: 8px 0; font-size: 14px;">
            <a href="mailto:${payload.email}" style="color: #D94B4B; text-decoration: none; font-weight: 500;">
              ${payload.email}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888888; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">Industry:</td>
          <td style="padding: 8px 0; color: #E9E5D8; font-size: 14px;">${payload.industry || 'Not specified'}</td>
        </tr>
      </table>

      <div style="background: #171717; padding: 20px; border-radius: 8px; border-left: 3px solid #D94B4B; margin-top: 8px;">
        <div style="font-family: monospace; font-size: 9px; letter-spacing: 0.2em; color: #888888; text-transform: uppercase; margin-bottom: 8px;">
          Message Content:
        </div>
        <p style="margin: 0; color: #FFFFFF; font-size: 14px; line-height: 1.65; white-space: pre-wrap;">
          ${payload.message}
        </p>
      </div>

      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #1a1a1a; display: flex; justify-content: space-between; font-family: monospace; font-size: 10px; color: #666666;">
        <span>Sent via Resend</span>
        <span>${new Date().toISOString()}</span>
      </div>
    </div>
  `;

  return await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: payload.subject
        ? `[Portfolio] ${payload.subject}`
        : `[Portfolio Inquiry] from ${payload.name}`,
      html: htmlContent,
    }),
  });
}

// Default export for Vercel Serverless Functions
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Resend Error] Missing RESEND_API_KEY environment variable.');
    return res.status(500).json({
      success: false,
      message: 'Email service is not configured. RESEND_API_KEY is missing.',
    });
  }

  const { name, email, industry, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields.',
    });
  }

  try {
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'fatimamansoor529@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const response = await sendContactEmail(
      { name, email, industry, subject, message },
      apiKey,
      toEmail,
      fromEmail
    );

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      console.error('[Resend API Error]:', data);
      return res.status(response.status).json({
        success: false,
        message: data?.message || 'Failed to send email via Resend.',
      });
    }
  } catch (err: any) {
    console.error('[Serverless Error]:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Internal server error while dispatching email.',
    });
  }
}

