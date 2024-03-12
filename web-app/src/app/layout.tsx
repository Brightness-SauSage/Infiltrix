import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google';
import { Merriweather } from 'next/font/google';
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
})

const merriweather = Merriweather({
  weight: ['400', '300'],
  subsets: ['latin'],
  variable: '--font-merriweather',
})

const inter= Inter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: "Infiltrix",
  description: "Message Spam Detector",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${roboto.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
