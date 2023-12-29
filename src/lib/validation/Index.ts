import * as z from "zod"

export const SignUpValidation = z.object({
    name:z.string().min(3, { message: 'name too short'}),
    username: z.string().min(2, {message: 'username too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be 8 character long'})
  })

  export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be 8 character long'})
  })

  export const PostValidation = z.object({
    caption: z.string().max(2000),
    file: z.custom<File[]>(),
    location:z.string().max(20),
    tags:z.string()
  })