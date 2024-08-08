
import PersonalDetails from '@/components/PersonalDetails'
import React from 'react'
import { Toaster } from "react-hot-toast";




const Home = ()=>{
    return(
       <div>

        <PersonalDetails />    
       <Toaster/>
        </div>

    )
}

export default Home