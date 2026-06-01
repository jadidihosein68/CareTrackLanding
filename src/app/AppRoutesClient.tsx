import { Suspense, lazy, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { NotFound } from './components/NotFound';
import { RouteLoadingFallback } from './components/shared/RouteLoadingFallback';
import { trackPageView } from './utils/analytics';

const Faq = lazy(() => import('./components/Faq').then((mod) => ({ default: mod.Faq })));
const GuideArticle = lazy(() =>
  import('./components/GuideArticle').then((mod) => ({ default: mod.GuideArticle })),
);
const Guides = lazy(() => import('./components/Guides').then((mod) => ({ default: mod.Guides })));
const Learn = lazy(() => import('./components/Learn').then((mod) => ({ default: mod.Learn })));
const LearnCategory = lazy(() =>
  import('./components/LearnCategory').then((mod) => ({ default: mod.LearnCategory })),
);
const LearnSpecies = lazy(() =>
  import('./components/LearnSpecies').then((mod) => ({ default: mod.LearnSpecies })),
);
const PartnerBreeders2Page = lazy(() =>
  import('./components/PartnerBreeders2Page').then((mod) => ({ default: mod.PartnerBreeders2Page })),
);
const Partners = lazy(() => import('./components/Partners').then((mod) => ({ default: mod.Partners })));
const PartnerBreedersPage = lazy(() =>
  import('./components/PartnerTypePages').then((mod) => ({ default: mod.PartnerBreedersPage })),
);
const PartnerCreatorsPage = lazy(() =>
  import('./components/PartnerTypePages').then((mod) => ({ default: mod.PartnerCreatorsPage })),
);
const PartnerEventsPage = lazy(() =>
  import('./components/PartnerTypePages').then((mod) => ({ default: mod.PartnerEventsPage })),
);
const PartnerReptileShopsPage = lazy(() =>
  import('./components/PartnerTypePages').then((mod) => ({ default: mod.PartnerReptileShopsPage })),
);
const Playground = lazy(() =>
  import('./components/Playground').then((mod) => ({ default: mod.Playground })),
);
const PrivacyPolicy = lazy(() =>
  import('./components/PrivacyPolicy').then((mod) => ({ default: mod.PrivacyPolicy })),
);
const SnakePlayground = lazy(() =>
  import('./components/SnakePlayground').then((mod) => ({ default: mod.SnakePlayground })),
);
const Support = lazy(() =>
  import('./components/Support').then((mod) => ({ default: mod.Support })),
);
const TermsOfService = lazy(() =>
  import('./components/TermsOfService').then((mod) => ({ default: mod.TermsOfService })),
);

function withSuspense(element: JSX.Element) {
  return <Suspense fallback={<RouteLoadingFallback />}>{element}</Suspense>;
}

export function AppRoutesClient() {
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
