'use client';

import DashboardHeader from '@/app/dashboard/components/dashboardHeader';
import AudioInfo from './components/audioInfo';
import { Transcription } from './components/transcription';
import { AiInteraction } from './components/aiInteraction';

export default function View() {
  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <DashboardHeader />
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <AudioInfo />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Transcription />
            <AiInteraction />
          </div>
        </main>
      </div>
    </>
  );
}
