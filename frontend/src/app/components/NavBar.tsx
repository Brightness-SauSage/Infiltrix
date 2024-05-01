"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  return (
    <div className="navbar bg-gray-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-96"
          >
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/train">Train our model</Link>
            </li>
          </ul>
        </div>
        <a className="logo text-xl navbar-center text-black">Infiltrix</a>
      </div>
      {/*
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 text-black">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/train">Train our model</Link>
          </li>
        </ul>
      </div>
  */}
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal px-1 text-black">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/train">Train our model</Link>
          </li>
        </ul>
        {/*
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Model Version 1.1.1.2</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a>1.1.1.1</a>
                </li>
                <li>
                  <a>1.1.1.0</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
  */}
      </div>
    </div>
  );
}
