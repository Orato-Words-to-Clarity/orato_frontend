import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ModalProps } from '@/app/types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, zIndexCount, style }) => {
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
