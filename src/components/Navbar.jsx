import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#121212]/70 backdrop-blur-md border-b border-white/10" data-purpose="main-navigation">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

                {/* Desktop Navigation Group */}
                <div className="hidden lg:flex space-x-8 items-center h-full">
                    <a className="font-mono uppercase tracking-widest text-white/80 hover:text-[#FFD700] transition-colors text-[1.1rem] font-bold" href="#">Complex System</a>
                    <a className="font-mono uppercase tracking-widest text-white/80 hover:text-[#FFD700] transition-colors text-[1.1rem] font-bold" href="#">Chaos Theory</a>
                    <a className="font-mono uppercase tracking-widest text-white/80 hover:text-[#FFD700] transition-colors text-[1.1rem] font-bold" href="#">System Thinking</a>
                    <div className="h-4 w-px bg-white/20 mx-2"></div>
                    <a className="font-serif italic text-white/80 hover:text-[#FFD700] transition-colors text-[1.1rem] font-bold" href="#">Individual Psychology</a>
                    <a className="font-serif italic text-white/80 hover:text-[#FFD700] transition-colors text-[1.1rem] font-bold" href="#">Business Psych</a>
                    <a className="font-serif italic text-white/80 hover:text-[#FFD700] transition-colors text-[1.1rem] font-bold" href="#">Food Psych</a>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#FFD700] hover:text-white transition-colors p-2 focus:outline-none bg-transparent border-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <div className="flex items-center">
                    <button className="font-mono text-[10px] border border-[#FFD700]/30 px-4 py-2 hover:bg-[#FFD700] hover:text-[#121212] transition-all text-[#FFD700] rounded-none bg-transparent h-9">
                        LOG_FLIGHT_DATA
                    </button>
                </div>
            </div>

            {/* Mobile Slide-out Drawer */}
            <div
                className={`lg:hidden absolute top-16 left-0 w-full bg-[#121212]/95 backdrop-blur-xl border-b border-[#FFD700]/10 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'}`}
            >
                <div className="flex flex-col space-y-4 px-6">
                    <a className="font-mono uppercase tracking-widest text-white hover:text-[#FFD700] transition-colors text-sm font-bold block py-2" href="#">Complex System</a>
                    <a className="font-mono uppercase tracking-widest text-white hover:text-[#FFD700] transition-colors text-sm font-bold block py-2" href="#">Chaos Theory</a>
                    <a className="font-mono uppercase tracking-widest text-white hover:text-[#FFD700] transition-colors text-sm font-bold block py-2" href="#">System Thinking</a>

                    <div className="w-full h-px bg-white/10 my-2"></div>

                    <a className="font-serif italic text-white hover:text-[#FFD700] transition-colors text-lg font-bold block py-2" href="#">Individual Psychology</a>
                    <a className="font-serif italic text-white hover:text-[#FFD700] transition-colors text-lg font-bold block py-2" href="#">Business Psych</a>
                    <a className="font-serif italic text-white hover:text-[#FFD700] transition-colors text-lg font-bold block py-2" href="#">Food Psych</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
