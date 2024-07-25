"use client";

import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineQuestionMark } from "react-icons/md";
import { Card, Button, Image, Avatar } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const handleSignOut = async() => {
  
    try {
        await  signOut(); 
         window.location.href = '/';
        
    } catch (error) {
        console.error('Sign out failed', error);
    }
};
const Profile = () => {

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0 font-urbanist">
                {/* Custom Heading Container */}
                <div
                    className="w-full max-w-[100vw] h-[100]  bg-[#004BAD] flex-col pt-5 items-center justify-center mb-8 absolute pb-6"
                >
                    <div> <span className="text-[#FCFCFC] text-xl mr-3"><IoIosArrowBack size={24} /></span></div>
                    <div className='flex flex-col items-center justify-center w-104 h-126 '>
                  <Image src='/avatar.png' alt='dp' width={88} height={88}/>
                    
                        <p className='text-[#FCFCFC] pb-2 font-[600px] text-[27px] font-urbanist  '>Siddarth</p>
                    </div>
                </div>
                <div className=" w-full rounded-t-2xl relative top-[13.5rem] bg-[#FCFCFC]">
                    <div className="max-w-sm w-full m-4  max-w-[95vw] p-4 mt-4  rounded-lg bg-whitek">

                        <div className="flex flex-col items-center justify-center w-full space-y-4">
                            <div className="w-full relative  text-[22px]">
                                <div className={`flex gap-4 py-2 rounded-lg black bg-[#FCFCFC]`}>
                                <Image src='/personaldetailicon.png' alt='dp' width={24} height={24} className='m-1'/>
                                    <div>Personal Details</div>
                                </div>
                                <div>
                                    <div className={`flex gap-4  py-2 rounded-lg black`}>
                                    <Image src='/help-square.png' alt='dp' width={24} height={24} className='m-1'/>
                                        <div>Help & Support</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={`flex gap-4 py-2 rounded-lg black`}>
                                    <Image src='/logout-square-01.png' alt='dp' width={24} height={24} className='m-1' onClick={handleSignOut}/>
                                        <div className='text-[#EF4D4D] cursor-pointer ' onClick={handleSignOut}>Log Out</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Profile;