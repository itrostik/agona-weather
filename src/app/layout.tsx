import type {Metadata} from 'next';
import {Montserrat} from 'next/font/google';
import React from 'react';

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
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
