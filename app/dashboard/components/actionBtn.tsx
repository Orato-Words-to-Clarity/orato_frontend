import { Button } from '@/components/ui/button';
import { Upload, Mic } from 'lucide-react';

export default function ActionBtn() {
  return (
    <div className='fixed bottom-8 right-8 space-x-4'>
      <Button size='icon' className='rounded-full'>
        <Upload className='h-6 w-6' />
      </Button>
      <Button size='icon' className='rounded-full'>
        <Mic className='h-6 w-6' />
      </Button>
    </div>
  );
}
