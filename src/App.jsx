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
import CyberneticRevolution from './pages/CyberneticRevolution';
import Navbar from './components/Navbar';
import AutonomicSimulation from './pages/AutonomicSimulation';
import CyberneticSimulation from './pages/CyberneticSimulation';
import FirstOrderCybernetics from './pages/FirstOrderCybernetics';
import BehaviorTaxonomy from './pages/BehaviorTaxonomy';
import NeuralSimulation from './pages/NeuralSimulation';

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
          <Route path="/chapter-2" element={<CyberneticRevolution />} />
          <Route path="/chapter-2/first-order" element={<FirstOrderCybernetics />} />
          <Route path="/chapter-2/behavior-taxonomy" element={<BehaviorTaxonomy />} />
          <Route path="/chapter-2/neural-calculus" element={<NeuralSimulation />} />
          <Route path="/internal-environment" element={<InternalEnvironment />} />
          <Route path="/dynamic-equilibrium" element={<DynamicEquilibrium />} />
          <Route path="/regulatory-circuit" element={<RegulatoryCircuit />} />
          <Route path="/autonomic-simulation" element={<AutonomicSimulation />} />
          <Route path="/cybernetic-simulation" element={<CyberneticSimulation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;