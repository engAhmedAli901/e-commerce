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
import { schema } from '@/schema/RegisterValidation'
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

type FormValues = {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export default function Register() {
  const router = useRouter()
  const form = useForm<FormValues>({
    defaultValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    resolver: zodResolver(schema)
  })

  const handelRegister = async (values: FormValues) => {
    console.log("Form Values:", values) // هنا هتشوفهم في الكونصول
    try {
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      if(data.message === 'success'){
        toast.success("Register Successfully")
        router.push('/login')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <h1 className='text-center text-5xl mt-10 font-semibold'>Register Now</h1>
      <div className="container w-[80%] mx-auto mt-10">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handelRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='w-[50%] mx-auto'>
                  <FormLabel>Name :</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name..." />
                  </FormControl>
                  <FormMessage className='text-red-700 font-bold'/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-[50%] mx-auto mt-5'>
                  <FormLabel>Email :</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your Email..." />
                  </FormControl>
                  <FormMessage className='text-red-700 font-bold'/>
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
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className='w-[50%] mx-auto mt-5'>
                  <FormLabel>rePassword :</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your rePassword..." type="password"/>
                  </FormControl>
                  <FormMessage className='text-red-700 font-bold'/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className='w-[50%] mx-auto mt-5'>
                  <FormLabel>Phone :</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your Phone..." />
                  </FormControl>
                  <FormMessage className='text-red-700 font-bold'/>
                </FormItem>
              )}
            />
            <div className='w-[50%] mx-auto'>
              <Button type="submit" variant="outline" className="w-full mt-10 cursor-pointer bg-green-600 hover:bg-transparent hover:text-green-600">
                Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
