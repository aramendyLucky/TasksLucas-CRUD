<!--
████████████████████████████████████████████████████████████████████████████████
█                                                                              █
█   ████████  ██████   █████  ███████ ██   ██ ███████ ██    ██  ██████  ██████  █
█      ██    ██   ██ ██   ██ ██      ██   ██ ██      ██    ██ ██    ██ ██   ██ █
█      ██    ██████  ███████ ███████ ███████ █████   ██    ██ ██    ██ ██████  █
█      ██    ██   ██ ██   ██      ██ ██   ██ ██      ██    ██ ██    ██ ██   ██ █
█      ██    ██   ██ ██   ██ ███████ ██   ██ ███████  ██████   ██████  ██   ██ █
█                                                                              █
█                              TaskLucas                                       █
████████████████████████████████████████████████████████████████████████████████
-->

<div align="center">
  <img src="webTask.png" width="320" alt="TaskLucas 8bit UI"/>
</div>

<div align="center">
  <h2>🟦🟩🟧 <span style="font-family:monospace;">Índice</span> 🟥🟨🟪</h2>
  <ul align="left" style="font-size:1.1em;">
    <li>🎮 <a href="#presentacion">Presentación</a></li>
    <li>🧩 <a href="#que-es-tasklucas">¿Qué es TaskLucas?</a></li>
    <li>⚡ <a href="#instalacion-rapida">Instalación Rápida</a></li>
    <li>🖥️ <a href="#acceso">Acceso</a></li>
    <li>⭐ <a href="#caracteristicas-principales">Características principales</a></li>
    <li>📖 <a href="#documentacion-avanzada">Documentación avanzada</a></li>
    <li>🛠️ <a href="#problemas-comunes-y-soluciones">Problemas comunes y soluciones</a></li>
    <li>🧑‍💻 <a href="#guia-paso-a-paso-como-tener-tasklucas-funcionando-en-tu-pc-desde-cero">Guía paso a paso</a></li>
    <li>👾 <a href="#licencia">Licencia y comunidad</a></li>
    <li>🧑‍🎨 <a href="#creditos">Créditos</a></li>
    <li>🇬🇧 <a href="#english-version">English version</a> (see below)</li>
  </ul>
</div>

---

# <img src="https://emojicombos.com/wp-content/uploads/2022/05/8-bit-pixel-art-emoji-1.png" width="32" style="vertical-align:middle;"> TaskLucas

> <img src="https://emojicombos.com/wp-content/uploads/2022/05/8-bit-pixel-art-emoji-1.png" width="24"> <b>Gestor de Tareas CRUD con FastAPI + React</b>

---

## 🎮 Presentación

¡Bienvenido a <b>TaskLucas</b>! Una app web de gestión de tareas con estética actual, pensada para aprender, practicar y disfrutar la productividad.

<div align="center">
  <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" width="320" alt="8bit tasks"/>
</div>

---

## 🧩 ¿Qué es TaskLucas?

TaskLucas es una aplicación CRUD de tareas multiplataforma, con backend en FastAPI y frontend en React + TypeScript. Ideal para aprender arquitectura moderna, buenas prácticas y despliegue profesional. ¡Inspirada en la cultura gamer y el pixel art!

---

## ⚡ Instalación Rápida

### 1. Clona el repositorio
```bash
# Clona el proyecto y entra a la carpeta
git clone <url-del-repo>
cd task-crud-app
```

### 2. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Linux/Mac: source venv/bin/activate
# Windows PowerShell: .\venv\Scripts\Activate.ps1
# Windows CMD: .\venv\Scripts\activate.bat
pip install -r requirements.txt
# (Opcional) Levanta la base de datos con Docker
# docker-compose up -d
# Aplica migraciones
# Linux/Mac: alembic upgrade head
# Windows: python -m alembic upgrade head
# Inicia el servidor
# Linux/Mac: uvicorn app.main:app --reload
# Windows: python -m uvicorn app.main:app --reload
```

### 3. Frontend (React)
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🖥️ Acceso
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

---

## ⭐ Características principales
- CRUD de tareas con filtros, prioridades y categorías.
- Interfaz retro, responsiva y moderna.
- Backend robusto y seguro con FastAPI.
- Documentación interactiva (Swagger/OpenAPI).
- Filtros y estado global con React Context.
- Código limpio, modular y didáctico.
- Inspiración visual 8-bit y experiencia tipo videojuego.

---

## 📖 Documentación avanzada

Para detalles técnicos, estructura, explicación de hooks, componentes y arquitectura, consulta el archivo [`manualTask.md`](./manualTask.md) 📖.

---

## 🛠️ Problemas comunes y soluciones
- **No se reconoce 'source', 'uvicorn', 'alembic', etc.**
  - Usa los comandos correctos según tu sistema operativo (ver ejemplos arriba).
- **Permisos en PowerShell para activar el entorno:**
  - Ejecuta: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **El frontend no conecta con el backend:**
  - Asegúrate de que el backend esté corriendo y revisa la consola del navegador para errores de red o CORS.
- **Error TypeError: doc.getElementById(...) is null en translator.js:**
  - Es causado por una extensión de traducción automática del navegador, no por tu app.

---

## 🧑‍💻 Guía paso a paso: ¿Cómo tener TaskLucas funcionando en tu PC desde cero?

### 1. Requisitos previos
- Tener instalado **Git** ([descargar aquí](https://git-scm.com/downloads))
- Tener instalado **Python 3.10+** ([descargar aquí](https://www.python.org/downloads/))
- Tener instalado **Node.js 18+** ([descargar aquí](https://nodejs.org/))
- (Opcional) Tener **Docker** si quieres usar la base de datos en contenedor ([descargar aquí](https://www.docker.com/products/docker-desktop/))

### 2. Descargar el proyecto
Abre una terminal (PowerShell en Windows) y ejecuta:
```bash
git clone <url-del-repo>
cd task-crud-app
```

### 3. Instalar y preparar el backend (API)
```bash
cd backend
python -m venv venv
# Activa el entorno virtual:
# Windows PowerShell: .\venv\Scripts\Activate.ps1
# Windows CMD: .\venv\Scripts\activate.bat
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
```

#### (Opcional) Levantar la base de datos con Docker
```bash
docker-compose up -d
```

#### Aplicar migraciones de la base de datos
```bash
# Windows:
python -m alembic upgrade head
# Linux/Mac:
alembic upgrade head
```

#### Iniciar el backend
```bash
# Windows:
python -m uvicorn app.main:app --reload
# Linux/Mac:
uvicorn app.main:app --reload
```

### 4. Instalar y levantar el frontend (interfaz web)
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Acceder a la aplicación
- Abre tu navegador y entra a: [http://localhost:5173](http://localhost:5173)
- Para ver la documentación de la API: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 6. ¿Qué hago si algo falla?
- Revisa la sección "🛠️ Problemas comunes y soluciones" más abajo.
- Asegúrate de que tanto el backend como el frontend estén corriendo y sin errores en la terminal.
- Si usas Docker, verifica que el contenedor de la base de datos esté en estado "healthy".
- Si tienes dudas, consulta el archivo `manualTask.md` para detalles técnicos.

---

> ¡Listo! Ya puedes usar TaskLucas en tu PC, crear tareas y disfrutar la experiencia 8-bit.

---

## 👾 Licencia y comunidad

Este proyecto está licenciado bajo la Licencia MIT personalizada por Aramendy Lucky. Puedes encontrar el texto completo en el archivo [`LICENSE`](./LICENSE). ¡Eres libre de usar, modificar y compartir este software, siempre reconociendo la autoría!

---

## 🧑‍🎨 Créditos
- Autor: Aramendy Lucky
- Inspiración: Comunidad open source, cultura gamer y retro.
- Tecnologías: FastAPI, React, TypeScript, TailwindCSS, Docker, PostgreSQL.

---

<div align="center" style="margin-top:2em;">
  <img src="https://emojicombos.com/wp-content/uploads/2022/05/8-bit-pixel-art-emoji-1.png" width="48"/>
  <br/>
  <b>¡Disfruta gestionando tus tareas con estilo 8-bit y comparte tus mejoras!</b>
</div>

---

# 🇬🇧 English version

## 🎮 Presentation

Welcome to **TaskLucas**! A web app for task management with aesthetics, designed to learn, practice, and enjoy productivity.

<div align="center">
  <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" width="320" alt="8bit tasks"/>
</div>

---

## 🧩 What is TaskLucas?

TaskLucas is a cross-platform task CRUD application, with a FastAPI backend and a React + TypeScript frontend. Ideal for learning modern architecture, best practices, and professional deployment. Inspired by gamer culture and pixel art!

---

## ⚡ Quick Installation

### 1. Clone the repository
```bash
# Clone the project and enter the folder
git clone <repo-url>
cd task-crud-app
```

### 2. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Linux/Mac: source venv/bin/activate
# Windows PowerShell: .\venv\Scripts\Activate.ps1
# Windows CMD: .\venv\Scripts\activate.bat
pip install -r requirements.txt
# (Optional) Start the database with Docker
# docker-compose up -d
# Apply migrations
# Linux/Mac: alembic upgrade head
# Windows: python -m alembic upgrade head
# Start the server
# Linux/Mac: uvicorn app.main:app --reload
# Windows: python -m uvicorn app.main:app --reload
```

### 3. Frontend (React)
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🖥️ Access
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

---

## ⭐ Main features
- Task CRUD with filters, priorities, and categories.
- Retro, responsive, and modern interface.
- Robust and secure backend with FastAPI.
- Interactive documentation (Swagger/OpenAPI).
- Filters and global state with React Context.
- Clean, modular, and educational code.
- 8-bit visual inspiration and video game-like experience.

---

## 📖 Advanced documentation

For technical details, structure, explanation of hooks, components, and architecture, see the [`manualTask.md`](./manualTask.md) file 📖.

---

## 🛠️ Common problems and solutions
- **'source', 'uvicorn', 'alembic', etc. not recognized.**
  - Use the correct commands according to your operating system (see examples above).
- **PowerShell permissions to activate the environment:**
  - Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **Frontend not connecting to backend:**
  - Make sure the backend is running and check the browser console for network or CORS errors.
- **TypeError: doc.getElementById(...) is null error in translator.js:**
  - Caused by a browser auto-translation extension, not your app.

---

## 🧑‍💻 Step by step guide: How to get TaskLucas running on your PC from scratch?

### 1. Prerequisites
- Have **Git** installed ([download here](https://git-scm.com/downloads))
- Have **Python 3.10+** installed ([download here](https://www.python.org/downloads/))
- Have **Node.js 18+** installed ([download here](https://nodejs.org/))
- (Optional) Have **Docker** if you want to use the database in a container ([download here](https://www.docker.com/products/docker-desktop/))

### 2. Download the project
Open a terminal (PowerShell on Windows) and run:
```bash
git clone <repo-url>
cd task-crud-app
```

### 3. Install and prepare the backend (API)
```bash
cd backend
python -m venv venv
# Activate the virtual environment:
# Windows PowerShell: .\venv\Scripts\Activate.ps1
# Windows CMD: .\venv\Scripts\activate.bat
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
```

#### (Optional) Start the database with Docker
```bash
docker-compose up -d
```

#### Apply database migrations
```bash
# Windows:
python -m alembic upgrade head
# Linux/Mac:
alembic upgrade head
```

#### Start the backend
```bash
# Windows:
python -m uvicorn app.main:app --reload
# Linux/Mac:
uvicorn app.main:app --reload
```

### 4. Install and run the frontend (web interface)
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Access the application
- Open your browser and go to: [http://localhost:5173](http://localhost:5173)
- To view the API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 6. What if something goes wrong?
- Check the "🛠️ Common problems and solutions" section below.
- Make sure both the backend and frontend are running and without errors in the terminal.
- If using Docker, ensure the database container is in "healthy" state.
- If in doubt, consult the `manualTask.md` file for technical details.

---

> Done! You can now use TaskLucas on your PC, create tasks, and enjoy the 8-bit experience.

---

## 👾 License and community

This project is licensed under the MIT License customized by Aramendy Lucky. You can find the full text in the [`LICENSE`](./LICENSE) file. Feel free to use, modify, and share this software, always acknowledging the authorship!

---

## 🧑‍🎨 Credits
- Author: Aramendy Lucky
- Inspiration: Open source community, gamer and retro culture.
- Technologies: FastAPI, React, TypeScript, TailwindCSS, Docker, PostgreSQL.

---

<div align="center" style="margin-top:2em;">
  <img src="https://emojicombos.com/wp-content/uploads/2022/05/8-bit-pixel-art-emoji-1.png" width="48"/>
  <br/>
  <b>Enjoy managing your tasks with 8-bit style and share your improvements!</b>
</div>
