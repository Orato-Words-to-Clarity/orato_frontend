export const orato = {
  // Auth
  signup: '/api/v1/auth/register/',
  login: '/api/v1/auth/login/',
  refresh: '/api/v1/auth/refresh/',

  // Audio
  list: '/api/v1/audio/',
  upload: '/api/v1/audio/upload-audio/',
  transciption: '/api/v1/transcription/transcribe/',
  audioDetails: (audioId: string) => `/api/v1/audio/${audioId}/`,

  // Interaction
  create: '/api/v1/interactions/create/',
  ask: '/api/v1/interactions/ask',
};
