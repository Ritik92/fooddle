"use client"
import Navbar from './Navbar'
import'./cssModules/homeP.css'
import React, { useEffect, useState } from'react'
import Searchbar from './Searchbar'
import {RootState} from '@/redux/store'
import './cssModules/navbar.css'
import Filterbar from './Filterbar'
import RestCard from './RestCard'
import Support from './support'
import { useSelector } from 'react-redux'
import {Image} from '@nextui-org/react'
import { useRouter,usePathname } from 'next/navigation'
import Supportmsg from './supportmsg'
import axios from 'axios'
import Loader from '../Loader'

const HomeP=()=>{
    const [restaurantData,SetRestaurantData]=useState([]);
    const[loader,setloader]=useState(true)

useEffect(() => {
  async function fetchRestaurants() {
    try {
      const response = await axios.get('/api/restaurant');
      SetRestaurantData(response.data);
      setloader(false) // Update state with fetched data
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }

  fetchRestaurants(); // Call the function
}, []);
    const router = useRouter();
    const pathname = usePathname();
    const [helpbox,setHelpbox]=useState(false);
    
    console.log(restaurantData)
    const toggleHelpBox=()=>{
        setHelpbox(!helpbox);
    }  

    const closeHelpBox=()=>{
        setHelpbox(false);
    }  


  const handleNavigation = (path: string) => {
    router.push(path);};
    const [searchtext,setsearchtext]=useState('')
    const selectedFilter= useSelector((state:RootState)=>state.filter.selectedFilter)
    // const restaurantData = [
    //     { id:'1', img: '/pizzaNation.png', name: 'Pizza Nation', time: '12:00 pm', location: 'cos' },
    //     { id:'2',img: '/restpic.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
    //     { id:'3',img: '/restpic2.png', name: 'Sips N Bites', time: '12:00 pm', location: 'G-block' },
    //     { id:'4',img: '/restpic2.png', name: 'Sips N Bites', time: '12:00 pm', location: 'G-block' },
    //     { id:'5',img: '/pizzaNation.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
    //     { id:'6',img: '/restpic.png', name: 'Pizza Nation', time: '12:00 pm', location: 'cos' },
    //     { id:'7',img: '/restpic2.png', name: 'Desert Club', time: '12:00 pm', location: 'cos' },
    //     { id:'8',img: '/pizzaNation.png', name: 'Sips N Bites', time: '12:00 pm', location: 'cos' },
    //     // Add more restaurant data here...
    //   ];    
     
      const filteredRestaurants = ( !searchtext) ? restaurantData : restaurantData.filter(restaurant => (restaurant.name.toLowerCase().includes(searchtext)));
      const filter2=(selectedFilter==='All')? filteredRestaurants:filteredRestaurants.filter(restaurant=>(restaurant.location===selectedFilter))
    return(
        
        <div className='screen'>
                 <div id="top">
                
                <Image src="/Foodle-logo.png"/>
                <button id="user-icon" onClick={() => handleNavigation('/profilepage')}>
                <Image className="prof-pic" src="/UserIcon.png"/>
                
               </button>

            
        </div>
             <div className='nav'>
             <Navbar />
             </div>
           
            <div id="rest">
                <div id="sbar">
                <Searchbar searchtext={searchtext} text={'What would you like to eat today?'} setsearchtext={setsearchtext} />
                </div>
                <div id="fibar">
                <Filterbar/>
                </div>
                    {loader?<div><Loader/></div>:<div id="restbar">

                      {filter2.map((restaurant) => (
  <div key={restaurant.id} className='hover:cursor-pointer'>
      <RestCard {...restaurant} />
  </div>
))}

<div className='m-[10rem]'>

</div>



   
</div>}

                
                { helpbox &&(<Supportmsg closeHelpbox={closeHelpBox}/>)}
                
                    <div id="s-icon">
                  
                    <Support toggleHelpbox={toggleHelpBox} isActive={helpbox}/>

                    </div>
                    
                
                </div>

                

                </div>

                
            
            
        
    )
}
export default HomeP
