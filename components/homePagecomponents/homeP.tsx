"use client"
import Navbar from './Navbar'
import'./cssModules/homeP.css'
import React, { useState } from'react'
import Searchbar from './Searchbar'
import {RootState} from '@/redux/store'
import './cssModules/navbar.css'
import Filterbar from './Filterbar'
import RestCard from './RestCard'
import { useSelector } from 'react-redux'

const HomeP=()=>{
    const [searchtext,setsearchtext]=useState('')
    const selectedFilter= useSelector((state:RootState)=>state.filter.selectedFilter)
    const restaurantData = [
        { id:'1', img: '/pizzaNation.png', name: 'Pizza Nation', time: '12:00 pm', location: 'cos' },
        { id:'2',img: '/restpic.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
        { id:'3',img: '/restpic2.png', name: 'Sips N Bites', time: '12:00 pm', location: 'G-block' },
        { id:'4',img: '/restpic2.png', name: 'Sips N Bites', time: '12:00 pm', location: 'G-block' },
        { id:'5',img: '/pizzaNation.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
        { id:'6',img: '/restpic.png', name: 'Pizza Nation', time: '12:00 pm', location: 'cos' },
        { id:'7',img: '/restpic2.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
        { id:'8',img: '/pizzaNation.png', name: 'Sips N Bites', time: '12:00 pm', location: 'cos' },
        // Add more restaurant data here...
      ];    
     
      const filteredRestaurants = ( !searchtext) ? restaurantData : restaurantData.filter(restaurant => (restaurant.name.toLowerCase().includes(searchtext)));
      const filter2=(selectedFilter==='All')? filteredRestaurants:filteredRestaurants.filter(restaurant=>(restaurant.location===selectedFilter))
    return(
        
        <div className='screen'>
             <Navbar />
            
            <div id="rest">
                <div id="sbar">
                <Searchbar searchtext={searchtext} setsearchtext={setsearchtext} />
                </div>
                <div id="fibar">
                <Filterbar/>
                </div>
                <div id="restbar">

                {filter2.map((restaurant, index) => (
            <RestCard key={index} {...restaurant} />
          ))}
                   
                </div>
                
            </div>
            
        </div>
    )
}
export default HomeP