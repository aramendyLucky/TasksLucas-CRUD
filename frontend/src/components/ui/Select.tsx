import React from 'react';
import { Select as HeroSelect, SelectItem, SelectProps as HeroSelectProps } from '@heroui/react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<HeroSelectProps, 'children'> {
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { 
    options, 
    error,
    isInvalid,
    className = '',
    ...rest 
  } = props;
  
  const hasError = isInvalid || !!error;
  
  return (
    <HeroSelect
      ref={ref}
      isInvalid={hasError}
      errorMessage={error}
      className={className}
      {...rest}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </HeroSelect>
  );
});

Select.displayName = 'Select';
