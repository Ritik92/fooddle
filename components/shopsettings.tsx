"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import ShopDetailsForm from "./shopdetailsform";
import VendorNavbar from "./VendorNavbar";

export default function ShopSettings() {
  const [activebutton, setActivebutton] = useState('Home');
  const [isOpen, setIsOpen] = useState(true);
  const { data: session, status } = useSession();
  const [restaurant, setRestaurant] = useState(null);
  const toggleShopStatus = async () => {
    const newStatus = !isOpen;
    try {
      await axios.post(`/api/togglemode`, { 
        isOpen: newStatus,
        userID: (session.user as any).id
      });
      setIsOpen(newStatus);
    } catch (error) {
      console.error('Error updating shop status:', error);
      setIsOpen(!newStatus);
    }
  };
  useEffect(() => {
    if(session) fetchRestaurantData();
  }, [session]); 
  const fetchRestaurantData = async () => {
    try {
      // Replace this with your actual API call
      const response = await axios.post(`/api/fetchRestaurantData`,{
        userId: (session.user as any).id,

      });
      const data = await response.data;
      setRestaurant(data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <VendorNavbar active="Shop Settings" />
     {restaurant? <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-6">Shop Details</h1>
        <div className="flex justify-center">
          <div className="bg-white w-full max-w-md rounded-xl p-6 text-gray-700 text-sm">
            <div className="flex flex-wrap sm:flex-row justify-between mb-4">
              <div className="text-lg  font-semibold mb-2 sm:mb-0">
                 {restaurant.name}
              </div>
              <div>
                {restaurant.openingTime} to {restaurant.closingTime}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>Status</div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isOpen}
                  onChange={toggleShopStatus} 
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between mb-2">
              <div>Delivery Charge</div>
              <div>{restaurant.deliveryCharge} </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Contact</div>
              <div>{restaurant.phone?restaurant.phone:<div></div>} </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>VPA</div>
              <div>-</div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:text-center">
          <ShopDetailsForm userId='1' data={restaurant}  />
        </div>
      </div>:<div></div>}
    </div>
  );
}