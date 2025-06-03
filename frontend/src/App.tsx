import React from 'react';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export default function App() {
  // Simple router implementation
  const [path, setPath] = React.useState(window.location.pathname);
  
  React.useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  // Render the appropriate page based on the path
  switch (path) {
    case '/':
      return <Home />;
    default:
      return <NotFound />;
  }
}
