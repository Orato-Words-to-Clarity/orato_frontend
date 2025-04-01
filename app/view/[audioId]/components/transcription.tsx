import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import { HiOutlineRefresh } from 'react-icons/hi';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { editTranscription, transcribeAudio } from '@/api/audio';
import { AudioDetailsType } from '../../types';
import { GridLoader } from 'react-spinners';

export const Transcription = ({
  audioDetails,
  setFetch,
}: {
  audioDetails: AudioDetailsType;
  setFetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState(
    audioDetails?.transcription?.text || '',
  );
  const [transcribing, setTranscribing] = useState(false);

  useEffect(() => {
    if (!audioDetails.transcription) {
      setTimeout(() => {
        transcribeAudio(audioDetails.audio_id, setFetch, setTranscribing);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioDetails]);

  useEffect(() => {
    setTranscriptionText(audioDetails?.transcription?.text || '');
  }, [audioDetails?.transcription?.text]);

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you would typically send the updated transcriptionText to your backend
    editTranscription(audioDetails.transcription?.transcription_id, transcriptionText);
  };

  const handleReTranscribeClick = () => {
    transcribeAudio(audioDetails.audio_id, setFetch, setTranscribing);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscriptionText(event.target.value);
  };
  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Transcription</h2>
      {transcribing ? (
        <div className='h-[400px] w-full flex items-center justify-center rounded-md border'>
          <GridLoader color='black' size={15} />
        </div>
      ) : (
        <textarea
          className='h-[400px] w-full rounded-md border p-4 focus:outline-none '
          readOnly={!isEditing}
          value={transcriptionText}
          onChange={handleTextChange}
        />
      )}
      <div className='mt-4 flex justify-end'>
        {isEditing ? (
          <Button variant='default' className='mr-2' onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant='outline' className='mr-2' onClick={() => setIsEditing(true)}>
            <Edit2 className='h-4 w-4 mr-2' />
            Edit
          </Button>
        )}
        <Button variant='outline' onClick={handleReTranscribeClick}>
          <HiOutlineRefresh className='h-5 w-5 mr-2' />
          Re-Transcribe
        </Button>
      </div>
    </div>
  );
};
