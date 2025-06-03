import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center max-w-md">
        <div className="mb-6 text-primary-500">
          <Icon icon="lucide:file-question" className="text-8xl mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        
        <p className="text-foreground-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button
          variant="gradient"
          size="lg"
          icon="lucide:home"
          className="mx-auto"
          onPress={() => window.location.href = '/'}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};