import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserResponse } from "@/interfaces"

declare module "next-auth" {
  interface Session {
    user: UserResponse
    accessToken: string
  }

  interface User extends UserResponse {
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse
    accessToken: string
  }
}
