import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { z } from "zod"

const env = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
}).parse(process.env)

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  }),],
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
  callbacks: {
    session: async ({ session, token }) => ({
      ...session,
      authId: token.sub
    }),
  },
})