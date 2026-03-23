import React, { useEffect, useRef, useState } from 'react';

const CyberneticSim = () => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const [gain, setGain] = useState(-0.5); // Negative feedback by default
    const [variety, setVariety] = useState(50);
    const [disturbance, setDisturbance] = useState(10);
    const [systemState, setSystemState] = useState(0);

    const internalState = useRef({
        points: [],
        time: 0,
        currentVal: 0,
        lastPlotVal: 0
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const animate = () => {
            const width = canvas.width;
            const height = canvas.height;
            const centerY = height / 2;

            // 1. Cybernetic Logic
            // New State = Old State + (Gain * Error) + Disturbance
            // If Disturbance > Variety, regulation fails partially
            const activeDisturbance = Math.max(0, disturbance - (variety / 10));
            const error = 0 - internalState.current.currentVal; // Target is 0

            // Feedback math:
            // Negative gain (-0.8) stabilizes
            // Positive gain (0.2) amplifies
            const feedbackChange = error * Math.abs(gain) * (gain < 0 ? 1 : -1);
            // Wait, if gain is positive, it should move AWAY from zero.
            // If currentVal is 1, and gain is 0.1, it should become 1.1.
            const actualGainEffect = internalState.current.currentVal * gain;

            const randomNoise = (Math.random() - 0.5) * activeDisturbance;
            internalState.current.currentVal += actualGainEffect + randomNoise;

            // Clamp for visualization safety
            if (Math.abs(internalState.current.currentVal) > 500) {
                internalState.current.currentVal = internalState.current.currentVal > 0 ? 500 : -500;
            }

            // 2. Update Points for Plot
            const plotY = centerY - internalState.current.currentVal;
            internalState.current.points.push(plotY);
            if (internalState.current.points.length > width) {
                internalState.current.points.shift();
            }

            setSystemState(internalState.current.currentVal.toFixed(2));

            // 3. Draw Plot
            ctx.clearRect(0, 0, width, height);

            // Grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.setLineDash([2, 5]);
            ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); ctx.stroke();
            ctx.setLineDash([]);

            // Data Line
            ctx.beginPath();
            ctx.strokeStyle = gain < 0 ? '#4CAF50' : '#FF3B3B';
            ctx.lineWidth = 2;
            const pts = internalState.current.points;
            const startX = width - pts.length;
            for (let i = 0; i < pts.length; i++) {
                ctx.lineTo(startX + i, pts[i]);
            }
            ctx.stroke();

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [gain, variety, disturbance]);

    return (
        <div className="w-full flex flex-col bg-[#0F0F0F] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Telemetry Header */}
            <div className="px-8 py-6 bg-black/40 border-b border-white/5 flex justify-between items-center">
                <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 block mb-1">Cybernetic Monitor</span>
                    <h2 className="text-xl font-serif font-bold text-white flex items-center">
                        {gain < 0 ? 'Homeostatic Stability' : 'Positive Feedback Loop'}
                        <div className={`ml-3 w-2 h-2 rounded-full ${gain < 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-bounce'}`}></div>
                    </h2>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 block mb-1">System Entropy</span>
                    <span className={`text-2xl font-mono font-bold ${Math.abs(systemState) > 100 ? 'text-red-500' : 'text-green-500'}`}>
                        {systemState}
                    </span>
                </div>
            </div>

            {/* Main Viz Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left: Feedback Loop Diagram */}
                <div className="p-12 border-r border-white/5 flex items-center justify-center bg-black/20">
                    <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                        {/* Circular Loop path */}
                        <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>

                        {/* Components */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Controller (Center) */}
                            <div className="w-24 h-24 bg-[#1A1A1A] border-2 border-[#D95A11] rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(217,90,17,0.2)] z-20">
                                <span className="text-[8px] font-mono uppercase text-gray-500 mb-1">Controller</span>
                                <span className="text-xs font-bold text-[#D95A11]">MODULE_V.{variety}</span>
                            </div>

                            {/* Sensor (Top) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#121212] border border-white/10 rounded-full flex flex-col items-center justify-center">
                                <span className="text-[7px] font-mono uppercase text-gray-500">Sensor</span>
                                <div className="w-1 h-3 bg-blue-500 mt-1 animate-pulse"></div>
                            </div>

                            {/* Effector (Bottom) */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#121212] border border-white/10 rounded-full flex flex-col items-center justify-center">
                                <span className="text-[7px] font-mono uppercase text-gray-500">Effector</span>
                                <div className="w-3 h-1 bg-red-500 mt-1 animate-pulse"></div>
                            </div>

                            {/* Feedback Arrows (SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                                <path d="M 50 15 A 35 35 0 0 1 85 50" stroke="#D95A11" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                                <path d="M 85 50 A 35 35 0 0 1 50 85" stroke="#D95A11" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                                <path d="M 50 85 A 35 35 0 0 1 15 50" stroke="#D95A11" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                                <path d="M 15 50 A 35 35 0 0 1 50 15" stroke="#D95A11" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                            </svg>
                        </div>

                        {/* Disturbance Indicator */}
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                            <div className="flex flex-col items-center">
                                <div className="h-20 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse"></div>
                                <span className="text-[8px] font-mono text-red-500 mt-2 uppercase tracking-widest">Entropy Input</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Plot Area */}
                <div className="h-[400px] bg-[#0A0A0A] relative">
                    <canvas ref={canvasRef} width={600} height={400} className="w-full h-full" />
                    <div className="absolute top-4 left-4 flex space-x-2">
                        <span className="px-2 py-0.5 bg-black/50 text-[9px] font-mono text-gray-400 border border-white/10 uppercase">System Trace: V1.0</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="px-8 py-10 bg-black/60 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Loop type / Gain */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Feedback Gain (ω)</label>
                        <span className={`font-mono text-xs font-bold ${gain < 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {gain < 0 ? 'NEGATIVE' : 'POSITIVE'} ({gain})
                        </span>
                    </div>
                    <input type="range" min="-1" max="1" step="0.01" value={gain} onChange={(e) => setGain(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D95A11]" />
                    <p className="text-[9px] text-gray-600 uppercase">Transitions between stability and runaway growth.</p>
                </div>

                {/* Variety (Ashby's Law) */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Requisite Variety (V)</label>
                        <span className="text-white font-mono text-xs font-bold">{variety}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={variety} onChange={(e) => setVariety(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                    <p className="text-[9px] text-gray-600 uppercase">Internal regulatory capacity to absorb entropy.</p>
                </div>

                {/* Entropy / Disturbance */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Entropy Disturbance (D)</label>
                        <span className="text-red-500 font-mono text-xs font-bold">{disturbance}%</span>
                    </div>
                    <input type="range" min="0" max="50" value={disturbance} onChange={(e) => setDisturbance(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
                    <p className="text-[9px] text-gray-600 uppercase">External stressors pushing system toward chaos.</p>
                </div>
            </div>
        </div>
    );
};

export default CyberneticSim;
