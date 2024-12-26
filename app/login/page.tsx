'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center mb-6'>Log In to Orato</h1>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type='submit' className='w-full mt-6'>
            Log In
          </Button>
        </form>
        <div className='mt-4 text-center'>
          <Link href='/forgot-password' className='text-sm text-blue-600 hover:underline'>
            Forgot Password?
          </Link>
        </div>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Dont have an account?{' '}
            <Link href='/signup' className='text-blue-600 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
