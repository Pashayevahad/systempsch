import React, { useState, useEffect } from 'react';
import ImageSequenceCanvas from '../components/ImageSequenceCanvas';
import { supabase } from '../lib/supabase';

const BusinessPsychology = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

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
                setContent('SYSTEM.PROTOCOL.INIT\n\nTransition sequence initialized. Converting realistic boardroom structures into underlying technical blueprints.\n\nAnalyzing psychological frameworks...\nAligning variables...\nExecuting at 0.5 Hz sync rate.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return (
        <section
            className="w-full h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-charcoal"
            style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}
            data-purpose="business-psychology-section"
        >

            {/* Left Column - Image Sequence */}
            <div className="relative w-full h-full border-r border-[#FFD700]/10 bg-black">
                <ImageSequenceCanvas
                    dirPath="/Business_Psych_images"
                    prefix="business_psych_"
                    totalFrames={8}
                    fps={0.5}
                    extension=".png"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                {/* Overlay text on image */}
                <div className="absolute bottom-8 left-8 z-10">
                    <p className="font-mono text-[#FFD700] uppercase tracking-widest text-xs opacity-70">
                        Visual Stream [0.5 FPS]
                    </p>
                </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="relative w-full h-full flex flex-col justify-center p-12 lg:p-24 bg-[#121212] overflow-y-auto">
                <div className="max-w-2xl">
                    <div className="mb-12 border-b border-white/10 pb-6 flex items-center justify-between">
                        <p className="font-mono text-white/50 uppercase tracking-[0.2em] text-sm">
                            Business Psychology
                        </p>
                        <div className="flex animate-pulse gap-1">
                            <div className="w-1 h-3 bg-[#FFD700]"></div>
                            <div className="w-1 h-3 bg-[#FFD700] opacity-50"></div>
                        </div>
                    </div>

                    <div className="font-mono text-white/80 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                        {loading ? (
                            <span className="text-[#FFD700] animate-pulse">Requesting payload from /content database...</span>
                        ) : (
                            content
                        )}
                    </div>

                    <div className="mt-16 flex items-center gap-6">
                        <div className="flex-grow h-px bg-white/5"></div>
                        <span className="font-mono text-[10px] text-[#FFD700]/80 tracking-widest uppercase">
                            State: Architectural Blueprint
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default BusinessPsychology;
