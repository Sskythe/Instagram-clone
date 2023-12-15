import { Routes, Route } from 'react-router-dom';
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import SignInForm from './_auth/Forms/SignInForm';
import SignUpForm from './_auth/Forms/SignUpForm';
import Home from './_root/Pages/Home';
import AuthLayout from './_auth/AuthLayout';
import PageLayout from './_root/PageLayout';
const App = () => {
  return (

    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>


        {/* private route i.e. after sign up */}
        <Route element={<PageLayout />}>
          <Route index element={<Home />} />
        </Route>


      </Routes>
      <Toaster/>
    </main>

  )
}

export default App