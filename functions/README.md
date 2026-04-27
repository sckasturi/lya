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

For local development with Wrangler, copy `.dev.vars.example` to `.dev.vars`.

## Google Sheets webhook payload

Both endpoints will POST JSON to `GOOGLE_SHEETS_WEBHOOK_URL` if configured:

- Freebie payload:
  - `type`, `email`, `timestamp`, `secret`
- Contact payload:
  - `type`, `name`, `email`, `phone`, `reason`, `message`, `timestamp`, `secret`
