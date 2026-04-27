Cloudflare Pages Function for freebie email:

- Endpoint: `POST /api/freebie`
- File: `functions/api/freebie.js`
- Attachment source: `public/assets/pdfs/freebie.pdf`

Set these Cloudflare Pages environment variables:

- `RESEND_API_KEY`
- `MAIL_FROM` (example: `sudhita@leverageyouradhd.com`)

For local development with Wrangler, copy `.dev.vars.example` to `.dev.vars`.
