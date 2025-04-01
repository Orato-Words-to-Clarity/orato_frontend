import { AudioDataType } from '@/app/dashboard/types';
import { AudioDetailsType } from '@/app/view/types';
import { privateGateway } from '@/services/gateways';
import { orato } from '@/services/urls';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

export const getAudioList = async (setAudioData: Dispatch<SetStateAction<AudioDataType[]>>) => {
  privateGateway
    .get(orato.list)
    .then((response) => {
      response.data.data.forEach((audio: AudioDataType) => {
        if (audio.language === null) {
          audio.language = '-';
        }
      });
      setAudioData(response.data.data);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const uploadAudio = async (
  formData: FormData,

  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  setLoading(true);
  privateGateway
    .post(orato.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
      window.location.href = `/view/${response.data.data.audio_id}`;
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || 'Upload failed!';
      toast.error(errorMessage);
      setLoading(false);
    });
};

export const getAudioDetails = async (
  audioId: string,
  setAudioDetails: Dispatch<SetStateAction<AudioDetailsType>>,
) => {
  privateGateway
    .get(orato.audioDetails(audioId))
    .then((response) => {
      setAudioDetails(response.data.data);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const delAudio = async (audioId: string) => {
  return privateGateway
    .delete(orato.deleteAudio(audioId)) // Use DELETE instead of GET
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message || 'Failed to delete audio');
    });
};

export const transcribeAudio = async (
  audioId: string,
  setFetch: Dispatch<SetStateAction<boolean>>,
  setTranscribing: Dispatch<SetStateAction<boolean>>,
) => {
  setTranscribing(true);
  privateGateway
    .post(orato.transciption, { audio_id: audioId })
    .then((response) => {
      toast.success(response.data.message);
      setTimeout(() => {
        setFetch((prev) => !prev);
      }, 500);
    })
    .catch((error) => {
      console.log(error.response.message);
    })
    .finally(() => {
      setTranscribing(false);
    });
};

export const editTranscription = async (transcription_id: string, text: string) => {
  privateGateway
    .patch(orato.editTranscription, { transcription_id: transcription_id, text: text })
    .then((response) => {
      toast.success(response.data.message);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
