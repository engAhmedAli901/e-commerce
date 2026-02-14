 export async function addtocartapi({productId}:{productId:string}){
        
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            method:'POST',
            body: JSON.stringify({productId}),
            headers: {
  "Content-Type": "application/json",
  token: localStorage.getItem("token") || ""


    }   })
        const data = await response.json()
        return data
        }



 export async function deletcartapi(productId:string){
        
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            method:'DELETE',
            body: JSON.stringify({productId}),
            headers: {
  "Content-Type": "application/json",
  token: localStorage.getItem("token") || ""


    }   })
        const data = await response.json()
        return data
        }



 export async function updatecartapi({productid , count}:{productid:string , count:number}){
        
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,{
            method:'PUT',
            body: JSON.stringify({count}),
            headers: {
  "Content-Type": "application/json",
  token: localStorage.getItem("token") || ""


    }   })
        const data = await response.json()
        return data
        }




export async function clearcartapi(){
        
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            method:'DELETE',
            headers: {
  token: localStorage.getItem("token") || ""
    }   })
        const data = await response.json()
        return data
        }

export async function checkcartapi(cartid:string , details:object){
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3000`,{
    method:"POST",
    body: JSON.stringify({shippingAddress : details}),
    headers:{
      token: localStorage.getItem("token") || ""
    }
  })
  const data = await res.json()
  return data
}