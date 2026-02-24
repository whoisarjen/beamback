import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig } from 'prisma/config'

// Load .env.local first (Vercel convention), fallback to .env
dotenv.config({ path: path.join(__dirname, '.env.local') })
dotenv.config({ path: path.join(__dirname, '.env') })

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  migrate: {
    async url() {
      return process.env.NUXT_DATABASE_URL ?? ''
    },
  },
  datasource: {
    url: process.env.NUXT_DATABASE_URL ?? '',
  },
})
