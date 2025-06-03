import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../ui/Button';
import { useTasksContext } from '../../context/TasksContext';
import { PRIORITY_LABELS } from '../../utils/constants';
import { TaskPriority } from '../../types/task';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { filters, updateFilters, resetFilters, categories } = useTasksContext();
  
  // Handle status filter change
  const handleStatusChange = (status: 'all' | 'pending' | 'completed') => {
    updateFilters({ status });
  };
  
  // Handle priority filter change
  const handlePriorityChange = (priority: TaskPriority | 'all') => {
    updateFilters({ priority });
  };
  
  // Handle category filter change
  const handleCategoryChange = (category: string | 'all') => {
    updateFilters({ category });
  };
  
  // Handle sort change
  const handleSortChange = (sortBy: string) => {
    if (filters.sortBy === sortBy) {
      // Toggle sort order if clicking the same sort option
      updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      // Default to descending for new sort option
      updateFilters({ sortBy: sortBy as any, sortOrder: 'desc' });
    }
  };
  
  // Get sort icon based on current sort
  const getSortIcon = (sortBy: string) => {
    if (filters.sortBy !== sortBy) return 'lucide:arrow-down-up';
    return filters.sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down';
  };
  
  // Mobile sidebar overlay
  const sidebarClass = isOpen
    ? 'translate-x-0 opacity-100'
    : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100';
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen md:h-[calc(100vh-61px)] w-64 bg-content1/80 backdrop-blur-md z-30 
                   border-r border-divider p-4 transition-all duration-300 ${sidebarClass}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              isIconOnly 
              icon="lucide:x" 
              onPress={closeSidebar}
              className="md:hidden"
              aria-label="Close sidebar"
            />
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto">
            {/* Status filter */}
            <div>
              <h3 className="text-sm font-medium text-foreground-700 mb-2">Status</h3>
              <div className="space-y-1">
                <Button
                  variant={filters.status === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleStatusChange('all')}
                >
                  All Tasks
                </Button>
                <Button
                  variant={filters.status === 'pending' ? 'primary' : 'ghost'}
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleStatusChange('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filters.status === 'completed' ? 'primary' : 'ghost'}
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleStatusChange('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
            
            {/* Priority filter */}
            <div>
              <h3 className="text-sm font-medium text-foreground-700 mb-2">Priority</h3>
              <div className="space-y-1">
                <Button
                  variant={filters.priority === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handlePriorityChange('all')}
                >
                  All Priorities
                </Button>
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <Button
                    key={value}
                    variant={filters.priority === value ? 'primary' : 'ghost'}
                    size="sm"
                    className="justify-start w-full"
                    onPress={() => handlePriorityChange(value as TaskPriority)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Category filter */}
            {categories.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground-700 mb-2">Category</h3>
                <div className="space-y-1">
                  <Button
                    variant={filters.category === 'all' ? 'primary' : 'ghost'}
                    size="sm"
                    className="justify-start w-full"
                    onPress={() => handleCategoryChange('all')}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filters.category === category ? 'primary' : 'ghost'}
                      size="sm"
                      className="justify-start w-full"
                      onPress={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sort options */}
            <div>
              <h3 className="text-sm font-medium text-foreground-700 mb-2">Sort By</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleSortChange('created_at')}
                  endContent={<Icon icon={getSortIcon('created_at')} />}
                >
                  Date Created
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleSortChange('due_date')}
                  endContent={<Icon icon={getSortIcon('due_date')} />}
                >
                  Due Date
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleSortChange('priority')}
                  endContent={<Icon icon={getSortIcon('priority')} />}
                >
                  Priority
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                  onPress={() => handleSortChange('title')}
                  endContent={<Icon icon={getSortIcon('title')} />}
                >
                  Title
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reset filters */}
          <Button
            variant="ghost"
            size="sm"
            icon="lucide:refresh-cw"
            onPress={resetFilters}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      </aside>
    </>
  );
};