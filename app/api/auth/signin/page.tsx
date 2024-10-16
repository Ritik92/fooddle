'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function SignInContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [googleSignInError, setGoogleSignInError] = useState('');
  const searchParams = useSearchParams();
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  useEffect(() => {
    if (clientRendered) {
      const error = searchParams.get('error');
      if (error === 'AccessDenied') {
        setGoogleSignInError('Please use Thapar Email to Login');
      }
    }
  }, [clientRendered, searchParams]);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-[#EAF3FF]">
     <Toaster position="top-center" reverseOrder={false} />
     <div className="flex-grow flex flex-col">
        <div className="hidden md:block p-3 md:ml-3 mt-1 ">
          <Image src="/logo.png" alt="Foodle logo" width={128} height={55} className="w-24 md:w-32" />
        </div>
        <div className="bg-[#004BAD] md:hidden h-[14.75rem] flex items-center justify-center md:ml-3">
          <Image src="/logo2.png" alt="Foodle logo" width={150} height={63} className="md:w-32" />
        </div>
        <div className="flex flex-col md:flex-row flex-grow">
          <div className="hidden md:basis-1/2 md:grid md:mt-8 items-center justify-center relative">
            <div className="">
              <Image src="/food-illustration.png" alt="Food illustration" width={360} height={341.48} className="w-full max-w-[360px]" />
              <div className="">
                <Image src="/Group 59459.png" alt="Transforming Campus Dining" width={310} height={155} className="w-full max-w-[310px] ml-8" />
              </div>
            </div>
          </div>
          <div className="md:basis-1/2 flex items-center justify-center p-4 md:p-0">
            <div className="bg-blue md:bg-white absolute top-[11rem] md:static lg:mt-10 rounded-xl w-full md:max-w-md overflow-hidden">
              <div className="flex ">
                <button
                  className={`flex-1 py-4 font-semibold text-[27px] ${isLogin ? 'text-[#004BAD] bg-white rounded-t-xl ' : 'text-white bg-[#004BAD] md:text-[#4D4D4D] md:bg-white '}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-4 text-[27px] font-semibold ${!isLogin ? 'text-[#004BAD] bg-white rounded-t-xl' : 'text-white md:text-[#4D4D4D] bg-[#004BAD] md:bg-white t'}`}
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
              {googleSignInError && (
                <div className="text-red-500 text-sm pb-3 text-center">{googleSignInError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block text-center text-sm text-gray-600 mt-4 mb-4 ">
        Need help? <a href="#" className="text-blue-600">Contact Us</a> for support.
      </div>
      
    </div>
  );
}

const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = async () => {
    if (email.endsWith('@thapar.edu')) {
      try {
        const res = await axios.get(`/api/validateEmail?email=${email}`);
        if (res.status === 200) window.location.href = `/forgotpassword?email=${email}`;
      } catch (error) {
        setError('User Does Not Exist');
        toast.error('User does not exist');
      }
    } else {
      setError('Please enter a valid email to reset password.');
      toast.error('Please enter a valid Thapar email to reset password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const loadingToast = toast.loading('Logging in...');

    try {
      const result = await signIn('credentials', {
        username: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        toast.error('Invalid credentials', { id: loadingToast });
      } else if (result?.ok) {
        toast.success('Logged in successfully', { id: loadingToast });
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error) {
      toast.error('An error occurred', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

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
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="button-spinner -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
            Logging in...
          </>
        ) : 'Login'}
      </button>
      <div className="relative text-center">
        <hr className="my-4" />
        <span className="bg-white px-2 text-sm text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">OR</span>
      </div>
      <button type="button" onClick={handleGoogleSignIn} className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Image src="/google logo.png" alt="Google logo" width={20} height={20} className="mr-2" />
        Log in with Google
      </button>
      <p className="text-center text-sm ">
      Don&apos;t have an account yet? <button type="button" onClick={toggleForm} className="text-blue-600 hover:underline">Sign up</button>
      </p>
    </form>
  );
};
const SignupForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const loadingToast = toast.loading('Signing up...');

    try {
      const response = await axios.post('/api/signup', {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Please check your email for a verification link.', { id: loadingToast });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      toast.error('Sign up failed. Please try again.', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

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
      <button 
        type="submit"  
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-urbanist flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
          <svg className="button-spinner -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
            Signing up...
          </>
        ) : 'Sign Up'}
      </button>
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

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}