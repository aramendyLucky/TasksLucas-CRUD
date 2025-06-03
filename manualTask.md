# Manual Maestro de TASKsYATO

Este documento es la guía técnica y de arquitectura para desarrolladores y colaboradores de TASKsYATO. Aquí encontrarás toda la información detallada sobre la estructura, tecnologías, hooks, componentes y el flujo interno de la app.

---

## 1. Estructura del Proyecto

```
task-crud-app/
├── backend/           # Backend FastAPI (API REST, DB, migraciones)
├── frontend/          # Frontend React + TypeScript (SPA)
├── docker-compose.yml # Orquestación de servicios (DB)
└── README.md          # Documentación principal
```

### ¿Por qué esta estructura?
- **Separación de responsabilidades:** Backend y frontend están desacoplados, permitiendo desarrollo y despliegue independientes.
- **Escalabilidad:** Facilita agregar microservicios, tests, CI/CD, etc.
- **Mantenibilidad:** Cada parte tiene su propio ciclo de vida y dependencias.

---

## 2. Tecnologías y su propósito

- **FastAPI:** Framework Python moderno para APIs REST, rápido y con tipado fuerte.
- **PostgreSQL:** Base de datos robusta y open source, ideal para datos relacionales.
- **Alembic:** Migraciones de base de datos, control de versiones del esquema.
- **React + TypeScript:** Frontend moderno, tipado, componentes reutilizables.
- **Vite:** Bundler ultrarrápido para desarrollo React.
- **TailwindCSS:** Utilidades CSS para estilos rápidos y consistentes.
- **Docker:** Facilita el despliegue y la portabilidad de la base de datos.

---

## 3. Estructura de carpetas y archivos (detallada)

### backend/
- **app/**: Código principal de FastAPI.
  - `main.py`: Punto de entrada de la API.
  - `models.py`: Modelos de datos SQLAlchemy.
  - `crud.py`: Funciones CRUD (Create, Read, Update, Delete).
  - `database.py`: Conexión y configuración de la base de datos.
  - `schemas.py`: Esquemas Pydantic para validación y serialización.
  - `routers/`: Rutas de la API (por ejemplo, `tasks.py`).
- **alembic/**: Migraciones de base de datos.
- **alembic.ini**: Configuración de Alembic.
- **requirements.txt**: Dependencias Python.

### frontend/
- **src/**: Código fuente React.
  - **components/**: Componentes UI reutilizables.
    - `layout/`: Estructura general (Header, Sidebar, Layout).
    - `tasks/`: Componentes de tareas (TaskCard, TaskList, TaskForm, etc).
    - `ui/`: Componentes genéricos (Button, Input, Modal, etc).
  - **context/**: Contextos globales (TasksContext).
  - **hooks/**: Hooks personalizados (useTasks, useApi, useLocalStorage).
  - **pages/**: Páginas principales (Home, NotFound).
  - **services/**: Lógica de acceso a la API (`api.ts`).
  - **types/**: Tipos TypeScript compartidos.
  - **utils/**: Utilidades y helpers (formatters, constants, validators).
  - `main.tsx`: Punto de entrada React.
  - `App.tsx`: Componente raíz de la app.

---

## 4. Explicación de archivos y funciones clave

### 4.1. main.tsx
- **Función principal:** Monta la app React y envuelve todo en el `TasksProvider` para proveer estado global.

### 4.2. App.tsx
- **Función principal:** Define las rutas y la estructura base de la SPA.

### 4.3. context/TasksContext.tsx
- **TasksProvider:** Provee el contexto global de tareas y filtros a toda la app.
- **useTasksContext:** Hook para consumir el contexto de tareas en cualquier componente.

### 4.4. hooks/useTasks.ts
- **useTasks:** Hook maestro que gestiona el estado global de tareas y filtros, y expone todas las operaciones CRUD y de filtrado.
  - **fetchTasks:** Obtiene todas las tareas del backend.
  - **addTask:** Crea una nueva tarea.
  - **editTask:** Actualiza una tarea existente.
  - **toggleTaskCompletion:** Marca una tarea como completada o pendiente.
  - **removeTask:** Elimina una tarea.
  - **removeTasks:** Elimina varias tareas.
  - **toggleTaskSelection:** Selecciona/deselecciona tareas para acciones en lote.
  - **clearTaskSelection:** Limpia la selección.
  - **selectAllTasks:** Selecciona todas las tareas filtradas.
  - **updateFilters:** Actualiza los filtros globales.
  - **resetFilters:** Restaura los filtros por defecto.
  - **filteredTasks:** Lista de tareas filtradas y ordenadas.
  - **categories:** Categorías únicas de las tareas.
  - **stats:** Estadísticas (total, completadas, pendientes, vencidas).

### 4.5. hooks/useApi.ts
- **useApi:** Hook genérico para manejar llamadas a la API con estados de carga y error, y mostrar toasts de feedback.

### 4.6. services/api.ts
- **apiRequest:** Función base para peticiones HTTP a la API REST.
- **getTasks, getTask, createTask, updateTask, deleteTask:** Funciones CRUD que interactúan con el backend.

### 4.7. components/layout/
- **Header.tsx:** Encabezado de la app, muestra el título y accesos rápidos.
- **Sidebar.tsx:** Barra lateral con filtros y navegación.
- **Layout.tsx:** Estructura general de la página, integra Header y Sidebar.

### 4.8. components/tasks/
- **TaskCard.tsx:** Tarjeta visual de una tarea individual.
- **TaskList.tsx:** Lista de tareas, maneja selección y acciones en lote.
- **TaskForm.tsx:** Formulario para crear/editar tareas.
- **TaskModal.tsx:** Modal para crear/editar tareas.
- **TaskStats.tsx:** Estadísticas de tareas.
- **TaskFilter.tsx:** Filtros avanzados de tareas.
- **TaskItem.tsx:** (Si existe) Variante de visualización de tarea.

### 4.9. pages/Home.tsx
- **Home:** Página principal, integra TaskList, TaskStats, TaskModal y TaskFilter.

### 4.10. utils/
- **constants.ts:** Constantes globales (API URL, prioridades, etc).
- **formatters.ts:** Funciones para formatear fechas, textos, etc.
- **validators.ts:** Validaciones de formularios.

### 4.11. types/
- **task.ts:** Tipos de datos de tareas, filtros, prioridades, etc.
- **api.ts:** Tipos de respuesta y error de la API.

---

## 5. Flujo de información y arquitectura
- El usuario interactúa con componentes (TaskForm, filtros, etc).
- Los componentes usan el contexto global (`useTasksContext`) para acceder y modificar tareas/filtros.
- El contexto usa hooks (`useTasks`, `useApi`) para gestionar estado y llamadas a la API.
- La API responde y el estado global se actualiza, propagando cambios a toda la UI.

---

## 6. Consejos para contribuir o extender
- Mantén la separación de lógica (hooks), presentación (components) y acceso a datos (services).
- Usa TypeScript para evitar errores de tipado.
- Documenta funciones y componentes complejos.
- Usa el contexto global para estados compartidos.
- Agrega tests y validaciones en el backend y frontend.

---

## 7. Sección didáctica: Filtros, estado global y React Context

### ¿Qué problema surgió?
Al implementar el filtrado de tareas, el filtro a veces no se actualizaba correctamente o se "reseteaba" al cambiar de página o realizar acciones. Esto causaba confusión y una experiencia de usuario inconsistente.

### ¿Por qué ocurría?
Inicialmente, el estado de los filtros y las tareas se manejaba de forma local en cada componente. Esto significa que cada vez que se recargaba la página, se navegaba o se actualizaba un componente, el estado podía perderse o desincronizarse. Además, si varios componentes necesitaban acceder o modificar el filtro, cada uno tenía su propia copia, lo que llevaba a inconsistencias.

### ¿Cómo se solucionó?
Se implementó un **estado global** usando React Context (`TasksContext`). Ahora, tanto las tareas como el filtro activo se almacenan en un contexto compartido. Todos los componentes relevantes acceden y modifican el mismo estado global, garantizando que los cambios se reflejen en toda la app de manera inmediata y consistente.

### ¿Por qué es importante?
- **Sincronización:** El estado global asegura que todos los componentes vean la misma información y respondan a los mismos cambios.
- **Escalabilidad:** Permite agregar nuevas funcionalidades (más filtros, ordenamientos, etc.) sin duplicar lógica ni crear bugs difíciles de rastrear.
- **Mantenibilidad:** El código es más limpio y fácil de entender, ya que la lógica de estado está centralizada.

### Reflexión y consejos
- Cuando varios componentes necesitan compartir o modificar el mismo estado, considera usar React Context o una librería de manejo de estado global (Redux, Zustand, etc.).
- El estado local es útil para datos que sólo afectan a un componente, pero para datos "transversales" (como usuario autenticado, filtros, temas, etc.), el contexto global es la mejor opción.
- Entender el flujo de datos y el ciclo de vida de los componentes es clave para evitar bugs sutiles en apps React.

---

# Histórico de problemas y refactorizaciones (2025-06-02)

## Problema principal
- El frontend React no podía comunicarse correctamente con el backend FastAPI.
- Se presentaban errores de CORS (Cross-Origin Resource Sharing) y errores de red.
- El frontend esperaba que la API devolviera un objeto `{ success, data, message }`, pero el backend devolvía un array plano de tareas, lo que causaba el error `tasks is undefined` y rompía la UI.

## Causas
- El backend no tenía configurado correctamente el middleware CORS, por lo que el navegador bloqueaba las peticiones.
- El endpoint `/tasks` devolvía un array, pero el frontend esperaba un objeto con metadatos.

## Soluciones y refactorizaciones

### 1. Configuración de CORS
- Se editó `backend/app/main.py` para agregar el middleware CORS y permitir cualquier origen temporalmente:
  ```python
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],  # Solo para desarrollo
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```
- Esto permitió que el frontend pudiera comunicarse con el backend sin bloqueos de navegador.

### 2. Formato de respuesta de la API
- Se creó un nuevo esquema en `backend/app/schemas.py`:
  ```python
  class TaskListResponse(BaseModel):
      success: bool
      data: List[TaskResponse]
      message: Optional[str] = None
  ```
- Se modificó el endpoint `/tasks` en `backend/app/routers/tasks.py` para devolver:
  ```python
  return {
      "success": True,
      "data": tasks,
      "message": "Tareas obtenidas correctamente"
  }
  ```
- Esto resolvió el error de `tasks is undefined` en el frontend, ya que ahora la respuesta cumple con lo que espera el hook `useApi` y el resto de la app.

### 3. Validación y pruebas
- Se reinició el backend y el frontend.
- Se verificó que la web muestra correctamente el mensaje de "¡No hay tareas!" si la base está vacía, y que permite crear, listar y eliminar tareas sin errores de red ni de parsing.

## Resumen
- El problema principal era la incompatibilidad entre el formato de respuesta del backend y lo que esperaba el frontend.
- La solución fue estandarizar la respuesta de la API y asegurar la configuración de CORS.
- Ahora la app funciona correctamente y la UI nunca queda en blanco ni muestra errores de red.

---

# 8. Entornos: Desarrollo vs Producción

## ¿Qué es "producción"?
"Producción" es el entorno real donde la aplicación es utilizada por usuarios finales. Aquí se priorizan la seguridad, el rendimiento y la estabilidad. A diferencia del entorno de desarrollo (local), en producción la app debe estar protegida y optimizada.

## ¿Cómo levantar la app en desarrollo?
- **Opción 1:** Levanta el backend y el frontend por separado:
  - Backend: `cd backend/app && uvicorn main:app --reload`
  - Frontend: `cd frontend && npm run dev`
  - **Opción 2 (recomendada):** Ejecuta el script `start_all.ps1` desde la raíz del proyecto:
  - Esto inicia backend y frontend automáticamente.
- **¡Listo!** No se requiere ninguna configuración adicional para desarrollo. La app estará disponible y funcional.

## ¿Qué hacer para producción?
- **Restringe CORS:** Edita `backend/app/main.py` y reemplaza `allow_origins=["*"]` por una lista de dominios permitidos (por ejemplo, el dominio de tu frontend en producción).
- **Configura variables de entorno:** Usa archivos `.env` o variables del sistema para credenciales, URLs, etc.
- **Desactiva el modo debug:** No uses `--reload` ni `debug=True` en producción.
- **Usa servidores apropiados:** Considera usar Gunicorn/Uvicorn con Nginx para el backend y servir el frontend como archivos estáticos.
- **Protege la base de datos:** No expongas puertos innecesarios y usa contraseñas seguras.

> **Resumen:**
> - En desarrollo, basta con levantar backend y frontend (o usar `start_all.ps1`).
> - En producción, asegúrate de restringir CORS y proteger la configuración.

---

# 9. Guía 8-BIT: Desarrollo y Producción

```
█████████████████████████████████████████████████████████████████████████████
█▄─▄███─▄▄─█─▄▄─█▄─▄▄─█▄─▄▄▀█▄─▄█▄─▀█▄─▄█▄─▄▄─█▄─▄▄▀█▄─▄█▄─▄▄─█▄─▄▄▀█▄─▄█
██─██▀█─██─█─██─██─▄█▀██─▄─▄██─███─█▄▀─███─▄█▀██─▄─▄██─███─▄█▀██─▄─▄██─██
▀▄▄▄▄▄▀▄▄▄▄▀▄▄▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▀▄▄▄▀▀▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▀
```

## Índice
1. Introducción
2. Estructura del proyecto
3. Tecnologías y propósito
4. Estructura de carpetas y archivos
5. Explicación de archivos y funciones clave
6. Flujo de información y arquitectura
7. Consejos para contribuir o extender
8. Sección didáctica: Filtros y estado global
9. Histórico de problemas y refactorizaciones
10. Entornos: Desarrollo vs Producción
11. Guía 8-BIT: Desarrollo y Producción (este capítulo)

---

## 9.1. Entorno de Desarrollo

- **Objetivo:** Permitir iteración rápida, pruebas y debugging.
- **Características:**
  - Recarga automática de código (`--reload` en FastAPI, hot reload en Vite).
  - CORS abierto (`allow_origins=["*"]`).
  - Logs detallados y errores visibles en consola.
  - Base de datos puede ser local o en Docker.
- **Pasos para levantar:**
  1. Clona el repo y navega a la raíz.
  2. Ejecuta `start_all.ps1` (o levanta backend y frontend por separado).
  3. Accede a la app en `http://localhost:5173` (frontend) y `http://localhost:8000/docs` (API docs).
- **¡IMPORTANTE!**
  - No usar datos reales ni credenciales sensibles.
  - No exponer el entorno de desarrollo a internet.

---

## 9.2. Entorno de Producción

- **Objetivo:** Seguridad, rendimiento y estabilidad para usuarios finales.
- **Características:**
  - Código optimizado y compilado (`npm run build` en frontend).
  - CORS restringido a dominios específicos.
  - Logs controlados y sin información sensible.
  - Variables de entorno para secretos y configuración.
  - Servidores robustos (Nginx, Gunicorn/Uvicorn, etc).
- **Pasos para levantar:**
  1. Compila el frontend:
     ```powershell
     cd frontend
     npm install
     npm run build
     ```
  2. Sirve el frontend con Nginx/Apache o similar, apuntando a `frontend/dist`.
  3. Levanta el backend con Uvicorn/Gunicorn (sin `--reload`):
     ```powershell
     cd backend/app
     uvicorn main:app --host 0.0.0.0 --port 8000
     ```
  4. Configura CORS en `main.py` para aceptar solo tu dominio frontend.
  5. Usa `.env` o variables de entorno para credenciales y URLs.
  6. Protege la base de datos y restringe puertos.
- **¡IMPORTANTE!**
  - Nunca uses CORS abierto (`*`) en producción.
  - No expongas el backend ni la base de datos sin protección.
  - Haz backups y monitorea logs.

---

## 9.3. Diferencias clave (tabla comparativa)

| Aspecto         | Desarrollo                        | Producción                       |
|-----------------|-----------------------------------|----------------------------------|
| CORS            | Abierto (`*`)                     | Restringido a dominios           |
| Logs            | Verbosos, debug                   | Controlados, sin info sensible   |
| Servidor        | FastAPI `--reload`, Vite dev      | Uvicorn/Gunicorn, Nginx, build   |
| Seguridad       | Baja (solo local)                 | Alta (firewall, HTTPS, env vars) |
| Base de datos   | Local o Docker                    | Protegida, backups               |
| Frontend        | Vite dev server                   | Archivos estáticos optimizados   |

---

## 9.4. Recomendaciones 8-BIT para el futuro

- ⚡ Usa siempre entornos separados para dev y prod.
- 🕹️ Documenta cada cambio y problema en este manual.
- 🛡️ Revisa dependencias y actualiza regularmente.
- 💾 Haz backups de la base de datos.
- 👾 Si algo falla, consulta el histórico de problemas antes de debuggear.

---

> "¡El código bien documentado y seguro es el verdadero power-up del desarrollo!"
