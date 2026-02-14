import { error } from 'console'
import path from 'path'
import * as z from 'zod'

export const schema = z.object({
email: z.string().email("Invalid email").nonempty("This field required"),
    password: z.string().nonempty("This field riquired").min(6,"minimum length must be at least 6 chars"),
})