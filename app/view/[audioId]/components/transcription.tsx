import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit2 } from 'lucide-react';
import { HiOutlineRefresh } from 'react-icons/hi';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { transcribeAudio } from '@/api/audio';
import { AudioDetailsType } from '../../types';
import { GridLoader } from 'react-spinners';

export const Transcription = ({
  audioDetails,
  setFetch,
}: {
  audioDetails: AudioDetailsType;
  setFetch: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (!audioDetails.transcription) {
      transcribeAudio(audioDetails.audio_id, setFetch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioDetails]);

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Transcription</h2>
      {!audioDetails.transcription ? (
        <div className='h-[400px] w-full flex items-center justify-center rounded-md border'>
          <GridLoader color='black' size={15} />
        </div>
      ) : (
        <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
          <p className='text-gray-700'>{audioDetails?.transcription?.text}</p>
        </ScrollArea>
      )}
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
