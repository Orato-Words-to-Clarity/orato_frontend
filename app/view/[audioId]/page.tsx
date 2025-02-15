'use client';

import DashboardHeader from '@/app/dashboard/components/dashboardHeader';
import AudioInfo from './components/audioInfo';
import { Transcription } from './components/transcription';
import { AiInteraction } from './components/aiInteraction';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAudioDetails } from '@/api/audio';
import { AudioDetailsType } from '../types';
import withAuth from '@/hoc/withAuth';

function View() {
  const { audioId } = useParams();

  const [fetch, setFetch] = useState<boolean>(false);
  const [audioDetails, setAudioDetails] = useState<AudioDetailsType>({
    audio_id: '',
    file_path: '',
    file_name: '',
    language: '',
    created_at: '',
    transcription: {
      transcription_id: '',
      text: '',
    },
  });

  useEffect(() => {
    console.log('fetch: ', fetch);
    if (audioId && typeof audioId === 'string') {
      getAudioDetails(audioId, setAudioDetails);
    }
  }, [audioId, fetch]);

  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <DashboardHeader />
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='mb-4'>
            <Link href='/dashboard' passHref>
              <Button variant='outline'>
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <AudioInfo audioDetails={audioDetails} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Transcription audioDetails={audioDetails} setFetch={setFetch} />
            <AiInteraction transcription_id={audioDetails?.transcription?.transcription_id} />
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(View);
