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

