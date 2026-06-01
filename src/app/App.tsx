import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutesClient } from './AppRoutesClient';
import { initializeAnalytics } from './utils/analytics';

export default function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutesClient />
    </BrowserRouter>
  );
}
