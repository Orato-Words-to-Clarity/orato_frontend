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
import DeleteModal from '@/app/components/DeleteModal';
import { delAudio } from '@/api/audio';
import { toast } from 'react-hot-toast';

const DashboardTable = ({ audioData }: { audioData: AudioDataType[] }) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement | null }>(
    {},
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // State for Delete Modal
  const [selectedAudioId, setSelectedAudioId] = useState<string | null>(null); // Track audio to delete

  const handlePlayPause = (audioId: string, filePath: string) => {
    let currentAudio = audioElements[audioId];

    if (!currentAudio) {
      currentAudio = new Audio(filePath);
      setAudioElements((prev) => ({
        ...prev,
        [audioId]: currentAudio,
      }));

      // Add an event listener to reset playingAudioId when audio ends
      currentAudio.addEventListener('ended', () => {
        setPlayingAudioId(null);
      });
    }

    if (playingAudioId === audioId) {
      currentAudio.pause();
      setPlayingAudioId(null);
    } else {
      // Pause all currently playing audios
      Object.values(audioElements).forEach((audio) => audio?.pause());
      currentAudio.play();
      setPlayingAudioId(audioId);
    }
  };

  const handleDelete = async () => {
    if (!selectedAudioId) return;

    try {
      await delAudio(selectedAudioId);
      toast.success('Audio file deleted successfully!');
      setIsDeleteOpen(false);
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Failed to delete audio';
      toast.error(errorMessage);
    }
  };

  return (
    <>
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
              className='cursor-pointer'
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
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAudioId(audio.audio_id); // Set selected file
                      setIsDeleteOpen(true); // Open Delete Modal
                    }}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DashboardTable;
