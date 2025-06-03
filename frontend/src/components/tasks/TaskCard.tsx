import React from 'react';
import { Icon } from '@iconify/react';
import { Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { Badge } from '../ui/Badge';
import { Task } from '../../types/task';
import { formatDate, formatRelativeDate, getDueDateColor, getPriorityColor, isOverdue, truncateString } from '../../utils/formatters';
import { PRIORITY_LABELS } from '../../utils/constants';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  selectable?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isSelected = false,
  onSelect,
  selectable = false,
}) => {
  const {
    id,
    title,
    description,
    completed,
    priority,
    category,
    due_date,
  } = task;
  
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [isCheckmarkAnimating, setIsCheckmarkAnimating] = React.useState(false);
  
  const handleToggleComplete = () => {
    setIsCheckmarkAnimating(true);
    onToggleComplete(id, !completed);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsCheckmarkAnimating(false);
    }, 300);
  };
  
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const handleCardClick = () => {
    if (selectable && onSelect) {
      onSelect(id);
    }
  };
  
  const handleDoubleClick = () => {
    onEdit(task);
  };
  
  const priorityColor = getPriorityColor(priority);
  const dueDateColor = due_date ? getDueDateColor(due_date) : 'default';
  const isTaskOverdue = due_date && isOverdue(due_date);
  
  return (
    <div 
      className={`task-card priority-${priority} ${completed ? 'opacity-70' : ''} ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
      onClick={handleCardClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <Checkbox
            isSelected={completed}
            onValueChange={handleToggleComplete}
            size="md"
            color={priorityColor as any}
            className={isCheckmarkAnimating ? 'animate-checkmark' : ''}
            aria-label={`Mark task "${title}" as ${completed ? 'incomplete' : 'complete'}`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`font-medium text-base ${completed ? 'line-through text-foreground-400' : ''}`}>
              {title}
            </h3>
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  isIconOnly 
                  variant="light" 
                  size="sm"
                  aria-label="Task actions"
                >
                  <Icon icon="lucide:more-horizontal" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Task actions">
                <DropdownItem key="edit" onPress={() => onEdit(task)}>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:edit" />
                    <span>Edit</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" onPress={() => onDelete(id)}>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:trash" />
                    <span>Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          
          {description && (
            <div className="mt-2 text-sm text-foreground-600">
              {showFullDescription || description.length <= 100 ? (
                <p>{description}</p>
              ) : (
                <div>
                  <p>{truncateString(description, 100)}</p>
                  <button
                    className="text-primary-500 text-xs mt-1 hover:underline focus:outline-none"
                    onClick={handleToggleDescription}
                  >
                    Show more
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge
              label={PRIORITY_LABELS[priority]}
              color={priorityColor as any}
              variant="flat"
              size="sm"
            />
            
            {category && (
              <Badge
                label={category}
                color="default"
                variant="flat"
                size="sm"
              />
            )}
            
            {due_date && (
              <div className={`flex items-center gap-1 text-${dueDateColor}-500`}>
                <Icon icon="lucide:calendar" className="text-xs" />
                <span title={formatDate(due_date)}>
                  {isTaskOverdue ? 'Overdue' : formatRelativeDate(due_date)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};