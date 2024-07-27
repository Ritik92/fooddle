"use client"; // Ensure this is used for client-side rendering

import MenuBar from "@/components/MenuBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MenuPage(context: { params: { restId: string }  }) {
    const [menuData, setMenuData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const { restId } = context.params;
    console.log(restId[0])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/restaurants/${restId[0]}`);
                setMenuData(response.data);
            } catch (error: any) {
                console.error('Error fetching data:', error.message); // Log specific error message
                setError('There was an error fetching the data.');
            }
        };

        fetchData();
    }, [restId]);

    if (error) return <p>{error}</p>;
    if (!menuData) return <p>Loading...</p>;
        const {name}=menuData
    return (
        <div>
            <MenuBar menuData={menuData} />
         
        </div>
    );
}
