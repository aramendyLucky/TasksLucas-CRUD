import React from 'react';
import { Modal } from '../ui/Modal';
import { TaskForm } from './TaskForm';
import { Task, TaskCreate } from '../../types/task';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskCreate) => Promise<void>;
  task?: Task;
  isSubmitting: boolean;
  categories: string[];
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  isSubmitting,
  categories,
}) => {
  const handleSubmit = async (data: TaskCreate) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title={task ? 'Edit Task' : 'Create New Task'}
      size="md"
    >
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        initialData={task}
        isSubmitting={isSubmitting}
        categories={categories}
      />
    </Modal>
  );
};
