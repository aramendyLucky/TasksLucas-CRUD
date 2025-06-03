import React from 'react';
import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

export const TaskStats: React.FC<TaskStatsProps> = ({
  total,
  completed,
  pending,
  overdue,
}) => {
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <Card className="p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-full p-3">
            <Icon icon="lucide:list-checks" className="text-primary-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-foreground-500">Total Tasks</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-success-100 rounded-full p-3">
            <Icon icon="lucide:check-circle" className="text-success-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-foreground-500">Completed</p>
            <p className="text-2xl font-semibold">{completed}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-warning-100 rounded-full p-3">
            <Icon icon="lucide:clock" className="text-warning-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-foreground-500">Pending</p>
            <p className="text-2xl font-semibold">{pending}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-danger-100 rounded-full p-3">
            <Icon icon="lucide:alert-circle" className="text-danger-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-foreground-500">Overdue</p>
            <p className="text-2xl font-semibold">{overdue}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-divider">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-foreground-500">Completion Rate</p>
          <p className="text-sm font-medium">{completionPercentage}%</p>
        </div>
        <div className="w-full bg-content2 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
