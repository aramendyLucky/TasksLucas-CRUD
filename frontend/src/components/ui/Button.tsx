import React from 'react';
import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/react';
import { Icon } from '@iconify/react';

export interface ButtonProps extends Omit<HeroButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gradient';
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { 
    variant = 'primary', 
    icon, 
    iconPosition = 'left', 
    children, 
    className = '',
    isLoading,
    ...rest 
  } = props;
  
  // Map custom variants to HeroUI variants
  const getHeroVariant = (): HeroButtonProps['variant'] => {
    switch (variant) {
      case 'primary': return 'solid';
      case 'secondary': return 'flat';
      case 'danger': return 'solid';
      case 'ghost': return 'ghost';
      case 'gradient': return 'solid';
      default: return 'solid';
    }
  };
  
  // Map custom variants to HeroUI colors
  const getHeroColor = (): HeroButtonProps['color'] => {
    switch (variant) {
      case 'primary': return 'primary';
      case 'secondary': return 'default';
      case 'danger': return 'danger';
      case 'ghost': return 'default';
      case 'gradient': return 'primary';
      default: return 'primary';
    }
  };
  
  // Add gradient class for gradient variant
  const buttonClass = variant === 'gradient' 
    ? `btn-gradient ${className}`
    : className;
  
  return (
    <HeroButton
      ref={ref}
      variant={getHeroVariant()}
      color={getHeroColor()}
      className={buttonClass}
      isLoading={isLoading}
      {...rest}
    >
      {icon && iconPosition === 'left' && !isLoading && (
        <Icon icon={icon} className="mr-1" />
      )}
      {children}
      {icon && iconPosition === 'right' && !isLoading && (
        <Icon icon={icon} className="ml-1" />
      )}
    </HeroButton>
  );
});

Button.displayName = 'Button';
