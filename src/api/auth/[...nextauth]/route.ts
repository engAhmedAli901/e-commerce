import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserResponse } from "@/interfaces"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Login failed")
        }

        // 👇 هنا أهم سطر
        return {
          ...data.user,
          accessToken: data.token,
        } as any   // ← مهم عشان TypeScript
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserResponse
        token.accessToken = (user as any).accessToken
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user as UserResponse
      session.accessToken = token.accessToken as string
      return session
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // يخليه يرجع لنفس صفحة اللوجين بدل api/auth/error
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
