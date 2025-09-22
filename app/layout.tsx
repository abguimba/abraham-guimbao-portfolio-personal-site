import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Abraham Guimbao',
  description: "Abraham Guimbao's Personal Site",
  keywords: [
    'SRE',
    'Site Reliability Engineer',
    'Infrastructure',
    'DevOps',
    'Cloud',
    'Platform Engineer',
  ],
  authors: [{ name: 'Abraham Guimbao' }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>',
  },
  openGraph: {
    title: 'Abraham Guimbao',
    description: "Abraham Guimbao's Personal Site",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abraham Guimbao',
    description: "Abraham Guimbao's Personal Site",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${GeistSans.className} ${inter.variable} bg-background text-foreground`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
