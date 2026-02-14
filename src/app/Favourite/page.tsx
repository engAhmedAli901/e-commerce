"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import AddToCartBtn from '../_components/AddTocartBtn/AddToCartBtn'
import AddToWishlistBtn from '../_components/AddtowishlistBtn/AddToWishlistBtn'
export default  function Favourite() {

    const [wishlist, setWishlist] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [removeid, setRemoveid] = useState<string | null>(null)

   useEffect(()=>{
     async function getWishlist() {
        try {
          setIsloading(true)
          const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            method:"GET",
            headers:{
               token: localStorage.getItem('token')
            }
        })
        const data = await res.json()
        setWishlist(data.data)
        setIsloading(false)
        return data
        } catch (error) {
          setIsloading(false)
          console.log(error);
          
        }
    }


    

    getWishlist()

   },[])

async function deleteWishlist(productId) {
        try {
          setRemoveid(productId)
          setIsloading(true)
          const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            method:"DELETE",
            headers:{
               token: localStorage.getItem('token')
            }
        })
        const data = await res.json()
        setWishlist(prev =>
  prev.filter(product => product._id !== productId)
)
        setIsloading(false)
        setRemoveid(null)
        return data
        } catch (error) {
          setIsloading(false)
          setRemoveid(null)
          console.log(error);
          
        }
    }

  return <>
   <div>
    <div className="container mt-15 w-[90%] mx-auto">
      <div className="inner flex flex-wrap justify-center">
          {wishlist.map((product:Producttype)=>(
          <div className='hover:scale-110 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/5 mx-3.5 mt-10 bg-white rounded-2xl hover:shadow-2xl'  key={product._id}>
          
            <Card>
              <Link href={`/products/${product._id}`}>
  <CardHeader>
    <CardTitle><img className='rounded-2xl' src={product.imageCover} alt="" /></CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
  </CardHeader>
  <CardContent>
    <p className='line-clamp-1'>{product.title}</p>
  </CardContent>
  <CardFooter>
  <div className='flex justify-between w-full'>
   <span>{product.price} EGP</span>
   <span><i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</span>  
  </div>  
  </CardFooter>
  
  </Link>
  <div className='justify-center items-baseline gap-1.5 flex'>
    <AddToCartBtn productId={product._id}/>
    <i className={isloading==true && removeid==product._id?"fa-solid  fa-spinner animate-spin" : "fa-solid fa-heart text-xl cursor-pointer text-red-600 "} onClick={()=>{deleteWishlist(product._id)}}></i>
  </div>
</Card>
          
          
          </div>
          
        ) )}
      </div>
    </div>
  </div>
  </>
}
