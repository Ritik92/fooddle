"use client";

import React, { useState } from 'react';
import { Card, Button, Input } from '@nextui-org/react';
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-hot-toast";


const PersonalDetails = () =>{

    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hostel, setHostel] = useState('');
  const [mobile, setMobile] = useState('');
  

  const handleChanges = () => {
    if (!name || !email || !mobile || !hostel) {
        toast.error('Please fill required fields');
      return;
    }
    toast.success("Changes saved ")
    console.log(name, email,mobile,hostel);
  };


    return (
      
      <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0">
      {/* Custom Heading Container */}
      <div
        className="w-full w-[100vw] h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center justify-center mb-8 absolute pb-6"
      >
        <div className="flex items-center w-full px-4 pt-16">
          <span className="text-white text-xl mr-3"><IoIosArrowBack size={24}/></span>
          
          <h2 className="text-white text-xl ">Personal Details</h2>
        </div>
      </div>
     <div className='pt-44 w-full max-w-sm'> 
     <div className="w-full max-w-sm px-4 py-6">
        
        

        {/* Input Fields */}
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="w-full relative">
            <Input
             
              
              className={`w-full p-2 border rounded bg-white`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              className={`absolute left-3 top-1 transition-all transform  text-xs -top-3.5  px-3`}
            >
              Name 
            </label>
          </div>
          <div className="w-full relative">
            <Input
             
              
              className={`w-full p-2 border rounded bg-white`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              className={`absolute left-3 top-1 transition-all transform  text-xs -top-3.5  px-3`}
            >
              E-mail
            </label>
          </div>
          <div className="w-full relative">
          <Input
              type="text"
              className={`w-full p-2 border rounded bg-white`}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <label
              className={`absolute left-3 top-1 transition-all transform  text-xs -top-3.5  px-3`}
            >
              Mobile <span className="text-red-500"></span>
            </label>
          </div>
          <div className="w-full relative">
            <Input
             
              
              className={`w-full p-2 border rounded bg-white`}
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              required
            />
            <label
              className={`absolute left-3 top-1 transition-all transform  text-xs -top-3.5  px-3`}
            >
              Hostel 
            </label>
          </div>

          

          <Button
            className="w-full bg-[#004BAD] text-white py-2 rounded-3xl hover:bg-blue-600"
            onClick={handleChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
      </div>
    </div>
        
    )
}

export default PersonalDetails