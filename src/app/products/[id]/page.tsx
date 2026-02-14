import React from 'react'
import { Button } from "@/components/ui/button"
import AddToCartBtn from '@/app/_components/AddTocartBtn/AddToCartBtn';
export default async function ProductDetails({params}:{params:{id:string}}) {
    let {id} = await params
    console.log(id);
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const {data} = await response.json()
    console.log(data);
    
  return <>
  <div className="container w-[90%] mx-auto mt-15 md:flex items-center gap-5">
    <div className='md:w-1/4 w-full'>
    <img className='rounded-2xl shadow-2xl' src={data.imageCover} alt="" />
    </div>
    <div>
      <h1 className='text-4xl font-semiboldbold mt-10'>{data.category.name}</h1>
      <h3 className='mt-1.5 '>{data.description}</h3>
      <div className='flex justify-between usbet mt-2'>
      <span className='font-bold text-green-600'>{data.price} EGP</span>
   <span><i className="fa-solid fa-star text-yellow-500"></i> {data.ratingsAverage}</span>  
    </div>
    <AddToCartBtn />
    </div>
  </div>
  </>
}
