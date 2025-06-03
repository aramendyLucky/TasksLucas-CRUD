import { ApiError, ApiResponse } from '../types/api';
import { Task, TaskCreate, TaskUpdate } from '../types/task';
import { API_BASE_URL } from '../utils/constants';

/**
 * Realiza una petición a la API REST del backend.
 * Maneja errores y formatea la respuesta.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Normaliza la URL para evitar doble barra y barra final
  let base = API_BASE_URL.replace(/\/+$/, ''); // quita barras finales
  let path = endpoint.replace(/^\/+/, ''); // quita barras iniciales
  let url = `${base}/${path}`;
  if (url !== base + '/') {
    url = url.replace(/\/$/, ''); // quita barra final salvo si es la raíz
  }
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Log para depuración
  console.log('[API] Fetch:', url, options);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    // Log de respuesta
    console.log('[API] Response:', response);
    let data;
    try {
      data = await response.json();
      console.log('[API] Parsed JSON:', data);
    } catch (jsonErr) {
      const msg = typeof jsonErr === 'object' && jsonErr !== null && 'message' in jsonErr ? (jsonErr as any).message : String(jsonErr);
      console.error('[API] Error al parsear JSON:', msg, 'Response:', response);
      throw {
        status: response.status,
        message: 'Error al parsear la respuesta JSON de la API',
        details: [msg],
        rawResponse: response,
      };
    }
    if (!response.ok) {
      const error = {
        status: response.status,
        message: (data && data.message) || 'An error occurred',
        details: data && data.details,
        rawResponse: data,
      };
      console.error('[API] Error response:', error, data);
      throw error;
    }
    return data;
  } catch (error) {
    let msg = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[API] Network o error desconocido:', msg, {
      endpoint,
      options,
      url,
      error,
    });
    if ((error as ApiError).status) {
      throw error;
    }
    // Error de red u otro
    throw {
      status: 0,
      message: 'Network error. Please check your connection.',
      details: [msg],
      context: { endpoint, options, url, error },
    } as ApiError;
  }
}

/**
 * Obtiene todas las tareas desde el backend (GET /tasks)
 */
export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  return apiRequest<ApiResponse<Task[]>>('/tasks');
};

/**
 * Obtiene una tarea por ID (GET /tasks/:id)
 */
export const getTask = async (id: number): Promise<ApiResponse<Task>> => {
  return apiRequest<ApiResponse<Task>>(`/tasks/${id}`);
};

/**
 * Crea una nueva tarea (POST /tasks)
 */
export const createTask = async (task: TaskCreate): Promise<ApiResponse<Task>> => {
  return apiRequest<ApiResponse<Task>>('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
};

/**
 * Actualiza una tarea existente (PATCH /tasks/:id)
 */
export const updateTask = async (id: number, updates: TaskUpdate): Promise<ApiResponse<Task>> => {
  return apiRequest<ApiResponse<Task>>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

/**
 * Elimina una tarea (DELETE /tasks/:id)
 */
export const deleteTask = async (id: number): Promise<ApiResponse<null>> => {
  return apiRequest<ApiResponse<null>>(`/tasks/${id}`, {
    method: 'DELETE',
  });
};
