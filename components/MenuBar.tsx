"use client"
import Filterbar from './homePagecomponents/Filterbar';
import Navbar from './homePagecomponents/Navbar'
import Searchbar from "./homePagecomponents/Searchbar";
import { useState } from "react";
import { Button,  menu, MenuItem } from '@nextui-org/react';
import Menuitems from './Menuitems';
import Image from 'next/image';
export default function MenuBar(props:any){
    const[searchmenu,setsearhmenu]=useState();
    const menudata=props.menuData;
    
    return(
     
        <div className=' flex '>
            <div className='hidden md:block'>
            <Navbar/>
            </div>
        
        <div className='w-full'>
            <div className='max-w-[889px]  mx-auto '>
        <div className='bg-blue-800 h-[120px] w-full md:h-[168px] md:w-[889px] md:mt-[24px] rounded-b-[8px] md:rounded-[24px]  text-center text-blue'>
            
            <div className='flex  flex-row justify-between'>
            <div className=' flex'>
                <div className='p-4 pt-16 '>
                <Image src='/arrowWhite.png' width={24} height={24} alt="Eye hide icon" />
                </div>
                 <div className=' font-semibold text-[#FCFCFC] leading-[26.4px] text-[25.7px] pt-16 text-left'>
                 {menudata.name}
                 </div>
            </div>
             <div className='flex pt-16 pr-8 '>
                 <div className='pt-1 pr-2'>
                  <Image src='/door-01.png' width={15} height={15} alt="Eye hide icon" />
                </div>
                <div className='text-[#FCFCFCB2] '>
                  {menudata.closingTime}
                </div>
            </div>
            </div>
            <div className='flex md:justify-end'>
            <div className='text-slate-400  pl-14 absolute top-[5.5rem] md:pr-2 md:mt-8'>
                Delivering in {menudata.deliveryTime}
            </div>
            </div>
            
            

            <div className=' mt-6 '>
                 <Searchbar/>
            </div>
            <div className='mt-4'>
                <Filterbar/>
            </div>
            
            <div className='h-[630px] pl-[24px]  pr-[24px] overflow-y-auto '>
            {Object.entries(menudata.menu).map(([category, items]:any) => (
                <div key={category} className=' md:w-[729px] md:ml-20 mt-8 '> 
                    <div className='font-urbanist mt-[32px]  text-lg text-left font-semibold text-[#004BAD]'>
                {category}
                </div>
                       
                        {items.map(item => (
                          <Menuitems  key={item.id} data={item}/>
                        ))}
                   
                </div>
            ))}
             <div className='p-[15rem]'>
               
             </div>
            </div>
            <div className=' bg-blue-800 h-[104px] w-full flex justify-between items-center md:h-[56.38px] md:w-[892px] mt-[30px] md:rounded-t-[24px] fixed bottom-0 z-50  '>
           <div className=' md:pl-[32px] flex pl-[24px] gap-[30px] text-white text-xs'>
            <div >
                <div className='text-base'>
                    5
                </div>
                <div className='text-[#719AD0] font-light'>
                    Total Count
                </div>
            </div>
               <div>
               <div  className='text-base'>
                    ₹ 340.00
                </div>
                <div className='text-[#719AD0] font-light'>
                    Total Price
                </div>
               </div>
               
               
           </div>
           <div className='pl-4 md:mr-[32px] mr-[24px] '>
                    <button className='bg-primary-100 text-primary-700 w-[138px] h-[38px] rounded-[25.71px] flex justify-center items-center font-semibold text-base '>View Cart 
                    
                    <Image src='/cartI.png'  className='ml-2' width={18} height={18} alt="Cart Image" /> </button>
                    
               </div>
           </div>

        </div>
        </div>
        </div>
       
        
       
            
   </div>
   

    )
}