import React, { useState, useEffect, useRef } from 'react';

const ComplexSystems = () => {
    const [videoSrc, setVideoSrc] = useState('');
    const [showTitle, setShowTitle] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Reveal text after 1 second
        const textTimer = setTimeout(() => {
            setShowTitle(true);
        }, 1000);

        // Direct Stream Link from Google Drive for 'Ants_forming_bridge_across_void'
        const antsVideoUrl = 'https://drive.google.com/uc?export=download&id=1sPqIilfEk29c1RsaymUSF2e84ci3TMCD';

        // Lazy load the background video
        const loadTimer = setTimeout(() => {
            setVideoSrc(antsVideoUrl);
            if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(e => console.log('Autoplay possibly blocked', e));
            }
        }, 500);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(loadTimer);
        };
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-charcoal animate-fade-in" data-purpose="complex-systems-section">

            {/* Autoplaying, muted background video from Cloud Source */}
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                {videoSrc && <source src={videoSrc} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>

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