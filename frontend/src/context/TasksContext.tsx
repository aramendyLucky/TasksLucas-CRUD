import React, { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';

const TasksContext = createContext<ReturnType<typeof useTasks> | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tasks = useTasks();
  return <TasksContext.Provider value={tasks}>{children}</TasksContext.Provider>;
};

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext debe usarse dentro de <TasksProvider>');
  return ctx;
}
