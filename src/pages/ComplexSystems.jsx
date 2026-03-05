import React, { useState, useEffect } from 'react';
import ImageSequenceCanvas from '../components/ImageSequenceCanvas';

const ComplexSystems = () => {
    const [showTitle, setShowTitle] = useState(false);

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
            />

            {/* Gradient overlay for better text contrast over the video */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10 pointer-events-none"></div>

            {/* Content over video */}
            <div className="relative z-20 text-center max-w-4xl px-4">
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