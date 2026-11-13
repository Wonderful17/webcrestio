# Webcrestio: setup guide

## 1. Accounts (all have free tiers)
- **Sanity** (sanity.io): create a project, note the Project ID. Under API > Tokens create a token with **Editor** access.
- **Resend** (resend.com): add and verify your domain, create an API key.
- **Hosting**: Netlify or Vercel (see note below) + a GitHub repo for this code.

## 2. Run locally
```
cp .env.example .env.local   # fill in values
npm install
npm run dev
```
Open /studio to use the dashboard. In sanity.io/manage > API > CORS origins, add http://localhost:3000 and your live URL (allow credentials).

## 3. Deploy
Import the GitHub repo into Netlify or Vercel, copy every variable from `.env.example` into the host's environment settings, deploy.

## 4. Make publishing automatic
In sanity.io/manage > API > Webhooks add: URL `https://YOUR-DOMAIN/api/revalidate`, trigger on create/update/delete, projection `{_type}`, secret = `SANITY_REVALIDATE_SECRET`. When you press Publish in the dashboard, the matching pages refresh on the live site.

## 5. Daily use (no code)
- **Blog / Portfolio**: open `/studio`, choose Blog post or Portfolio project, fill in, Publish.
- **Reviews**: new reviews appear under Review with approved off. Read it, tick **Approved**, Publish. Untick to hide. Email is private and never queried by the public site.

## Notes
- Rate limiting in the API routes is basic (in memory). Add your host's firewall/rate limits or Upstash before heavy traffic.
- Hosting terms and prices change; check the host's current pricing and commercial-use rules before launch.
- Not yet tested: this scaffold was written without network access, so run `npm install && npm run build` first and fix any version mismatches.
