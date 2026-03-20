import React, { useEffect, useRef } from 'react';

const StabilityLandscape = ({ coreTemp = 37.0, envTemp = 20 }) => {
    const canvasRef = useRef(null);
    const pos = useRef({ x: 0, v: 0 }); // Free rolling position
    const isReleased = useRef(false);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width;
        let height = canvas.height;

        const resize = () => {
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
            // External stress drives flattening. Baseline env is 20.
            const envStress = Math.abs(envTemp - 20) / 25;

            // k: Stiffness/Bifurcation parameter. 
            // -1.2 (single deep well) to 1.5 (double well/flat).
            const k = (envStress * 2.7) - 1.2;

            // 2. Ball Mapping/Physics
            // Map coreTemp directly to X (-1.5 to 1.5 range)
            // 37.0 -> 0; 34.0 -> -1.0; 40.0 -> 1.0
            const targetX = (coreTemp - 37.0) / 3.0;

            // Tipping Point check: Release mapping if coreTemp is critical
            if (coreTemp < 32.5 || coreTemp > 41.5) {
                isReleased.current = true;
            } else if (Math.abs(coreTemp - 37.0) < 0.5) {
                // Relatch if system stabilizes
                isReleased.current = false;
            }

            let x;
            if (isReleased.current) {
                // Free physics (rolling down the slope)
                // f'(x) = 4x^3 - 2kx
                const gradient = 4 * Math.pow(pos.current.x, 3) - 2 * k * pos.current.x;
                pos.current.v = (pos.current.v * 0.98) - (gradient * 0.02);
                pos.current.x += pos.current.v;
                x = pos.current.x;
            } else {
                // Forced mapping (locking to coreTemp)
                // Smooth transition to targetX
                pos.current.x += (targetX - pos.current.x) * 0.1;
                pos.current.v = 0;
                x = pos.current.x;
            }

            // Constrain
            if (x > 1.9) { x = 1.9; pos.current.v *= -0.5; }
            if (x < -1.9) { x = -1.9; pos.current.v *= -0.5; }

            // 3. Draw Curve V(x) = x^4 - kx^2
            const scaleX = width / 4.5;
            const scaleY = 35;
            const offsetX = width / 2;
            const offsetY = height / 2 + 50;

            ctx.beginPath();
            ctx.strokeStyle = k < 0.5 ? '#38bdf8' : '#f59e0b';
            ctx.lineWidth = 4;
            ctx.shadowBlur = 15;
            ctx.shadowColor = ctx.strokeStyle;

            for (let i = -2; i <= 2; i += 0.05) {
                const y = Math.pow(i, 4) - k * Math.pow(i, 2);
                const cX = offsetX + i * scaleX;
                const cY = offsetY + y * scaleY;
                if (i === -2) ctx.moveTo(cX, cY);
                else ctx.lineTo(cX, cY);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Labels for states
            const getStatusColor = () => {
                if (isReleased.current) return '#ef4444';
                if (k > 0.8) return '#f59e0b';
                return '#10b981';
            };

            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('HOMEOSTASIS BASIN', offsetX, offsetY - 90);

            if (isReleased.current) {
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 12px sans-serif';
                ctx.fillText('CRITICAL FAILURE / TIPPING POINT', offsetX, offsetY - 110);
            }

            // 4. Draw Ball
            const bX = offsetX + x * scaleX;
            const bY = offsetY + (Math.pow(x, 4) - k * Math.pow(x, 2)) * scaleY;

            ctx.beginPath();
            ctx.arc(bX, bY - 10, 10, 0, Math.PI * 2);
            ctx.fillStyle = getStatusColor();
            ctx.shadowBlur = 25;
            ctx.shadowColor = ctx.fillStyle;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Jitter for visual feedback
            const jitter = (Math.random() - 0.5) * (Math.max(0, k) * 2);
            if (jitter > 0) {
                ctx.beginPath();
                ctx.arc(bX + jitter, bY - 10, 12, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.stroke();
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
        <div className="w-full bg-[#0f172a]/80 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl mt-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${isReleased.current ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                        <h3 className="text-2xl font-serif font-bold text-white italic">Stability Landscape</h3>
                    </div>
                    <p className="text-slate-500 text-[10px] tracking-[0.2em] font-bold uppercase">System State Dynamics • Waddington Potentials</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-widest mb-1">Resilience</span>
                    <div className="flex gap-1 h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${isReleased.current ? 'bg-red-500' : (Math.abs(envTemp - 20) > 15 ? 'bg-amber-500' : 'bg-blue-500')}`}
                            style={{ width: `${Math.max(10, 100 - Math.abs(envTemp - 20) * 2)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-[300px] rounded-2xl bg-black/20" />
            <div className="mt-6 flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <div className="flex flex-col items-start">
                    <span className="text-red-900/40 mb-1">Negative State</span>
                    <div className="w-12 h-0.5 bg-slate-800"></div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-slate-400 mb-1 border-b border-slate-700 pb-1">Dynamic Equilibrium</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-red-900/40 mb-1">Negative State</span>
                    <div className="w-12 h-0.5 bg-slate-800"></div>
                </div>
            </div>
        </div>
    );
};

export default StabilityLandscape;
