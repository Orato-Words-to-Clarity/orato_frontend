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

export const uploadAudio = async (formData: FormData, handleClose: () => void) => {
  privateGateway
    .post(orato.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
      handleClose();
      window.location.href = `/view/${response.data.data.audio_id}`;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
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

export const transcribeAudio = async (
  audioId: string,
  setFetch: Dispatch<SetStateAction<boolean>>,
) => {
  privateGateway
    .post(orato.transciption, { audio_id: audioId })
    .then((response) => {
      toast.success(response.data.message);
      setFetch((prev) => !prev);
    })
    .catch((error) => {
      console.log(error.response.message);
    });
};
