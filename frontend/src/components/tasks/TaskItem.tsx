import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trash2, Edit, MoreVertical, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const priorityClasses = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };
  
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start gap-4">
        <button onClick={handleToggleComplete} className="mt-1 flex-shrink-0">
          {task.completed ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300" />
          )}
        </button>

        <div className="flex-grow">
          <p className={cn('font-medium text-gray-800', task.completed && 'line-through text-gray-500')}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span
              className={cn(
                'px-2 py-1 rounded-full font-semibold',
                priorityClasses[task.priority]
              )}
            >
              Prioridad: {task.priority}
            </span>
            {task.category && (
               <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                 {task.category}
               </span>
            )}
            <span>
              Creado: {format(new Date(task.created_at), "d MMM yyyy", { locale: es })}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={openEditModal}>
                <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
        </div>
      </div>
      
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Editar Tarea">
        <TaskForm
            taskToEdit={task}
            onSubmit={async (data) => {
                onUpdate(task.id, data);
                closeEditModal();
            }}
            onCancel={closeEditModal}
        />
      </Modal>
    </>
  );
}
