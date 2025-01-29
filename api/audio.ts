import { AudioDataType } from '@/app/dashboard/types';
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
