import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AutonomicStressSim from '../components/AutonomicStressSim';

const AutonomicSimulation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0E0A08] text-white font-sans overflow-x-hidden pb-12 pt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                <div className="mb-12">
                    <Link to="/regulatory-circuit" className="text-[#D95A11] hover:text-white transition-colors flex items-center mb-8 font-mono text-xs uppercase tracking-widest">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Regulatory Circuit
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
                        Autonomic <span className="text-[#B32424] italic">Stress Circuit</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Psychological Homeostasis: Observe the Window of Tolerance and how the nervous system reacts to chronic and acute stress.
                    </p>
                    <div className="w-16 h-1 bg-[#B32424] mt-8"></div>
                </div>

                {/* Simulation Area */}
                <div className="mt-8 animate-fade-in">
                    <AutonomicStressSim />
                </div>

                {/* Additional context/footer */}
                <div className="mt-12 text-center flex flex-col items-center">
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold mb-8">
                        Systems Thinking &bull; Psychological Modulation Module
                    </p>

                    <Link
                        to="/regulatory-circuit"
                        className="inline-flex items-center px-8 py-4 bg-[#B32424]/10 border border-[#B32424]/30 rounded-xl text-[#B32424] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#B32424] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(179,36,36,0.3)] group"
                    >
                        <svg className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        Back to Simulations
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AutonomicSimulation;
