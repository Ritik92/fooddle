"use client"
import Navbar from './Navbar'
import'./cssModules/homeP.css'
import React from'react'
import Searchbar from './Searchbar'
import {RootState} from '@/redux/store'
import './cssModules/navbar.css'
import Filterbar from './Filterbar'
import RestCard from './RestCard'
import { useSelector } from 'react-redux'

const HomeP=()=>{

    const selectedFilter= useSelector((state:RootState)=>state.filter.selectedFilter)
    const restaurantData = [
        { img: '/pizzaNation.png', name: 'Pizza Nation', time: '12:00 pm', location: 'cos' },
        { img: '/restpic.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
        { img: '/restpic2.png', name: 'Sips N Bites', time: '12:00 pm', location: 'G-block' },
        { img: '/pizzaNation.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
        { img: '/restpic.png', name: 'Pizza Nation', time: '12:00 pm', location: 'cos' },
        { img: '/restpic2.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
        { img: '/pizzaNation.png', name: 'Sips N Bites', time: '12:00 pm', location: 'cos' },
        // Add more restaurant data here...
      ];

      const filteredRestaurants = selectedFilter === 'All' ? restaurantData : restaurantData.filter(restaurant => restaurant.location === selectedFilter);
    return(
       
        <div className='screen'>
             <Navbar />
            
            <div id="rest">
                <div id="sbar">
                <Searchbar />
                </div>
                <div id="fibar">
                <Filterbar/>
                </div>
                <div id="restbar">

                {filteredRestaurants.map((restaurant, index) => (
            <RestCard key={index} {...restaurant} />
          ))}
                   
                </div>
                
            </div>
            
        </div>
    )
}
export default HomeP