import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutattions';
import { INavLink } from '@/types';
import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const LeftBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className='flex gap-3 items-center'>
          <img
            src="/assets/images/logo.svg"
            alt='logo'
            width={130}
            height={325}
          />
        </Link>
        <Link to={`/profile/$(user.id)`} className='flex-center gap-3'>


          <img
            src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
            alt='profile'
            className='h-14 w-14 rounded-full' />
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.username}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>
        <ul>
          {sidebarLinks.map((link: INavLink) => {
            const isAcitve = pathname === link.route;
            return (

              <li key={link.label} className={`leftsidebar-link group ${isAcitve && 'bg-primary-500'}`}>
                <NavLink to={link.route} className="flex gap-3 items-center p-3">
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isAcitve && 'invert-white'}`} />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>


      </div>
      <div className='flex justify-center '>
        <Button variant="ghost" className='shad-button ghost ' onClick={() => signOut}>
          <img src='/assets/icons/logout.svg' alt='logout' />
          <p className="small-medium lg:base-medium">Log out</p>
        </Button>
      </div>



    </nav >
  )
}

export default LeftBar