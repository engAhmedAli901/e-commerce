'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '../../../../Context/CartContext'

export default function Navbar() {
    const pathname = usePathname();

    const {cartdata} = useContext(CartContext)
    console.log(cartdata);
    

  return (
    <nav className='md:flex justify-between mt-4 items-center'>
        <div className='flex items-center text-4xl ms-4 gap-2.5'>
           <i className="fa-solid fa-piggy-bank text-green-600 "></i>
            <h1 className='text-2xl font-medium '>SAVE&BUY</h1>
        </div>
        <div className=' bg-white px-15 py-3 rounded-4xl md:rounded-full mt-5 md:mt-0'>
            <ul className='md:flex  gap-15 '>
            <li><i><Link className={pathname=='/home'? 'active' : ''} href={'/home'}>Home</Link></i></li>
            <li className='relative'><i><Link className={pathname=='/cart'? 'active' : ''} href={'/cart'}><Badge className='absolute -top-2 -left-4 bg-red-600 h-4'>{cartdata?.numOfCartItems}</Badge>Cart</Link></i></li>
            <li><i><Link className={pathname=='/products'? 'active' : ''} href={'/products'}>Products</Link></i></li>
            <li><i><Link className={pathname=='/categories'? 'active' : ''} href={'/categories'}>Categories</Link></i></li>
            <li><i><Link className={pathname=='/Brands'? 'active' : ''} href={'/Brands'}>Brands</Link></i></li>
            </ul>
        </div>
        <div className='me-4 flex items-center mt-5 md:mt-0 justify-center'>
            {/* <i className="fa-brands fa-facebook px-6 text-2xl"></i>
            <i className="fa-brands fa-linkedin px-6 text-2xl"></i>
            <i className="fa-brands fa-instagram px-6 text-2xl"></i>
            <i className="fa-brands fa-twitter px-6 text-2xl"></i> */}
            <Link href={"/Favourite"}><i className="fa-solid fa-heart text-red-600 text-2xl"></i></Link>
            <h2 className='bg-gray-500 rounded-md px-5 py-1 ms-5'><Link href={'/register'}>Register</Link></h2>
        </div>
    </nav>
  )
}
