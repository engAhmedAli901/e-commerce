import { productItem } from '@/interfaces';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    const {data} = await response.json()
    console.log({data});
  return <>
  <div className="container w-[80%] mx-auto mt-10">
    <div className="flex flex-wrap">
      
        {data.map((product:productItem)=><Link className=' sm:w-full md:w-1/2 lg:w-1/3' href={`/categories/${product._id}`} key={product._id}>
        <div  >
        <div className="inner p-5  cursor-pointer hover:scale-105 duration-300">
          <img src={product.image} alt="" className='w-[500px] h-[500px] rounded-2xl shadow-2xl' />
          <h2 className='text-center mt-3 text-2xl font-bold bg-yellow-300  p-2 rounded-2xl '>{product.name}</h2>
          </div>
        </div>
        </Link>)}
      </div>
    </div>
  </>
}
