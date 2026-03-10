import React, { useState, useEffect } from 'react';
import ImageSequenceCanvas from '../components/ImageSequenceCanvas';
import { supabase } from '../lib/supabase';

const BusinessPsychology = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const preloadImages = async () => {
            const promises = [];
            for (let i = 0; i < 8; i++) {
                promises.push(new Promise((resolve) => {
                    const img = new Image();
                    const paddedIndex = String(i).padStart(3, '0');
                    img.src = `/Business_Psych_images/business_psych_${paddedIndex}.png`;
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                }));
            }
            await Promise.all(promises);
            if (isMounted) {
                setImagesLoaded(true);
            }
        };

        preloadImages();

        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Fetch from the 'content' table from Supabase
                const { data, error } = await supabase
                    .from('content')
                    .select('*')
                    .limit(1)
                    .single();

                if (error) throw error;
                if (data) {
                    // Try to extract relevant text, fallback to stringified data to ensure something displays
                    const text = data.content || data.description || data.text || data.title || JSON.stringify(data, null, 2);
                    setContent(text);
                }
            } catch (err) {
                console.warn("Could not fetch content from Supabase. Falling back to default.", err.message);
                setContent('SYSTEM.PROTOCOL.INIT\n\nTransition sequence initialized. Converting realistic boardroom structures into underlying technical blueprints.\n\nAnalyzing psychological frameworks...\nAligning variables...\nExecuting at 1 Hz sync rate.\n\n[Nodes 1-6 Intact]\nConflict resolution matrix active.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    useEffect(() => {
        // Trigger fade-in after 10 seconds
        const overlayTimer = setTimeout(() => {
            setShowOverlay(true);
        }, 10000);

        return () => clearTimeout(overlayTimer);
    }, []);

    return (
        <section
            className="relative w-full h-screen overflow-hidden bg-transparent text-white"
            data-purpose="business-psychology-section"
        >
            {/* Background Image Sequence - Only render when fully loaded to prevent black flash */}
            {imagesLoaded && (
                <ImageSequenceCanvas
                    dirPath="/Business_Psych_images"
                    prefix="business_psych_"
                    totalFrames={8}
                    fps={0.8}
                    extension=".png"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
            )}
            {/* Subtle gradient to ensure text remains somewhat readable if it overlaps, though positioned carefully */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0 pointer-events-none"></div>

            {/* Content Overlay */}
            <div
                className={`absolute bottom-10 right-10 max-w-lg w-full bg-black/80 p-8 border border-white/10 backdrop-blur-md transition-opacity duration-1000 ease-in-out z-20 ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
                    <p className="font-mono text-[#FFD700] uppercase tracking-[0.2em] text-xs font-semibold">
                        Business Psychology
                    </p>
                    <div className="flex animate-pulse gap-1">
                        <div className="w-1 h-3 bg-[#FFD700]"></div>
                        <div className="w-1 h-3 bg-[#FFD700] opacity-50"></div>
                    </div>
                </div>

                <div className="font-mono text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {loading ? (
                        <span className="text-[#FFD700] animate-pulse">Requesting payload from /content database...</span>
                    ) : (
                        content
                    )}
                </div>

                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-grow h-px bg-white/5"></div>
                    <span className="font-mono text-[10px] text-[#FFD700]/80 tracking-widest uppercase">
                        State: Architectural Blueprint
                    </span>
                </div>
            </div>
        </section>
    );
};

export default BusinessPsychology;
