import React from 'react';
import "./globals.css";
import { Montserrat, Open_Sans, Fira_Code } from 'next/font/google'; 
import { siteConfig } from '@/config/site';
import { Analytics } from '@vercel/analytics/react';

// Configure Montserrat for headings - Transformation & Educational Authority
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat', 
  weight: ['400', '500', '600', '700'] 
});

// Configure Open Sans for body/UI - Clarity & Approachability
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans', 
  weight: ['400', '500', '600', '700'] 
});

// Configure Fira Code for code blocks - Technical Precision
const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700']
});

import Header from '../components/Layout/Header'; 
import Footer from '../components/Layout/Footer'; 

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - AI Strategy & Implementation Specialists`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} - AI Strategy & Implementation | Genesis Engine`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} ${firaCode.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground dark:bg-background dark:text-foreground">
        <Header />
        {/* Remove top padding to eliminate the white space */}
        <main>{children}</main> 
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
