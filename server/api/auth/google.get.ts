import { defineOAuthGoogleEventHandler, setUserSession } from '#imports'
import { getPrismaClient } from '../../utils/db'

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user: googleUser }) {
    const db = getPrismaClient()

    const existingUser = await db.user.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId: googleUser.sub,
        },
      },
    })

    let user
    if (existingUser) {
      user = await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: googleUser.name || existingUser.name,
          avatarUrl: googleUser.picture || existingUser.avatarUrl,
        },
      })
    } else {
      user = await db.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name || null,
          avatarUrl: googleUser.picture || null,
          provider: 'google',
          providerId: googleUser.sub,
        },
      })
    }

    await setUserSession(event, {
      user: { userId: user.id },
    })

    return sendRedirect(event, '/dashboard')
  },

  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/?error=auth')
  },
})
