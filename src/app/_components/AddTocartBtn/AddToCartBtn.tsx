"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { CartContext } from '../../../../Context/CartContext'
import { addtocartapi } from '../../../../CartApi/cartapi'

export default function AddToCartBtn({productId}:{productId:string}) {

    const [isloading, setIsloading] = useState(false)

    const {getCart} = useContext(CartContext)

    async function addtocart(){
        setIsloading(true)
        try {
        const data = await addtocartapi({productId})
        toast.success("Added Successfully")
        setIsloading(false)
        getCart()
        
        } catch (error) { 
        toast.success("Failed to Add") 
        }
    }



  return <>
  <Button variant="outline" onClick={()=>{addtocart()}} className='w-[80%] mt-3 hover:text-green-600 hover:bg-transparent border-0 hover:border-2 hover:cursor-pointer bg-green-600 text-black'><i className={`${isloading==true?"fa-solid  fa-spinner animate-spin":"fa-solid fa-cart-plus"}`}></i>Add To Cart</Button>
  </>
}
