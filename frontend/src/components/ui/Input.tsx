import React from 'react';
import { Input as HeroInput, InputProps as HeroInputProps } from '@heroui/react';
import { Icon } from '@iconify/react';

export interface InputProps extends HeroInputProps {
  icon?: string;
  iconPosition?: 'left' | 'right';
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { 
    icon, 
    iconPosition = 'left', 
    error,
    isInvalid,
    className = '',
    ...rest 
  } = props;
  
  const hasError = isInvalid || !!error;
  
  const startContent = icon && iconPosition === 'left' ? (
    <Icon icon={icon} className="text-default-400" />
  ) : undefined;
  
  const endContent = icon && iconPosition === 'right' ? (
    <Icon icon={icon} className="text-default-400" />
  ) : undefined;
  
  return (
    <div className="w-full">
      <HeroInput
        ref={ref}
        startContent={startContent}
        endContent={endContent}
        isInvalid={hasError}
        errorMessage={error}
        className={className}
        {...rest}
      />
    </div>
  );
});

Input.displayName = 'Input';
