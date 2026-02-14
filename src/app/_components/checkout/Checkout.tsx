import { Button } from '@/components/ui/button'
import React, { useRef } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkcartapi } from '../../../../CartApi/cartapi'
export default function Checkout({cartid}:{cartid:string}) {

    const addressref = useRef(null)
    const phoneref = useRef(null)
    const cityref = useRef(null)

    async function checkcart() {
        const details = {
            address: addressref?.current?.value,
            phone: phoneref?.current?.value,
            city: cityref?.current?.value
        }
  try {
    const data = await checkcartapi( cartid , details)
    window.location.href = data.session.url
  } catch (error) {
    console.log(error);
    
  }
}



  return <>
     <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className=' mt-4 w-full border-gray-400 text-xl font-medium bg-black text-white rounded-xl cursor-pointer'>Proceed to Checkout</Button>
        </DialogTrigger>
<DialogContent className="sm:max-w-sm bg-white opacity-100 shadow-xl border-0">
          <DialogHeader>
            <DialogTitle>Add your Address</DialogTitle>
            <DialogDescription>
              Make Sure to Add your Correct Address.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" ref={addressref} />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" ref={phoneref}/>
            </Field>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" ref={cityref}/>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>{checkcart()}} className='cursor-pointer' type="button">Vise</Button>
            <Button onClick={()=>{checkcart()}} className='cursor-pointer' type="button">Cash</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
