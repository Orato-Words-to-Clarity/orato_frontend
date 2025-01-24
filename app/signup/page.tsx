 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BeatLoader } from 'react-spinners';
import { SignupDataType } from '../types';
import {  authSignup } from '@/api/auth';
 

export default function SignUp() {
  const [signData,setsignData] = useState<SignupDataType>({
    username:'',
    email: '',
    password:'',
  })
  const [mounted, setMounted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleSign =(key: keyof SignupDataType,value: string)=>{
      setsignData((prevData) =>({
        ...prevData,
        [key]: value,
      }));
  };
  const handleSubmit = async () => {
    

    if (signData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    authSignup(signData,setError,setLoading)
    
    // try {
    //   const data = await signup(email, username, password);

    //   if (data.error) {
    //     setError(data.message || 'Something went wrong. Please try again.');
    //   } else {
    //     router.push('/login');
    //   }
    // } catch (err) {
    //   setError('Network error. Please try again later.');
    //   console.error('Error:', err);
    // } finally {
    //   setLoading(false);
    // }
  };
  if (!mounted) {
    return null;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center mb-6'>Sign Up for Orato</h1>
        
          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter your name'
                value={signData.username}
                onChange={(e) => handleSign('username',e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={signData.email}
                onChange={(e) => handleSign('email',e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={signData.password}
                onChange={(e) => handleSign('password',e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
          </div>
          <div className='w-full mt-6'>
            {loading ? (
            <div className='flex justify-center'>
                <BeatLoader color='#1D4ED8' loading={loading} size={10} />
            </div>
            ) : (
              <>
                <p className='text-red-500 text-sm mt-2'>{error}</p>
                <Button type='submit' className='w-full' onClick={handleSubmit}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-600 hover:underline'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
