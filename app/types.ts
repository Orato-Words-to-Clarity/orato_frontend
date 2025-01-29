'use client';

export type CredentialDataType = {
  email: string;
  password: string;
};
export type SignupDataType = {
  username: string;
  email: string;
  password: string;
};

export type ModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  zIndexCount?: number;
};
