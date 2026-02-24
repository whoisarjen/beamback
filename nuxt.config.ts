import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  modules: [
    'nuxt-auth-utils',
    '@nuxt/icon',
  ],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss() as any],
  },

  runtimeConfig: {
    databaseUrl: '',
    sessionPassword: '',
    ipHashSalt: '',
    oauth: {
      google: {
        clientId: '',
        clientSecret: '',
      },
    },
    public: {
      appUrl: 'http://localhost:3000',
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
    '/dashboard/**': { ssr: false },
    '/api/widget/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
    '/api/board/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
    '/widget/**': {
      headers: {
        'X-Frame-Options': 'ALLOWALL',
      },
    },
  },

  nitro: {
    preset: 'vercel',
  },

  app: {
    head: {
      title: 'Beamback',
      meta: [
        { name: 'description', content: 'Dead-simple feedback collection for your MVP' },
      ],
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap' },
      ],
    },
  },
})
