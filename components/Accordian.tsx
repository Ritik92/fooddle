"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React from 'react';
import { Card, Button, Input } from '@nextui-org/react';

import { IoIosArrowBack } from "react-icons/io";

const Accordian = () => {
  

  const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0 font-urbanist">
      
      <div
        className="w-full  h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center justify-center mb-8 absolute pb-6"
      >
        <div className="flex items-center w-full px-4 pt-16">
          <span className="text-white text-xl mr-3"><IoIosArrowBack size={24}/></span>
          
          <h2 className="text-white text-xl ">Help & Support</h2>
        </div>
      </div>
     <div className='pt-44 w-full text-[#4D4D4D] '> 
     <div className="w-full px-4 py-6 bg-white ">
        
        <h2>FAQs</h2>

        {/* Input Fields */}
        <div className="flex flex-col items-center justify-center w-full space-y-4 bg-white">
          <div className="w-full relative">
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
      </div>
      </div>
    </div>
  );
};

export default Accordian;
