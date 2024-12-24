import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-gray-300 py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div>
            <h3 className='font-roboto font-bold text-lg mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='hover:text-white hover:underline'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/' className='hover:text-white hover:underline'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='/' className='hover:text-white hover:underline'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='/' className='hover:text-white hover:underline'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-roboto font-bold text-lg mb-4'>Connect With Us</h3>
            <div className='flex space-x-4'>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-blue-400'
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-blue-400'
              >
                <FaTwitter size={32} />
              </a>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-blue-400'
              >
                <FaGithub size={32} />
              </a>
            </div>
          </div>
          <div>
            <p className='font-roboto text-sm'>&copy; 2024 Orato. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
