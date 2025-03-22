import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const RedirectionForApi = () => {
  return (
    <div className='bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h3 className='font-semibold text-lg'>Unlock More with Your Own API Keys!</h3>
          <p className='text-sm text-muted-foreground mt-1'>
            Use your own Groq and Hugging Face API keys to remove usage limits and speed up
            performance. Add them in your profile now!
          </p>
        </div>
        <div className='flex-shrink-0'>
          <Button asChild>
            <Link href='/profile' className='flex items-center gap-2'>
              Add API Keys
              <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedirectionForApi;
