import AddtoCartaction from "@/app/_components/addtoCart.action"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const data = await AddtoCartaction(req)
  return NextResponse.json(data)
}
