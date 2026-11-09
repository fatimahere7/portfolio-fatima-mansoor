export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'RESEND_API_KEY is not configured in Netlify environment variables.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const payload = await req.json();
    const { name, email, industry, subject, message } = payload || {};

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Name, email, and message are required fields.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'fatimamansoor529@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #080808; color: #E9E5D8; border: 1px solid #222222; border-radius: 10px;">
        <span style="font-family: monospace; font-size: 10px; letter-spacing: 0.2em; color: #D94B4B; text-transform: uppercase;">
          PORTFOLIO INQUIRY // FATIMA MANSOOR
        </span>
        <h2 style="color: #FFFFFF; margin: 8px 0 16px; font-size: 20px; font-weight: 600;">
          ${subject || 'New Contact Inquiry'}
        </h2>
        <p style="margin: 6px 0; font-size: 14px;"><strong>From:</strong> ${name}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Reply-To:</strong> <a href="mailto:${email}" style="color: #D94B4B;">${email}</a></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Industry:</strong> ${industry || 'Not specified'}</p>
        <div style="background: #171717; padding: 16px; border-radius: 6px; border-left: 3px solid #D94B4B; margin: 16px 0;">
          <p style="margin: 0; color: #FFFFFF; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="font-size: 11px; color: #666666; margin-top: 20px; text-align: center;">Sent via Resend from Fatima Mansoor Portfolio</p>
      </div>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio Inquiry] from ${name}`,
        html: htmlContent,
      }),
    });

    const data = await resendResponse.json();

    return new Response(JSON.stringify({ success: resendResponse.ok, data }), {
      status: resendResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: '/api/contact',
};

