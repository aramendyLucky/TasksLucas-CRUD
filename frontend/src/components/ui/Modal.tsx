import React from 'react';
import { 
  Modal as HeroModal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  ModalProps as HeroModalProps
} from '@heroui/react';

export interface ModalProps extends HeroModalProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  footer,
  size = 'md',
  ...rest
}) => {
  return (
    <HeroModal
      backdrop="blur"
      size={size}
      scrollBehavior="inside"
      {...rest}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            <ModalBody>
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter>
                {footer}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
};
