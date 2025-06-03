"""
Operaciones CRUD (Create, Read, Update, Delete)
"""
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from . import models, schemas

def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    """Obtiene una tarea por su ID"""
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def get_tasks(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    completed: Optional[bool] = None,
    priority: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None
) -> List[models.Task]:
    """Obtiene una lista de tareas con filtros opcionales"""
    query = db.query(models.Task)
    
    if completed is not None:
        query = query.filter(models.Task.completed == completed)
    if priority:
        query = query.filter(models.Task.priority == priority)
    if category:
        query = query.filter(models.Task.category == category)
    if search:
        search_filter = or_(
            models.Task.title.ilike(f"%{search}%"),
            models.Task.description.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    query = query.order_by(models.Task.created_at.desc())
    return query.offset(skip).limit(limit).all()

def create_task(db: Session, task: schemas.TaskCreate) -> models.Task:
    """Crea una nueva tarea"""
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(
    db: Session,
    task_id: int,
    task_update: schemas.TaskUpdate
) -> Optional[models.Task]:
    """Actualiza una tarea existente"""
    db_task = get_task(db, task_id)
    if not db_task:
        return None
    
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int) -> bool:
    """Elimina una tarea"""
    db_task = get_task(db, task_id)
    if not db_task:
        return False
    
    db.delete(db_task)
    db.commit()
    return True

def get_task_stats(db: Session) -> schemas.TaskStats:
    """Obtiene estadísticas de las tareas"""
    total = db.query(models.Task).count()
    completed = db.query(models.Task).filter(models.Task.completed == True).count()
    high_priority = db.query(models.Task).filter(models.Task.priority == "high").count()
    
    return schemas.TaskStats(
        total_tasks=total,
        completed_tasks=completed,
        pending_tasks=total - completed,
        high_priority_tasks=high_priority
    )
