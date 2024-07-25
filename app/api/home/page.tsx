'use client'
import React from 'react'

import HomeP from'@/components/homePagecomponents/homeP';

import { Provider } from 'react-redux';
import { store } from '@/redux/store'
const Home = ()=>{
    return(
   
        
       
    <Provider store={store}>
        <HomeP/>
    </Provider>


    )
}

export default Home