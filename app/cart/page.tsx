
import React from 'react'

import Navbar from '@/components/homePagecomponents/Navbar';
import Bluebar from '@/components/bluebar';
import { Image } from '@nextui-org/react';

const Home = ()=>{
    return(
        <div>
            <Bluebar title={'Cart'} />
            <div className='flex justify-center'>
            <div className=' bg-blue-800 h-[104px] w-full flex justify-between items-center md:h-[56.38px] md:w-[892px] mt-[30px] md:rounded-t-[24px] fixed bottom-0 z-50  '>
           <div className=' md:pl-[32px] flex pl-[24px] gap-[30px] text-white text-xs'>
            <div >
                <div className='text-base pl-5'>
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
                    <button className='bg-primary-100 text-primary-700 w-[138px] h-[38px] rounded-[25.71px] flex justify-center items-center font-semibold text-base '>Pay Now 
                    
                    </button>
                    
               </div>
           </div>
            </div>
           
        </div>


    )
}

export default Home