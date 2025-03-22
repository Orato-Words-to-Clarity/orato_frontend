'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiBars3, HiOutlineXMark } from 'react-icons/hi2';

export default function DashboardHeader() {
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    const AT = localStorage.getItem('access_token');
    if (AT) {
      setAlreadyLoggedIn(true);
    } else {
      setAlreadyLoggedIn(false);
    }
  }, []);

  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
        <Link href={'/'}>
          <h1 className='text-2xl font-bold text-gray-900 cursor-pointer'>Orato</h1>
        </Link>
        {alreadyLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <User className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuSeparator />
              <Link href='/dashboard'>
                <DropdownMenuItem>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href='/profile'>
                <DropdownMenuItem>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => handleLogout()}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <nav className={`md:flex space-x-6 hidden`}>
              <Link
                href='/login'
                className='font-roboto font-medium text-lg text-gray-600 hover:text-blue-600 hover:underline'
              >
                Login
              </Link>
              <Link
                href='/signup'
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
                {isNavOpen ? (
                  <HiOutlineXMark className='w-6 h-6' />
                ) : (
                  <HiBars3 className='w-6 h-6' />
                )}
              </motion.div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
