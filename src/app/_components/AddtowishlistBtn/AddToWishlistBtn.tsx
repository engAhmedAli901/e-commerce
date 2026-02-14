"use client"
import React, { useState } from 'react'
import { toast } from 'sonner'
import { addtoWishlistapi } from '../../../../WishlistApi/wishlistapi'

export default function AddToWishlistBtn({productId}:{productId:string}) {

    const [isloading, setIsloading] = useState(false)


    async function addtoWishlist(){
        setIsloading(true)
        try {
        const data = await addtoWishlistapi({productId})
        toast.success("Added Successfully")
        setIsloading(false)
        
        } catch (error) { 
        toast.error("Failed to Add") 
        }
    }


  return <>
  <i className={isloading==true?"fa-solid  fa-spinner animate-spin" : "fa-regular fa-heart text-xl cursor-pointer"} onClick={()=>{addtoWishlist()}}></i>
  </>
}
