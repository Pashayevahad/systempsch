import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homeostasis = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0E0A08] text-white font-sans overflow-x-hidden pb-12">
            {/* Top Navbar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0E0A08]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center space-x-2 text-sm">
                    <Link to="/complex-systems" className="text-gray-400 hover:text-white transition-colors flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Systems Thinking
                    </Link>
                    <span className="text-gray-600">&gt;</span>
                    <span className="text-[#D95A11] font-medium">Chapter 1</span>
                </div>

                <Link to="/complex-systems" className="flex items-center bg-[#2A1D13] hover:bg-[#3A2A1C] transition-colors rounded-md px-4 py-2 text-[#D95A11] text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Back to Menu
                </Link>
            </div>

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-16 px-6 md:px-16"
                style={{
                    backgroundImage: 'url(/homeostasis_bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-[#0E0A08]/50 to-transparent"></div>

                <div className="relative z-10 max-w-4xl mx-auto w-full">
                    <p className="text-[#D95A11] font-bold text-xs tracking-widest uppercase mb-4">Foundation Module</p>
                    <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-2">
                        Chapter 1: The <br /> Genesis of <br /> Adaptivity— <br />
                        <span className="text-[#D4AF37]">Homeostasis</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#D95A11] mt-8"></div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 md:px-16 lg:px-24 py-12">

                {/* Section 01 */}
                <div className="relative pl-12 mb-20">
                    <div className="absolute left-0 top-1 text-[#D4AF37] font-serif text-2xl font-bold">01.</div>
                    <div className="absolute left-[36px] top-10 bottom-0 w-[1px] bg-white/10"></div>
                    <Link to="/internal-environment" className="block cursor-pointer group">
                        <h2 className="text-3xl font-serif text-white mb-6 group-hover:text-[#D95A11] transition-colors">
                            The Internal<br />Environment
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg font-sans group-hover:text-gray-200 transition-colors">
                            Before we can understand complex systems, we must look at the origin of biological stability.
                            <span className="text-[#D95A11] italic font-semibold mx-1">Claude Bernard's milieu intérieur</span>
                            establishes that for a cell to function, the fluids surrounding it must remain constant. This
                            necessity of internal stability is the bedrock upon which all adaptive behavior is built.
                        </p>
                    </Link>
                </div>

                {/* Section 02 */}
                <div className="relative pl-12 mb-20">
                    <div className="absolute left-0 top-1 text-[#D4AF37] font-serif text-2xl font-bold">02.</div>
                    <div className="absolute left-[36px] top-10 bottom-0 w-[1px] bg-white/10"></div>
                    <Link to="/dynamic-equilibrium" className="block cursor-pointer group">
                        <h2 className="text-3xl font-serif text-white mb-6 group-hover:text-[#D95A11] transition-colors">
                            Dynamic Equilibrium
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg font-sans group-hover:text-gray-200 transition-colors">
                            A common misconception is that homeostasis implies a static state. In reality,
                            <span className="text-[#D4AF37] font-semibold mx-1">"stasis" is a process of constant adjustment,</span>
                            not a state of rest. It is a dynamic equilibrium where forces are perpetually balancing against
                            external disturbances to maintain a narrow functional range.
                        </p>
                    </Link>
                </div>

                {/* Section 03 - Regulatory Circuit */}
                <div className="relative mt-32">
                    {/* Background card with top offset text */}
                    <div className="bg-[#15100C] border border-[#2A1D13] rounded-[2rem] p-8 md:p-12 pt-20 relative">
                        {/* Section Header */}
                        <div className="absolute -top-6 left-8 md:left-12 flex items-start">
                            <span className="text-[#D4AF37] font-serif text-2xl font-bold mr-4 mt-1">03.</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-white">The Regulatory<br />Circuit</h2>
                        </div>

                        {/* Cards Grid */}
                        <div className="flex flex-col space-y-4 mt-8">

                            {/* Card 1 */}
                            <div className="bg-[#1C1410] rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                                <svg className="w-8 h-8 text-[#D95A11] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-[#D4AF37] font-bold text-lg mb-2">The Receptor</h3>
                                <p className="text-gray-400 text-sm">The sensor that detects changes in the environment (stimuli).</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-[#1C1410] rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                                <svg className="w-8 h-8 text-[#D95A11] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <h3 className="text-[#D4AF37] font-bold text-lg mb-2">Control Center</h3>
                                <p className="text-gray-400 text-sm">The integrator that processes information and decides the response.</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-[#1C1410] rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                                <svg className="w-8 h-8 text-[#D95A11] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h3 className="text-[#D4AF37] font-bold text-lg mb-2">The Effector</h3>
                                <p className="text-gray-400 text-sm">The mechanism that carries out the adjustment to restore balance.</p>
                            </div>

                        </div>

                        {/* Footer text */}
                        <p className="text-center text-gray-500 italic mt-8 text-sm px-4">
                            Functional roles of the receptor, control center, and effector in a closed-loop system.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="max-w-4xl mx-auto px-6 mt-12 mb-8 border-t border-white/10 pt-8 flex justify-between items-center text-sm font-medium">
                <button className="flex flex-col items-center opacity-50 cursor-not-allowed hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-gray-400">Introduction</span>
                </button>

                <Link to="/complex-systems" className="flex flex-col items-center">
                    <div className="bg-[#2A1D13] p-3 rounded-full mb-2">
                        <svg className="w-5 h-5 text-[#D95A11]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </div>
                    <span className="text-[#D95A11]">Contents</span>
                </Link>

                <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span>Cybernetics</span>
                </button>
            </div>
        </div>
    );
};

export default Homeostasis;
