import React from 'react';
import { Task, TaskCreate, TaskUpdate, FilterState } from '../types/task';
import { useApi } from './useApi';
import { createTask, deleteTask, getTasks, updateTask } from '../services/api';
import { PRIORITY_ORDER } from '../utils/constants';
import { isOverdue } from '../utils/formatters';

// Estado de filtros por defecto
const defaultFilters: FilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
  sortBy: 'created_at',
  sortOrder: 'desc',
};

/**
 * Hook principal para la gestión global de tareas y filtros.
 * Provee todas las operaciones CRUD y filtrado, usando la API real.
 */
export function useTasks() {
  // Hooks para llamadas a la API REST
  const tasksApi = useApi(getTasks);
  const createTaskApi = useApi(createTask, { 
    showSuccessToast: true, 
    successMessage: 'Tarea creada correctamente' 
  });
  const updateTaskApi = useApi(updateTask, { 
    showSuccessToast: true, 
    successMessage: 'Tarea actualizada correctamente' 
  });
  const deleteTaskApi = useApi(deleteTask, { 
    showSuccessToast: true, 
    successMessage: 'Tarea eliminada correctamente' 
  });

  // Estado local de tareas (sin localStorage, solo en memoria)
  const [tasks, setTasks] = React.useState<Task[]>([]);
  // Estado de filtros global
  const [filters, setFilters] = React.useState<FilterState>(defaultFilters);
  // Estado de selección múltiple
  const [selectedTaskIds, setSelectedTaskIds] = React.useState<number[]>([]);

  // Al montar, obtener todas las tareas del backend
  React.useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Obtiene todas las tareas desde la API y actualiza el estado global
   */
  const fetchTasks = async () => {
    try {
      const result = await tasksApi.execute();
      setTasks(result.data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  /**
   * Crea una nueva tarea y la agrega al estado global
   */
  const addTask = async (task: TaskCreate) => {
    try {
      await createTaskApi.execute(task);
      // Refresca la lista completa desde el backend para evitar desincronización
      await fetchTasks();
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  };

  /**
   * Actualiza una tarea existente por ID
   */
  const editTask = async (id: number, updates: TaskUpdate) => {
    try {
      const result = await updateTaskApi.execute(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? result.data : task));
      return result.data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw error;
    }
  };

  /**
   * Marca una tarea como completada o pendiente
   */
  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    return editTask(id, { completed });
  };

  /**
   * Elimina una tarea por ID
   */
  const removeTask = async (id: number) => {
    try {
      await deleteTaskApi.execute(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setSelectedTaskIds(prev => prev.filter(taskId => taskId !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }
  };

  /**
   * Elimina varias tareas por sus IDs
   */
  const removeTasks = async (ids: number[]) => {
    try {
      await Promise.all(ids.map(id => deleteTaskApi.execute(id)));
      setTasks(prev => prev.filter(task => !ids.includes(task.id)));
      setSelectedTaskIds([]);
    } catch (error) {
      console.error('Error al eliminar tareas:', error);
      throw error;
    }
  };

  /**
   * Selecciona o deselecciona una tarea para acciones en lote
   */
  const toggleTaskSelection = (id: number) => {
    setSelectedTaskIds(prev => 
      prev.includes(id) 
        ? prev.filter(taskId => taskId !== id) 
        : [...prev, id]
    );
  };

  /**
   * Limpia la selección de tareas
   */
  const clearTaskSelection = () => {
    setSelectedTaskIds([]);
  };

  /**
   * Selecciona todas las tareas filtradas
   */
  const selectAllTasks = () => {
    setSelectedTaskIds(filteredTasks.map(task => task.id));
  };

  /**
   * Actualiza los filtros globales
   */
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Restaura los filtros a su estado por defecto
   */
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  /**
   * Aplica los filtros y ordenamientos a la lista de tareas
   */
  const filteredTasks = React.useMemo(() => {
    let result = [...tasks];
    // Filtro por búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }
    // Filtro por estado
    if (filters.status !== 'all') {
      const isCompleted = filters.status === 'completed';
      result = result.filter(task => task.completed === isCompleted);
    }
    // Filtro por prioridad
    if (filters.priority !== 'all') {
      result = result.filter(task => task.priority === filters.priority);
    }
    // Filtro por categoría
    if (filters.category !== 'all') {
      result = result.filter(task => task.category === filters.category);
    }
    // Ordenamiento
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          comparison = (PRIORITY_ORDER[b.priority] || 0) - (PRIORITY_ORDER[a.priority] || 0);
          break;
        case 'due_date':
          if (!a.due_date && !b.due_date) comparison = 0;
          else if (!a.due_date) comparison = 1;
          else if (!b.due_date) comparison = -1;
          else comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          break;
        case 'created_at':
        default:
          comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
    return result;
  }, [tasks, filters]);

  /**
   * Obtiene las categorías únicas de las tareas
   */
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    tasks.forEach(task => {
      if (task.category) {
        uniqueCategories.add(task.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [tasks]);

  /**
   * Estadísticas de tareas (total, completadas, pendientes, vencidas)
   */
  const stats = React.useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(task => !task.completed && task.due_date && isOverdue(task.due_date)).length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  // Retornar todas las funciones y estados relevantes para el contexto global
  return {
    // Datos de tareas
    tasks,
    filteredTasks,
    categories,
    stats,
    // Estados de carga y error
    isLoading: tasksApi.isLoading,
    isCreating: createTaskApi.isLoading,
    isUpdating: updateTaskApi.isLoading,
    isDeleting: deleteTaskApi.isLoading,
    error: tasksApi.error,
    // Operaciones CRUD
    fetchTasks,
    addTask,
    editTask,
    toggleTaskCompletion,
    removeTask,
    removeTasks,
    // Selección múltiple
    selectedTaskIds,
    toggleTaskSelection,
    clearTaskSelection,
    selectAllTasks,
    // Filtros
    filters,
    updateFilters,
    resetFilters,
  };
}
