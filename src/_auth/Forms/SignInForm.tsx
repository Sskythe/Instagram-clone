import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation as SignInValidation } from '@/lib/validation/Index'
import { z } from 'zod'
import Loader from '@/components/Shared/Loader'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useSignInAccount } from '@/lib/react-query/queriesAndMutattions'
import { useUserContext } from '@/context/AuthContext'




const SignInForm = () => {

 
  const {mutateAsync: signInAccount, isPending: isSingingIn} = useSignInAccount()
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
  const navigate = useNavigate()



  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  

    // Toast is kind of like a popup 

    // here we are checking if the new user creation is successful or not
    
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      return toast({
        title: "Sign in failed. Please try again"
      })
    }

    const isLoggedIn = await checkAuthUser()
    if(isLoggedIn){
      form.reset();
      navigate('/home')
    }else{
      return toast({
        title:'sign in failed'
      })
    }

  }


  return (
    <Form {...form}>

      <div className='sm:w-420 flex-center flex-col'>
        <img src="/assets/images/logo.svg" />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Sign In</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

{/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

{/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='shad-button_primary'>
            <div>
              {isUserLoading ? (<div className='flex-center gap-2'><Loader/>Loading...</div>):(<div>Submit</div>)}
            </div>
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Don't have an account<Link to="/sign-up" className='text-primary-500 text-bold ml-1 '>Signup</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}


export default SignInForm