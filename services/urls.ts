import { setApiKey } from '@/api/profile';

export const orato = {
  // Auth
  signup: '/api/v1/auth/register/',
  login: '/api/v1/auth/login/',
  refresh: '/api/v1/auth/refresh/',

  // Audio
  list: '/api/v1/audio/',
  upload: '/api/v1/audio/upload-audio/',
  transciption: '/api/v1/transcription/transcribe/',
  editTranscription: '/api/v1/transcription/edit/',
  audioDetails: (audioId: string) => `/api/v1/audio/${audioId}/`,

  // Interaction
  create: '/api/v1/interactions/create/',
  ask: '/api/v1/interactions/ask',

  //profile
  userProfile: '/api/v1/user/',
  setApiKey: '/api/v1/api/set-api-key/',
  isApiKeySet: '/api/v1/api/is-api-set/',
};
