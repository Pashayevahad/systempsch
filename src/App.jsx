import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ComplexSystems from './pages/ComplexSystems';
import BusinessPsychology from './pages/BusinessPsychology';
import LinguisticPsychology from './pages/LinguisticPsychology';
import Homeostasis from './pages/Homeostasis';
import InternalEnvironment from './pages/InternalEnvironment';
import DynamicEquilibrium from './pages/DynamicEquilibrium';
import RegulatoryCircuit from './pages/RegulatoryCircuit';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="w-full min-h-screen bg-charcoal overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/complex-systems" element={<ComplexSystems />} />
          <Route path="/business-psychology" element={<BusinessPsychology />} />
          <Route path="/linguistic-psych" element={<LinguisticPsychology />} />
          <Route path="/chapter-1" element={<Homeostasis />} />
          <Route path="/internal-environment" element={<InternalEnvironment />} />
          <Route path="/dynamic-equilibrium" element={<DynamicEquilibrium />} />
          <Route path="/regulatory-circuit" element={<RegulatoryCircuit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;