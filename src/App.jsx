import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    // Direct Stream Link for 'Flight_through_forest_to_clouds'
    const forestVideoUrl = 'https://drive.google.com/uc?export=download&id=13U1UUPJGhSmVsggra6jIGmIJesY-zZoJ';

    // Set source and ensure it plays
    setVideoSrc(forestVideoUrl);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Autoplay blocked', e));
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-charcoal">
      {/* Cloud-streamed Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      {/* Glassmorphic Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
          THE ASCENT
        </h1>
        <p className="font-mono text-[#FFD700] text-sm uppercase tracking-[0.3em]">
          Navigating Complexity in Psychological Systems
        </p>
      </div>
    </section>
  );
};

export default Hero;