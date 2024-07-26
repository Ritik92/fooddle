"use client"
import Filterbar from './homePagecomponents/Filterbar';
import Navbar from './homePagecomponents/Navbar'
import Searchbar from "./homePagecomponents/Searchbar";
import { useState } from "react";
import { Button, Image, MenuItem } from '@nextui-org/react';
import Menuitems from './Menuitems';
export default function MenuBar(){
    const[searchmenu,setsearhmenu]=useState();
    return(
     
        <div className='flex bg-[#F5F5F5]'>
        <Navbar/>
        <div className='bg-blue-800 h-[168px] w-[889px] mt-[40px] rounded-[24px] text-center ml-[260px] text-blue'>
           <div className='font-urbanist font-semibold text-[#FCFCFC] leading-7 text-[25.7px] pt-[24px] text-left pl-7'>
           Pizza Nation
           </div>
            
            <div className=' mt-24'>
                 <Searchbar/>
            </div>
            <div className='mt-4'>
                <Filterbar/>
            </div>
            <div className=' w-[729px] ml-20 mt-8 h-[630px] overflow-y-auto '>
                <div className='font-urbanist  text-lg text-left font-semibold text-[#004BAD]'>
                Pizzas
                </div>
                <Menuitems/>
                <Menuitems/>
                
                <div className='font-urbanist mt-[32px] text-lg text-left font-semibold text-[#004BAD]'>
                Drinks
                </div>
                <Menuitems/>
                <Menuitems/>
                <Menuitems/>
            </div>
        </div>
   </div>

    )
}