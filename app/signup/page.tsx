'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BeatLoader } from 'react-spinners'; // Import BeatLoader

export default function SignUp() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch('https://backend-orato.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server errors
        setError(data.message || 'Something went wrong. Please try again.');
      } else {
        // Registration successful
        console.log('Registration successful:', data);
        // Redirect to login or dashboard
        router.push('/login'); // Adjust the path as needed
      }
    } catch (err) {
      // Handle network errors
      setError('Network error. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center mb-6'>Sign Up for Orato</h1>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter your name'
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          </div>
          <div className='w-full mt-6'>
            {loading ? (
              <div className='flex justify-center'>
                <BeatLoader color='#1D4ED8' loading={loading} size={10} />
              </div>
            ) : (
              <Button type='submit' className='w-full'>
                Sign Up
              </Button>
            )}
          </div>
        </form>
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
