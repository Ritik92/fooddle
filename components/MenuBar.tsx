"use client"
import Filterbar from './homePagecomponents/Filterbar';
import Navbar from './homePagecomponents/Navbar'
import Searchbar from "./homePagecomponents/Searchbar";
import { useState } from "react";
import { Button, Image, MenuItem } from '@nextui-org/react';
import Menuitems from './Menuitems';
export default function MenuBar(props:any){
    const[searchmenu,setsearhmenu]=useState();
    const menudata=props.menuData
    return(
     
        <div className='flex bg-[#F5F5F5]'>
        <Navbar/>
        <div className='bg-blue-800 h-[168px] w-[889px] mt-[24px] rounded-[24px]  text-center ml-[260px] text-blue'>
           <div className='font-urbanist font-semibold text-[#FCFCFC] leading-7 text-[25.7px] pt-[24px] text-left pl-7'>
            {menudata.name}
           </div>
            
            <div className=' mt-24'>
                 <Searchbar/>
            </div>
            <div className='mt-4'>
                <Filterbar/>
            </div>
            
            <div className='h-[400px] overflow-y-auto '>
            {Object.entries(menudata.menu).map(([category, items]:any) => (
                <div key={category} className=' w-[729px] ml-20 mt-8 '> 
                    <div className='font-urbanist mt-[32px]  text-lg text-left font-semibold text-[#004BAD]'>
                {category}
                </div>
                       
                        {items.map(item => (
                          <Menuitems  key={item.id} data={item}/>
                        ))}
                   
                </div>
            ))}
             <div className='h-[100px]'>
                        End Of Menu
                    </div>
            </div>
            <div className='  bg-blue-800 h-[56.38px] w-[892px] mt-[30px] rounded-t-[24px] fixed bottom-0 z-50  text-blue'>
           <div className='font-urbanist font-semibold text-[#FCFCFC] leading-7 text-[25.7px] pt-[24px] text-left pl-7'>
            {menudata.name}
           </div>
           </div>

        </div>
       
            
   </div>
   

    )
}