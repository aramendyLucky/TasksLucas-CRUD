/// <reference types="vite/client" />

// Extiende los tipos de Vite para variables de entorno personalizadas
declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_VERSION?: string;
  // Puedes agregar más variables personalizadas aquí si lo necesitas
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
