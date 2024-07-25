import React from 'react'
import { Image } from '@nextui-org/react';
import './cssModules/Searchbar.css'
const Searchbar=()=>{
    return(
        <div className='out'>
            <div className='inn'>
                <Image src="/searchb.png"/>
                <input className='holder' type="text" placeholder="What would you like to eat today?"/>
            </div>
            
            <button><Image src="/filter-horizontal.png"/></button>
               
            <style>
            
            </style> 
        </div>
    )
}
export default Searchbar
