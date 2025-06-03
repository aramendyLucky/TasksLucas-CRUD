"""
Aplicación principal FastAPI
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import tasks

# Crear las tablas en la base de datos si no existen
# Para un enfoque de producción, se recomienda usar Alembic
# Base.metadata.create_all(bind=engine)

# Crear la aplicación FastAPI 
app = FastAPI(
    title="Task Manager API",
    description="Una API REST para gestionar tareas",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# --- REFAC: Configuración de CORS ---
# Para desarrollo, se permite cualquier origen (allow_origins=["*"]) para evitar errores de CORS
# en el frontend. En producción, se debe restringir a los orígenes necesarios.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir cualquier origen temporalmente
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(tasks.router)

@app.get("/")
def read_root():
    """Ruta raíz"""
    return {
        "message": "¡Bienvenido a Task Manager API!",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    """Health check"""
    return {"status": "healthy", "message": "API funcionando correctamente"}
