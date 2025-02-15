export type AudioDetailsType = {
  audio_id: string;
  file_path: string;
  file_name: string;
  language: string;
  created_at: string;
  transcription: {
    transcription_id: string;
    text: string;
  };
};

export type CreatePayloadType = {
  request_type: string;
  custome_prompt: string;
  transcription_id: string;
};
