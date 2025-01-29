'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Mic, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardHeader from './components/dashboardHeader';
import MatrixCard from './components/matrixCard';
import ActionBtn from './components/actionBtn';
import RecordingModal from './components/recordingModal';
import AudioUploadingModal from './components/audioUploadingModal';
import { getAudioList } from '@/api/audio';
import { AudioDataType } from './types';
import DashboardTable from './components/dashboardTable';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recordingModalOpen, setRecordingModalOpen] = useState(false);
  const [audioUploadingModalOpen, setAudioUploadingModalOpen] = useState(false);
  const [audioData, setAudioData] = useState<AudioDataType[]>([]);

  const hadleRecordingModalClose = () => setRecordingModalOpen(false);
  const handleAudioUploadingModalClose = () => setAudioUploadingModalOpen(false);

  const filteredAudioData = audioData.filter((audio) =>
    audio.file_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    getAudioList(setAudioData);
  }, []);

  useEffect(() => {
    console.log(audioData);
  }, [audioData]);

  return (
    <>
      <RecordingModal isOpen={recordingModalOpen} handleClose={hadleRecordingModalClose} />
      <AudioUploadingModal
        isOpen={audioUploadingModalOpen}
        handleClose={handleAudioUploadingModalClose}
      />

      <div className='min-h-screen bg-gray-100'>
        <DashboardHeader />
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <MatrixCard name='Total Files' value={15} icon={Upload} color='blue' />
            <MatrixCard name='pending Transcriptions' value={3} icon={Mic} color='yellow' />
            <MatrixCard name='Completed Transcriptions' value={12} icon={Download} color='green' />
          </div>
          <Card>
            <CardContent className='p-6'>
              <div className='mb-4 flex items-center'>
                <Search className='h-5 w-5 text-gray-400 mr-2' />
                <Input
                  type='text'
                  placeholder='Search transcriptions...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='max-w-sm'
                />
              </div>
              <DashboardTable audioData={filteredAudioData} />
            </CardContent>
          </Card>
        </main>
        <ActionBtn
          setRecordingModalOpen={setRecordingModalOpen}
          setAudioUploadingModalOpen={setAudioUploadingModalOpen}
        />
      </div>
    </>
  );
}
