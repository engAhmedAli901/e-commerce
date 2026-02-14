'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/schema/LoginValidation'
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
export default  function Login() {
  let router = useRouter()
  const form = useForm({
    defaultValues:{
      email:'',
      password:'',
    },
    resolver:zodResolver(schema)
  })


  async function handelLogin(values) {
  const res = await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });

  if (res?.ok) {
    toast.success("Login Successfully");
    router.push("/products");
  } else {
    toast.error("Invalid email or password");
  }
}


  




  return<>
  <h1 className='text-center text-5xl mt-10 font-semibold'>Login Now</h1>
  <div className="container w-[80%] mx-auto mt-10 ">
    <form action="" onSubmit={form.handleSubmit(handelLogin)}>
    <Form {...form} >
       <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=' w-[50%] mx-auto mt-5'>
              <FormLabel className=''>Email :</FormLabel>
              <FormControl className=''>
                <Input type='email' placeholder="Enter your Email..." {...field} />
              </FormControl>
              <FormMessage  className='text-red-700 font-bold'/>
            </FormItem>
          )}
        />



        <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className='w-[50%] mx-auto mt-5'>
                          <FormLabel>Password :</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your Password..." type="password" />
                          </FormControl>
                          <FormMessage className='text-red-700 font-bold'/>
                        </FormItem>
                      )}
                    />


    </Form>
         <div className='w-[50%] mx-auto '><Button className='w-full mt-10 cursor-pointer bg-green-600  hover:bg-transparent hover:text-green-600 border-0 hover:border-1' type='submit' variant="outline">Login</Button></div>
    </form>
  </div>
  </>
}
