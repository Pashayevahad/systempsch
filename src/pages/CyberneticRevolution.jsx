import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CyberneticRevolution = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0A0D14] text-white font-sans overflow-x-hidden pb-32 relative">
            {/* Custom Styles for Insane Background */}
            <style>
                {`
                    @keyframes subtle-pan {
                        0% { transform: scale(1.05) translate(0, 0); }
                        50% { transform: scale(1.1) translate(-1%, -1%); }
                        100% { transform: scale(1.05) translate(0, 0); }
                    }
                    @keyframes grid-move {
                        0% { background-position: 0 0; }
                        100% { background-position: 0 40px; }
                    }
                `}
            </style>

            {/* Background System */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0D14]">
                {/* Dynamic Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop")',
                        animation: 'subtle-pan 30s ease-in-out infinite'
                    }}
                ></div>

                {/* Moving Cyber Grid */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'linear-gradient(#D95A11 1px, transparent 1px), linear-gradient(90deg, #D95A11 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-50%)',
                        transformOrigin: 'top center',
                        animation: 'grid-move 3s linear infinite'
                    }}
                ></div>

                {/* Ambient Glows */}
                <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[#D95A11]/10 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4477FF]/10 rounded-full blur-[150px] mix-blend-screen"></div>

                {/* Vignette & Fade Filters for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/60 via-transparent to-[#0A0D14]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0D14_100%)] opacity-80"></div>
            </div>

            <div className="relative z-10 w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-8">
                    <Link to="/complex-systems" className="text-[#D95A11] hover:text-white transition-all transform hover:scale-110">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h2 className="text-[#D95A11] font-serif italic text-lg tracking-wide">The Cybernetic Revolution</h2>
                    <button className="text-[#A1A1A1] hover:text-white transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <div className="px-6">
                    {/* Module Badge */}
                    <div className="mb-4">
                        <span className="text-[#7D5A44] text-xs font-bold tracking-[0.2em] uppercase">
                            Module 02
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-[2.8rem] font-serif leading-tight mb-8 max-w-xs">
                        Chapter 2: The Cybernetic Revolution
                    </h1>

                    {/* Description Divider */}
                    <div className="flex items-center space-x-6 mb-12">
                        <div className="w-px h-16 bg-white/10"></div>
                        <p className="text-[#A1A1A1] font-sans text-sm tracking-wide leading-relaxed max-w-[280px]">
                            First-Order Cybernetics, Feedback Dynamics, Ashby’s Law
                        </p>
                    </div>

                    {/* Content Cards */}
                    <div className="space-y-4 mb-16">
                        {/* Card 01 */}
                        <Link to="/chapter-2/first-order" className="block bg-[#151B26] rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-[#D95A11]/30 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[#D95A11] font-serif italic text-xl font-bold">01.</span>
                                <div className="text-[#D95A11] opacity-60 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M5 4H7V10H5V4M9 4H11V14H9V4M13 4H15V18H13V4M17 4H19V22H17V4Z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-serif text-white mb-4">First-Order Cybernetics</h2>
                            <p className="text-[#A3A8B1] leading-relaxed font-sans text-sm">
                                The study of communication and control in animals and machines. Exploring the foundational bridge between biological and technological systems.
                            </p>
                        </Link>

                        {/* Card 02 */}
                        <div className="bg-[#151B26] rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-[#D95A11]/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[#D95A11] font-serif italic text-xl font-bold">02.</span>
                                <div className="text-[#D95A11] opacity-60 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.6,6.62c-1.44,0-2.8,0.56-3.77,1.58L12,11.08l-2.83-2.88c-0.97-1.01-2.33-1.58-3.77-1.58c-2.92,0-5.3,2.38-5.3,5.3s2.38,5.3,5.3,5.3c1.44,0,2.8-0.56,3.77-1.58L12,12.92l2.83,2.88c0.97,1.01,2.33,1.58,3.77,1.58c2.92,0,5.3-2.38,5.3-5.3S21.52,6.62,18.6,6.62z M6.1,15.12c-1.88,0-3.41-1.53-3.41-3.41s1.53-3.41,3.41-3.41c0.9,0,1.72,0.36,2.33,0.99l2.7,2.42l-2.7,2.42C7.82,14.76,7,15.12,6.1,15.12z M17.9,15.12c-0.9,0-1.72-0.36-2.33-0.99l-2.7-2.42l2.7-2.42c0.61-0.63,1.43-1,2.33-1c1.88,0,3.41,1.53,3.41,3.41S19.78,15.12,17.9,15.12z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-serif text-white mb-4 italic">Feedback Dynamics</h2>
                            <p className="text-[#A3A8B1] leading-relaxed font-sans text-sm">
                                Distinguishing between stabilizing negative loops and amplifying positive loops. Understanding equilibrium and runaway growth within a closed loop.
                            </p>
                        </div>

                        {/* Card 03 */}
                        <div className="bg-[#151B26] rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-[#D95A11]/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[#D95A11] font-serif italic text-xl font-bold">03.</span>
                                <div className="text-[#D95A11] opacity-60 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12,4L10.5,5.5L12.75,7.75H8.5V11.25H12V13H8.5V16.5H12.75L10.5,18.75L12,20.25L15.25,17H19V13H15.25V11.25H19V7.25H15.25L12,4M13,9.25H17V11.25H13V9.25M13,13H17V15H13V13Z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-serif text-white mb-4">Ashby’s Law of Requisite Variety</h2>
                            <p className="text-[#A3A8B1] leading-relaxed font-sans text-sm">
                                Why the internal variety of a controller must match the variety of the disturbances it handles. Variety absorbs variety.
                            </p>
                        </div>

                        {/* Card 04 */}
                        <div className="bg-[#151B26] rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-[#D95A11]/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[#D95A11] font-serif italic text-xl font-bold">04.</span>
                                <div className="text-[#D95A11] opacity-60 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12,1V5H10.5L12,7L13.5,5H12M13,8H17V12H13V8M13.5,13L12,15L10.5,13H12V9H8.5V12.75L10.75,10.5L12.25,12L9,15.25H5V11.25H9M11,16V22H13V16H11Z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-serif text-white mb-4 italic leading-tight">Managerial Cybernetics</h2>
                            <p className="text-[#A3A8B1] leading-relaxed font-sans text-sm">
                                Stafford Beer’s Viable System Model (VSM) and organizational health. Applying cybernetic principles to human institutions and management.
                            </p>
                        </div>
                    </div >

                    {/* Interactive Laboratory */}
                    < div className="text-center mb-12 px-2" >
                        <h2 className="text-4xl font-serif text-white mb-6 italic">Interactive Laboratory</h2>
                        <p className="text-[#727883] mb-8 font-sans text-sm leading-relaxed max-w-[280px] mx-auto">
                            Experiment with feedback loops and variety constraints in a real-time virtualized environment.
                        </p>

                        {/* Launch Button */}
                        <Link
                            to="/cybernetic-simulation"
                            className="bg-[#242A38] border border-white/5 w-full py-5 rounded-xl flex items-center justify-center space-x-4 mb-10 hover:bg-[#2C3446] transition-all no-underline shadow-2xl group"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#D95A11]/20 blur-xl rounded-full scale-150 group-hover:scale-200 transition-transform"></div>
                                <svg className="w-6 h-6 text-[#D95A11] relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19,15.14V7.5L13,1.5V1H11V1.5L5,7.5V15.14C3.84,15.65 3,16.7 3,18V21A1,1 0 0,0 4,22H20A1,1 0 0,0 21,21V18C21,16.7 20.16,15.65 19,15.14M7,9L11,5V13.5C11,13.78 11.22,14 11.5,14H12.5C12.78,14 13,13.78 13,13.5V5L17,9V15H7V9M19,20H5V18C5,17.45 5.45,17 6,17H18A1,1 0 0,1 19,18V20Z" />
                                </svg>
                            </div>
                            <span className="text-white font-sans font-bold tracking-[0.15em] text-xs uppercase">Launch Cybernetic Simulation</span>
                        </Link>

                        {/* Placeholder for Video/Visual */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#0A0D14] border border-white/5 shadow-2xl group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
                                alt="Simulation Preview"
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 blur-[2px] group-hover:blur-0"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-12 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-[#D95A11] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Interactive glow effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D95A11]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                        </div>
                    </div >
                </div >

                {/* Bottom Navigation */}
                < div className="fixed bottom-0 left-0 right-0 bg-[#0A0D14]/80 backdrop-blur-2xl border-t border-white/5 h-28 flex items-center justify-around px-8 z-50" >
                    <button className="flex flex-col items-center justify-center group opacity-40 hover:opacity-100 transition-opacity">
                        <div className="p-2 mb-1">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M11,7H13V9H11V7M11,11H13V17H11V11Z" />
                            </svg>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A1A1A1]">Introduction</span>
                    </button>

                    <div className="flex flex-col items-center justify-center">
                        <div className="p-3 bg-[#D95A11]/10 rounded-xl mb-1 text-[#D95A11]">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7,5H21V7H7V5M7,13H21V15H7V13M7,19H21V21H7V19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M5,5H7V7H5V5M5,13H7V15H5V13M5,19H7V21H5V19Z" />
                            </svg>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D95A11]">Contents</span>
                        {/* Active Indicator Dot */}
                        <div className="w-1 h-1 bg-[#D95A11] rounded-full mt-1.5 shadow-[0_0_8px_#D95A11]"></div>
                    </div>

                    <button className="flex flex-col items-center justify-center group opacity-40 hover:opacity-100 transition-opacity">
                        <div className="p-2 mb-1">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M16,11A1,1 0 0,0 15,12A1,1 0 0,0 16,13A1,1 0 0,0 17,12A1,1 0 0,0 16,11M8,11A1,1 0 0,0 7,12A1,1 0 0,0 8,13A1,1 0 0,0 9,12A1,1 0 0,0 8,11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20Z" />
                            </svg>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A1A1A1]">State-Space</span>
                    </button>
                </div >
            </div >
        </div >
    );
};

export default CyberneticRevolution;
