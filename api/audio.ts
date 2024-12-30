import { publicGateway } from '@/services/gateways';
import { orato } from '@/services/urls';

export const getTranscription = async (formData: FormData) => {
  publicGateway
    .post(orato.transciption, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
