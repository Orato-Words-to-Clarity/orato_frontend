'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, Trash2 } from 'lucide-react';
import { AudioDetailsType } from '../../types';

function AudioInfo({ audioDetails }: { audioDetails: AudioDetailsType }) {
  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete audio file');
  };

  return (
    <>
      <div className='bg-white shadow rounded-lg p-6 mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Audio Player</h2>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <audio controls src={audioDetails.file_path ? audioDetails.file_path : 'dummy'}></audio>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline'>
              <Download className='h-4 w-4 mr-2' />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='destructive'>
                  <Trash2 className='h-4 w-4 mr-2' />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your audio file and
                    its transcription.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant='outline' onClick={() => {}}>
                    Cancel
                  </Button>
                  <Button variant='destructive' onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='text-sm text-gray-500'>
          <p>File Name: {audioDetails.file_name}</p>
          <p>Upload Date: {audioDetails.created_at}</p>
          <p>Language: {audioDetails.language ? audioDetails.language : '-'}</p>
          <p>Duration: </p>
        </div>
      </div>
    </>
  );
}

export default AudioInfo;
