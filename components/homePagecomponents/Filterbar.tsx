'use client'
import React,{useRef,useEffect,useState} from'react'
import {Image} from '@nextui-org/react'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../redux/store';
import {setFilter} from '../../redux/slices/filterSlice'
import FilterButton from './FilterButton'
import './cssModules/Filterbar.css'
const Filterbar=()=>
{

    const mainbarRef= useRef<HTMLDivElement>(null);
    const dispatch=useDispatch();
    const selectedFilter = useSelector((state: RootState) => state.filter.selectedFilter);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Initial check
        handleResize();
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    const handleFilterClick=(filter:string)=>(event: React.MouseEvent<HTMLButtonElement>)=>{
        dispatch(setFilter(filter));
    };
    const scrollLeft=()=>
    {
        if(mainbarRef.current)
        {
            mainbarRef.current.scrollBy({
                left:-100,
                behavior:'smooth'
            });
        }
    };

    

    const scrollRight=()=>
        {
            if(mainbarRef.current)
            {
                mainbarRef.current.scrollBy({
                    left:100,
                    behavior:'smooth'
                });
            }
        };
    return(
        <div id="bar">
            {!isMobile &&(<div id="larrow" onClick={scrollLeft}>
                <button><Image src="/larrow.png"/></button>


            </div>)}
            <div id="mainbar" ref={mainbarRef}>
        {['All', 'G-block', 'H-block', 'Aahar', 'Cos', 'Teslas', 'Outside','Outside2','Outside3'].map(location => (
          <FilterButton key={location} name={location} onClick={handleFilterClick(location)} isActive={selectedFilter===location} />
        ))}
      </div>
      {!isMobile &&(
            <div id="rarrow" onClick={scrollRight}>
            <button><Image src="/rarrow.png"/></button>

            </div>)}
        </div>
    )
}
export default Filterbar;