export type ModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  zIndexCount?: number;
};
