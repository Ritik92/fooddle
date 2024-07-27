"use client"
import MenuBar from "@/components/MenuBar";
import axios from "axios";
import { useEffect } from "react";

export default  async function MenuPage( { params }: { params: { restId: string[] } }){
    console.log(params.restId[0])
    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://localhost:3000/api/restaurants/${params.restId[0]}`);
            console.log(response)
          } catch (error) {
           
            console.error('There was an error!', error);
          }
        };
        fetchData();
      }, [params]); 
     
    return(
        <div>
            
            <MenuBar/>
        </div>

    )
}