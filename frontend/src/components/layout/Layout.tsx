import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  openNewTaskModal: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, openNewTaskModal }) => {
  const [isSidebarOpen, setSidebarOpen] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SIDEBAR_STATE,
    false
  );
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} openNewTaskModal={openNewTaskModal} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
