import type {Metadata} from 'next';
import {Montserrat} from 'next/font/google';
import React from 'react';
import TanStackProvider from '@/providers/QueryClientProvider';
import '../styles/global.scss';

const inter = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Agona Weather',
  description: 'Find weather information in your city',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </TanStackProvider>
  );
}
