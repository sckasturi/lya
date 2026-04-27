Cloudflare Pages Functions for freebie and contact form:

- Endpoint: `POST /api/freebie`
- File: `functions/api/freebie.js`
- Attachment source: `public/assets/pdfs/freebie.pdf`
- Endpoint: `POST /api/contact`
- File: `functions/api/contact.js`

Set these Cloudflare Pages environment variables:

- `RESEND_API_KEY`
- `MAIL_FROM` (example: `sudhita@leverageyouradhd.com`)
- `MAIL_TO` (contact form destination inbox)
- `GOOGLE_SHEETS_WEBHOOK_URL` (Apps Script Web App URL)
- `GOOGLE_SHEETS_WEBHOOK_SECRET` (shared secret passed in payload)
- `RECAPTCHA_SECRET_KEY` (reCAPTCHA v2 secret; server verifies tokens from the freebie form)

For the freebie popup in the browser, set `VITE_RECAPTCHA_SITE_KEY` (reCAPTCHA v2 checkbox site key) in Pages build environment variables or `.env`.

For local development with Wrangler, copy `.dev.vars.example` to `.dev.vars`.

## Google Sheets webhook payload

Both endpoints will POST JSON to `GOOGLE_SHEETS_WEBHOOK_URL` if configured:

- Freebie payload:
  - `type`, `name`, `email`, `timestamp`, `secret`
- Contact payload:
  - `type`, `name`, `email`, `phone`, `reason`, `message`, `timestamp`, `secret`
