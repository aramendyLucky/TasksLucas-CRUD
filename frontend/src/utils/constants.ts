import { TaskPriority } from "../types/task";

// Environment variable typings están en vite-env.d.ts

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Task Manager';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'success',
  medium: 'warning',
  high: 'secondary',
  urgent: 'danger'
};

export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4
};

export const LOCAL_STORAGE_KEYS = {
  FILTERS: 'taskManager.filters',
  SIDEBAR_STATE: 'taskManager.sidebarState',
  THEME: 'taskManager.theme'
};

export const KEYBOARD_SHORTCUTS = {
  'Ctrl+N': 'Create new task',
  'Ctrl+K': 'Search tasks',
  'Escape': 'Close modal/clear search',
  'Enter': 'Confirm action',
  'Delete': 'Delete selected task'
};
