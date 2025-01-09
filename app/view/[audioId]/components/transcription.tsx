import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit2 } from 'lucide-react';
import { HiOutlineRefresh } from 'react-icons/hi';

import React, { useState } from 'react';

export const Transcription = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transcription, setTranscription] = useState(
    'This is a sample transcription. It would contain the full text of the audio file with timestamps and speaker tags.',
  );

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Transcription</h2>
      <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
        <p className='text-gray-700'>{transcription}</p>
      </ScrollArea>
      <div className='mt-4 flex justify-end'>
        <Button variant='outline' className='mr-2'>
          <Edit2 className='h-4 w-4 mr-2' />
          Edit
        </Button>
        <Button variant='outline'>
          <HiOutlineRefresh className='h-5 w-5 mr-2' />
          Re-Transcribe
        </Button>
      </div>
    </div>
  );
};
