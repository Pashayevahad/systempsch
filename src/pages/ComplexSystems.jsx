import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageSequenceCanvas from '../components/ImageSequenceCanvas';

const ComplexSystems = () => {
    const [showTitle, setShowTitle] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Reveal text after 1 second
        const textTimer = setTimeout(() => {
            setShowTitle(true);
        }, 1000);

        return () => {
            clearTimeout(textTimer);
        };
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-charcoal animate-fade-in" data-purpose="complex-systems-section">

            <ImageSequenceCanvas
                dirPath="/Ants_forming_bridge_across_void_images"
                prefix="Ants_forming_bridge_across_void_delpmaspu__"
                totalFrames={80}
                fps={24}
            />

            {/* Gradient overlay for better text contrast over the video */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10 pointer-events-none"></div>

            {/* Hamburger Menu Icon (Top Left) */}
            <div className="absolute top-[4.5rem] left-6 z-40">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-white hover:text-[#FFD700] transition-colors p-2 focus:outline-none bg-transparent border-none"
                    aria-label="Open Parts Menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Full Screen Overlay Menu */}
            <div
                className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out flex flex-col justify-center items-start pl-8 md:pl-24 pt-16 overflow-y-auto ${isMenuOpen ? 'opacity-100 pointer-events-auto bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-black/20 backdrop-blur-[2px]' : 'opacity-0 pointer-events-none bg-black/0'}`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-8 right-8 text-[#FFD700] hover:text-white transition-colors focus:outline-none bg-transparent border-none p-2"
                    aria-label="Close Parts Menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Hamburger Icon top left for overlay context */}
                <div className="absolute top-[4.5rem] left-6 z-40">
                    <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                {/* Parts Menu List */}
                <div className="flex flex-col space-y-12 w-full max-w-2xl px-4 mt-8">
                    <div className="border-l-2 border-[#FFD700] pl-6 py-1">
                        <h2 className="font-mono text-[#FFD700] tracking-widest text-sm font-bold uppercase leading-relaxed">
                            <span className="block mb-1">Part I: Biological and</span>
                            <span className="block">Mechanical Foundations</span>
                        </h2>
                    </div>

                    <div className="border-l-2 border-[#FFD700] pl-6 py-1">
                        <h2 className="font-mono text-[#FFD700] tracking-widest text-sm font-bold uppercase leading-relaxed">
                            <span className="block mb-1">Part II: Mathematical</span>
                            <span className="block">Logic and Modeling</span>
                        </h2>
                    </div>

                    <div className="border-l-2 border-[#FFD700] pl-6 py-1">
                        <h2 className="font-mono text-[#FFD700] tracking-widest text-sm font-bold uppercase leading-relaxed">
                            <span className="block mb-1">Part III: Complexity and</span>
                            <span className="block">Emergence</span>
                        </h2>
                    </div>

                    <div className="border-l-2 border-[#FFD700] pl-6 py-1">
                        <h2 className="font-mono text-[#FFD700] tracking-widest text-sm font-bold uppercase leading-relaxed">
                            <span className="block mb-1">Part IV: Advanced</span>
                            <span className="block">Adaptive Intelligence</span>
                        </h2>
                    </div>

                    <div className="border-l-2 border-[#FFD700] pl-6 py-1">
                        <h2 className="font-mono text-[#FFD700] tracking-widest text-sm font-bold uppercase leading-relaxed">
                            <span className="block mb-1">Part V: Synthesis and</span>
                            <span className="block">Professional Roadmap</span>
                        </h2>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="relative w-full max-w-sm px-4 mt-8 mb-8">
                    <div className="w-full h-px bg-white/10 mb-6"></div>
                    <p className="font-mono text-white/40 text-[10px] tracking-[0.3em] uppercase">
                        Systems Intelligence Framework<br />
                        <span className="mt-2 block">V3.0</span>
                    </p>
                </div>
            </div>

            {/* Content over video */}
            <div className={`relative z-20 text-center max-w-4xl px-4 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {/* High-end glassmorphic text overlay that fades in after 1 second */}
                <div className={`transition-all duration-1000 ease-out transform ${showTitle ? 'opacity-100 translate-y-0 backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl' : 'opacity-0 translate-y-8'}`}>
                    <p className="font-mono text-[#FFD700] mb-4 uppercase tracking-[0.2em] text-xs font-semibold">
                        Biological Frameworks
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-[-0.02em] text-white">
                        Emergence: <br /><span className="italic font-serif font-medium text-white/90">Collective Intelligence in Action.</span>
                    </h1>
                </div>
            </div>

        </section>
    );
};

export default ComplexSystems;