'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BeatLoader } from 'react-spinners';
import { authLogin } from '@/api/auth';
import { CredentialDataType } from '../types';

export default function Login() {
  const [credData,setcredData] = useState<CredentialDataType>({
    email:'',
    password:'', })
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [error,setError]= useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleCred = (key: keyof CredentialDataType, value: string) => {
    setcredData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleSubmit = () => {
    // e.preventDefault();
       setIsLoading(true);
    // setTimeout(() => {
    //   console.log('Login attempt with:', { email, password });
    //   router.push('/');
    //   setIsLoading(false);
    // }, 2000);
    
    authLogin(credData,setError,setIsLoading)
  };


  if (!mounted) {
    return null;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center mb-6'>Log In to Orato</h1>
    
          <div className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={credData.email}
                onChange={(e) => handleCred('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={credData.password}
                onChange={(e) => handleCred('password', e.target.value)}
                required
              />
            </div>
          </div>
          <div className='w-full mt-6'>
            {isLoading ? (
              <div className='flex justify-center'>
                <BeatLoader color='#1D4ED8' loading={isLoading} size={10} />
              </div>
            ) : (
              <>
                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
                <Button type='submit' className='w-full' onClick={handleSubmit}>
                  Log In
                </Button>
              </>
            )}
          </div>
        {/* </form> */}
        <div className='mt-4 text-center'>
          <Link href='/forgot-password' className='text-sm text-blue-600 hover:underline'>
            Forgot Password?
          </Link>
        </div>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-blue-600 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
