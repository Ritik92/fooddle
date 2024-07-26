"use client";

import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileButtons from './ProfileButtons';

const Profile = () => {

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0 font-urbanist">
                {/* Custom Heading Container */}
                <ProfileHeader/>
                <div className=" w-full rounded-t-2xl relative top-[13.5rem] bg-[#FCFCFC]">
                <ProfileButtons/>
                </div>
                
                
            </div>


        </>
    );
}

export default Profile;