"use client"
import { Button, Switch } from "@nextui-org/react";
import axios from "axios";
import { format } from "path";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Navbar from "./homePagecomponents/Navbar";
export default function VendorLandingPage(){
  const [isOpen, setIsOpen] = useState(true); 
 
        let {data:session}=useSession();
        const userID=(session.user as any).id;
        const toggleShopStatus = async () => {
          const newStatus = !isOpen;
          try {
            await axios.post(`/api/togglemode`, { isOpen: newStatus,
              userID
             });
            setIsOpen(newStatus);
          } catch (error) {
            console.error('Error updating shop status:', error);
            // Revert the toggle if the API call fails
            setIsOpen(!newStatus);
          }
        };
    
   
   
    const [orders, setOrders] = useState([]);
    const fetchorders=() => {
        
        const fetchOrders = async () => {
            try {
                const userId = userID; // Replace with dynamic userId if needed
                const response = await axios.get(`/api/ordercreate?userId=${userId}`);
                setOrders(response.data);
            } catch (err) {
                console.log('Failed to fetch orders');
            } 
        };

        fetchOrders();
    }
   const[activebutton,setActivebutton]=useState('Home');
    return (
        <div className="bg-[#F5F5F5]">
        <div className="bg-primary-700 h-[4rem] flex justify-between items-center">
        <div className="ml-4">
        <Image src='/logo2.png' className=" w-2/3 "/>
        </div>
        <div className="gap-6 text-white flex mr-[4rem]">
            <div><button onClick={()=>setActivebutton('Home')} className={` ${activebutton=='Home'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Home</button></div>
            <div> <button onClick={()=>setActivebutton('Shop Settings')} className={` ${activebutton=='Shop Settings'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Shop Settings</button></div>
            <div> <button onClick={()=>setActivebutton('Manage Orders')} className={` ${activebutton=='Manage Orders'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Manage Orders</button></div>
            <div><button onClick={()=>setActivebutton('Customer Mode')} className={` ${activebutton=='Customer Mode'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Customer Mode</button></div>
            <div><button onClick={()=>setActivebutton('Contact Foodle ')} className={` ${activebutton=='Contact Foodle '?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Contact Foodle </button></div>
            <div><button  onClick={()=>{ setActivebutton('Log out'); signOut() }} className={` ${activebutton=='Log out'?'bg-white text-blue-500':''} rounded-lg pl-2 pr-2`}>Log out</button></div>
        </div>
       
      </div>
      <div className="text-center mt-10 text-2xl font-bold">
        Pending Orders - 2
      </div>
      <div className=" text-center text-red-500">
        Orders can only be cancelled within 10 mins of order time
      </div>
      
      <div className="text-center text-[#4D4D4D]  grid place-items-center  pb-[20%] h-screen">
        <div>
        <div className="text-xl ">
        All orders are complete 
        </div>
       
        <div>
        No Pending orders right now. Relax and get ready for the next one!
        </div>
        </div>
        
       
      </div>
      <div className=" absolute bottom-[4rem]">
        24 August
        <div>
            100 Orders Processed
        </div>
      </div  >
      <div className="absolute bottom-[2rem]">
      Click to Close Shop <label className="inline-flex items-center cursor-pointer  absolute pl-2 ">
  <input type="checkbox" value="" checked={isOpen}
          onChange={toggleShopStatus} className="sr-only peer"/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
</label>
      </div>
     
        </div>

     
    )
}