import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { initializeAnalytics } from './utils/analytics';

export default function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
