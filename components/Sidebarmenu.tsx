// components/SidebarMenu.js

import { Image } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SidebarMenu = ({active}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter()
  const [activeButton, setActiveButton] = useState(active);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-2 ">
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
       
      >
        <Image alt="/fe" src='/menuicon.png' className=" p-3 pt-2"/>
      </button>

      {/* Sidebar Menu */}
      {isOpen && (
        <div> 
             <div className="absolute top-3 pt-[4rem] right-4 bg-primary-700 text-white rounded-lg shadow-md p-4 z-50">
             <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-[8px] w-[30px] h-[30px] focus:outline-none"
      >
        X
      </button>
      <ul className="space-y-2">
      <li>
              <button
                onClick={() =>{ setActiveButton("Home");  router.push('/')}}
                className={`w-full text-left ${activeButton === "Home" ? "bg-white text-blue-500" : "hover:bg-blue-700"} p-2 rounded-lg`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() =>{ setActiveButton("Shop Settings"); router.push('/shopsettings')}}
                className={`w-full text-left ${activeButton === "Shop Settings" ? "bg-white text-blue-500" : "hover:bg-blue-700"} p-2 rounded-lg`}
              >
                Shop Settings
              </button>
            </li>
            <li>
              <button
                onClick={() =>{ setActiveButton('Manage Orders'); router.push('/orderhistory')}}
                className={`w-full text-left ${activeButton === "Manage Orders" ? "bg-white text-blue-500" : "hover:bg-blue-700"} p-2 rounded-lg`}
              >
                Manage Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveButton("Customer Mode")}
                className={`w-full text-left ${activeButton === "Customer Mode" ? "bg-white text-blue-500" : "hover:bg-blue-700"} p-2 rounded-lg`}
              >
                Customer Mode
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveButton("Contact Fooddle")}
                className={`w-full text-left ${activeButton === "Contact Fooddle" ? "bg-white text-blue-500" : "hover:bg-blue-700"} p-2 rounded-lg`}
              >
                Contact Fooddle
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveButton("Log out");
                  signOut();
                }}
                className={`w-full text-left ${activeButton === "Log out" ? "bg-white text-blue-500" : "hover:bg-blue-700"} p-2 rounded-lg`}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
        </div>
       
      )}
    </div>
  );
};

export default SidebarMenu;
