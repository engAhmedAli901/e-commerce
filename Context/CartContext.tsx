"use client"
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({children}:{children: ReactNode}){

    const [cartdata, setCartdata] = useState()
   
    async function getCart() {
        const res = await fetch(`http://localhost:3000/api/get-cart`,{
             headers: {
    token: localStorage.getItem("token") || ""
  }
        })
        const data = await res.json()
        setCartdata(data)
    }

   useEffect(() => {
  if (localStorage.getItem('token')) {
    getCart()
  }
}, [])


    
    return <CartContext.Provider value={{cartdata , setCartdata , getCart}}>
        {children}
    </CartContext.Provider>
}