import React from 'react';
import { ApiError } from '../types/api';
import { addToast } from '@heroui/react';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

/**
 * Custom hook for API calls with loading and error states
 */
export function useApi<T, P extends any[] = any[]>(
  apiFunction: (...args: P) => Promise<{ success: boolean; data: T; message?: string }>,
  options: UseApiOptions = {}
) {
  const {
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation completed successfully',
  } = options;
  
  const [state, setState] = React.useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  
  const execute = React.useCallback(
    async (...args: P) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await apiFunction(...args);
        
        setState({
          data: result.data,
          isLoading: false,
          error: null,
        });
        
        if (showSuccessToast) {
          addToast({
            title: 'Success',
            description: result.message || successMessage,
            color: 'success',
          });
        }
        
        return result;
      } catch (error) {
        const apiError = error as ApiError;
        
        setState({
          data: null,
          isLoading: false,
          error: apiError,
        });
        
        if (showErrorToast) {
          addToast({
            title: 'Error',
            description: apiError.message || 'An unexpected error occurred',
            color: 'danger',
          });
        }
        
        throw apiError;
      }
    },
    [apiFunction, showErrorToast, showSuccessToast, successMessage]
  );
  
  return {
    ...state,
    execute,
    reset: () => setState({ data: null, isLoading: false, error: null }),
  };
}
