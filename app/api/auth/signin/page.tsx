// app/auth/signin/page.tsx

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';

export default function SignIn() {
  
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

    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials. Please try again.');
    }
    else if (result?.ok) {
    window.location.href = '/';  
  }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900 p-4 ">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='m-4'>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='py-4'>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
          <Button 
            type='submit'
            color="primary"
            size="lg"
            className="font-semibold group relative w-full flex justify-center m-4"
          >
            Submit
          </Button>
          </div>
        </form>
          <div>

          </div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm p-2">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
            
          <div className="mt-6">
            <Button size='lg' variant='bordered'
              onClick={handleGoogleSignIn}
              className=" group relative w-full flex justify-center m-4"  >
              <Image
                src="/google-logo.png"
                alt="Google logo"
                width={30}
                height={30}
                className="mr-2"
              />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}