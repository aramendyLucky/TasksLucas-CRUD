"""
Configuración de la base de datos
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Obtener la URL de conexión de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Crear el "motor" de base de datos
engine = create_engine(DATABASE_URL)

# SessionLocal es una "fábrica" para crear sesiones de BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base será la clase padre de todos nuestros modelos
Base = declarative_base()

def get_db():
    """
    Genera una sesión de base de datos.
    Se usa como dependencia en FastAPI.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
