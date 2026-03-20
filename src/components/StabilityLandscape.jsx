import React, { useEffect, useRef, useState } from 'react';

/**
 * StabilityLandscape - Emergent Physics Model
 * Models system resilience using a potential well: V(x) = k*x^2 - c*x^4
 * Stability emerges from the balance of resilience (k), friction, and noise.
 */
const StabilityLandscape = ({ coreTemp = 37.0, envTemp = 20 }) => {
    const canvasRef = useRef(null);
    const state = useRef({ x: 0, v: 0 }); // Physical state (position, velocity)
    const requestRef = useRef();

    // Constants for the physical model
    const c = 0.06;      // Curvature of the outer "cliffs"
    const damping = 0.94; // Simulated friction/viscosity
    const noiseLevel = 0.005; // Constant biological jitter

    // Reset logic: baseline state stabilizes the ball at center
    useEffect(() => {
        if (Math.abs(coreTemp - 37.0) < 0.1 && Math.abs(envTemp - 20) < 1) {
            state.current = { x: 0, v: 0 };
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

            // 1. CALCULATE RESILIENCE (k)
            // k = 1.0 at 37.0°C. Drops toward 0 at critical limits.
            const dist = Math.abs(coreTemp - 37.0);
            const envDist = Math.abs(envTemp - 20) / 20;
            const k = Math.max(0, 1.0 - (dist / 6.5) - (envDist * 0.3));

            // 2. PHYSICS ENGINE (Emergent Dynamics)
            const { x, v } = state.current;

            // Force F = -dV/dx. V(x) = kx^2 - cx^4 => V'(x) = 2kx - 4cx^3
            // So F = 4cx^3 - 2kx
            const fSlope = (4 * c * Math.pow(x, 3)) - (2 * k * x);

            // Stochastic environmental noise
            const fNoise = (Math.random() - 0.5) * noiseLevel * (2.0 - k);

            // Integrate
            const newV = (v * damping) + (fSlope + fNoise);
            const newX = x + newV;

            state.current = { x: newX, v: newV };

            // 3. DRAW LANDSCAPE (Potential Well)
            const scaleX = width / 6;
            const scaleY = 40;
            const offsetX = width / 2;
            const offsetY = height / 2 + 30;

            // Visual depth indicator
            const isUnstable = k < 0.3;
            const curveColor = isUnstable ? '#ef4444' : (k < 0.7 ? '#f59e0b' : '#38bdf8');

            ctx.beginPath();
            ctx.strokeStyle = curveColor;
            ctx.lineWidth = 4;
            ctx.shadowBlur = isUnstable ? 15 : 5;
            ctx.shadowColor = curveColor;

            for (let i = -2.5; i <= 2.5; i += 0.05) {
                const V_x = k * Math.pow(i, 2) - c * Math.pow(i, 4);
                const cX = offsetX + i * scaleX;
                const cY = offsetY - V_x * scaleY;
                if (i <= -2.5) ctx.moveTo(cX, cY);
                else ctx.lineTo(cX, cY);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // 4. DRAW SYSTEM STATE (BALL)
            const bX = offsetX + newX * scaleX;
            const V_ball = k * Math.pow(newX, 2) - c * Math.pow(newX, 4);
            const bY = offsetY - V_ball * scaleY;

            // Ball appearance shifts based on variance
            const variance = Math.abs(newV) * 100;

            ctx.beginPath();
            ctx.arc(bX, bY - 12, 12, 0, Math.PI * 2);
            ctx.fillStyle = variance > 5 ? '#ef4444' : '#ffffff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = ctx.fillStyle;
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Labels
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            if (k < 0.2) {
                ctx.fillStyle = '#ef4444';
                ctx.fillText('CRITICAL VARIANCE: SYSTEM FRAGILITY HIGH', offsetX, offsetY - 120);
            } else {
                ctx.fillText('HOMEOSTATIC BASIN (RESILIENCE DRIVEN)', offsetX, offsetY - 120);
            }

            // Detect if ball is lost (past cliffs)
            if (Math.abs(newX) > 2.4) {
                ctx.font = 'bold 12px sans-serif';
                ctx.fillText('SYSTEM COLLAPSE', offsetX, offsetY - 140);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [coreTemp, envTemp]);

    return (
        <div className="w-full bg-[#0E0A08] rounded-[2.5rem] p-8 border border-[#2A1D13] shadow-2xl mt-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${Math.abs(state.current.v) > 0.02 ? 'bg-red-500 animate-ping' : 'bg-blue-400'}`}></div>
                        <h3 className="text-2xl font-serif font-bold text-white italic">Stability Landscape</h3>
                    </div>
                    <p className="text-slate-500 text-[10px] tracking-[0.2em] font-bold uppercase">Emergent Dynamics • Critical Variance Model</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-widest mb-1">System State</span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${Math.abs(state.current.x) > 2 ? 'text-red-500' : 'text-emerald-400'}`}>
                        {Math.abs(state.current.x) > 2 ? 'Decompensated' : 'Regulated'}
                    </span>
                </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-[300px] rounded-2xl bg-black/40 border border-[#2A1D13]" />
            <div className="mt-6 flex justify-between text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
                <span>Hypothermic Cliff</span>
                <span className="text-slate-500 border-x border-slate-800 px-4">Dynamic Equilibrium</span>
                <span>Hyperthermic Cliff</span>
            </div>
        </div>
    );
};

export default StabilityLandscape;
