import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Support } from './components/Support';
import { Learn } from './components/Learn';
import { LearnCategory } from './components/LearnCategory';
import { LearnSpecies } from './components/LearnSpecies';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/category/:categoryId" element={<LearnCategory />} />
        <Route path="/learn/species/:speciesId" element={<LearnSpecies />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}
