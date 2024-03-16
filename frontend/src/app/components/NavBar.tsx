'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  
  return (

    <div className="navbar rounded-box bg-gray-100 glass">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-96">
        <li>
          <Link href="/">Home</Link>
        </li>
        
        <li>
        <Link href="/train">Train our model</Link>
        </li>
      </ul>
    </div>
    <a className="logo text-xl navbar-center">Infiltrix</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li>
          <Link href="/">Home</Link>
        </li>
        
        <li>
        <Link href="/train">Train our model</Link>
        </li>
    </ul>
  </div>
  <div className="navbar-end">
  <button className="btn btn-neutral hidden md:block">Contact us</button>
  </div>
  </div>

    /*
    <div className="p-4 bg-gray-50 shadow">
      <div className="flex items-center justify-between">
      <div className="block md:hidden dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>

        <div className="logo">Infiltrix</div>

        <nav className="hidden md:block">
          <ul className="md:flex md:items-center">
            <li className="navLi"><a href="#">Home</a></li>
            <li className="navLi"><a href="#">About</a></li>
            <li className="navLi"><a href="#">Contact</a></li>
          </ul>
        </nav>

        <div className="pr-4">
          <div className="btn1 hidden md:block">Contact Us</div>
        </div>
      </div>
    </div>
{*/
  
  );
}
