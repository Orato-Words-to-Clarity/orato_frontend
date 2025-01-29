export type File = {
  id: string;
  name: string;
  uploadDate: string;
  language: string;
  status: string;
};

export type RecordingModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export type AudioDataType = {
  audio_id: string;
  file_path: string;
  file_name: string;
  language: string;
  created_at: string;
};
