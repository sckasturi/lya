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

For local development with Wrangler, copy `.dev.vars.example` to `.dev.vars`.
