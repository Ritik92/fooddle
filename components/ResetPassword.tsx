// pages/reset-password.tsx
"use client";

import React, { useState } from 'react';
import { Card, Button, Input } from '@nextui-org/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { IoIosArrowBack } from "react-icons/io";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSavePassword = () => {
  if (!newPassword || !confirmPassword) {
    setError('Please fill required fields');
    return;
  }
  setError('');
  // Add your password save logic here
  console.log('Password saved:', newPassword, confirmPassword);
};
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FCFCFC] pt-0">
      {/* Custom Heading Container */}
      <div
        className="w-full max-w-[500px] h-[120px] rounded-bl-lg rounded-br-lg bg-[#004BAD] flex items-center justify-center mb-8 absolute pb-6"
      >
        <div className="flex items-center w-full px-4 pt-16">
          <span className="text-white text-xl mr-3"><IoIosArrowBack size={24}/></span>
          
          <h2 className="text-white text-xl ">Forgot Password</h2>
        </div>
      </div>
     <div className='pt-44 w-full max-w-sm'> 
     <Card className="w-full max-w-sm px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-4 px-2 py-3 text-red-500 border border-red-500 rounded">
            {error}
          </div>
        )}

        {/* Input Fields */}
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
              //placeholder="New Password"
              className={`w-full p-2 border rounded bg-white ${newPassword ? 'border-red-500' : ''}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              endContent={
                <span className="cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <HiEye /> : <HiEyeOff />}
                </span>
              }
            />
            <label
              className={`absolute left-3 top-1 transition-all transform ${newPassword ? 'text-xs -top-3.5' : 'text-sm top-3 pt-2'} px-3`}
            >
              New Password <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
              //placeholder="Confirm New Password"
              className={`w-full p-2 border bg-white ${confirmPassword ? 'border-red-500' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              endContent={
                <span className="cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <HiEye /> : <HiEyeOff />}
                </span>
              }
            />
            <label
              className={`absolute left-3 top-1 transition-all transform ${confirmPassword ? 'text-xs -top-3.5' : 'text-sm top-3 pt-2'} px-3`}
            >
              Confirm New Password <span className="text-red-500">*</span>
            </label>
          </div>

          <Button
            className="w-full bg-[#004BAD] text-white py-2 rounded-3xl hover:bg-blue-600"
            onClick={handleSavePassword}
          >
            Save Password
          </Button>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
