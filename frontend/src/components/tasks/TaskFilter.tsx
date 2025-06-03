import React from 'react';
import { Icon } from '@iconify/react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { FilterState, TaskPriority } from '../../types/task';
import { PRIORITY_LABELS } from '../../utils/constants';

interface TaskFilterProps {
  filters: FilterState;
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  categories: string[];
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  categories,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Status filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="flat" 
            size="sm"
            endContent={<Icon icon="lucide:chevron-down" />}
          >
            Status: {filters.status === 'all' ? 'All' : filters.status === 'completed' ? 'Completed' : 'Pending'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Status filter"
          selectionMode="single"
          selectedKeys={[filters.status]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0];
            if (selected) {
              onUpdateFilters({ status: selected as any });
            }
          }}
        >
          <DropdownItem key="all">All</DropdownItem>
          <DropdownItem key="pending">Pending</DropdownItem>
          <DropdownItem key="completed">Completed</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      {/* Priority filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="flat" 
            size="sm"
            endContent={<Icon icon="lucide:chevron-down" />}
          >
            Priority: {filters.priority === 'all' ? 'All' : PRIORITY_LABELS[filters.priority as TaskPriority]}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Priority filter"
          selectionMode="single"
          selectedKeys={[filters.priority]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0];
            if (selected) {
              onUpdateFilters({ priority: selected as any });
            }
          }}
        >
          <DropdownItem key="all">All</DropdownItem>
          {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
            <DropdownItem key={value}>{label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      
      {/* Category filter */}
      {categories.length > 0 && (
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="flat" 
              size="sm"
              endContent={<Icon icon="lucide:chevron-down" />}
            >
              Category: {filters.category === 'all' ? 'All' : filters.category}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Category filter"
            selectionMode="single"
            selectedKeys={[filters.category]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected) {
                onUpdateFilters({ category: selected as any });
              }
            }}
          >
            <DropdownItem key="all">All</DropdownItem>
            {categories.map((category) => (
              <DropdownItem key={category}>{category}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
      
      {/* Sort options */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="flat" 
            size="sm"
            endContent={<Icon icon="lucide:chevron-down" />}
          >
            Sort: {filters.sortBy === 'created_at' ? 'Date Created' : 
                  filters.sortBy === 'due_date' ? 'Due Date' :
                  filters.sortBy === 'priority' ? 'Priority' : 'Title'}
            {' '}
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Sort options">
          <DropdownItem 
            key="created_at" 
            onPress={() => onUpdateFilters({ 
              sortBy: 'created_at', 
              sortOrder: filters.sortBy === 'created_at' && filters.sortOrder === 'desc' ? 'asc' : 'desc' 
            })}
          >
            Date Created {filters.sortBy === 'created_at' ? (filters.sortOrder === 'asc' ? '↑' : '↓') : ''}
          </DropdownItem>
          <DropdownItem 
            key="due_date" 
            onPress={() => onUpdateFilters({ 
              sortBy: 'due_date', 
              sortOrder: filters.sortBy === 'due_date' && filters.sortOrder === 'desc' ? 'asc' : 'desc' 
            })}
          >
            Due Date {filters.sortBy === 'due_date' ? (filters.sortOrder === 'asc' ? '↑' : '↓') : ''}
          </DropdownItem>
          <DropdownItem 
            key="priority" 
            onPress={() => onUpdateFilters({ 
              sortBy: 'priority', 
              sortOrder: filters.sortBy === 'priority' && filters.sortOrder === 'desc' ? 'asc' : 'desc' 
            })}
          >
            Priority {filters.sortBy === 'priority' ? (filters.sortOrder === 'asc' ? '↑' : '↓') : ''}
          </DropdownItem>
          <DropdownItem 
            key="title" 
            onPress={() => onUpdateFilters({ 
              sortBy: 'title', 
              sortOrder: filters.sortBy === 'title' && filters.sortOrder === 'desc' ? 'asc' : 'desc' 
            })}
          >
            Title {filters.sortBy === 'title' ? (filters.sortOrder === 'asc' ? '↑' : '↓') : ''}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      {/* Reset filters */}
      <Button 
        variant="ghost" 
        size="sm"
        icon="lucide:refresh-cw"
        onPress={onResetFilters}
      >
        Reset
      </Button>
    </div>
  );
};
