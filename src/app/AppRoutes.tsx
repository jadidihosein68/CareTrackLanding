import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Faq } from './components/Faq';
import { GuideArticle } from './components/GuideArticle';
import { Guides } from './components/Guides';
import { LandingPage } from './components/LandingPage';
import { Learn } from './components/Learn';
import { LearnCategory } from './components/LearnCategory';
import { LearnSpecies } from './components/LearnSpecies';
import { NotFound } from './components/NotFound';
import { Playground } from './components/Playground';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Support } from './components/Support';
import { TermsOfService } from './components/TermsOfService';
import { trackPageView } from './utils/analytics';

export function AppRoutes() {
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
      <Route path="/playground/gecko" element={<Playground />} />
      <Route path="/playground" element={<Navigate to="/playground/gecko" replace />} />
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
