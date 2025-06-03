import { parseISO } from 'date-fns';

/**
 * Validate that a string is not empty
 */
export const isNotEmpty = (value?: string): boolean => {
  return !!value && value.trim().length > 0;
};

/**
 * Validate that a string is at least a certain length
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

/**
 * Validate that a string is not longer than a certain length
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

/**
 * Validate that a string is a valid date
 */
export const isValidDate = (value?: string): boolean => {
  if (!value) return false;
  try {
    const date = parseISO(value);
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
};

/**
 * Validate that a date is in the future
 */
export const isFutureDate = (value?: string): boolean => {
  if (!value) return false;
  try {
    const date = parseISO(value);
    return date > new Date();
  } catch (error) {
    return false;
  }
};

/**
 * Task title validation rules
 */
export const validateTaskTitle = (value?: string): string | true => {
  if (!isNotEmpty(value)) return 'Title is required';
  if (!minLength(value!, 3)) return 'Title must be at least 3 characters';
  if (!maxLength(value!, 100)) return 'Title must be less than 100 characters';
  return true;
};

/**
 * Task description validation rules
 */
export const validateTaskDescription = (value?: string): string | true => {
  if (value && !maxLength(value, 500)) return 'Description must be less than 500 characters';
  return true;
};

/**
 * Task due date validation rules
 */
export const validateTaskDueDate = (value?: string): string | true => {
  if (value && !isValidDate(value)) return 'Invalid date format';
  return true;
};
