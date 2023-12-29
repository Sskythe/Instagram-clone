import { bottombarLinks } from '@/constants';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const { pathname } = useLocation()
  return (
    <nav className='bottom-bar'>

      
        {bottombarLinks.map((link) => {
          const isAcitve = pathname === link.route;
          return (


            <Link
              to={link.route}
              key={link.label}
              className={` ${isAcitve && 'bg-primary-500 rounded-[10px]'} flex flex-center flex-col gap-1 p-2 transition`}>

              <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isAcitve && 'invert-white'}`} />
              {link.label}
            </Link>

          )
        })}
      
    </nav >
  )
}

export default BottomBar