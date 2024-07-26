'use client'

import React from 'react';
import {Image} from '@nextui-org/react';
import './cssModules/RestCard.css'
import { useRouter } from 'next/navigation';

// Define the type for the props
type RestCardProps = {
    img: string;
    name: string;
    time: string;
    location:string;
};

const RestCard: React.FC<RestCardProps> = ({ img, name, time ,location}) => {
    const router=useRouter()
    return (
       
        <div id="outer-box">
            <button id="like">
                <Image src="/favourite.png"  />
            </button>
            <Image id="image-container"src={img} width={344} height={178} alt="Restaurant Image" onClick={()=>{router.push('/restaurants/pizzanation')}}/>
            <div id="panel">
                <div id="info">
                <div id="rname">
                    <p>{name}</p>
                    
                </div>
                
                <div>
                <div id="time-block">
                   <div><Image height={15} width={15}  src= "/door.png"/></div> 
                    <p>{time}</p>
                </div>
                    
                </div>

                </div>
                
            </div>
            <style>
           
            </style> 
        </div>
    );
}

export default RestCard
