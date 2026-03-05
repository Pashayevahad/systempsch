import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const Hero = () => {
    const [title, setTitle] = useState('');
    const [videoSrc, setVideoSrc] = useState('');
    const videoRef = useRef(null);

    useEffect(() => {
        // Fetch title dynamically from the Supabase 'content' table
        const fetchHeroContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('content')
                    .select('title')
                    .limit(1)
                    .single();

                if (error) throw error;
                if (data && data.title) {
                    setTitle(data.title);
                }
            } catch (err) {
                console.warn("Could not fetch title from Supabase. Falling back to default. Error:", err.message);
                setTitle('The Ascent'); // Fallback if table doesn't exist or network fails
            }
        };

        fetchHeroContent();

        // Lazy load the background video to ensure initial page paints quickly without blocking
        const loadTimer = setTimeout(() => {
            setVideoSrc('/Flight_through_forest_to_clouds_delpmaspu_.mp4');
            if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(e => console.log('Autoplay possibly blocked by browser policy', e));
            }
        }, 500); // 500ms delay to prioritize critical render path

        return () => clearTimeout(loadTimer);
    }, []);

    // Helper to keep the aesthetic formatting of italicizing the last word
    const renderFormattedTitle = (text) => {
        if (!text) return <span className="opacity-0">Loading...</span>;
        const words = text.split(' ');
        if (words.length <= 1) return <span className="italic font-serif">{text}</span>;

        const lastWord = words.pop();
        return (
            <>
                {words.join(' ')} <span className="italic font-serif">{lastWord}</span>
            </>
        );
    };

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6" data-purpose="hero-section" id="ascent">

            {/* Autoplaying, muted background video with lazy initialized source */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none"></div>

            {/* Content over video */}
            <div className="relative z-20 text-center max-w-4xl" data-purpose="hero-content">
                <p className="font-mono text-[#FFD700] mb-4 animate-pulse uppercase tracking-[0.15em] text-xs">
                    Initializing Ascent: System.Psyche.v1
                </p>

                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-[-0.02em] text-white">
                    {renderFormattedTitle(title || 'The Ascent')}
                </h1>

                <p className="font-mono text-sm md:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    Where structural engineering meets cognitive resonance. Exploring the aerodynamic properties of the human mind as it navigates the turbulence of existence.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 z-20">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">Descent into depth</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#FFD700] to-transparent"></div>
            </div>

        </section>
    );
};

export default Hero;
