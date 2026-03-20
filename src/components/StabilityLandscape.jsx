import React, { useEffect, useRef, useState } from 'react';

const StabilityLandscape = ({ coreTemp = 37.0, envTemp = 20 }) => {
    const canvasRef = useRef(null);
    const pos = useRef({ x: 0, v: 0 }); // Physical state (x, velocity)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const requestRef = useRef();

    // Reset logic: Detect the main simulation reset
    useEffect(() => {
        if (coreTemp === 37.0 && envTemp === 20.0) {
            setIsCollapsed(false);
            pos.current = { x: 0, v: 0 };
        }
    }, [coreTemp, envTemp]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width;
        let height = canvas.height;

        const resize = () => {
            if (!canvas.parentElement) return;
            width = canvas.parentElement.clientWidth;
            height = 300;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Calculate Resilience (Curve Shape) based on envTemp
            const envStress = Math.abs(envTemp - 20) / 25;

            // k: Stiffness/Bifurcation parameter. 
            // -1.2 (Deep Valley) to 1.5 (Steep Peak).
            // Bifurcation point (inversion) occurs at k = 0.
            const k = (envStress * 2.7) - 1.2;

            // 2. State Mapping vs Gravity Physics
            // targetX mapping (ensure Cold < 37 is Left, Heat > 37 is Right)
            // Range: 31°C to 43°C mapped to -1.5 to 1.5
            const targetX = (coreTemp - 37.0) / 4.0;

            // Check for bifurcation / Collapse
            // If the valley inverts (k > 0) AND the ball is pushed from the center, it collapses.
            if (k > 0.1 && !isCollapsed) {
                setIsCollapsed(true);
            }

            let x;
            if (isCollapsed) {
                // Free physics (Rolling down the newly formed slope)
                // Potential V(x) = x^4 - kx^2
                // Gradient f'(x) = 4x^3 - 2kx
                const gradient = 4 * Math.pow(pos.current.x, 3) - 2 * k * pos.current.x;

                // Accelerate downhill. Friction: 0.98
                pos.current.v = (pos.current.v * 0.98) - (gradient * 0.05);
                pos.current.x += pos.current.v;

                // Jitter/Chaos as it falls
                pos.current.x += (Math.random() - 0.5) * 0.01;
                x = pos.current.x;
            } else {
                // Locked mapping (Biological control is holding the state)
                // Smooth transition to targetX
                pos.current.x += (targetX - pos.current.x) * 0.08;
                pos.current.v = 0;
                x = pos.current.x;
            }

            // Boundary Constraints
            if (x > 1.95) { x = 1.95; pos.current.v *= -0.2; }
            if (x < -1.95) { x = -1.95; pos.current.v *= -0.2; }

            // 3. Draw Curve
            const scaleX = width / 4.5;
            const scaleY = 40;
            const offsetX = width / 2;
            const offsetY = height / 2 + 50;

            ctx.beginPath();
            // Color shifts from Cyan (Stable) to Orange (Stressed) to Red (Collapsed)
            let color = '#38bdf8';
            if (isCollapsed) color = '#ef4444';
            else if (k > -0.2) color = '#f59e0b';

            ctx.strokeStyle = color;
            ctx.lineWidth = 4;
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;

            for (let i = -2.1; i <= 2.1; i += 0.05) {
                const y = Math.pow(i, 4) - k * Math.pow(i, 2);
                const cX = offsetX + i * scaleX;
                const cY = offsetY + y * scaleY;
                if (i <= -2.1) ctx.moveTo(cX, cY);
                else ctx.lineTo(cX, cY);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Labels
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(isCollapsed ? 'CRITICAL SYSTEM FAILURE' : 'HOMEOSTATIC BASIN', offsetX, offsetY - 100);

            if (isCollapsed) {
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 12px sans-serif';
                ctx.fillText('GRAVITY RELEASED: IRREVERSIBLE LOSS', offsetX, offsetY - 120);
            }

            // 4. Draw Ball
            const bX = offsetX + x * scaleX;
            const bY = offsetY + (Math.pow(x, 4) - k * Math.pow(x, 2)) * scaleY;

            ctx.beginPath();
            ctx.arc(bX, bY - 12, 12, 0, Math.PI * 2);
            ctx.fillStyle = isCollapsed ? '#ef4444' : color;
            ctx.shadowBlur = 25;
            ctx.shadowColor = ctx.fillStyle;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [coreTemp, envTemp, isCollapsed]);

    return (
        <div className="w-full bg-[#0E0A08] rounded-[2.5rem] p-8 border border-[#2A1D13] shadow-2xl mt-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${isCollapsed ? 'bg-red-500 animate-ping' : 'bg-green-400 animate-pulse'}`}></div>
                        <h3 className="text-2xl font-serif font-bold text-white italic">Stability Landscape</h3>
                    </div>
                    <p className="text-slate-500 text-[10px] tracking-[0.2em] font-bold uppercase">Waddington Dynamics • Bifurcation Point Logic</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-widest mb-1">System State</span>
                    <span className={`text-sm font-bold uppercase ${isCollapsed ? 'text-red-500' : 'text-emerald-400'}`}>
                        {isCollapsed ? 'Collapsed' : 'Regulated'}
                    </span>
                </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-[300px] rounded-2xl bg-black/40" />
            <div className="mt-6 flex justify-between text-[9px] font-black text-slate-700 uppercase tracking-widest">
                <span>Failure Basin (Cold)</span>
                <span className="text-slate-500">Center Valley (37.0°C)</span>
                <span>Failure Basin (Heat)</span>
            </div>
        </div>
    );
};

export default StabilityLandscape;
