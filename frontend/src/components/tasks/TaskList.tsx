import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Task } from '../../types/task';
import { Button } from '../ui/Button';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error?: any; // <--- AÑADIDO
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  selectedTaskIds: number[];
  onSelectTask: (id: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDeleteSelected: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  error, // <--- AÑADIDO
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  selectedTaskIds,
  onSelectTask,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
}) => {
  const hasSelection = selectedTaskIds.length > 0;
  const allSelected = selectedTaskIds.length === tasks.length && tasks.length > 0;

  // Error visual SIEMPRE que haya error
  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
        <div className="bg-gradient-to-tr from-red-400 via-orange-400 to-yellow-400 rounded-full p-8 mb-6 shadow-lg">
          <Icon icon="lucide:alert-triangle" className="text-white text-7xl drop-shadow-lg" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-danger-700">Error de conexión</h2>
        <p className="text-lg text-foreground-500 max-w-md mb-8">
          {error.message || 'No se pudo conectar con el servidor o cargar las tareas.'}<br />
          Por favor, revisa tu conexión o intenta recargar la página.
        </p>
        <Button 
          variant="danger"
          icon="lucide:refresh-cw"
          size="lg"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  // Empty state visual SIEMPRE, aunque no haya tareas, para evitar pantalla en blanco
  if (!isLoading && (!tasks || tasks.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
        <div className="bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 rounded-full p-8 mb-6 shadow-lg">
          <Icon icon="lucide:list-x" className="text-white text-7xl drop-shadow-lg" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-primary-700">¡No hay tareas!</h2>
        <p className="text-lg text-foreground-500 max-w-md mb-8">
          No tienes tareas creadas aún. Haz clic en <b>"Crear tu primera tarea"</b> para comenzar a organizarte.
        </p>
        <Button 
          variant="gradient"
          icon="lucide:plus"
          size="lg"
          onClick={() => window.dispatchEvent(new CustomEvent('open-task-modal'))}
        >
          Crear tu primera tarea
        </Button>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner text="Loading tasks..." />
      </div>
    );
  }
  
  return (
    <div>
      {/* Bulk actions */}
      {tasks.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-foreground-600">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} found
          </div>
          
          <div className="flex items-center gap-2">
            {hasSelection ? (
              <>
                <span className="text-sm text-foreground-600">
                  {selectedTaskIds.length} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="lucide:x"
                  onPress={onClearSelection}
                >
                  Clear
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon="lucide:trash"
                  onPress={onDeleteSelected}
                >
                  Delete Selected
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                icon="lucide:check-square"
                onPress={onSelectAll}
              >
                Select All
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Task grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleComplete={onToggleComplete}
              isSelected={selectedTaskIds.includes(task.id)}
              onSelect={onSelectTask}
              selectable={true}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};