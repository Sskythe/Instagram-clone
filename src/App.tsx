import { Routes, Route } from 'react-router-dom';
import './globals.css'
import SignInForm from './_auth/Forms/SignInForm';
import SignUpForm from './_auth/Forms/SignUpForm';
import Home from './_root/Pages/Home';
import AuthLayout from './_auth/AuthLayout';
import PageLayout from './_root/PageLayout';
const App = () => {
  return (

    <main className='flex h-screen'>
      <h1> Landing page</h1>
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
    </main>

  )
}

export default App