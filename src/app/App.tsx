import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Support } from './components/Support';
import { Learn } from './components/Learn';
import { LearnCategory } from './components/LearnCategory';
import { LearnSpecies } from './components/LearnSpecies';
import { Guides } from './components/Guides';
import { GuideArticle } from './components/GuideArticle';
import { Faq } from './components/Faq';
import { NotFound } from './components/NotFound';
import { initializeAnalytics, trackPageView } from './utils/analytics';

function AppRoutes() {
  const location = useLocation();
  const isFirstRouteView = useRef(true);

  useEffect(() => {
    if (isFirstRouteView.current) {
      isFirstRouteView.current = false;
      return;
    }

    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    window.requestAnimationFrame(() => {
      trackPageView(pagePath);
    });
  }, [location.pathname, location.search, location.hash]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/guides/:guideId" element={<GuideArticle />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/learn/category/:categoryId" element={<LearnCategory />} />
      <Route path="/learn/species/:speciesId" element={<LearnSpecies />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/support" element={<Support />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

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
