import React, { useState, useEffect } from 'react';
import ImageSequenceCanvas from '../components/ImageSequenceCanvas';

const LinguisticPsychology = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const preloadImages = async () => {
            const promises = [];
            // We are using the first 8 frames as initially requested
            for (let i = 0; i < 8; i++) {
                promises.push(new Promise((resolve) => {
                    const img = new Image();
                    const paddedIndex = String(i).padStart(3, '0');
                    img.src = `/Linguisitic_Psch_Images/Analyst_debugging_brain_for_fluency_delpmaspu__${paddedIndex}.png`;
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

        const overlayTimer = setTimeout(() => {
            if (isMounted) {
                setShowOverlay(true);
            }
        }, 10000); // 10 seconds delay

        return () => {
            isMounted = false;
            clearTimeout(overlayTimer);
        };
    }, []);

    return (
        <section
            className="relative w-full h-screen overflow-hidden bg-black text-white"
            data-purpose="linguistic-psychology-section"
        >
            {/* Background Image Sequence - Zero-latency pre-loading state */}
            {imagesLoaded && (
                <ImageSequenceCanvas
                    dirPath="/Linguisitic_Psch_Images"
                    prefix="Analyst_debugging_brain_for_fluency_delpmaspu__"
                    totalFrames={8}
                    fps={0.8}
                    extension=".png"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
            )}

            {/* Technical Data Overlay */}
            <div
                className={`absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none transition-opacity duration-1000 ease-in-out ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="bg-black/60 backdrop-blur-md border border-[#FFD700]/30 p-8 max-w-2xl rounded-sm">
                    <h2 className="text-[#FFD700] font-mono text-xl mb-4 tracking-widest uppercase border-b border-[#FFD700]/20 pb-2">
                        System Analysis: Linguistic Processing
                    </h2>

                    <div className="font-mono text-white/80 space-y-4 text-sm leading-relaxed">
                        <div>
                            <span className="text-red-400 font-bold block mb-1">[PROBLEM_DETECTED]</span>
                            <span className="text-white block">Latency identified in speech production formulation phase.</span>
                        </div>

                        <div>
                            <span className="text-[#FFD700] font-bold block mb-1">[FRAMEWORK_APPLICATION]</span>
                            <span className="text-white block">Levelt's Model of Speech Production applied to trace bottlenecks from conceptualization to articulation.</span>
                        </div>

                        <div>
                            <span className="text-[#FFD700] font-bold block mb-1">[COGNITIVE_LOAD_ANALYSIS]</span>
                            <span className="text-white block">Robinson's Cognition Hypothesis utilized to assess task complexity and its impact on fluency and accuracy.</span>
                        </div>

                        <div>
                            <span className="text-green-400 font-bold block mb-1">[SOLUTION_DEPLOYED]</span>
                            <span className="text-white block">Pipeline Optimization: Streamlining lexical retrieval pathways and balancing cognitive demands to restore optimal fluency output.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LinguisticPsychology;
