import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CyberneticRevolution = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#160E0C] text-white font-sans overflow-x-hidden pb-12">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 pt-8">
                <Link to="/complex-systems" className="text-[#D95A11] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <Link to="/complex-systems" className="text-[#D95A11] text-xs font-bold tracking-widest uppercase hover:text-white transition-colors">
                    Back to Menu
                </Link>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8">
                {/* Badge */}
                <div className="inline-block bg-[#3A241A] px-3 py-1 rounded-md mb-8">
                    <span className="text-[#D95A11] text-[10px] font-bold tracking-widest uppercase">
                        Systems Foundations
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                    Chapter 2: The <br />
                    <span className="text-[#D95A11]">Cybernetic</span> <br />
                    Revolution
                </h1>

                {/* Subtitle / Description */}
                <div className="border-l border-[#D95A11] pl-6 mb-12">
                    <p className="text-[#A1A1A1] italic font-serif text-lg">
                        First-Order Cybernetics, Feedback Dynamics, Ashby's Law
                    </p>
                </div>

                {/* Content Cards */}
                <div className="space-y-6">
                    {/* Card 01 */}
                    <div className="bg-[#241814] rounded-2xl p-8 border border-white/5 cursor-pointer hover:border-[#D95A11]/30 transition-all group">
                        <div className="text-[#D95A11] font-serif italic text-3xl font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">01</div>
                        <h2 className="text-2xl font-serif text-white mb-4">First-Order Cybernetics</h2>
                        <p className="text-[#A1A1A1] leading-relaxed">
                            The study of communication and control in animals and machines. Exploring the foundational bridge between biological and technological systems.
                        </p>
                    </div>

                    {/* Card 02 */}
                    <div className="bg-[#241814] rounded-2xl p-8 border border-white/5 cursor-pointer hover:border-[#D95A11]/30 transition-all group">
                        <div className="text-[#D95A11] font-serif italic text-3xl font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">02</div>
                        <h2 className="text-2xl font-serif text-white mb-4">Feedback Dynamics</h2>
                        <p className="text-[#A1A1A1] leading-relaxed">
                            Distinguishing between stabilizing negative loops and amplifying positive loops. Understanding equilibrium and runaway growth within a closed loop.
                        </p>
                    </div>

                    {/* Card 03 */}
                    <div className="bg-[#241814] rounded-2xl p-8 border border-white/5 cursor-pointer hover:border-[#D95A11]/30 transition-all group">
                        <div className="text-[#D95A11] font-serif italic text-3xl font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">03</div>
                        <h2 className="text-2xl font-serif text-white mb-4">Ashby’s Law of Requisite Variety</h2>
                        <p className="text-[#A1A1A1] leading-relaxed">
                            Why the internal variety of a controller must match the variety of the disturbances it handles. Variety absorbs variety.
                        </p>
                    </div>

                    {/* Card 04 */}
                    <div className="bg-[#241814] rounded-2xl p-8 border border-white/5 cursor-pointer hover:border-[#D95A11]/30 transition-all group">
                        <div className="text-[#D95A11] font-serif italic text-3xl font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">04</div>
                        <h2 className="text-2xl font-serif text-white mb-4">Managerial Cybernetics</h2>
                        <p className="text-[#A1A1A1] leading-relaxed">
                            Stafford Beer's Viable System Model (VSM) and organizational health. Applying cybernetic principles to human institutions and management.
                        </p>
                    </div>
                </div>

                {/* Interactive Laboratory */}
                <div className="mt-12 bg-[#241814] rounded-[2rem] p-12 border border-white/5 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D95A11 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-serif text-white mb-6">Interactive Laboratory</h2>
                        <p className="text-[#A1A1A1] mb-10 max-w-sm mx-auto leading-relaxed">
                            Visualize the interplay between positive and negative feedback loops in real-time. Experiment with variety constraints in our sandbox environment.
                        </p>
                        <Link to="/cybernetic-simulation" className="w-full bg-[#D95A11] hover:bg-[#F26419] text-white font-bold py-5 px-8 rounded-full shadow-lg shadow-[#D95A11]/20 transition-all flex items-center justify-center space-x-3 group no-underline">
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19,15.14V7.5L13,1.5V1H11V1.5L5,7.5V15.14C3.84,15.65 3,16.7 3,18V21A1,1 0 0,0 4,22H20A1,1 0 0,0 21,21V18C21,16.7 20.16,15.65 19,15.14M7,9L11,5V13.5C11,13.78 11.22,14 11.5,14H12.5C12.78,14 13,13.78 13,13.5V5L17,9V15H7V9M19,20H5V18C5,17.45 5.45,17 6,17H18A1,1 0 0,1 19,18V20Z" />
                            </svg>
                            <span>Launch Cybernetic Simulation</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#160E0C]/90 backdrop-blur-xl border-t border-white/5 px-8 py-4 flex justify-between items-center z-50">
                {/* Introduction */}
                <button className="flex flex-col items-center group">
                    <div className="p-2 text-[#A1A1A1] group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-[#A1A1A1] font-bold tracking-widest uppercase mt-1">Introduction</span>
                </button>

                {/* Contents (Active) */}
                <Link to="/complex-systems" className="flex flex-col items-center">
                    <div className="bg-[#3A241A] p-2.5 rounded-xl text-[#D95A11] shadow-lg shadow-[#D95A11]/10">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7,5H21V7H7V5M7,13H21V15H7V13M7,19H21V21H7V19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M5,5H7V7H5V5M5,13H7V15H5V13M5,19H7V21H5V19Z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-[#D95A11] font-bold tracking-widest uppercase mt-1">Contents</span>
                </Link>

                {/* State-Space */}
                <button className="flex flex-col items-center group">
                    <div className="p-2 text-[#A1A1A1] group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-[#A1A1A1] font-bold tracking-widest uppercase mt-1">State-Space</span>
                </button>
            </div>
        </div>
    );
};

export default CyberneticRevolution;
