import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FirstOrderCybernetics = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0A0D14] text-white font-sans overflow-x-hidden pb-24">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-8">
                <button onClick={() => navigate(-1)} className="text-[#D95A11] hover:text-white transition-all transform hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="text-[#D95A11] font-serif italic text-lg tracking-wide">The Cybernetic Revolution</h2>
                <button className="text-[#D95A11] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className="px-6 mt-4 max-w-lg mx-auto md:max-w-3xl">
                {/* Eyebrow */}
                <div className="mb-4">
                    <span className="text-[#6482A3] text-[10px] font-bold tracking-[0.25em] uppercase">
                        Archive: System Dynamics
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-8">
                    First-Order <br />
                    <span className="italic text-[#FFCDA5]">Cybernetics</span>
                </h1>

                {/* Description */}
                <p className="text-[#A3A8B1] leading-relaxed font-sans text-base mb-16 pr-4">
                    Investigating the formal control mechanisms of teleological systems. This curated archive explores the foundational literature that defined the transition from linear causality to circular feedback loops.
                </p>

                {/* Section Header */}
                <div className="flex flex-col mb-6 space-y-2">
                    <h2 className="text-2xl font-serif italic text-white/90">Curated <br />Archive</h2>
                    <span className="text-[#6482A3] text-[10px] font-bold tracking-[0.2em] uppercase mt-2">
                        Foundational Lit. // 01-04
                    </span>
                </div>

                {/* Paper Card */}
                <div className="bg-[#151B26] rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl relative">

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-y-2">
                        <h3 className="text-3xl font-serif text-white/95 leading-tight max-w-[80%]">
                            Behavior, Purpose and Teleology
                        </h3>
                        <span className="text-[#A3A8B1]/50 text-[9px] font-bold tracking-widest uppercase md:mt-2">
                            Primary Source // 1943
                        </span>
                    </div>

                    {/* Authors */}
                    <div className="mb-6">
                        <span className="text-[#609FB8] text-[10px] font-bold tracking-widest uppercase">
                            Rosenblueth, Wiener, & Bigelow
                        </span>
                    </div>

                    {/* Abstract preview */}
                    <p className="text-[#A3A8B1] leading-relaxed font-sans text-sm mb-10">
                        This seminal paper established the conceptual framework for modern cybernetics. By defining 'purpose' not as a mystical force but as a result of feedback mechanisms, the authors bridged the gap between biological organisms and engineered machines.
                    </p>

                    {/* Action Grids */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Link to="/chapter-2/behavior-taxonomy" state={{ tab: 'map' }} className="bg-[#F28C44] hover:bg-[#FF9B54] text-[#1A1A1A] font-bold text-[10px] tracking-widest uppercase py-4 px-2 rounded-xl flex items-center justify-center space-x-2 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,19.2C8.03,19.2 4.8,15.97 4.8,12C4.8,8.03 8.03,4.8 12,4.8C15.97,4.8 19.2,8.03 19.2,12C19.2,15.97 15.97,19.2 12,19.2M13.4,14A1.4,1.4 0 0,1 12,15.4A1.4,1.4 0 0,1 10.6,14A1.4,1.4 0 0,1 12,12.6A1.4,1.4 0 0,1 13.4,14M12,7.2C10.5,7.2 9.2,8.4 9.2,9.9H10.7A1.3,1.3 0 0,1 12,8.6A1.3,1.3 0 0,1 13.3,9.9C13.3,11.2 11.4,11 11.4,13.2H12.9C12.9,11.6 14.8,11.4 14.8,9.9C14.8,8.4 13.5,7.2 12,7.2Z" />
                            </svg>
                            <span>Theory</span>
                        </Link>

                        <a href="https://drive.google.com/uc?export=download&id=1iYymRHCWLdtcu_jjuaVAHXnc98GcYgQc" target="_blank" rel="noopener noreferrer" className="bg-[#1A2235] hover:bg-[#232D45] text-white/80 font-bold text-[10px] tracking-widest uppercase py-4 px-2 rounded-xl flex items-center justify-center space-x-2 border border-white/5 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M12,19L8,15H10.5V12H13.5V15H16L12,19M13,9V3.5L18.5,9H13Z" />
                            </svg>
                            <span>PDF</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <Link to="/chapter-2/behavior-taxonomy" state={{ tab: 'sim_phys' }} className="bg-[#1A2235] hover:bg-[#232D45] text-white/80 font-bold text-[10px] tracking-widest uppercase py-4 px-2 rounded-xl flex items-center justify-center space-x-2 border border-white/5 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19V19M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3H14Z" />
                            </svg>
                            <span>Physics Sim</span>
                        </Link>

                        <Link to="/chapter-2/behavior-taxonomy" state={{ tab: 'sim_family' }} className="bg-[#D95A11]/20 hover:bg-[#D95A11]/40 text-[#FFCDA5] font-bold text-[10px] tracking-widest uppercase py-4 px-2 rounded-xl flex items-center justify-center space-x-2 border border-[#D95A11]/30 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Family Sim</span>
                        </Link>
                    </div>

                    {/* Placeholder Visual Preview */}
                    <Link to="/chapter-2/behavior-taxonomy" state={{ tab: 'sim_phys' }} className="block w-full aspect-video bg-[#0B0F18] rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer">
                        {/* Fake network pattern */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#0A0D14] to-[#0A0D14]"
                            style={{ backgroundImage: 'radial-gradient(circle, #609FB8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                            <span className="text-white text-xs font-bold tracking-widest uppercase">View Simulation</span>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default FirstOrderCybernetics;
