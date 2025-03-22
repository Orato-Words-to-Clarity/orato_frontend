'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mic, Globe, Search, Key, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardHeader from './components/dashboardHeader';

export default function LandingPage() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className='w-full bg-[#f0f1f1]'>
        <DashboardHeader />
        <main className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Hero Section */}
          <section className='container mx-auto px-4 py-16 md:py-24'>
            <div className='grid items-center gap-8 md:grid-cols-2'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='flex flex-col space-y-6'
              >
                <h1 className='text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
                  Turn Conversations into Clarity
                </h1>
                <p className='text-lg text-gray-600 md:text-xl'>
                  Transcribe your audio and interact with it using powerful AI-driven search and
                  chat.
                </p>
                <div className='flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0'>
                  <Button asChild size='lg' className='group'>
                    <Link href='/dashboard'>
                      Get Started
                      <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </Link>
                  </Button>
                  <Button variant='outline' size='lg' onClick={scrollToFeatures} className='group'>
                    Learn More
                    <ChevronDown className='ml-2 h-4 w-4 transition-transform group-hover:translate-y-1' />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='flex justify-center'
              >
                <div className='relative h-[300px] w-full max-w-[500px] overflow-hidden rounded-xl md:h-[400px]'>
                  <Image
                    src='/oratoImage.png'
                    alt='Orato App'
                    fill
                    className='object-cover'
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section
            ref={featuresRef}
            id='features'
            className='container mx-auto px-4 py-16 md:py-24'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-12 text-center'
            >
              <h2 className='text-3xl font-bold md:text-4xl'>Powerful Features</h2>
              <p className='mt-4 text-lg text-gray-600'>
                Everything you need to make the most of your audio content
              </p>
            </motion.div>

            <div className='grid gap-6 md:grid-cols-2 lg:gap-8'>
              {[
                {
                  icon: <Mic className='h-8 w-8' />,
                  title: 'Upload or Record Audio',
                  description: 'Upload files or record voice directly from your browser.',
                },
                {
                  icon: <Globe className='h-8 w-8' />,
                  title: 'Multilingual Transcription',
                  description: 'Supports multiple languages via OpenAI Whisper.',
                },
                {
                  icon: <Search className='h-8 w-8' />,
                  title: 'Ask Questions via AI',
                  description:
                    'Get relevant, accurate answers from your audio transcripts using RAG.',
                },
                {
                  icon: <Key className='h-8 w-8' />,
                  title: 'Use Your Own API Keys',
                  description:
                    'Overcome usage limits by adding your own Groq and Hugging Face keys.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className='flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all'
                >
                  <div className='mb-4 rounded-full bg-black/5 p-3 w-fit'>{feature.icon}</div>
                  <h3 className='mb-2 text-xl font-semibold'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className='container mx-auto px-4 py-16 md:py-24'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-12 text-center'
            >
              <h2 className='text-3xl font-bold md:text-4xl'>How It Works</h2>
              <p className='mt-4 text-lg text-gray-600'>Simple steps to get started with Orato</p>
            </motion.div>

            <div className='mx-auto max-w-4xl flex flex-col items-center'>
              <div className='flex flex-col'>
                {[
                  {
                    step: 1,
                    title: 'Upload or record your audio',
                    description: 'Drag and drop your files or use the built-in recorder.',
                  },
                  {
                    step: 2,
                    title: 'Orato transcribes it automatically',
                    description: 'Advanced AI converts speech to text with high accuracy.',
                  },
                  {
                    step: 3,
                    title: 'Ask questions or search your transcript',
                    description: 'Use natural language to find exactly what you need.',
                  },
                  {
                    step: 4,
                    title: 'Export the results you need',
                    description: 'Save transcripts, insights, and answers in various formats.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='flex mb-8 last:mb-0 items-center'
                  >
                    <div className='mr-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black text-white'>
                      {item.step}
                    </div>
                    <div>
                      <h3 className='mb-2 text-xl font-semibold'>{item.title}</h3>
                      <p className='text-gray-600'>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className='bg-gray-100 py-16 md:py-24'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='container mx-auto px-4 text-center'
            >
              <h2 className='mb-4 text-3xl font-bold md:text-4xl'>Start Using Orato Today</h2>
              <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-600'>
                Sign in to upload your first audio and experience smart transcription.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button asChild size='lg' className='px-8'>
                  <Link href='/dashboard'>Start Now</Link>
                </Button>
              </motion.div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className='border-t border-gray-200 py-8'>
            <div className='container mx-auto flex flex-col justify-between px-4 md:flex-row'>
              <div className='mb-4 md:mb-0'>
                <p className='text-gray-600'>© 2025 Orato</p>
              </div>
              <div className='flex flex-col space-y-2 md:flex-row md:space-x-6 md:space-y-0'>
                <Link href='/about' className='text-gray-600 hover:text-gray-900'>
                  About
                </Link>
                <Link href='mailto:support@orato.app' className='text-gray-600 hover:text-gray-900'>
                  Contact
                </Link>
                <Link href='https://github.com/orato' className='text-gray-600 hover:text-gray-900'>
                  GitHub
                </Link>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Terms & Privacy
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
