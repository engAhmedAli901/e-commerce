 export async function addtoWishlistapi({productId}:{productId:string}){
        
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            method:'POST',
            body: JSON.stringify({productId}),
            headers: {
  "Content-Type": "application/json",
  token: localStorage.getItem("token") || ""


    }   })
        const data = await response.json()
        return data
        }