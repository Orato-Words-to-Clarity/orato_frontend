import { ApiKeyData } from '@/app/profile/types';
import { privateGateway } from '@/services/gateways';
import { orato } from '@/services/urls';
import { Dispatch, SetStateAction } from 'react';

export const getProfileData = async (
  setUserEmail: Dispatch<SetStateAction<string>>,
  handleKeyChange: (key: keyof ApiKeyData, value: string | boolean) => void,
) => {
  privateGateway
    .get(orato.userProfile)
    .then((response) => {
      setUserEmail(response.data.data.email);
      handleKeyChange('groqKey', response.data.data.groq_api_key || '');
      handleKeyChange('huggingFaceKey', response.data.data.huggingface_api_key || '');
      handleKeyChange(
        'hasKeys',
        !!response.data.data.groq_api_key && !!response.data.data.huggingface_api_key,
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setApiKey = async (
  groqKey: string,
  huggingFaceKey: string,
  handleKeyChange: (key: keyof ApiKeyData, value: string | boolean) => void,
) => {
  privateGateway
    .post(orato.setApiKey, {
      groq_api_key: groqKey,
      huggingface_api_key: huggingFaceKey,
    })
    .then(() => {
      handleKeyChange('hasKeys', true);
      handleKeyChange('hasChange', false);
      handleKeyChange('editingGroqKey', false);
      handleKeyChange('editingHuggingFaceKey', false);
    })
    .catch((error) => {
      console.log(error);
    });
};
