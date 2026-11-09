import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

function resendDevPlugin() {
  return {
    name: 'resend-dev-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          const env = loadEnv(server.config.mode || 'development', process.cwd(), '');
          const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
          const toEmail = env.CONTACT_RECEIVER_EMAIL || process.env.CONTACT_RECEIVER_EMAIL || 'fatimamansoor529@gmail.com';
          const fromEmail = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const payload = JSON.parse(body || '{}');
              const { name, email, industry, subject, message } = payload;

              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Name, email, and message are required.' }));
                return;
              }

              if (!apiKey) {
                console.warn(
                  '[Resend Dev] No RESEND_API_KEY found in .env.local. Simulating dispatch to:',
                  toEmail,
                  'Add RESEND_API_KEY="re_..." to .env.local for live dispatch.'
                );
                await new Promise((resolve) => setTimeout(resolve, 800));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    simulated: true,
                    message: 'Email simulated in development mode (RESEND_API_KEY is not set).',
                  })
                );
                return;
              }

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

              const resendData = await resendResponse.json();

              if (resendResponse.ok) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, data: resendData }));
              } else {
                console.error('[Resend Error]:', resendData);
                res.statusCode = resendResponse.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: resendData?.message || 'Resend API failed' }));
              }
            } catch (err: any) {
              console.error('[Vite Resend Handler Error]:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err?.message || 'Internal server error' }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), resendDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
