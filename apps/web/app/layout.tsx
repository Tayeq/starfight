import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './app.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Star Fight',
  description: 'Wich side is stronger?',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
