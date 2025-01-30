import { CreatePayloadType } from '@/app/view/types';
import { privateGateway } from '@/services/gateways';
import { orato } from '@/services/urls';
import { Dispatch, SetStateAction } from 'react';

export const createInteraction = async (
  payload: CreatePayloadType,
  setGeneratedContent: Dispatch<SetStateAction<string>>,
  setPayload: Dispatch<SetStateAction<CreatePayloadType>>,
  setLoadingGeneration: Dispatch<SetStateAction<boolean>>,
) => {
  privateGateway
    .post(orato.create, payload)
    .then((response) => {
      setGeneratedContent(response.data.data);
      setPayload((prevPayload) => ({
        ...prevPayload,
        request_type: '',
        custome_prompt: '',
      }));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoadingGeneration(false);
    });
};
