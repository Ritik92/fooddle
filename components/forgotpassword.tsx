"use client";




import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const ForgotPassword = ({email}) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  const [timer, setTimer] = useState<number>(120);
    
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className=" bg-[#FCFCFC]   min-h-screen
      md:bg-[#EAF3FF] md:justify-center md:flex md:items-center">
      {/*Foodle logo*/}
      <div className=' absolute left-1 top-1'>
      <Image
        src="/Foodle-logo.png"
        alt="logo"
        className="w-[128px] h-[55px]  hidden md:block"
      />
      </div>
     
      <div className="flex ">
      {/* Heading Container for larger screens */}
      <div className="flex  items-center  md:w-1/2">
        <Image
          src="/check-mail.png"
          alt="Check your mail"
          className="w-[357.17px] h-[259.68px]   hidden md:block"
        />
      </div>
      <div className="w-full h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center  mb-8 absolute md:hidden">

        <div className="flex items-center w-full px-4 pt-16">
          <button
            className="text-white mr-4 hover:bg-[#1a1c1e] rounded-full p-2"
            onClick={handleBackClick}
          >
            <IoIosArrowBack size={24} />
          </button>
          <h2 className="text-white text-xl ">Forgot Password</h2>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center mt-52 md:mt-0">
        <div className="max-w-sm  w-full rounded-2xl bg-[#FCFCFC] md:w-50 md:max-w-xl md:h-[28rem]">
          <div className="hidden md:flex w-full max-w-[500px] md:max-w-none md:w-[100%] lg:w-[100%] h-[120px] bg-[#004BAD] rounded-t-2xl items-center justify-center mb-8 md:h-24 md:mb-14 ">
            <div className="flex items-center w-full px-4 pt-16 md:pt-0">
              <button
                className="text-white mr-4 hover:bg-[#003b8c] rounded-full p-2"
                onClick={handleBackClick}
              >
                <IoIosArrowBack size={24} />
              </button>
              <h2 className="text-white text-2xl">Forgot Password</h2>
            </div>
          </div>
          <Image
            src="/check-mail.png"
            alt="Check your mail"
            className="w-full h-48 object-cover mt-4 px-14 md:hidden"
          />
          <div className="px-4 pb-4">
            <p className="text-center mt-4 mb-2 text-lg md:mb-8 md:text-xl">
              We have sent you an activation email.
            </p>
            <p className="text-center mb-6 text-sm md:text-lg md:mb-10">
              An email has been sent to {email} with a link to reset
              your password. Check your inbox!
            </p>
            <p className="text-center mb-4 text-xs md:text-sm md:mb-6">
              The link expires in {formatTime(timer)}.
            </p>
            <Button
              className="w-full bg-[#004BAD] text-white rounded-3xl hover:bg-blue-600 py-1 md:text-lg md:h-14 md:rounded-full"
              onClick={() => window.open("https://mail.google.com", "_blank")}
            >
              Open Mail
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
