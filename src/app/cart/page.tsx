"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../../Context/CartContext'
import Link from 'next/link'
import { checkcartapi, clearcartapi, deletcartapi, updatecartapi } from '../../../CartApi/cartapi'
import Checkout from '../_components/checkout/Checkout'

export default function Cart() {

  const {cartdata , getCart} = useContext(CartContext)
  const [removeid, setRemoveid] = useState<string | null>(null)
  const [updateid, setUpdateid] = useState<string | null>(null)
  const [isloading, setIsloading] = useState(false)


  async function deletecart(productid:string) {
    try {
      setRemoveid(productid)
      const data = await deletcartapi(productid)
      getCart()
      setRemoveid(null)
    } catch (error) {
      setRemoveid(null)
    }
  }

  async function updatecount({productid , count}:{productid:string , count:number}) {
    try {
      setUpdateid(productid)
      const data = await updatecartapi({productid , count})
      console.log(data);
      getCart()
      setUpdateid(null)
    } catch (error) {
      console.log(error);
      setUpdateid(null)
      
    }
  }

async function clearcart() {
  try {
    setIsloading(true)
    const data = await clearcartapi()
    getCart()
    setIsloading(false)
  } catch (error) {
    console.log(error);
    setIsloading(false)
  }
}



  return <>
  <div className='mt-10 w-[95%] mx-auto'>
    <h1 className='font-bold text-3xl'>Shopping Cart</h1>
    <h2 className='mt-1.5 text-gray-600'>{cartdata.numOfCartItems} item in your cart</h2>
    <div className='mt-5 md:flex items-start  justify-between'>
        <div className=' flex flex-col md:w-2/3'>
          {cartdata ?.data?.products?.map((item)=> <div key={item._id} className='border border-gray-400 rounded-2xl p-3 flex justify-between pb-5 items-center shadow-lg bg-white w-full md:mx-5 mb-5'>
            <div className='flex items-center gap-3.5'>
              <div className='w-[100px] bg-red-600'>
              <img src={item.product.imageCover} className='w-full' alt="" />
            </div>
          <div>
            <h1 className='text-2xl font-semibold mt-1.5'>{item.product.title}</h1>
        <h2 className='my-1.5'>{item.product.brand.name} | {item.product.category.name}</h2>
        <div>
          <Button className='border border-gray-400 rounded-lg px-3 py-1 font-bold cursor-pointer' onClick={()=>{updatecount({productid:item.product._id , count: item.count - 1 })}}>-</Button>
        <span className='px-4'>{updateid==item.product._id ? <i className={"fa-solid  fa-spinner animate-spin"}></i> : item.count}</span>
        <Button onClick={()=>{updatecount({productid:item.product._id , count: item.count + 1 })}} className='border border-gray-400 rounded-lg px-3 py-1 font-bold cursor-pointer cursor-pointer'>+</Button>
        </div>
          </div>
            </div>
        <div>
          <span className='font-bold'>{item.price} EGP</span>
          <p className='text-gray-500 text-xs'>each</p>
          <h2 className='mt-5 text-red-600 border border-gray-400 text-center rounded-2xl p-1 cursor-pointer' onClick={()=>{
            deletecart(item.product._id)
          }}>{removeid == item.product._id && <i className={"fa-solid  fa-spinner animate-spin"}></i> }Remove</h2>
        </div>
        </div>)}
        </div>
        <div className='border border-gray-300 bg-white shadow-xl rounded-2xl p-5 md:w-1/4 ms-3.5'>
          <div className='w-[95%] mx-auto'>
            <h1 className='font-bold text-xl'>Order Summary</h1>
            <div className='mt-4 flex justify-between'>
            <h1 className='text-gray-500'>Subtotal ({cartdata.numOfCartItems} items)</h1>
            <span className='font-bold'>EGP {cartdata.data.totalCartPrice}</span>
          </div>
          <div className='mt-4 flex justify-between'>
            <h1 className='text-gray-500'>Shipping</h1>
            <span className='font-bold text-green-700'>Free</span>
          </div>
          <hr className='mt-3 text-gray-500'/>
           <div className='mt-4 flex justify-between'>
            <h1 className='font-bold'>Total</h1>
            <span className='font-bold'>{cartdata.data.totalCartPrice}</span>
          </div>
          <Link href={"/home"}><Button variant="outline" className=' mt-4 w-full border-gray-400 text-xl font-medium rounded-xl cursor-pointer'>Continue Shopping</Button></Link>
          <Checkout cartid={cartdata.data._id}  />          
            <Button className='bg-white text-red-600 mt-5 border cursor-pointer' onClick={()=>{clearcart()}}><i className={isloading==true? "fa-solid  fa-spinner animate-spin" : "fa-solid fa-trash-can"}></i> Clear Cart</Button>
          </div>          
        </div>
        
    </div>

  </div>
  </>
}
