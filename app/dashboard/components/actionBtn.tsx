import { Button } from '@/components/ui/button';
import { Upload, Mic } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface ActionBtnProps {
  setRecordingModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ActionBtn({ setRecordingModalOpen }: ActionBtnProps) {
  return (
    <div className='fixed bottom-8 right-8 space-x-4'>
      <Button size='icon' className='rounded-full'>
        <Upload className='h-6 w-6' />
      </Button>
      <Button size='icon' className='rounded-full' onClick={() => setRecordingModalOpen(true)}>
        <Mic className='h-6 w-6' />
      </Button>
    </div>
  );
}
