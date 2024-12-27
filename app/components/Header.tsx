'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiBars3, HiOutlineXMark } from 'react-icons/hi2';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <header className='fixed w-full bg-white shadow-sm z-10'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <Link href='/' className='font-poppins font-bold text-2xl tracking-wide text-gray-800'>
            Orato
          </Link>
          <nav className={`md:flex space-x-6 hidden`}>
            <Link
              href='/login'
              className='font-roboto font-medium text-lg text-gray-600 hover:text-blue-600 hover:underline'
            >
              Login
            </Link>
            <Link
              href='/'
              className='font-roboto font-medium text-lg text-gray-600 hover:text-blue-600 hover:underline'
            >
              Sign Up
            </Link>
          </nav>
          <button className='md:hidden' onClick={toggleNav}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isNavOpen ? 90 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isNavOpen ? <HiOutlineXMark className='w-6 h-6' /> : <HiBars3 className='w-6 h-6' />}
            </motion.div>
          </button>
        </div>
      </header>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isNavOpen ? 'auto' : 0 }}
        transition={{ duration: 0.5 }}
        className='overflow-hidden md:hidden bg-white shadow-sm mt-[65px]'
      >
        <nav className='space-y-4 py-4'>
          <Link
            href='/'
            className='block font-roboto font-medium text-lg text-gray-600 hover:text-blue-600 hover:underline'
          >
            Login
          </Link>
          <Link
            href='/'
            className='block font-roboto font-medium text-lg text-gray-600 hover:text-blue-600 hover:underline'
          >
            Sign Up
          </Link>
        </nav>
      </motion.div>
    </>
  );
}
