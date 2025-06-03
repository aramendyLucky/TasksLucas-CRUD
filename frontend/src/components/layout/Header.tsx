import React from 'react';
import { Icon } from '@iconify/react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTasksContext } from '../../context/TasksContext';

interface HeaderProps {
  toggleSidebar: () => void;
  openNewTaskModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, openNewTaskModal }) => {
  const { stats, filters, updateFilters } = useTasksContext();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+N to create new task
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      openNewTaskModal();
    }
  };
  
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [openNewTaskModal]);
  
  return (
    <header className="sticky top-0 z-10 bg-background/70 backdrop-blur-md border-b border-divider px-4 py-3">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              isIconOnly 
              size="sm" 
              icon="lucide:menu" 
              onPress={toggleSidebar}
              className="md:hidden"
              aria-label="Toggle sidebar"
            />
            
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-primary-500 text-2xl" />
              <h1 className="text-xl font-semibold">Task Manager</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-3 ml-6">
              <div className="flex items-center gap-1 text-sm">
                <span className="text-foreground-500">Total:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-foreground-500">Completed:</span>
                <span className="font-medium text-success-500">{stats.completed}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-foreground-500">Pending:</span>
                <span className="font-medium text-primary-500">{stats.pending}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-foreground-500">Overdue:</span>
                <span className="font-medium text-danger-500">{stats.overdue}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search tasks..."
              size="sm"
              radius="full"
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              value={filters.search}
              onChange={handleSearch}
              className="w-full md:w-64"
              aria-label="Search tasks"
            />
            
            <Button 
              variant="gradient"
              size="sm"
              icon="lucide:plus"
              onPress={openNewTaskModal}
              aria-label="Create new task"
            >
              New Task
            </Button>
          </div>
        </div>
        
        <div className="flex md:hidden items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-foreground-500">Total:</span>
            <span className="font-medium">{stats.total}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-foreground-500">Completed:</span>
            <span className="font-medium text-success-500">{stats.completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-foreground-500">Pending:</span>
            <span className="font-medium text-primary-500">{stats.pending}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-foreground-500">Overdue:</span>
            <span className="font-medium text-danger-500">{stats.overdue}</span>
          </div>
        </div>
      </div>
    </header>
  );
};