'use client'
import React,{useRef, useState} from 'react'
import {Image}from '@nextui-org/react';
import "./cssModules/support.css"



interface SupportProps {
    toggleHelpbox: () => void;
    isActive: boolean;
  }
const Support: React.FC<SupportProps> = ({ toggleHelpbox, isActive })=>{

    const dotRef = useRef<HTMLImageElement>(null);
   
    const lineRef = useRef<HTMLImageElement>(null);
    const sendRef = useRef<HTMLImageElement>(null);
    const [isBlinking, setIsBlinking] = useState(false);
    // const[isActive,setIsActive]=useState(false);
    const[isHovered,setIsHovered]=useState(false);
   
    const triggerBlink = () => {
        if (dotRef.current) {
            dotRef.current.classList.remove('blink'); // Remove class to reset animation
            void dotRef.current.offsetWidth; // Trigger reflow
            dotRef.current.classList.add('blink'); // Re-add class to start animation
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!isBlinking) {
            setIsBlinking(true);
            triggerBlink();
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (dotRef.current) {
            setIsBlinking(false);
            triggerBlink();
        }
    };

    const handleClick = () => {
        // setIsActive(prevState => !prevState); 
        toggleHelpbox
    };

    // const handleSendClick = (event: React.MouseEvent<HTMLImageElement>) => {
    //     event.stopPropagation(); // Prevent click event from bubbling up
    //     setIsActive(false);
    // };
    
  


    return(
        // <div className='screen'>
        <div className='outsup' onClick={toggleHelpbox}>
           
            <div className={`iconback${isHovered && !isActive ? ' hovered' : ''}`}>
                 <div className={`main-icon${isActive ? ' clicked' : ''}`}
           
                 onMouseEnter={handleMouseEnter} 
                 onMouseLeave={handleMouseLeave}
                 onClick={handleClick}
                 >
            
                 <Image id="line" src= "/line.png"
                 style={{ display: isActive ? 'none' : 'block' }} 
                 />
                 <Image id="dot"  src= "/dot.png" ref={dotRef} 
                 style={{ display: isActive ? 'none' : 'block' }} 
                 />
                 <Image id="send" src="/send.png" /*onClick={handleSendClick}*/
                 style={{ display: isActive ? 'block' : 'none'  }} 
                 />

                </div>
            </div>
            <div className="help"  style={{ display: isHovered && !isActive ? 'block' : 'none' }}>
            <p >Need Help?</p>
            </div>

           

           
            
        </div>
       

    )
};
export default Support