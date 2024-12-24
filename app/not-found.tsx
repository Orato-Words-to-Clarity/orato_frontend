import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-gray-900'>
            Orato
          </Link>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <Link
                  href='/'
                  className='text-base font-medium text-gray-700 hover:text-gray-900 hover:underline'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/dashboard'
                  className='text-base font-medium text-gray-700 hover:text-gray-900 hover:underline'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='text-base font-medium text-gray-700 hover:text-gray-900 hover:underline'
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className='flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl w-full space-y-8 text-center'>
          <h1 className='text-5xl sm:text-6xl font-bold text-gray-900'>404 — Page Not Found</h1>
          <p className='text-xl text-gray-600'>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button asChild className='text-lg py-6 px-8 transition-transform hover:scale-105 '>
              <Link href='/dashboard'>Go to Dashboard</Link>
            </Button>
            <Button
              asChild
              variant='secondary'
              className='text-lg py-6 px-8 transition-transform hover:scale-105'
            >
              <Link href='/contact'>Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className='bg-white py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center'>
          <div className='mb-4 sm:mb-0'>
            <Link href='/' className='text-sm text-gray-600 hover:text-gray-900 mr-4'>
              Privacy Policy
            </Link>
            <Link href='/' className='text-sm text-gray-600 hover:text-gray-900'>
              Terms of Service
            </Link>
          </div>
          <div className='flex space-x-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900'
            >
              <Facebook size={20} />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900'
            >
              <Twitter size={20} />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900'
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
