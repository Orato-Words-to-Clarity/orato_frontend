import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, zIndexCount, style }) => {
const Modal = ({
  isOpen,
  onClose,
  title,
  zIndexCount,
  children,
  style,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  zIndexCount?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] w-[95%]' style={{ zIndex: zIndexCount, ...style }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
