import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    session: {
    strategy: "jwt"
  },
  providers:[
    CredentialsProvider({
         name: 'Credentials',
         credentials:{
            email:{},
            password:{}
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

  if (payload.message !== "success") {
    return null
  }

  return {
    id: payload.user._id,
    email: payload.user.email,
    name: payload.user.name,
    accessToken: payload.token     
  }
}

    })
  ],
  callbacks:{
    jwt: ({user , token})=>{
        if(user){
            token.user = user.user
        token.token = user.token
        }
        return token
    },
    session : ({session , token})=>{
        session.user = token.user
        return session
    }
  },
  pages:{
    signIn : "/login"
  },
  secret:process.env.AUTH_SECRET
})

export { handler as GET, handler as POST }

