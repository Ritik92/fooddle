"use client";

import React, { useState } from "react";
import { Image } from '@nextui-org/react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileButtons = () => {
    const router = useRouter();
    const [clickedIcon1, setClickedIcon1] = useState(false);
    const [clickedIcon2, setClickedIcon2] = useState(false);

    function handlePersonalDetails() {
       
        router.push('/personaldetails');
        setClickedIcon1(true);
        setClickedIcon2(false);
    }

    function handleSupportClick() {
        router.push('/support');
        setClickedIcon2(true);
        setClickedIcon1(false);
    }

    const handleSignOut = () => {
        signOut({
            callbackUrl: '/'  // Redirect to the homepage after sign out
        });
    };

    return (
        <div className="max-w-sm w-full m-4 max-w-[95vw] p-4 mt-4 rounded-lg bg-whitek">
            <div className="flex flex-col items-center justify-center w-full space-y-4">
                <div className="w-full relative text-[22px]">
                    <div className={`flex gap-4 py-2 rounded-lg black bg-[#FCFCFC] ${clickedIcon1 ? 'border-l-4 border-blue-500' : ''}`}>
                        <Image src='/personaldetailicon.png' alt='dp' width={24} height={24} className='m-1' />
                        <button onClick={handlePersonalDetails}>Personal Details</button>
                    </div>
                    <div>
                        <div className={`flex gap-4 py-2 rounded-lg black ${clickedIcon2 ? 'border-l-4 border-blue-500' : ''}`}>
                            <Image src='/help-square.png' alt='dp' width={24} height={24} className='m-1' />
                            <button onClick={handleSupportClick}>Help & Support</button>
                        </div>
                    </div>
                    <div>
                        <div className={`flex gap-4 py-2 rounded-lg black`}>
                            <Image src='/logout-square-01.png' alt='dp' width={24} height={24} className='m-1' />
                            <button className='text-[#EF4D4D]' onClick={handleSignOut}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileButtons;
