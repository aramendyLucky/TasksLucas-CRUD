import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TaskCreate, TaskPriority, Task } from '../../types/task';
import { PRIORITY_LABELS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { validateTaskDescription, validateTaskDueDate, validateTaskTitle } from '../../utils/validators';

interface TaskFormProps {
  onSubmit: (data: TaskCreate) => void;
  onCancel: () => void;
  initialData?: Task;
  isSubmitting?: boolean;
  categories: string[];
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isSubmitting = false,
  categories,
}) => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch,
  } = useForm<TaskCreate>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
      category: initialData?.category || '',
      due_date: initialData?.due_date ? formatDate(initialData.due_date) : '',
    },
  });
  
  const watchCategory = watch('category');
  
  // Filter categories based on input
  const [filteredCategories, setFilteredCategories] = React.useState<string[]>(categories);
  const [showCategorySuggestions, setShowCategorySuggestions] = React.useState(false);
  
  React.useEffect(() => {
    if (watchCategory) {
      const filtered = categories.filter(cat => 
        cat.toLowerCase().includes(watchCategory.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [watchCategory, categories]);
  
  const handleCategoryFocus = () => {
    setShowCategorySuggestions(true);
  };
  
  const handleCategoryBlur = () => {
    // Delay hiding suggestions to allow for selection
    setTimeout(() => {
      setShowCategorySuggestions(false);
    }, 200);
  };
  
  const selectCategory = (category: string) => {
    setValue('category', category);
    setShowCategorySuggestions(false);
  };
  
  const priorityOptions = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="title"
        control={control}
        rules={{
          validate: validateTaskTitle,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Title"
            placeholder="Task title"
            error={errors.title?.message}
            isRequired
            autoFocus
          />
        )}
      />
      
      <Controller
        name="description"
        control={control}
        rules={{
          validate: validateTaskDescription,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Description"
            placeholder="Task description"
            error={errors.description?.message}
            type="textarea"
          />
        )}
      />
      
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground-600">Priority</label>
            <div className="flex gap-2">
              {priorityOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`px-3 py-2 rounded-md border-2 transition-all text-xs font-bold flex items-center gap-1
                    ${field.value === opt.value ?
                      (opt.value === 'high' ? 'border-danger-500 bg-danger-100 text-danger-700 shadow-md' :
                       opt.value === 'medium' ? 'border-warning-500 bg-warning-100 text-warning-700 shadow-md' :
                       'border-success-500 bg-success-100 text-success-700 shadow-md')
                      : 'border-divider bg-content1 text-foreground-500 hover:bg-content2'}
                  `}
                  onClick={() => field.onChange(opt.value)}
                  aria-label={opt.label}
                >
                  {opt.value === 'high' && <Icon icon="lucide:arrow-up" className="text-danger-500" />}
                  {opt.value === 'medium' && <Icon icon="lucide:minus" className="text-warning-500" />}
                  {opt.value === 'low' && <Icon icon="lucide:arrow-down" className="text-success-500" />}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      />
      <div className="relative min-h-[60px]">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground-600">Category</label>
              <Input
                {...field}
                placeholder="Enter or select a category"
                onFocus={handleCategoryFocus}
                onBlur={handleCategoryBlur}
                className="w-full"
              />
              {showCategorySuggestions && (
                <div className="absolute left-0 right-0 z-30 mt-1 bg-content1 border border-divider rounded-lg shadow-2xl max-h-48 overflow-y-auto animate-fade-in p-1"
                  style={{ minWidth: '180px' }}
                >
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <div
                        key={category}
                        className="px-3 py-2 rounded-md hover:bg-primary-200 hover:text-primary-900 cursor-pointer transition-all flex items-center gap-2"
                        onClick={() => selectCategory(category)}
                      >
                        <Icon icon="lucide:tag" className="text-primary-400" />
                        <span className="truncate">{category}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-foreground-400 italic select-none">
                      No hay categorías guardadas aún
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        />
      </div>
      
      <Controller
        name="due_date"
        control={control}
        rules={{
          validate: validateTaskDueDate,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Due Date"
            placeholder="YYYY-MM-DD"
            type="date"
            error={errors.due_date?.message}
          />
        )}
      />
      
      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="ghost"
          onPress={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon="lucide:check"
        >
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};