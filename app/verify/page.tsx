'use client';

import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function RegistrationHandlerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    async function handleRegistration() {
      if (!token) {
        console.error('No token provided');
        router.push('/error?message=Invalid token');
        return;
      }

      try {
        // Call your API to create the user
        const response = await fetch(`/api/verify?token=${token}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }

        const data = await response.json();

        // Sign in the user
        const result = await signIn('credentials', {
            username: data.email,
            password: data.password,
            redirect: false,
          });
      
          if (result?.error) {
            console.log('Invalid credentials. Please try again.');
          } else if (result?.ok) {
            window.location.href = '/';
          }
      } catch (error) {
        console.error('Registration error:', error);
        router.push('/error?message=Registration failed');
      }
    }

    handleRegistration();
  }, [token, router]);

  return <div>Processing your registration...</div>;
}
export default function RegistrationHandler() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationHandlerContent />
    </Suspense>
  );
}