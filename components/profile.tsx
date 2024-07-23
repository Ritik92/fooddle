"use client";

import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineQuestionMark } from "react-icons/md";
import { Card, Button, Image } from '@nextui-org/react';

const Profile = () => {

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0">
                {/* Custom Heading Container */}
                <div
                    className="w-full max-w-[100vw] h-[100] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex-col pt-5 items-center justify-center mb-8 absolute pb-6"
                >
                    <div> <span className="text-white text-xl mr-3"><IoIosArrowBack size={24} /></span></div>
                    <div className='flex flex-col items-center justify-center w-104 h-126'>
                        <img src="https://via.placeholder.com/150"
                            alt="profile image"
                            className="rounded-full w-32 h-50 object-cover"></img>
                        <p>User Name</p>
                    </div>
                </div>
                <div className="flex-grow flex items-center justify-center w-full">
                    <Card className="max-w-sm w-full  max-w-[95vw] p-4 mt-11  rounded-lg bg-[#FCFCFC]">

                        <div className="flex flex-col items-center justify-center w-full space-y-4">
                            <div className="w-full relative">
                                <div className={`flex gap-4 py-2 rounded-lg black`}>
                                    <IoMdContact className='shrink-0 self-start w-6 aspect-square' />
                                    <div>Personal Details</div>
                                </div>
                                <div>
                                    <div className={`flex gap-4 py-2 rounded-lg black`}>
                                        <MdOutlineQuestionMark className='shrink-0 self-start w-6 aspect-square' />
                                        <div>Help & Support</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={`flex gap-4 py-2 rounded-lg black`}>
                                        <FaSignOutAlt className='shrink-0 self-start w-6 aspect-square' />
                                        <div>Log Out</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>


        </>
    );
}

export default Profile;