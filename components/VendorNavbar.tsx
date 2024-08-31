"use client"
import { Image } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SidebarMenu from "./Sidebarmenu";
import { useRouter } from "next/navigation";

export default function VendorNavbar({active}){
    const router=useRouter()
    const { data: session, status } = useSession();
    const [activebutton, setActivebutton] = useState(active);
    return(
        <div>
             <div className=" hidden bg-primary-700 h-[4rem] md:flex justify-between items-center">
      
      <div className="ml-4">
      <Image src='/logo2.png' className=" w-2/3 "/>
      </div>
      
      <div className="gap-6 text-white flex mr-[4rem]">
          <div><button onClick={()=>{setActivebutton('Home'); router.push('/')}} className={` ${activebutton=='Home'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Home</button></div>
          <div> <button onClick={()=>{setActivebutton('Shop Settings')
        router.push('/shopsettings')
          }} className={` ${activebutton=='Shop Settings'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Shop Settings</button></div>
          <div> <button onClick={()=>{setActivebutton('Manage Orders'); router.push('/orderhistory')}} className={` ${activebutton=='Manage Orders'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Manage Orders</button></div>
          <div><button onClick={()=>setActivebutton('Customer Mode')} className={` ${activebutton=='Customer Mode'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Customer Mode</button></div>
          <div><button onClick={()=>setActivebutton('Contact Foodle ')} className={` ${activebutton=='Contact Foodle '?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Contact Foodle </button></div>
          <div><button  onClick={()=>{ setActivebutton('Log out'); signOut() }} className={` ${activebutton=='Log out'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Log out</button></div>
      </div>
     
    
    </div>
    <div className="md:hidden ml-4 flex justify-between">
        <Image src='/logo.png' className=" w-2/3 pt-3 "/>
        
        <SidebarMenu active={active} />
        </div>
      
        </div>
    )
}