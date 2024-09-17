"use client";

import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Card, Button, Image, Avatar } from '@nextui-org/react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileHeader = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const BackClickHandle = () => {
        router.push("/");
      };
    return(
        <div
                    className="w-full max-w-[100vw] h-[100]  bg-[#004BAD] flex-col pt-5 items-center justify-center mb-8 absolute pb-6"
                >
                    <div> <span className="text-[#FCFCFC] text-xl mr-3"><IoIosArrowBack  onClick={BackClickHandle} size={24} /></span></div>
                    <div className='flex flex-col items-center justify-center w-104 h-126 '>
                  <Image src='/avatar.png' alt='dp' width={88} height={88}/>
                    
                        <p className='text-[#FCFCFC] pb-2 font-[600px] text-[27px] font-urbanist  '> {status === "authenticated" && session?.user?.name ? session.user.name : ""} </p>
                    </div>
                </div>
    );

}

export default ProfileHeader