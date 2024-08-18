'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import {NextUIProvider} from '@nextui-org/react'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider >
      <Provider store={store}>
      {children}
  </Provider>,
      
    </NextUIProvider>
    </SessionProvider>
  );
};