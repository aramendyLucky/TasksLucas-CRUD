import React from 'react';
import { Badge as HeroBadge, BadgeProps as HeroBadgeProps } from '@heroui/react';

export interface BadgeProps extends HeroBadgeProps {
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  label, 
  color = 'default',
  variant = 'flat',
  ...rest 
}) => {
  // Filtra props que puedan estar generando spans extraños
  const cleanRest = { ...rest };
  if ('data-locator' in cleanRest) delete cleanRest['data-locator'];
  if ('className' in cleanRest) delete cleanRest['className'];
  return (
    <HeroBadge
      color={color}
      variant={variant}
      className="px-2 py-1"
      {...cleanRest}
    >
      {label}
    </HeroBadge>
  );
};
