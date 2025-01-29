import Modal from '@/app/components/Modal';
import React, { useState, useCallback } from 'react';
import { RecordingModalProps } from '../types';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { uploadAudio } from '@/api/audio';

const AudioUploadingModal: React.FC<RecordingModalProps> = ({ isOpen, handleClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (validateFile(uploadedFile)) {
      setFile(uploadedFile);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/mp3': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/wave': ['.wav'],
      'audio/x-wav': ['.wav'],
      'audio/aac': ['.aac'],
      'audio/webm': ['.webm'],
      'video/webm': ['.webm'],
      'audio/x-webm': ['.webm'],
    },
    maxSize: 100 * 1024 * 1024, // 100 MB
    multiple: false,
  });

  const validateFile = (file: File): boolean => {
    const validTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/aac',
      'audio/mp3',
      'audio/webm',
      'video/webm',
      'audio/x-wav',
      'audio/x-webm',
      'audio/wave',
    ];
    if (!file || !validTypes.includes(file.type)) {
      setError('Unsupported file format. Please upload MP3, WAV, AAC, or WEBM.');
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError('File size exceeds 100 MB limit.');
      return false;
    }
    return true;
  };

  const handleTranscription = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // getTranscription(formData)
      //   .then((response) => {
      //     console.log(response);
      //     handleClose();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      uploadAudio(formData, handleClose);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title='Upload Audio'>
      <div className='grid gap-4 py-4'>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
                        hover:border-blue-500 hover:bg-blue-50`}
        >
          <input {...getInputProps()} />
          <Upload className='mx-auto h-12 w-12 text-gray-400' />
          {isDragActive ? (
            <p className='mt-2 text-sm text-gray-600'>Release to upload your file</p>
          ) : (
            <p className='mt-2 text-sm text-gray-600'>
              Drag and drop your audio file here or click to upload
            </p>
          )}
          <Button className='mt-4' variant='secondary'>
            Browse Files
          </Button>
        </div>
        {error && <p className='text-sm text-red-500'>{error}</p>}
        {file && <p className='text-sm text-green-500'>File selected: {file.name}</p>}
        <p className='text-xs text-gray-500 italic'>
          Supported formats: MP3, WAV, AAC. Maximum file size: 100 MB.
        </p>
      </div>
      <div>
        <Button
          onClick={handleTranscription}
          disabled={!file}
          className={`${file ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}`}
        >
          Transcribe
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AudioUploadingModal;
