import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DynamicEquilibrium = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#F8F9FA] text-[#121212] font-sans pb-12 overflow-x-hidden">

            {/* Top Navigation */}
            <div className="flex items-center p-6 mb-4 mt-2">
                <Link to="/chapter-1" className="text-[#121212] hover:text-[#D95A11] transition-colors p-2 -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div className="flex-1 text-center">
                    <span className="text-[#D95A11] text-xs font-bold tracking-widest uppercase">Easy Explanation</span>
                </div>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            <div className="max-w-xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1528] leading-tight mb-4">
                        Dynamic Equilibrium:<br />Simply Put
                    </h1>
                    <div className="w-16 h-1 bg-[#D95A11] mx-auto"></div>
                </div>

                {/* Metaphor Image Card */}
                <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
                    <img
                        src="/treading_water_metaphor.png"
                        alt="Person treading water"
                        className="w-full h-auto object-cover aspect-video"
                    />
                    {/* The Metaphor Tag */}
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-[#D95A11] text-white text-[10px] font-bold tracking-wider uppercase py-1 px-3 rounded shadow-md">
                            The Metaphor
                        </span>
                    </div>
                </div>

                {/* Main Explanation */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-[#0B1528] mb-4 font-sans tracking-wide">Treading Water</h2>
                    <p className="text-gray-600 text-[17px] leading-relaxed mb-6 font-medium">
                        Think of a person treading water. To a casual observer, they look like they are standing still. But beneath the surface, their arms and legs are in constant, vigorous motion to keep their head above water.
                    </p>
                </div>

                {/* Key Point Box */}
                <div className="bg-[#FCEDEB] rounded-2xl p-6 md:p-8 mb-12 border border-[#F3D7D1]">
                    <div className="w-10 h-10 bg-[#FAC7BB] rounded-full flex items-center justify-center mb-4">
                        <svg className="w-5 h-5 text-[#D95A11]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 103.636 5.05l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                    </div>
                    <div className="text-[10px] font-bold text-[#0B1528] tracking-widest uppercase mb-2">Key Point</div>
                    <blockquote className="text-lg text-[#334155] italic font-serif leading-relaxed">
                        "Stasis is not a state of rest; it is a process of constant adjustment."
                    </blockquote>
                </div>

                {/* Takeaway Section */}
                <div className="pl-6 border-l-[3px] border-[#D95A11] mb-16">
                    <div className="text-[10px] font-bold text-[#D95A11] tracking-widest uppercase mb-3">Takeaway</div>
                    <p className="text-xl text-[#1E293B] font-semibold leading-relaxed">
                        Life is a perpetual balancing act. Equilibrium is maintained not by doing nothing, but by doing exactly enough to counter the forces pushing against us.
                    </p>
                </div>

                {/* Set Point Dial Graphic */}
                <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center mb-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] box-border border-4 border-[#F8F9FA]/50">
                    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        {/* Outer rotating dashed circles */}
                        <div className="absolute inset-0 border border-[#F3D7D1] rounded-[50%] border-dashed animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute inset-4 border border-[#F3D7D1]/60 rounded-[50%] border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>

                        {/* Center graphic */}
                        <div className="relative flex flex-col items-center justify-center z-10">
                            <div className="mb-2 relative">
                                {/* Heart with heartbeat line */}
                                <svg className="w-10 h-10 text-[#D95A11]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                {/* Active overlay indicating heartbeat */}
                                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                            </div>

                            <div className="text-3xl font-bold font-serif text-[#0B1528] pt-1 leading-none tracking-tight">
                                37°C
                            </div>
                            <div className="text-[8px] font-bold text-[#64748B] tracking-[0.2em] uppercase mt-2">
                                Set Point
                            </div>
                        </div>

                        {/* Faint horizontal line passing behind the center */}
                        <div className="absolute top-1/2 left-[-10%] right-[-10%] h-[1px] bg-[#E2E8F0] z-0"></div>
                    </div>

                    <p className="text-[#64748B] text-[13px] italic font-serif text-center">
                        Internal balance through active oscillation
                    </p>
                </div>

                {/* Bottom Action Button */}
                <div className="flex justify-center mt-8">
                    <Link to="/chapter-1" className="bg-[#D95A11] hover:bg-[#E86A21] text-white text-[13px] font-bold tracking-widest uppercase py-4 px-10 rounded-xl w-full flex items-center justify-center shadow-[0_8px_20px_rgba(217,90,17,0.3)] hover:shadow-[0_12px_25px_rgba(217,90,17,0.4)] hover:-translate-y-1 transition-all duration-300 group">
                        Got it, Back to Chapter
                        <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default DynamicEquilibrium;
