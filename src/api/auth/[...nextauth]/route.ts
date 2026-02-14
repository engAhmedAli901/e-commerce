import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: {
            "content-type": "application/json"
          }
        })

        const payload = await res.json()

        if (payload.message !== "success") return null

        return {
          id: payload.user._id,
          email: payload.user.email,
          name: payload.user.name,
          accessToken: payload.token
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.accessToken = user.accessToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }

      session.accessToken = token.accessToken as string
      return session
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
