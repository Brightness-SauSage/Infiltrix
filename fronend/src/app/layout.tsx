import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from 'next/font/google';
import { Merriweather } from 'next/font/google';
import NavBar from './components/NavBar'; // Import NavBar component
import Footer from './components/Footer'; // Import Footer component
import './globals.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
});

const merriweather = Merriweather({
  weight: ['400', '300'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inter',
});

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
      <body className={`${merriweather.variable} ${roboto.variable} ${inter.variable}`}>
        <NavBar /> 
        {children}
        <Footer /> 
      </body>
    </html>
  );
}
