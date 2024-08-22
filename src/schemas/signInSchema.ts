import { z } from "zod"

export const signInSchema = z.object({
    identifier: z.string(),  // username/email
    password: z.string() 
})

