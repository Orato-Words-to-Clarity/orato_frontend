import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Play, Download, Trash2, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AudioDataType } from '../types';
import { useState } from 'react';

const DashboardTable = ({ audioData }: { audioData: AudioDataType[] }) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement | null }>(
    {},
  );

  const handlePlayPause = (audioId: string, filePath: string) => {
    if (!audioElements[audioId]) {
      const newAudio = new Audio(filePath);
      setAudioElements((prev) => ({
        ...prev,
        [audioId]: newAudio,
      }));
    }

    const currentAudio = audioElements[audioId] || new Audio(filePath);

    if (playingAudioId === audioId) {
      currentAudio.pause();
      setPlayingAudioId(null);
    } else {
      Object.values(audioElements).forEach((audio) => audio?.pause());
      currentAudio.play();
      setPlayingAudioId(audioId);
    }
  };
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
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(audio.audio_id, audio.file_path);
                  }}
                >
                  {playingAudioId === audio.audio_id ? (
                    <Pause className='h-4 w-4' />
                  ) : (
                    <Play className='h-4 w-4' />
                  )}
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
