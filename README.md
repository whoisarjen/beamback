# Beamback

Open-source feedback collection for your MVP. One script tag gives you a feedback widget, public voting board, and roadmap.

**Live:** [beamback.whoisarjen.com](https://beamback.whoisarjen.com)

## Features

- Embeddable feedback widget (one script tag, <3KB)
- Public voting board with roadmap view
- Status pipeline (New, Planned, In Progress, Done, Closed)
- Built-in spam protection (rate limiting, honeypot, IP dedup)
- Google OAuth authentication
- GDPR-friendly (IPs hashed, one-click data deletion)
- Tier-based limits (Free: 2 projects, 50 feedback/month)

## Stack

- **Frontend:** Nuxt 4, Vue 3, TailwindCSS v4
- **Database:** Neon PostgreSQL via Prisma ORM
- **Auth:** Google OAuth (nuxt-auth-utils)
- **Rate Limiting:** PostgreSQL-based sliding window
- **Hosting:** Vercel (serverless)

## Setup

```bash
npm install
vercel env pull .env.local   # pull env from Vercel
npx prisma db push
npm run dev
```

## Environment Variables

See `.env.example` for required variables:

- `NUXT_DATABASE_URL` — Neon PostgreSQL connection string
- `NUXT_SESSION_PASSWORD` — Session encryption key (min 32 chars)
- `NUXT_IP_HASH_SALT` — Salt for IP hashing
- `NUXT_OAUTH_GOOGLE_CLIENT_ID` / `NUXT_OAUTH_GOOGLE_CLIENT_SECRET` — Google OAuth


## Testing

```bash
npm test              # watch mode
npm run test:unit     # single run
```

## Deploy

```bash
npx nuxt build
npx vercel deploy --prebuilt
```

## License

MIT
