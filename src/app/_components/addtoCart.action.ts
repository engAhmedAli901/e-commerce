"use server"
export default async function AddtoCartaction(req: Request){
    const token = req.headers.get("token")

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token: token || ""
    }
  })
  const data = await res.json()
  return data
}