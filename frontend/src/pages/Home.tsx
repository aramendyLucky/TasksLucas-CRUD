import React from 'react';
import { addToast } from '@heroui/react';
import { Layout } from '../components/layout/Layout';
import { TaskList } from '../components/tasks/TaskList';
import { TaskModal } from '../components/tasks/TaskModal';
import { TaskStats } from '../components/tasks/TaskStats';
import { TaskFilter } from '../components/tasks/TaskFilter';
import { useTasksContext } from '../context/TasksContext';
import { Task, TaskCreate } from '../types/task';

export const Home: React.FC = () => {
  const {
    filteredTasks,
    categories,
    stats,
    isLoading,
    isCreating,
    isUpdating,
    error, // <--- AÑADIDO
    addTask,
    editTask,
    toggleTaskCompletion,
    removeTask,
    removeTasks,
    selectedTaskIds,
    toggleTaskSelection,
    clearTaskSelection,
    selectAllTasks,
    filters,
    updateFilters,
    resetFilters,
  } = useTasksContext();
  
  // Modal state
  const [isTaskModalOpen, setTaskModalOpen] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState<Task | undefined>(undefined);
  
  // Open task modal for creating a new task
  const openNewTaskModal = () => {
    setCurrentTask(undefined);
    setTaskModalOpen(true);
  };
  
  // Open task modal for editing an existing task
  const openEditTaskModal = (task: Task) => {
    setCurrentTask(task);
    setTaskModalOpen(true);
  };
  
  // Close task modal
  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setCurrentTask(undefined);
  };
  
  // Handle task submission (create or update)
  const handleTaskSubmit = async (data: TaskCreate) => {
    try {
      if (currentTask) {
        await editTask(currentTask.id, data);
        addToast({
          title: 'Task Updated',
          description: 'Your task has been updated successfully.',
          color: 'success',
        });
      } else {
        await addTask(data);
        addToast({
          title: 'Task Created',
          description: 'Your new task has been created successfully.',
          color: 'success',
        });
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      addToast({
        title: 'Error',
        description: 'There was an error processing your request. Please try again.',
        color: 'danger',
      });
    }
  };
  
  // Handle task deletion
  const handleDeleteTask = async (id: number) => {
    try {
      await removeTask(id);
      addToast({
        title: 'Task Deleted',
        description: 'Your task has been deleted successfully.',
        color: 'success',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      addToast({
        title: 'Error',
        description: 'There was an error deleting the task. Please try again.',
        color: 'danger',
      });
    }
  };
  
  // Handle bulk task deletion
  const handleDeleteSelected = async () => {
    if (selectedTaskIds.length === 0) return;
    
    try {
      await removeTasks(selectedTaskIds);
      addToast({
        title: 'Tasks Deleted',
        description: `${selectedTaskIds.length} tasks have been deleted successfully.`,
        color: 'success',
      });
    } catch (error) {
      console.error('Error deleting tasks:', error);
      addToast({
        title: 'Error',
        description: 'There was an error deleting the tasks. Please try again.',
        color: 'danger',
      });
    }
  };
  
  // Handle task completion toggle
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await toggleTaskCompletion(id, completed);
      addToast({
        title: completed ? 'Task Completed' : 'Task Reopened',
        description: completed 
          ? 'Your task has been marked as completed.' 
          : 'Your task has been reopened.',
        color: 'success',
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
      addToast({
        title: 'Error',
        description: 'There was an error updating the task. Please try again.',
        color: 'danger',
      });
    }
  };
  
  // Abrir modal desde evento global (para botón de estado vacío)
  React.useEffect(() => {
    const handler = () => openNewTaskModal();
    window.addEventListener('open-task-modal', handler);
    return () => window.removeEventListener('open-task-modal', handler);
  }, []);
  
  return (
    <Layout openNewTaskModal={openNewTaskModal}>
      {/* Task stats */}
      <TaskStats
        total={stats.total}
        completed={stats.completed}
        pending={stats.pending}
        overdue={stats.overdue}
      />
      
      {/* Task filters (mobile) */}
      <div className="md:hidden mb-6">
        <TaskFilter
          filters={filters}
          onUpdateFilters={updateFilters}
          onResetFilters={resetFilters}
          categories={categories}
        />
      </div>
      
      {/* Task list */}
      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading}
        error={error} // <--- AÑADIDO
        onEditTask={openEditTaskModal}
        onDeleteTask={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        selectedTaskIds={selectedTaskIds}
        onSelectTask={toggleTaskSelection}
        onSelectAll={selectAllTasks}
        onClearSelection={clearTaskSelection}
        onDeleteSelected={handleDeleteSelected}
      />
      
      {/* Task modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onSubmit={handleTaskSubmit}
        task={currentTask}
        isSubmitting={isCreating || isUpdating}
        categories={categories}
      />
    </Layout>
  );
};
