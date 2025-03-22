import { Button } from '@/components/ui/button';
import { Mic, Upload } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

const ActionsDiv = ({
  setRecordingModalOpen,
  setAudioUploadingModalOpen,
}: {
  setRecordingModalOpen: Dispatch<SetStateAction<boolean>>;
  setAudioUploadingModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className='bg-white border rounded-lg p-6 mb-6'>
      <div className='text-center max-w-2xl mx-auto'>
        <h3 className='font-semibold text-xl mb-2'>Start Your Session</h3>
        <p className='text-muted-foreground mb-6'>
          Choose an option below to either upload your audio file or record directly on the
          platform.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            variant='outline'
            className='flex items-center gap-2'
            onClick={() => setAudioUploadingModalOpen(true)}
          >
            <Upload className='h-4 w-4' />
            Upload Audio
          </Button>
          <Button className='flex items-center gap-2' onClick={() => setRecordingModalOpen(true)}>
            <Mic className='h-4 w-4' />
            Record Audio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionsDiv;
