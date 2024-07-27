"use client";

import React from "react";
import { Card, Button, Image, Avatar } from '@nextui-org/react';

const ProfileButtons = () => {

    return(

        <>
            
                    <div className="max-w-sm w-full m-4  max-w-[95vw] p-4 mt-4  rounded-lg bg-whitek">

                        <div className="flex flex-col items-center justify-center w-full space-y-4">
                            <div className="w-full relative  text-[22px]">
                                <div className={`flex gap-4 py-2 rounded-lg black bg-[#FCFCFC]`}>
                                <Image src='/personaldetailicon.png' alt='dp' width={24} height={24} className='m-1'/>
                                    <button>Personal Details</button>
                                </div>
                                <div>
                                    <div className={`flex gap-4  py-2 rounded-lg black`}>
                                    <Image src='/help-square.png' alt='dp' width={24} height={24} className='m-1'/>
                                        <button>Help & Support</button>
                                    </div>
                                </div>
                                <div>
                                    <div className={`flex gap-4 py-2 rounded-lg black`}>
                                    <Image src='/logout-square-01.png' alt='dp' width={24} height={24} className='m-1'/>
                                        <button className='text-[#EF4D4D]'>Log Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
        </>

    );

}

export default ProfileButtons