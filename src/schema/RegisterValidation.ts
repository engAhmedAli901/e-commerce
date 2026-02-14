import { error } from 'console'
import path from 'path'
import * as z from 'zod'

export const schema = z.object({
    name: z.string().nonempty("This field riquired").min(3,"minimum length must be at least 3 chars").max(10,"max length must be 10 chars"),
    email: z.email().nonempty("This field riquired"),
    password: z.string().nonempty("This field riquired").min(6,"minimum length must be at least 6 chars"),
    rePassword: z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/)
}).refine((object)=>object.password==object.rePassword,{
        path:['rePassword'],
        error:'Password and rePassword must be same'
    }
)