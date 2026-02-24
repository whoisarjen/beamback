import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'schema.prisma'),
  migrate: {
    async url() {
      return process.env.NUXT_DATABASE_URL ?? ''
    },
  },
})
