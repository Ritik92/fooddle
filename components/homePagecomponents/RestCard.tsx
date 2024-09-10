'use client'

import React ,{useState}from 'react';
import {Image} from '@nextui-org/react';
import './cssModules/RestCard.css'
import { useRouter } from 'next/navigation';

// Define the type for the props
type RestCardProps = {
    id: string;
    img: string;
    name: string;
    closingTime: string;
    location:string;
};

const RestCard: React.FC<RestCardProps> = ({ id,img, name, closingTime ,location}) => {
    const router=useRouter()
    const[favorite,setFavorite]=useState(false);

    const handleFavClick=()=>{
        setFavorite(!favorite);


    }

    return (
       
        <div id="outer-box">
            <img id="image-container"src={img}  alt="Restaurant Image" onClick={() =>  { router.push(`/restaurants/${id}`) }}/>  
            <button id="like"  className={`favorite-button ${favorite ? 'active' : ''}`}
                onClick={handleFavClick}>
                   <svg
                    className="fav"
                    width="16"
                    height="15"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.353 1.82992C9.78869 0.870385 8.4234 1.25706 7.60324 1.87301C7.26689 2.12556 7.09877 2.25184 6.99984 2.25184C6.9009 2.25184 6.73279 2.12556 6.39644 1.87301C5.57628 1.25706 4.21097 0.870385 2.64668 1.82992C0.593711 3.08922 0.129174 7.24369 4.86456 10.7487C5.76651 11.4162 6.21747 11.75 6.99984 11.75C7.7822 11.75 8.23318 11.4162 9.13513 10.7487C13.8705 7.24369 13.4059 3.08922 11.353 1.82992Z"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                    />
                </svg>


            </button>

            {/* <button id="like">
                <Image src="/favourite.png"  />
            </button>
            <Image id="image-container"src={img} width={344} height={178} alt="Restaurant Image" onClick={() => { router.push(`/restaurants/${id}`) }}/> */}
            <div id="panel">
                <div id="info">
                <div id="rname">
                    <p>{name}</p>
                    
                </div>
                
                <div>
                <div id="time-block">
                   <div><Image height={15} width={15}  src= "/door.png"/></div> 
                    <p>{closingTime}</p>
                </div>
                    
                </div>

                </div>
                
            </div>
           
        </div>
    );
}

export default RestCard
