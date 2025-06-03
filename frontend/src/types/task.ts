export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'all' | 'pending' | 'completed';
export type SortBy = 'created_at' | 'due_date' | 'priority' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  category?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority: TaskPriority;
  category?: string;
  due_date?: string;
}

export interface TaskUpdate extends Partial<TaskCreate> {
  completed?: boolean;
}

export interface FilterState {
  search: string;
  status: TaskStatus;
  priority: TaskPriority | 'all';
  category: string | 'all';
  sortBy: SortBy;
  sortOrder: SortOrder;
}
