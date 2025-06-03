# Script maestro para levantar TaskLucas (backend + frontend)
# Ejecuta este archivo con PowerShell desde la raíz del proyecto

# Configuración de rutas
$backendPath = "./backend"
$frontendPath = "./frontend"
$venvActivate = "$backendPath/venv/Scripts/Activate.ps1"

function Stop-ProcessByName($name) {
    Get-Process -Name $name -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
}

function Test-Backend {
    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/health" -UseBasicParsing -TimeoutSec 5
        return $response.StatusCode -eq 200
    } catch { return $false }
}

function Test-Frontend {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5
        return $response.StatusCode -eq 200
    } catch { return $false }
}

Write-Host "[TaskLucas] Cerrando procesos previos de backend/frontend..."
Stop-ProcessByName "uvicorn"
Stop-ProcessByName "node"
Stop-ProcessByName "npm"

Write-Host "[TaskLucas] Limpiando cachés y archivos temporales..."
Remove-Item -Recurse -Force "$backendPath/__pycache__" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$backendPath/app/__pycache__" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$frontendPath/node_modules/.cache" -ErrorAction SilentlyContinue

Write-Host "[TaskLucas] Preparando entorno backend..."
if (!(Test-Path $venvActivate)) {
    Write-Host "[TaskLucas] No se encontró el entorno virtual. Creando uno nuevo..."
    python -m venv "$backendPath/venv"
}
& $venvActivate
Write-Host "[TaskLucas] Entorno virtual activado."

Write-Host "[TaskLucas] Instalando dependencias backend..."
pip install -r "$backendPath/requirements.txt"

Write-Host "[TaskLucas] Aplicando migraciones Alembic..."
cd $backendPath
alembic upgrade head
cd ..

Write-Host "[TaskLucas] Levantando backend (Uvicorn) en nueva ventana..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $backendPath; & $venvActivate; uvicorn app.main:app --reload"

# Esperar a que el backend esté listo
Write-Host "[TaskLucas] Esperando a que el backend responda..."
$maxTries = 10
$tries = 0
while (-not (Test-Backend) -and $tries -lt $maxTries) {
    Start-Sleep -Seconds 2
    $tries++
}
if (Test-Backend) {
    Write-Host "[TaskLucas] Backend OK ✅"
} else {
    Write-Host "[TaskLucas] ERROR: El backend no respondió. Revisa la consola de backend."
    exit 1
}

Write-Host "[TaskLucas] Instalando dependencias frontend..."
cd $frontendPath
if (!(Test-Path "node_modules")) {
    npm install
}
cd ..

Write-Host "[TaskLucas] Levantando frontend (Vite) en nueva ventana..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $frontendPath; npm run dev"

# Esperar a que el frontend esté listo
Write-Host "[TaskLucas] Esperando a que el frontend responda..."
$maxTries = 10
$tries = 0
while (-not (Test-Frontend) -and $tries -lt $maxTries) {
    Start-Sleep -Seconds 2
    $tries++
}
if (Test-Frontend) {
    Write-Host "[TaskLucas] Frontend OK ✅"
    Start-Process "http://localhost:5173"
} else {
    Write-Host "[TaskLucas] ERROR: El frontend no respondió. Revisa la consola de frontend."
    exit 1
}

Write-Host "[TaskLucas] Todo listo. TaskLucas está corriendo en http://localhost:5173 🚀"
