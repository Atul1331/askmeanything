import { z } from "zod"

// creates a schema for username validation. Checks if username is a string, has min length 2, max length 20 and follows a regular expression.
export const usernameValidation = z
    .string()
    .min(2, "Username must contain 2 charcaters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z)-9_]+$/, "Username cannot contain any special characters.")

// creates a schema for signing up. 
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, ({message: "Password must be 6 characters."}))
})