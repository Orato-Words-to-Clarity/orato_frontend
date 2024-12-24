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
import type { File } from '../types';

export default function DashboardTable({ files }: { files: File[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell>{file.name}</TableCell>
            <TableCell>{file.uploadDate}</TableCell>
            <TableCell>{file.language}</TableCell>
            <TableCell>{file.status}</TableCell>
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
}
