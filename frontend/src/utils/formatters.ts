import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';
import { TaskPriority } from '../types/task';
import { PRIORITY_COLORS, PRIORITY_LABELS } from './constants';

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a date string to a relative time (e.g., "2 days ago")
 */
export const formatRelativeDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return '';
  }
};

/**
 * Check if a due date is overdue
 */
export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  try {
    return isBefore(parseISO(dueDate), new Date());
  } catch (error) {
    return false;
  }
};

/**
 * Check if a due date is approaching (within 24 hours)
 */
export const isApproaching = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  try {
    const date = parseISO(dueDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isBefore(date, tomorrow) && isAfter(date, new Date());
  } catch (error) {
    return false;
  }
};

/**
 * Get the appropriate color for a due date based on its status
 */
export const getDueDateColor = (dueDate?: string): string => {
  if (!dueDate) return 'default';
  if (isOverdue(dueDate)) return 'danger';
  if (isApproaching(dueDate)) return 'warning';
  return 'default';
};

/**
 * Get the appropriate color for a priority
 */
export const getPriorityColor = (priority: TaskPriority): string => {
  return PRIORITY_COLORS[priority] || 'default';
};

/**
 * Get the label for a priority
 */
export const getPriorityLabel = (priority: TaskPriority): string => {
  return PRIORITY_LABELS[priority] || 'Unknown';
};

/**
 * Truncate a string to a specified length
 */
export const truncateString = (str: string, maxLength: number = 100): string => {
  if (!str || str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};
