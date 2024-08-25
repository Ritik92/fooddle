"use client"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './homePagecomponents/cssModules/loader.css'
export default function Loader(){
    return(
        <div className='flex items-center justify-center h-screen'>
                <DotLottieReact
                    src="https://lottie.host/f67b8e7a-c86f-4585-91fd-d169f23688bb/5gN0d20yQU.lottie"
                    style={{ width: '300px', height: '300px' }}
                    autoplay
                    loop
                />
            </div>
    
    )
}