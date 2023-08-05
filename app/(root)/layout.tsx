import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import '../globals.css';
import Topbar from '@/components/shared/Topbar';
import Leftbar from '@/components/shared/Leftbar';
import Bottombar from '@/components/shared/Bottombar';
import Rightbar from '@/components/shared/Rightbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tweads',
  description: 'Tweads built by NextJS ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <Topbar />
          <main className="flex flex-row">
            <Leftbar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <Rightbar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
