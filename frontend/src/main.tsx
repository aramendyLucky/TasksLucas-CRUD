import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { TasksProvider } from './context/TasksContext';
import App from './App.tsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <TasksProvider>
        <App />
      </TasksProvider>
    </HeroUIProvider>
  </React.StrictMode>,
);
