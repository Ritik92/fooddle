"use client"
import React from 'react'

import Navbar from '@/components/homePagecomponents/Navbar';
import { Image } from '@nextui-org/react';
import Bluebar from '@/components/bluebar';
import Searchbar from '@/components/homePagecomponents/Searchbar';

const Home = ()=>{
    return(
        <div>
            
             <Bluebar title={'Orders'}/>
             <div className='flex justify-center pt-[18px]'>
             <Searchbar text={'Search Orders'}/>
             </div>
             
        </div>
        

    )
}

export default Home