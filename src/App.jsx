import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scene from './components/Scene';

function App() {
  return (
    <>
      <Navbar />

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 bg-charcoal">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Scrollable Overlay Layer */}
      <div className="relative z-10">

        <section className="relative min-h-screen py-20 px-6">
          <div className="max-w-4xl mx-auto py-32 text-center h-[150vh] flex flex-col justify-center">
            <h2 className="text-4xl text-white font-serif italic mb-6">Zone of Clarity</h2>
            <p className="font-mono text-gray-400 mb-12">The fog lifts, the system becomes transparent.</p>
          </div>
        </section>

        <footer className="py-20 px-6 border-t border-gold/10 bg-charcoal" data-purpose="horizon-footer">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-mono font-bold text-gold tracking-tighter text-lg mb-2">AeroNeural</h4>
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">The Horizon Line • © 2026</p>
            </div>
            <div className="flex space-x-8 font-mono text-[10px] text-white/60">
              <a href="#" className="hover:text-gold uppercase tracking-widest transition-colors">Research Papers</a>
              <a href="#" className="hover:text-gold uppercase tracking-widest transition-colors">Methodology</a>
              <a href="#" className="hover:text-gold uppercase tracking-widest transition-colors">Terminal Access</a>
            </div>
            <div className="font-mono text-[10px] text-white/20">
              LAT: 37.7749 | LONG: -122.4194
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
