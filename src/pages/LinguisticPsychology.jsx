import React from 'react';

const LinguisticPsychology = () => {
    return (
        <section
            className="flex items-center justify-center w-full h-screen bg-[#121212] text-white overflow-hidden"
            data-purpose="linguistic-psychology-section"
        >
            <div className="text-center z-10 relative px-6">
                <h1 className="text-4xl md:text-6xl font-serif italic mb-6 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                    Linguistic Psychology
                </h1>
                <p className="font-mono text-sm md:text-base text-white/60 tracking-widest max-w-2xl mx-auto uppercase">
                    Module analysis and content initialization pending.
                </p>
                <div className="mt-12 flex justify-center">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"></div>
                </div>
            </div>

            {/* Subtle radial background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        </section>
    );
};

export default LinguisticPsychology;
