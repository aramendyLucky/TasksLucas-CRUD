"""
Esquemas de validación con Pydantic
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    """Esquema base con campos comunes"""
    title: str = Field(..., min_length=1, max_length=200, description="Título de la tarea")
    description: Optional[str] = Field(None, description="Descripción detallada")
    priority: str = Field(default="medium", description="Prioridad: low, medium, high")
    category: Optional[str] = Field(None, max_length=50, description="Categoría de la tarea")

class TaskCreate(TaskBase):
    """Esquema para crear una nueva tarea"""
    pass

class TaskUpdate(BaseModel):
    """Esquema para actualizar una tarea"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None
    category: Optional[str] = None

class TaskResponse(TaskBase):
    """Esquema para devolver una tarea"""
    id: int
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class TaskStats(BaseModel):
    """Esquema para estadísticas de tareas"""
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    high_priority_tasks: int

# --- REFAC: Esquema de respuesta para lista de tareas ---
# Esto permite que el endpoint /tasks devuelva { success, data, message }
# y así el frontend pueda parsear correctamente la respuesta.
class TaskListResponse(BaseModel):
    """Esquema para la lista de tareas"""
    success: bool
    data: List[TaskResponse]
    message: Optional[str] = None
