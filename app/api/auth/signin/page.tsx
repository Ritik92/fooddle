"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/router';


const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-[#EAF3FF]">
      <div className="flex-grow flex flex-col">
        <div className="hidden md:block p-3  md:ml-3 mt-1 ">
          <Image src="/logo.png" alt="Foodle logo" width={128} height={55} className="w-24 md:w-32" />
        </div>
          <div className="block bg-[#004BAD] md:hidden h-[14.75rem] flex items-center justify-center md:ml-3">
             <Image src="/logo2.png" alt="Foodle logo" width={150} height={63} className=" md:w-32" />
          </div>
        <div className="flex flex-col md:flex-row flex-grow">
          <div className="hidden md:block md:basis-1/2 relative">
            <div className="absolute top-[30px] left-[10%] lg:left-[20%]">
              <Image src="/food-illustration.png" alt="Food illustration" width={360} height={341.48} className="w-full max-w-[360px]" />
              <div className="">
                <Image src="/Group 59459.png" alt="Transforming Campus Dining" width={310} height={155} className="w-full max-w-[310px] ml-8" />
              </div>
            </div>
          </div>
          <div className="md:basis-1/2 flex items-center justify-center p-4 md:p-0">
            <div className="bg-blue md:bg-white  absolute top-[11rem]  md:static  lg:mt-10 rounded-xl  w-full md:max-w-md overflow-hidden">
              <div className="flex ">
                <button
                  className={`flex-1 py-4 text-lg font-semibold  ${isLogin ? 'text-[#004BAD] bg-white rounded-t-xl ' : 'text-white bg-[#004BAD] md:text-[#4D4D4D] md:bg-white font-urbanist'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-4 text-lg font-semibold ${!isLogin ? 'text-[#004BAD]  bg-white rounded-t-xl' : 'text-white md:text-[#4D4D4D] bg-[#004BAD] md:bg-white font-urbanist'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {isLogin ? <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block text-center text-sm text-gray-600 mt-4 mb-4 ">
        Need help? <a href="#" className="text-blue-600">Contact Us</a> for support.
      </div>
    </div>
  );
};


const LoginForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = () => {
    
    if (email.endsWith('@thapar.edu')) {
      window.location.href='/forgotpassword';
    } else {
      setError('Please enter an  valid email  to reset password.');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@thapar.edu')) {
      setError('Please use a valid Thapar email address.');
      return;
    }

    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials. Please try again.');
    } else if (result?.ok) {
      window.location.href = '/';
    }
  };
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        className="w-full p-3 border rounded-md " 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
     <div className="relative">
      <input 
        type={showPassword ? "text" : "password"}
        placeholder="Password" 
        className="w-full p-3 border rounded-md pr-10" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button 
        type="button" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <Image src="/eyeshow.svg" alt="eyehide" width={20} height={20} className="mr-2" />
      : <Image src="/eyehide.svg" alt="eyeshow" width={20} height={20} className="mr-2" />
    }
      </button>
    </div>
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
      <div className="text-right">
        
        <a href="#" onClick={handleForgotPassword} className="text-sm text-blue-600">Forgot Password?</a>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700  transition-colors">Login</button>
      <div className="relative text-center">
        <hr className="my-4" />
        <span className="bg-white px-2 text-sm text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">OR</span>
      </div>
      <button type="button" onClick={handleGoogleSignIn} className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Image src="/google logo.png" alt="Google logo" width={20} height={20} className="mr-2" />
        Log in with Google
      </button>
      <p className="text-center text-sm ">
        Don't have an account yet? <button type="button" onClick={toggleForm} className="text-blue-600 hover:underline">Sign up</button>
      </p>
    </form>
  );
};

const SignupForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@thapar.edu')) {
      setError('Please use a valid Thapar email address.');
      return;
    }

    // call an API to register the user
    console.log('Registration submitted:', { email, password });
    // After successful registration
    // or redirect them to the home page
    window.location.href = '/';
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        className="w-full p-3 border rounded-md" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
     <div className="relative">
      <input 
        type={showPassword ? "text" : "password"}
        placeholder="Password" 
        className="w-full p-3 border rounded-md pr-10" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button 
        type="button" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <Image src="/eyeshow.svg" alt="eyehide" width={20} height={20} className="mr-2" />
      : <Image src="/eyehide.svg" alt="eyeshow" width={20} height={20} className="mr-2" />
    }
      </button>
    </div>
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
      <button type="submit"  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-urbanist">Sign Up</button>
      <div className="relative text-center">
        <hr className="my-4" />
        <span className="bg-white px-2 text-sm text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">OR</span>
      </div>
      <button type="button" onClick={handleGoogleSignIn} className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Image src="/google logo.png" alt="Google logo" width={20} height={20} className="mr-2" />
        Signup with Google
      </button>
      <p className="text-center text-sm">
        Already have an account? <button type="button" onClick={toggleForm} className="text-blue-600 hover:underline">Log in</button>
      </p>
    </form>
  );
};

export default SignIn;