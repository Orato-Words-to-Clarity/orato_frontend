import Modal from '@/app/components/Modal';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RecordingModalProps } from '../types';
import RingLoader from 'react-spinners/RingLoader';
import BarLoader from 'react-spinners/BarLoader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { uploadAudio } from '@/api/audio';

const RecordingModal: React.FC<RecordingModalProps> = ({ isOpen, handleClose }) => {
  const [includeMicAudio, setIncludeMicAudio] = useState<boolean>(true);
  const [includeSystemAudio, setIncludeSystemAudio] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  const startRecording = async () => {
    try {
      setError(null);
      setIsInitializing(true);
      const streamsToRecord: MediaStream[] = [];

      if (includeMicAudio) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
            },
          });
          streamsToRecord.push(micStream);
        } catch (error) {
          setError(`Error accessing microphone: ${error}`);
          return;
        }
      }

      if (includeSystemAudio) {
        try {
          const newDisplayStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              width: 1,
              height: 1,
            },
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: false,
            },
          });

          const audioTracks = newDisplayStream.getAudioTracks();
          if (audioTracks.length === 0) {
            throw new Error('No system audio selected');
          }

          newDisplayStream.getVideoTracks().forEach((track) => track.stop());

          const audioOnlyStream = new MediaStream(audioTracks);
          streamsToRecord.push(audioOnlyStream);
        } catch (error) {
          setError(`Error accessing system audio: ${error}`);
          return;
        }
      }

      if (streamsToRecord.length === 0) {
        setError('Please select at least one audio source');
        return;
      }

      const combinedTracks = streamsToRecord.flatMap((stream) => stream.getAudioTracks());
      const combinedStream = new MediaStream(combinedTracks);

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const NewRecording = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
        setAudioBlob(NewRecording);
        const url = URL.createObjectURL(NewRecording);
        setAudioURL(url);
        cleanupStreams();
      };

      setStreams(streamsToRecord);
      recorder.start(1000); // Record in 1-second chunks
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      setError('An error occurred while starting the recording: ' + error);
      cleanupStreams();
    } finally {
      setIsInitializing(false);
    }
  };

  const cleanupStreams = () => {
    streams.forEach((stream) => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    });
    setStreams([]);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      cleanupStreams();
    }
  };

  const cleanup = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    cleanupStreams();
  };

  const handleTranscription = () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob);
      const recordingDateTime = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `recording_${recordingDateTime}`;
      formData.append('file', audioBlob, filename);
      uploadAudio(formData, handleCancel);
    }
  };

  useEffect(() => {
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      setAudioURL(null);
      setAudioBlob(null);
      setIsRecording(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleModalClose = () => {
    handleClose();
  };

  const handleCancel = () => {
    cleanup();
    setAudioURL(null);
    setAudioBlob(null);
    setIsRecording(false);
  };

  return (
    <Modal title='Record Audio' isOpen={isOpen} onClose={handleModalClose}>
      <div className='space-y-4'>
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!audioURL ? (
          <>
            {isRecording ? (
              <div className='flex justify-center space-x-2 py-6'>
                <RingLoader />
              </div>
            ) : (
              <>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='mic-audio'
                    checked={includeMicAudio}
                    onCheckedChange={() => setIncludeMicAudio(!includeMicAudio)}
                    disabled={isInitializing}
                  />
                  <Label htmlFor='mic-audio'>Microphone</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='system-audio'
                    checked={includeSystemAudio}
                    onCheckedChange={() => setIncludeSystemAudio(!includeSystemAudio)}
                    disabled={isInitializing}
                  />
                  <Label htmlFor='system-audio'>System Sound</Label>
                </div>

                <p className='text-sm text-gray-600'>
                  Select at least one audio source and click Start Recording to begin.
                  {includeSystemAudio &&
                    " When prompted, select any window/tab and make sure to check 'Share audio' in the dialog."}
                </p>
              </>
            )}
            <div className='space-x-2'>
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  className='bg-blue-600 hover:bg-blue-700 w-full'
                  disabled={(!includeMicAudio && !includeSystemAudio) || isInitializing}
                >
                  {isInitializing ? <BarLoader /> : 'Start Recording'}
                </Button>
              ) : (
                <Button onClick={stopRecording} className='bg-red-600 hover:bg-red-700 w-full'>
                  Stop Recording
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className='mt-4'>
              <audio controls src={audioURL} className='w-full'></audio>
            </div>
            <div className='flex justify-center space-x-2'>
              <Button
                onClick={handleTranscription}
                className='bg-blue-600 hover:bg-blue-700 w-full'
              >
                Transcribe
              </Button>
              <Button
                onClick={handleCancel}
                className='border border-blue-600 hover:border-blue-700 w-full'
                variant='outline'
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default RecordingModal;
