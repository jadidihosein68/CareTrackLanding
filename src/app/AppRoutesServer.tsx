import { Suspense, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Faq } from './components/Faq';
import { GuideArticle } from './components/GuideArticle';
import { Guides } from './components/Guides';
import { LandingPage } from './components/LandingPage';
import { Learn } from './components/Learn';
import { LearnCategory } from './components/LearnCategory';
import { LearnSpecies } from './components/LearnSpecies';
import { NotFound } from './components/NotFound';
import { PartnerBreeders2Page } from './components/PartnerBreeders2Page';
import { Partners } from './components/Partners';
import {
  PartnerBreedersPage,
  PartnerCreatorsPage,
  PartnerEventsPage,
  PartnerReptileShopsPage,
} from './components/PartnerTypePages';
import { Playground } from './components/Playground';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { SnakePlayground } from './components/SnakePlayground';
import { Support } from './components/Support';
import { TermsOfService } from './components/TermsOfService';
import { RouteLoadingFallback } from './components/shared/RouteLoadingFallback';
import { trackPageView } from './utils/analytics';

function withSuspense(element: JSX.Element) {
  return <Suspense fallback={<RouteLoadingFallback />}>{element}</Suspense>;
}

export function AppRoutesServer() {
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
      <Route path="/" element={withSuspense(<LandingPage />)} />
      <Route path="/learn" element={withSuspense(<Learn />)} />
      <Route path="/guides" element={withSuspense(<Guides />)} />
      <Route path="/guides/:guideId" element={withSuspense(<GuideArticle />)} />
      <Route path="/playground/gecko" element={withSuspense(<Playground />)} />
      <Route path="/playground/snake" element={withSuspense(<SnakePlayground />)} />
      <Route path="/playground" element={<Navigate to="/playground/gecko" replace />} />
      <Route path="/partners" element={withSuspense(<Partners />)} />
      <Route path="/partners/breeders" element={withSuspense(<PartnerBreedersPage />)} />
      <Route path="/partners/breeders2" element={withSuspense(<PartnerBreeders2Page />)} />
      <Route path="/partners/reptile-shops" element={withSuspense(<PartnerReptileShopsPage />)} />
      <Route path="/partners/creators" element={withSuspense(<PartnerCreatorsPage />)} />
      <Route path="/partners/events" element={withSuspense(<PartnerEventsPage />)} />
      <Route path="/faq" element={withSuspense(<Faq />)} />
      <Route path="/learn/category/:categoryId" element={withSuspense(<LearnCategory />)} />
      <Route path="/learn/species/:speciesId" element={withSuspense(<LearnSpecies />)} />
      <Route path="/privacy" element={withSuspense(<PrivacyPolicy />)} />
      <Route path="/terms" element={withSuspense(<TermsOfService />)} />
      <Route path="/support" element={withSuspense(<Support />)} />
      <Route path="*" element={withSuspense(<NotFound />)} />
    </Routes>
  );
}
