import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import callapi from '@/api/api'
import Link from 'next/link'
import { Producttype } from '../types/Producttype'
import AddToCartBtn from '../AddTocartBtn/AddToCartBtn'
import AddToWishlistBtn from '../AddtowishlistBtn/AddToWishlistBtn'
export default async function Allproducts() {
      const data = await callapi()

  return <>
  <div>
    <div className="container mt-15 w-[90%] mx-auto">
      <div className="inner flex flex-wrap justify-center">
          {data.map((product:Producttype)=>(
          <div className='hover:scale-110 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/5 mx-3.5 mt-10 bg-white rounded-2xl hover:shadow-2xl'  key={product._id}>
          
            <Card>
              <Link href={`/products/${product.id}`}>
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
  <AddToWishlistBtn productId={product._id} />
  </div>
</Card>
          
          
          </div>
          
        ) )}
      </div>
    </div>
  </div>
  </>
}
