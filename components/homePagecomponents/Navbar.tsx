'use client'
import React from 'react'
import { useRouter,usePathname } from 'next/navigation'
import { Image } from '@nextui-org/react'
import './cssModules/navbar.css'
const Navbar=()=>{
    const router = useRouter();
    const pathname = usePathname();
   // Get the current path from the router

  // Function to handle navigation and setting active state
  const handleNavigation = (path: string) => {
    router.push(path);
  };
    return(
        <div className='outer'>
            <div className='icon'>
            <Image className='logo' src = "/logos.png" />
            
            </div>

            <div className='options'>
                <button  className={pathname === '/home' ? 'active' : ''} 
          onClick={() => handleNavigation('/home')}
        ><Image src="/home1.png"/></button>


                <button className={pathname === '/search' ? 'active' : ''} 
          onClick={() => handleNavigation('/search')}><Image src="/search.png"/></button>
                <button className={pathname === '/cart' ? 'active' : ''} 
          onClick={() => handleNavigation('/cart')}><Image src="/cart.png"/></button>
                <button className={pathname === '/note' ? 'active' : ''} 
          onClick={() => handleNavigation('/note')}><Image src="/orderhistory.png"/></button>

            </div>
            
               <button id="profile" onClick={() => handleNavigation('/profilepage')}>
                <Image className="profile-pic" src="/UserIcon.png"/>
               </button>
            

        </div>
    )
}

export default Navbar