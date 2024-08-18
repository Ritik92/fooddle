"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const DotLottieReact = dynamic(() => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact), { ssr: false });

export default function OrderConfirm() {
  const [isClient, setIsClient] = useState(false);
    const router=useRouter();

  useEffect(() => {
    setIsClient(true);
    setTimeout(()=>{router.push('/note')},3000)
  }, []);

  if (!isClient) {
    return null; // Or return a loading spinner
  }

  return (
    <div className='flex items-center justify-center h-screen'>
         <DotLottieReact
      src="https://lottie.host/4f806c6a-0425-4ed0-8920-2953a579810c/Z6LE7AXB72.lottie"
      loop
      style={{ width: '300px', height: '300px' }}
      autoplay
    />
    </div>
 
  );
}
