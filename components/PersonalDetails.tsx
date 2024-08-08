"use client";

import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { Button, Input } from '@nextui-org/react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import ProfileButtons from "./ProfileButtons";
import ProfileHeader from "./ProfileHeader";

const PersonalDetails = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hostel, setHostel] = useState('');
  const [mobile, setMobile] = useState('');


  const handleChanges = () => {
    if (!name || !email || !mobile || !hostel) {
      toast.error('Please fill required fields');
      console.log('Please fill required fields')
      return;
    }
    toast.success("Changes saved ")
    console.log(name, email, mobile, hostel);
  };

  const router = useRouter();

  function handleHomeClick() {
    router.push('/home');
  }

  function handleBackClick() {
    router.push('/profilepage');
  }


  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (

    <div className="flex">
      <div className="hidden md:flex md:items-center">
        <button className="w-[2vw] h-[50px]" onClick={handleHomeClick}><img src="/F.png" alt="Fooddle" /></button>
      </div>
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
                <button className="text-white text-xl mr-3" onClick={handleBackClick}><IoIosArrowBack size={24} /></button>

                <h2 className="text-white text-xl">Personal Details</h2>
              </div>
            </div>
            <div className='pt-4 px-[10vw] mx-10 w-full text-[#4D4D4D] md:pt-0'>
              <div className="w-full px-4 py-6 bg-white ">
                <div className='pt-2 w-full max-w-sm'>
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
            </div>
            <div className="hidden md:flex md:items-end md:w-[15vw]">
        <p className="">
          <img src="/i.png" alt="i" className="h-[30px] w-[30px]"/>
        </p>
      </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}

export default PersonalDetails