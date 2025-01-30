import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Play, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AudioDataType } from '../types';

const DashboardTable = ({ audioData }: { audioData: AudioDataType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {audioData.map((audio) => (
          <TableRow
            key={audio.audio_id}
            onClick={() => {
              window.location.href = `/view/${audio.audio_id}`;
            }}
          >
            <TableCell>{audio.file_name}</TableCell>
            <TableCell>{audio.created_at}</TableCell>
            <TableCell>{audio.language}</TableCell>
            <TableCell>
              <div className='flex space-x-2'>
                <Button variant='ghost' size='icon'>
                  <Play className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Download className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
