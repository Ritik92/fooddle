// pages/forgot-password.js
"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';

const ForgotPassword = () => {
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
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0">
      {/* Custom Heading Container */}
      <div
        className="w-full max-w-[500px] h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center justify-center mb-8 absolute  "
      >
        <div className="flex items-center w-full px-4 pt-16">
        <span className="text-white text-xl mr-3"><IoIosArrowBack size={24}/></span>
          <h2 className="text-white text-xl ">Forgot Password</h2>
        </div>
      </div>
      
      {/* Card Component */}
      <div className="flex-grow flex items-center justify-center">
        <Card className="max-w-sm w-full p-4 mt-11  rounded-lg bg-[#FCFCFC]">
          <Image
            src="/check-mail.png" // Ensure this image is in your public folder
            alt="Check your mail"
            className="w-full h-48 object-cover mt-4 px-10"
          />
          <p className="text-center mt-4 mb-2 text-lg">
          We have sent you an activation email.
          </p>
          <p className="text-center mb-6 text-sm">
          An email has been sent to email@example.com with a link to reset your password. Check your inbox!
          </p>
          <p className="text-center mb-4 text-xs">
            The link expires in {formatTime(timer)}.
          </p>
          <Button
            className="w-full bg-[#004BAD] text-white py-2 rounded-3xl hover:bg-blue-600"
            onClick={() => window.open('https://mail.google.com', '_blank')}
          >
            Open Mail
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
