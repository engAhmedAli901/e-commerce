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
import Link from 'next/link'
import AddToCartBtn from '@/app/_components/AddTocartBtn/AddToCartBtn'

export default async function specificcat({params}:{params:{id:string}}) {

    const {id} = await params
    console.log(id);
    

    async function getbrandproducts() {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
          { cache: "no-store" }
        )
        const data = await res.json()
        return data
    }

    const catRes = await fetch(
  `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
  { cache: "no-store" }
)
const { data: category } = await catRes.json()


    const data = await getbrandproducts()
    console.log(data);
    
  return <>
  { <div>
    <div className="container mt-15 w-[90%] mx-auto">
      <h1 className='font-bold text-4xl'>{category.name}</h1>
      <div className="inner flex flex-wrap justify-center">
          {data?.data?.map((product:any)=>(
          <div className='hover:scale-110 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/5 mx-3.5 mt-10 bg-white rounded-2xl hover:shadow-2xl'  key={product._id}>
          
            <Card>
              <Link href={`/products/${product._id}`}>
  <CardHeader>
    <CardTitle><img className='rounded-2xl' src={product.images?.[0] || product.imageCover} alt="" /></CardTitle>
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
  <AddToCartBtn productId={product._id}/>
</Card>
          
          
          </div>
          
        ) )}
      </div>
    </div>
  </div> }
  </>
}
