import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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

                {/* Placeholder for Simulation */}
                <div className="border border-white/5 bg-[#120D0A] rounded-[2rem] p-12 flex flex-col items-center justify-center min-h-[500px] text-center shadow-2xl relative overflow-hidden group">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B32424]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-[#2A1212] rounded-full flex items-center justify-center mb-8 mx-auto ring-1 ring-[#B32424]/30 shadow-[0_0_30px_rgba(179,36,36,0.2)]">
                            <svg className="w-10 h-10 text-[#B32424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 tracking-tight uppercase font-mono text-gray-300">Telemetry Initializing...</h2>
                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                            The Autonomic Stress Circuit simulation is currently under construction. This module will visualize the interplay between the Sympathetic and Parasympathetic nervous systems.
                        </p>

                        <div className="mt-12 flex space-x-2 justify-center">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-2 h-2 bg-[#B32424] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutonomicSimulation;
