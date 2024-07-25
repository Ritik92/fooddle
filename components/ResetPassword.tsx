// pages/reset-password.tsx
"use client";

import React, { useState } from "react";
import { Card, Button, Input, Image } from "@nextui-org/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill required fields");
      return;
    }
    setError("");
    // Add your password save logic here
    console.log("Password saved:", newPassword, confirmPassword);
  };
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/login");
  };

  return (
    <div
      className=" bg-[#FCFCFC]   min-h-screen
      md:bg-[#EAF3FF] md:justify-between"
    >
      {/*Foodle logo*/}
      <Image
        src="/Foodle-logo.png"
        alt="logo"
        className="w-full h-20 position-fixed object-cover hidden md:block"
      />
      <div className="hidden md:pt-20 md:block position-relative md:px-72">
        {error && (
          <div className="mb-4 px-2 py-3 text-red-500 border border-red-500 rounded hidden md:block">
            {error}
          </div>
        )}
      </div>
      <div className="flex flex-col md:mt-28 md:flex-row md:justify-between md:px-16 lg:pt-8">
        {/* Heading Container for larger screens */}
        <div className="flex justify-center md:w-1/2">
          <Image
            src="/check-mail.png"
            alt="Check your mail"
            className="w-full h-72 object-cover mt-14 px-6 hidden md:block"
          />
        </div>
        <div className="w-full h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center justify-center mb-8 absolute md:hidden">
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
          <div className="max-w-sm  w-full rounded-lg bg-[#FCFCFC] md:w-50 md:max-w-xl md:h-[26rem] ">
            <div className="hidden md:flex w-full max-w-[500px] md:max-w-none md:w-[100%] lg:w-[100%] h-[120px] bg-[#004BAD] items-center justify-center mb-8 md:h-24 md:mb-14 ">
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
            {/* Error Message */}
            <div className="px-4 pt-4 md:hidden">
              {error && (
                <div className="mb-4 px-2 py-3 text-red-500 border border-red-500 rounded md:hidden">
                  {error}
                </div>
              )}
            </div>

            {/* Input Fields */}
            <div className="flex flex-col items-center justify-center space-y-5 w-full p-4  md:px-4 md:space-y-8 md:p-0">
              <div className="w-full relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className={`w-full p-2 border rounded  bg-white ${
                    newPassword ? "border-red-500" : ""
                  }`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  endContent={
                    <span
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <HiEye /> : <HiEyeOff />}
                    </span>
                  }
                />
                {newPassword && (
                  <label
                    className={`absolute left-1.5 top-1 transition-all transform ${
                      newPassword
                        ? "text-xs -top-3.5 md:-top-5"
                        : "text-sm top-3 pt-2"
                    } px-3`}
                  >
                    New Password
                  </label>
                )}
              </div>

              <div className="w-full relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className={`w-full p-2 border bg-white ${
                    confirmPassword ? "border-red-500" : ""
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  endContent={
                    <span
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <HiEye /> : <HiEyeOff />}
                    </span>
                  }
                />
                {confirmPassword && (
                  <label
                    className={`absolute left-1.5 top-1 transition-all transform ${
                      confirmPassword
                        ? "text-xs -top-3.5 md:-top-5"
                        : "text-sm top-3 pt-2"
                    } px-3`}
                  >
                    Confirm Password
                  </label>
                )}
              </div>

              <Button
                className="w-full bg-[#004BAD] text-white rounded-3xl hover:bg-blue-600 py-1 md:text-lg md:h-14 md:rounded-full"
                onClick={handleSavePassword}
              >
                Save Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
