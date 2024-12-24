'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Mic, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardHeader from './components/dashboardHeader';
import MatrixCard from './components/matrixCard';
import ActionBtn from './components/actionBtn';
import DashboardTable from './components/dashboardTable';

const mockFiles = [
  {
    id: '1',
    name: 'Interview.mp3',
    uploadDate: '2023-05-15',
    language: 'English',
    status: 'Completed',
  },
  {
    id: '2',
    name: 'Meeting.wav',
    uploadDate: '2023-05-14',
    language: 'Spanish',
    status: 'Pending',
  },
  {
    id: '3',
    name: 'Lecture.mp4',
    uploadDate: '2023-05-13',
    language: 'French',
    status: 'Completed',
  },
  {
    id: '4',
    name: 'Podcast.mp3',
    uploadDate: '2023-05-12',
    language: 'English',
    status: 'Completed',
  },
  {
    id: '5',
    name: 'Conference.wav',
    uploadDate: '2023-05-11',
    language: 'German',
    status: 'Pending',
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = mockFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
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
            <DashboardTable files={filteredFiles} />
          </CardContent>
        </Card>
      </main>
      <ActionBtn />
    </div>
  );
}
