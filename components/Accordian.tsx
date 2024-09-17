"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React from 'react';
import { Card, Button, Input } from '@nextui-org/react';
import Profile from "./profile";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import ProfileButtons from "./ProfileButtons";
import ProfileHeader from "./ProfileHeader";

const Accordian = () => {

  const router = useRouter();

  

  const handleBackClick = () => {
    router.push("/profilepage");
  };


  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (

    <div className="flex overflow-y-auto h-screen">
      {/* <div className="hidden md:flex md:items-center">
        <button className="w-[2vw] h-[50px]" onClick={handleHomeClick}><img src="/F.png" alt="Fooddle" /></button>
      </div> */}
      <div className="flex flex-col">
        <div className="hidden md:block mb-5">
          <ProfileHeader />
        </div>
        <div className="flex flex-row w-full relative top-0 bg-[#FCFCFC] md:top-[13.5rem]">
          <div className="hidden md:block md:[10vw]">
            <ProfileButtons />
          </div>

          <div className="flex flex-col  w-[100vw] items-center min-h-screen bg-[#FCFCFC] pt-0 font-urbanist md:w-[100vw]">

            <div
              className="w-full  h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center justify-center mb-8  pb-6 sm:w-[100vw] md:hidden"
            >
              <div className="flex items-center w-full px-4 pt-16 ">
                <button
                  className="text-white mr-4 hover:bg-[#1a1c1e] rounded-full p-2"
                  onClick={handleBackClick}
                >
                  <IoIosArrowBack size={24} />
                </button>

                <h2 className="text-white text-xl">Help & Support</h2>
              </div>
            </div>
            <div className='pt-4 px-[10vw] mx-10 w-full text-[#4D4D4D] md:pt-0'>
              <div className="w-full px-4 py-6  bg-white ">

                <h2 className="text-[#4D4D4D] bg-white font-bold px--6">FAQs</h2>

                <div className="flex flex-col items-center justify-center w-full space-y-4 bg-white">
                  <div className="w-full relative p-3">
                    <Accordion selectionMode="multiple">
                      <AccordionItem key="1" aria-label="Kitna kama lete ho?" title="Kitna kama lete ho? ">
                        {"Bas unicorn banne wale hai thode dino mein"}
                      </AccordionItem>
                      <AccordionItem key="2" aria-label="What are the delivery hours?" title="What are the delivery hours?">
                        {"Our delivery hours are from 10:00 AM to 11:00 PM,seven days a week. Please note that delivery hours may vary slightly on public holidays"}
                      </AccordionItem>
                      <AccordionItem key="3" aria-label="What should I do if my payment is declined?" title="What should I do if my payment is declined?">
                        {defaultContent}
                      </AccordionItem>
                      <AccordionItem key="4" aria-label="How do I request a refund?" title="How do I request a refund?">
                        {defaultContent}
                      </AccordionItem>
                    </Accordion>
                  </div>

                </div>

                <div className="flex flex-col items-center justify-center mt-20">
                  <div className=""><p>For more queries email us at:</p></div>
                  <div><p className="text-[#004BAD]">contact@fooddle.in</p></div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:justify-end md:items-end md:w-[15vw]">
              <p> 
              <img src="/i.png" alt="i" className="h-[30px] w-[30px] "/>
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Accordian