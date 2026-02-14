"use client"
import React, { ReactNode } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import CartContextProvider from '../../../../Context/CartContext';
import Navbar from '../navbar/Navbar';
export default function Provider({children}:{childres:ReactNode}) {
  return <>
  <SessionProvider>
          <CartContextProvider>
          <Toaster  className="bg-green-500"/>
        <Navbar />
        {children}
        </CartContextProvider>
        </SessionProvider>
  </>
}
