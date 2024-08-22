import { z } from "zod"

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, {message: "Message must be of atleast 5 characters."})
        .max(500, {message: "Message cannot exceed 500 characters"})
})