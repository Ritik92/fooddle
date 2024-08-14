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
        <div className='outernav'>
            <div className='icon '>
            <Image className='deflogo' src = "/logos.png" />
            <Image className='fulllogo ' src = "/logocom.png" />
            
            </div>

            <div className='options'>

                <button  className={pathname === '/home' ? 'active' : ''} 
          onClick={() => handleNavigation('/home')}
        ><Image src="/home.png"  className='defaultim'/>
        <Image src="/homeYes.png" className='activeim'/>
        <p>Home</p></button>


                <button className={pathname === '/search' ? 'active' : ''} 
          onClick={() => handleNavigation('/search')}><Image src="/searchNo.png"  className='defaultim'/>
        <Image src="/SearchYes.png" className='activeim'/><p>Search</p></button>
                <button className={pathname === '/cart' ? 'active' : ''} 
          onClick={() => handleNavigation('/cart')}><Image src="/cart.png"  className='defaultim'/>
        <Image src="/cartYes.png" className='activeim'/><p>Cart</p></button>
                <button className={pathname === '/note' ? 'active' : ''} 
          onClick={() => handleNavigation('/note')}><Image src="/ordersNo.png"  className='defaultim'/>
        <Image src="/orderYes.png" className='activeim'/><p>Orders</p></button>

            </div>
            
               <button id="profile" onClick={() => handleNavigation('/profilepage')}>
                <Image className="profile-pic" src="/UserIcon.png"/>
                <p>Profile</p>
               </button>
            

        </div>
    )
}

export default Navbar