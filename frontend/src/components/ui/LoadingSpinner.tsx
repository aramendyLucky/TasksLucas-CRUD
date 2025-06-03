import React from 'react';
import { Spinner, SpinnerProps } from '@heroui/react';

export interface LoadingSpinnerProps extends SpinnerProps {
  fullPage?: boolean;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullPage = false,
  text,
  color = 'primary',
  size = 'md',
  ...rest
}) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <Spinner color={color} size={size} {...rest} />
        {text && (
          <p className="mt-4 text-foreground-600">{text}</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Spinner color={color} size={size} {...rest} />
      {text && (
        <p className="mt-2 text-foreground-600 text-sm">{text}</p>
      )}
    </div>
  );
};
