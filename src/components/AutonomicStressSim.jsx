import React, { useEffect, useRef, useState } from 'react';

const AutonomicStressSim = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const requestRef = useRef();

    // State for controls
    const [chronicStress, setChronicStress] = useState(30);
    const [acuteStress, setAcuteStress] = useState(20);
    const [isCalming, setIsCalming] = useState(false);
    const [status, setStatus] = useState('OPTIMAL REGULATION');
    const [statusColor, setStatusColor] = useState('#4CAF50');

    // Internal refs for animation to avoid React render cycles at 60fps
    const internalState = useRef({
        points: [],
        time: 0,
        acuteOverride: null, // For coping skill
        lastStatus: 'OPTIMAL REGULATION'
    });

    // Handle "Apply Coping Skill"
    const applyCopingSkill = () => {
        setIsCalming(true);
        internalState.current.acuteOverride = 0;

        // Smoothly return to baseline after 4 seconds
        setTimeout(() => {
            setIsCalming(false);
            internalState.current.acuteOverride = null;
        }, 4000);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.clientWidth;
                canvas.height = containerRef.current.clientHeight;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animate = (timestamp) => {
            if (!canvas || !ctx) return;

            const width = canvas.width;
            const height = canvas.height;
            const centerY = height / 2;

            // 1. Update State
            internalState.current.time += 0.05;
            const t = internalState.current.time;

            // Calculate window boundaries
            // Chronic stress shrinks the window from 80% of height down to 20%
            const windowSize = height * (0.8 - (chronicStress / 100) * 0.6);
            const windowTop = centerY - windowSize / 2;
            const windowBottom = centerY + windowSize / 2;

            // Calculate current stress volatility
            const effectiveAcute = internalState.current.acuteOverride !== null
                ? internalState.current.acuteOverride
                : acuteStress;

            // Generate next data point
            // Base oscillation + jagged noise based on acute stress
            const baseOscillation = Math.sin(t * 0.5) * (windowSize * 0.3);
            const noise = (Math.random() - 0.5) * (effectiveAcute * (height / 200));
            const volatility = Math.sin(t * 2.1) * (effectiveAcute * (height / 400));

            const currentY = centerY + baseOscillation + noise + volatility;

            // Add to points array
            internalState.current.points.push(currentY);
            if (internalState.current.points.length > width) {
                internalState.current.points.shift();
            }

            // 2. Determine Status (based on leading edge)
            let currentStatus = 'OPTIMAL REGULATION';
            let cColor = '#4CAF50';
            if (currentY < windowTop) {
                currentStatus = 'HYPERAROUSAL (Panic/Fight-or-Flight)';
                cColor = '#FF3B3B';
            } else if (currentY > windowBottom) {
                currentStatus = 'HYPOAROUSAL (Freeze/Shutdown)';
                cColor = '#3B82F6';
            }

            if (currentStatus !== internalState.current.lastStatus) {
                setStatus(currentStatus);
                setStatusColor(cColor);
                internalState.current.lastStatus = currentStatus;
            }

            // 3. Draw
            ctx.clearRect(0, 0, width, height);

            // Draw background grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            for (let i = 0; i < width; i += 40) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
            }
            for (let i = 0; i < height; i += 40) {
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
            }

            // Draw Window of Tolerance (WOT) area
            ctx.fillStyle = 'rgba(76, 175, 80, 0.05)';
            ctx.fillRect(0, windowTop, width, windowBottom - windowTop);

            // Draw Boundary Lines (Dashed)
            ctx.setLineDash([5, 10]);
            ctx.lineWidth = 2;

            // Upper Boundary
            ctx.strokeStyle = 'rgba(255, 59, 59, 0.4)';
            ctx.beginPath(); ctx.moveTo(0, windowTop); ctx.lineTo(width, windowTop); ctx.stroke();

            // Lower Boundary
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
            ctx.beginPath(); ctx.moveTo(0, windowBottom); ctx.lineTo(width, windowBottom); ctx.stroke();

            ctx.setLineDash([]); // Reset dash

            // Draw the Data Line with dynamic coloring
            // We draw segment by segment to change colors
            const pts = internalState.current.points;
            const step = 1;
            const startX = width - pts.length;

            for (let i = 1; i < pts.length; i++) {
                const x1 = startX + i - 1;
                const y1 = pts[i - 1];
                const x2 = startX + i;
                const y2 = pts[i];

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                // Color based on position relative to boundaries
                if (y2 < windowTop) {
                    ctx.strokeStyle = '#FF3B3B'; // Hyperarousal Red
                } else if (y2 > windowBottom) {
                    ctx.strokeStyle = '#3B82F6'; // Hypoarousal Blue
                } else {
                    ctx.strokeStyle = '#4CAF50'; // Safe Green
                }

                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // --- DRAW PILL LABELS ON CANVAS ---
            const drawPill = (text, y, bgColor, textColor) => {
                const paddingH = 20;
                const paddingV = 12;
                ctx.font = 'bold 9px "JetBrains Mono", monospace';
                const textWidth = ctx.measureText(text).width;
                const pillWidth = textWidth + paddingH;
                const pillHeight = 18;
                const pillX = 20;
                const pillY = y - pillHeight / 2;

                // Draw Background Pill
                ctx.fillStyle = bgColor;
                ctx.beginPath();
                ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 4);
                ctx.fill();

                // Draw Border
                ctx.strokeStyle = textColor + '44'; // Add transparency to border
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw Text
                ctx.fillStyle = textColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, pillX + pillWidth / 2, y);
            };

            // 1. Hyperarousal Label
            drawPill('HYPERAROUSAL (FIGHT/FLIGHT)', windowTop - 15, 'rgba(153, 27, 27, 0.3)', '#f87171');

            // 2. Window of Tolerance Label
            drawPill('WINDOW OF TOLERANCE', centerY, 'rgba(21, 128, 61, 0.2)', '#4ade80');

            // 3. Hypoarousal Label
            drawPill('HYPOAROUSAL (FREEZE)', windowBottom + 15, 'rgba(30, 58, 138, 0.3)', '#60a5fa');

            // Draw "Current Position" indicator at the leading edge
            const leadY = pts[pts.length - 1];
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(width, leadY, 4, 0, Math.PI * 2);
            ctx.fill();

            // Add a glow to the point
            ctx.shadowBlur = 15;
            ctx.shadowColor = ctx.strokeStyle;
            ctx.stroke();
            ctx.shadowBlur = 0;

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(requestRef.current);
        };
    }, [chronicStress, acuteStress]);

    return (
        <div className="w-full flex flex-col bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* 1. Telemetry Header */}
            <div className="flex justify-between items-center px-8 py-4 bg-black/40 border-b border-white/5 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">System.Psyche_Monitor</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                            <span className="font-mono text-xs text-red-500/80">LIVE_TELEMETRY</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-1">Current State</span>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <span className="font-mono text-sm font-bold tracking-tight" style={{ color: statusColor }}>
                            STATUS: {status}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Graph Display Area */}
            <div ref={containerRef} className="relative w-full h-[400px] bg-[#0E0E0E] cursor-crosshair">
                <canvas ref={canvasRef} className="w-full h-full" />
                {/* HTML Labels Overlay REMOVED */}
            </div>

            {/* 3. Control Panel */}
            <div className="px-8 py-8 bg-black/60 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* Slider 1: Chronic Stress */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold">Chronic Stress (Base)</label>
                        <span className="text-white font-mono font-bold text-xs">{chronicStress}%</span>
                    </div>
                    <input
                        type="range" min="0" max="100" value={chronicStress}
                        onChange={(e) => setChronicStress(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D95A11]"
                    />
                    <p className="text-[9px] text-gray-600 uppercase tracking-tighter">Affects regulatory capacity (Window Width)</p>
                </div>

                {/* Slider 2: Acute Stress */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold">Acute Stress (Volatility)</label>
                        <span className="text-white font-mono font-bold text-xs">{acuteStress}%</span>
                    </div>
                    <input
                        type="range" min="0" max="100" value={acuteStress}
                        onChange={(e) => setAcuteStress(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#B32424]"
                        disabled={isCalming}
                    />
                    <p className="text-[9px] text-gray-600 uppercase tracking-tighter">Affects immediate state stability (Line Jaggedness)</p>
                </div>

                {/* Coping Skill Button */}
                <div className="flex flex-col justify-center">
                    <button
                        onClick={applyCopingSkill}
                        disabled={isCalming}
                        className={`w-full py-4 px-6 rounded-xl font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${isCalming ? 'bg-green-600/20 border-green-500/40 text-green-400 cursor-not-allowed' : 'bg-[#D95A11]/10 border-[#D95A11]/40 text-[#D95A11] hover:bg-[#D95A11] hover:text-white hover:shadow-[0_0_20px_rgba(217,90,17,0.3)]'}`}
                    >
                        {isCalming ? 'Coping Skill Active: Breathing...' : 'Apply Coping Skill (Breathe)'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AutonomicStressSim;
