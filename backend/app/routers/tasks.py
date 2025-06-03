"""
Rutas/endpoints para tareas
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, schemas, database

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.post("", response_model=schemas.TaskResponse, status_code=201)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(database.get_db)
):
    """Crear una nueva tarea"""
    return crud.create_task(db=db, task=task)

# --- REFAC: Endpoint GET /tasks ahora devuelve un objeto con success/data/message ---
# Esto es necesario porque el frontend espera un objeto { success, data, message },
# no un array plano. Si no se hace así, el frontend lanza 'tasks is undefined'.
# El esquema de respuesta se define en schemas.TaskListResponse.
@router.get("", response_model=schemas.TaskListResponse)
def read_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    completed: Optional[bool] = Query(None),
    priority: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(database.get_db)
):
    """Obtener lista de tareas con filtros. RESPUESTA: { success, data, message }"""
    tasks = crud.get_tasks(
        db=db,
        skip=skip,
        limit=limit,
        completed=completed,
        priority=priority,
        category=category,
        search=search
    )
    return {
        "success": True,
        "data": tasks,
        "message": "Tareas obtenidas correctamente"
    }

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def read_task(task_id: int, db: Session = Depends(database.get_db)):
    """Obtener una tarea específica"""
    db_task = crud.get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return db_task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    task: schemas.TaskUpdate,
    db: Session = Depends(database.get_db)
):
    """Actualizar una tarea"""
    db_task = crud.update_task(db=db, task_id=task_id, task_update=task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return db_task

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    """Eliminar una tarea"""
    success = crud.delete_task(db=db, task_id=task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

@router.get("/stats/summary", response_model=schemas.TaskStats)
def get_task_statistics(db: Session = Depends(database.get_db)):
    """Obtener estadísticas de tareas"""
    return crud.get_task_stats(db=db)
