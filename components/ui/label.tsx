import { cn } from '@/lib/utils';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={cn('block text-sm font-medium text-gray-700', className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
