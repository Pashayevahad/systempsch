import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CyberneticSim from '../components/CyberneticSim';

const CyberneticSimulation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0E0A08] text-white font-sans overflow-x-hidden pb-12 pt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                <div className="mb-12">
                    <Link to="/chapter-2" className="text-[#D95A11] hover:text-white transition-colors flex items-center mb-8 font-mono text-xs uppercase tracking-widest">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Cybernetics
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
                        Cybernetic <span className="text-[#D95A11] italic">Laboratory</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        First-Order Cybernetics: Visualize the interplay between positive and negative feedback loops and Ashby's Law of Requisite Variety.
                    </p>
                    <div className="w-16 h-1 bg-[#D95A11] mt-8"></div>
                </div>

                {/* Simulation Area */}
                <div className="mt-8 animate-fade-in shadow-2xl">
                    <CyberneticSim />
                </div>

                {/* Cybernetic Laws Context */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="border-l-2 border-[#D95A11] pl-8">
                        <h3 className="text-[#D95A11] font-bold text-xs uppercase tracking-widest mb-4">Feedback Dynamics</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Negative feedback (Gain &lt; 0) seeks stability by opposing error. Positive feedback (Gain &gt; 0) amplifies small changes, leading to exponential growth or collapse.
                        </p>
                    </div>
                    <div className="border-l-2 border-blue-500 pl-8">
                        <h3 className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">Ashby's Law</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            "Only variety can absorb variety." For a controller to maintain stability against external disturbances, it must possess at least as much variety (regulatory capacity) as the disturbances it faces.
                        </p>
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
                        Cybernetics &bull; Requisite Variety Laboratory
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CyberneticSimulation;
