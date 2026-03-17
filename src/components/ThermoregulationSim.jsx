import React, { useEffect, useRef } from 'react';

const ThermoregulationSim = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const simCanvas = document.getElementById('simCanvas');
        if (!simCanvas) return;

        const ctx = simCanvas.getContext('2d');
        const envSlider = document.getElementById('envSlider');
        const envValDisplay = document.getElementById('envVal');

        const stateLabel = document.getElementById('stateLabel');
        const stateDesc = document.getElementById('stateDesc');
        const failurePanel = document.getElementById('failurePanel');
        const failureTitle = document.getElementById('failureTitle');
        const failureDesc = document.getElementById('failureDesc');

        const energyValDisplay = document.getElementById('energyVal');
        const energyBar = document.getElementById('energyBar');
        const hydroValDisplay = document.getElementById('hydroVal');
        const hydroBar = document.getElementById('hydroBar');

        const coreTempValDisplay = document.getElementById('coreTempVal');
        const coreTempBar = document.getElementById('coreTempBar');
        const shellTempValDisplay = document.getElementById('shellTempVal');
        const shellTempBar = document.getElementById('shellTempBar');

        let width, height, centerX, centerY;
        let envTemp = 20, coreTemp = 37.0, shellTemp = 33.0, energy = 100.0, hydration = 100.0, isDead = false;
        let simTime = 0, tempHistory = [], frameCount = 0;
        let animationFrameId;

        const regulators = { vaso: false, shiver: false, vasodilation: false, sweat: false };
        let particles = [], pulsePhase = 0;

        function resize() {
            if (!containerRef.current) return;
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;
            simCanvas.width = width;
            simCanvas.height = height;
            const isMobile = width < 768;
            centerX = isMobile ? width / 2 : width * 0.25;
            centerY = isMobile ? height * 0.45 : height * 0.58;
            initParticles();
        }

        window.addEventListener('resize', resize);

        function initParticles() {
            particles = [];
            for (let i = 0; i < 100; i++) particles.push({ x: Math.random() * width, y: Math.random() * height, size: Math.random() * 2 + 1, speed: Math.random() * 5 + 2 });
        }

        resize();

        function updateButtonsUI() {
            const btnVaso = document.getElementById('btnVaso');
            if (btnVaso) {
                btnVaso.classList.toggle('bg-cyan-900', regulators.vaso);
                btnVaso.classList.toggle('border-cyan-400', regulators.vaso);
                btnVaso.classList.toggle('opacity-100', regulators.vaso);
            }

            const btnShiver = document.getElementById('btnShiver');
            if (btnShiver) {
                btnShiver.classList.toggle('bg-orange-600', regulators.shiver);
                btnShiver.classList.toggle('border-orange-400', regulators.shiver);
                btnShiver.classList.toggle('opacity-100', regulators.shiver);
            }

            const btnVasodilation = document.getElementById('btnVasodilation');
            if (btnVasodilation) {
                btnVasodilation.classList.toggle('bg-red-800', regulators.vasodilation);
                btnVasodilation.classList.toggle('border-red-400', regulators.vasodilation);
                btnVasodilation.classList.toggle('opacity-100', regulators.vasodilation);
            }

            const btnSweat = document.getElementById('btnSweat');
            if (btnSweat) {
                btnSweat.classList.toggle('bg-blue-600', regulators.sweat);
                btnSweat.classList.toggle('border-blue-300', regulators.sweat);
                btnSweat.classList.toggle('opacity-100', regulators.sweat);
            }
        }

        function resetSim() {
            isDead = false; coreTemp = 37.0; shellTemp = 33.0; energy = 100; hydration = 100;
            envSlider.value = 20; simTime = 0; tempHistory = []; frameCount = 0;
            for (let k in regulators) regulators[k] = false;
            updateButtonsUI();
            if (failurePanel) failurePanel.classList.add('hidden');
        }

        const resetBtns = document.querySelectorAll('.reset-sim-btn');
        resetBtns.forEach(btn => btn.addEventListener('click', resetSim));

        function getTempColor(temp) {
            if (temp >= 40) return '#b91c1c'; if (temp >= 38) return '#ef4444';
            if (temp > 35) return '#fbbf24'; if (temp > 30) return '#38bdf8';
            if (temp > 10) return '#1e40af'; return '#f1f5f9';
        }

        function update() {
            if (isDead) return;
            envTemp = parseInt(envSlider.value);
            if (envValDisplay) envValDisplay.textContent = envTemp > 0 ? `+${envTemp}°C` : `${envTemp}°C`;

            // COLD ZONE
            if (envTemp < 20) {
                regulators.vasodilation = false; regulators.sweat = false;

                coreTemp -= 0.002;
                shellTemp -= 0.005;

                if (energy > 0) {
                    regulators.vaso = true;
                    regulators.shiver = (coreTemp < 36.8 || envTemp < 5);

                    if (regulators.shiver) coreTemp += 0.0015;
                    if (regulators.vaso) shellTemp -= 0.002;

                    energy -= (0.02 + (regulators.shiver ? 0.08 : 0));
                } else {
                    regulators.vaso = false; regulators.shiver = false;
                    coreTemp -= 0.004;
                }

                if (stateLabel) {
                    if (coreTemp < 32) {
                        stateLabel.textContent = "Severe Hypothermia";
                        stateLabel.style.color = "#1e3a8a";
                    } else if (coreTemp < 35) {
                        stateLabel.textContent = "Mild Hypothermia";
                        stateLabel.style.color = "#38bdf8";
                    } else {
                        stateLabel.textContent = "Cold Stress";
                        stateLabel.style.color = "#fbbf24";
                    }
                }

                // HEAT ZONE
            } else if (envTemp > 25) {
                regulators.vaso = false; regulators.shiver = false;

                coreTemp += 0.002;
                shellTemp += 0.005;

                if (hydration > 0) {
                    regulators.vasodilation = true;
                    regulators.sweat = (coreTemp > 37.5 || envTemp > 35);

                    if (regulators.sweat) coreTemp -= 0.0015;
                    if (regulators.vasodilation) shellTemp += 0.002;

                    hydration -= (0.02 + (regulators.sweat ? 0.08 : 0));
                } else {
                    regulators.vasodilation = false; regulators.sweat = false;
                    coreTemp += 0.004;
                }

                if (stateLabel) {
                    if (coreTemp > 40) {
                        stateLabel.textContent = "Severe Hyperthermia";
                        stateLabel.style.color = "#b91c1c";
                    } else if (coreTemp > 38) {
                        stateLabel.textContent = "Heat Exhaustion";
                        stateLabel.style.color = "#f59e0b";
                    } else {
                        stateLabel.textContent = "Heat Stress";
                        stateLabel.style.color = "#fbbf24";
                    }
                }

                // THERMONEUTRAL
            } else {
                for (let k in regulators) regulators[k] = false;
                if (stateLabel) {
                    stateLabel.textContent = "Homeostasis";
                    stateLabel.style.color = "#4ade80";
                }
                coreTemp = 37.0;
                shellTemp += (33.0 - shellTemp) * 0.05;
                if (energy < 100) energy += 0.1;
                if (hydration < 100) hydration += 0.1;
            }

            energy = Math.max(0, Math.min(100, energy));
            hydration = Math.max(0, Math.min(100, hydration));
            updateButtonsUI();

            // FAILURE
            if (coreTemp < 30) {
                isDead = true;
                if (failureTitle) { failureTitle.textContent = "Severe Hypothermia"; failureTitle.className = "text-2xl md:text-3xl font-bold text-cyan-400 mb-4"; }
                if (failureDesc) failureDesc.textContent = "Internal temperature lethally low. Heart electrical failure occurs at < 30°C.";
                if (failurePanel) { failurePanel.className = "absolute inset-0 bg-blue-950/80 flex items-center justify-center z-50 backdrop-blur-md"; failurePanel.classList.remove('hidden'); }
            } else if (coreTemp > 41.5) {
                isDead = true;
                if (failureTitle) { failureTitle.textContent = "Severe Heat Stroke"; failureTitle.className = "text-2xl md:text-3xl font-bold text-red-500 mb-4"; }
                if (failureDesc) failureDesc.textContent = "Severe Hyperthermia. Proteins denature and organ function ceases above 41.5°C.";
                if (failurePanel) { failurePanel.className = "absolute inset-0 bg-red-950/90 flex items-center justify-center z-50 backdrop-blur-md"; failurePanel.classList.remove('hidden'); }
            }

            if (coreTempValDisplay) coreTempValDisplay.textContent = coreTemp.toFixed(1) + "°C";
            if (shellTempValDisplay) shellTempValDisplay.textContent = shellTemp.toFixed(1) + "°C";
            if (coreTempBar) coreTempBar.style.width = Math.min(100, Math.max(0, (coreTemp - 20) / 25 * 100)) + "%";
            if (shellTempBar) shellTempBar.style.width = Math.min(100, Math.max(0, (shellTemp + 10) / 55 * 100)) + "%";
            if (energyBar) energyBar.style.width = energy + "%";
            if (hydroBar) hydroBar.style.width = hydration + "%";

            simTime += 0.003; frameCount++;
            if (frameCount % 5 === 0) {
                tempHistory.push({ time: simTime, core: coreTemp, shell: shellTemp });
                if (tempHistory.length > 2000) tempHistory.shift();
            }
        }

        function drawGraph(ctx) {
            const isMobile = width < 768; const gW = isMobile ? width - 40 : 340, gH = 160;
            const gX = isMobile ? 20 : width - gW - 40, gY = isMobile ? height - gH - 250 : centerY - (gH / 2); // adjusted gY for layout
            ctx.save(); ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'; ctx.strokeStyle = 'rgba(71, 85, 105, 0.6)'; ctx.lineWidth = 1;
            ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(gX, gY, gW, gH, 8); else ctx.rect(gX, gY, gW, gH);
            ctx.fill(); ctx.stroke();
            const padL = 35, padR = 15, padT = 30, padB = 25;
            const chartW = gW - padL - padR, chartH = gH - padT - padB;
            const minT = 0, maxT = 50;
            ctx.fillStyle = 'rgba(148, 163, 184, 0.6)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
            [0, 15, 30, 45].forEach(t => { let y = gY + padT + chartH - ((t - minT) / (maxT - minT)) * chartH; ctx.fillText(t + '°', gX + padL - 5, y); });
            if (tempHistory.length > 1) {
                const maxTime = Math.max(1, simTime);
                ctx.beginPath(); ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
                tempHistory.forEach((pt, i) => { let x = gX + padL + (pt.time / maxTime) * chartW, y = gY + padT + chartH - ((pt.shell - minT) / (maxT - minT)) * chartH; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
                ctx.stroke();
                ctx.beginPath(); ctx.strokeStyle = '#ef4444';
                tempHistory.forEach((pt, i) => { let x = gX + padL + (pt.time / maxTime) * chartW, y = gY + padT + chartH - ((pt.core - minT) / (maxT - minT)) * chartH; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
                ctx.stroke();
            }

            // X-axis label
            ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('TIME (HOURS)', gX + (gW / 2) + 10, gY + gH - 8);

            ctx.restore();
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            update();

            if (envTemp < 10) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(envTemp - 10) / 60})`;
                particles.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); p.x += p.speed + (Math.abs(envTemp) / 10); if (p.x > width) p.x = 0; });
            } else if (envTemp > 35) {
                ctx.fillStyle = `rgba(239, 68, 68, ${(envTemp - 35) / 100})`;
                particles.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); p.y -= p.speed * 0.5; if (p.y < 0) p.y = height; });
            }
            pulsePhase += (regulators.shiver ? 0.3 : 0.05);
            let drawX = centerX + (regulators.shiver ? (Math.random() - 0.5) * 5 : 0), drawY = centerY + (regulators.shiver ? (Math.random() - 0.5) * 5 : 0) - (width < 768 ? 80 : 0);

            let shellColor = envTemp < 20 ? "#38bdf8" : (envTemp > 25 ? "#ef4444" : getTempColor(shellTemp));

            let shellR = 115;
            ctx.beginPath(); ctx.arc(drawX, drawY, shellR, 0, Math.PI * 2);
            ctx.fillStyle = shellColor; ctx.globalAlpha = 0.3; ctx.fill();
            ctx.globalAlpha = 1; ctx.strokeStyle = shellColor; ctx.lineWidth = regulators.vaso ? 2 : (regulators.vasodilation ? 10 : 6); ctx.stroke();
            let coreR = 55 + Math.sin(pulsePhase) * 3;
            ctx.beginPath(); ctx.arc(drawX, drawY, coreR, 0, Math.PI * 2);
            ctx.fillStyle = getTempColor(coreTemp); ctx.shadowBlur = 30; ctx.shadowColor = getTempColor(coreTemp); ctx.fill(); ctx.shadowBlur = 0;
            if (regulators.sweat) {
                ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
                for (let i = 0; i < 12; i++) { let a = (Date.now() / 300 + i) % (Math.PI * 2); ctx.beginPath(); ctx.arc(drawX + Math.cos(a) * shellR, drawY + Math.sin(a) * shellR, 3, 0, Math.PI * 2); ctx.fill(); }
            }
            drawGraph(ctx);
            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            resetBtns.forEach(btn => btn.removeEventListener('click', resetSim));
        };
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col h-[800px] bg-[#0f172a] text-[#f8fafc] rounded-[2rem] overflow-hidden border border-[#2A1D13] font-sans relative shadow-2xl">
            <style>{`
                .thermo-sim-slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #e2e8f0;
                    cursor: pointer;
                    transition: transform 0.1s;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                }
                .thermo-sim-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
            `}</style>

            {/* Header UI */}
            <header className="p-6 z-10 flex justify-between items-start w-full absolute top-0 left-0 pointer-events-none">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-cyan-400">Thermoregulation System</h1>
                    <p className="text-slate-400 text-[10px] md:text-sm">Homeostasis: Cold vs. Heat Stress</p>
                </div>
                <div className="flex-col items-end gap-1.5 pointer-events-auto hidden md:flex">
                    <button className="reset-sim-btn px-4 py-2 rounded-md border border-slate-600 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-medium focus:outline-none shadow-sm flex items-center gap-1.5 backdrop-blur-sm">
                        <span className="text-lg leading-none">↺</span> Reset
                    </button>
                    <span className="text-slate-500 text-[8px] uppercase tracking-wider font-bold">*Subject is completely naked</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow relative flex items-center justify-center overflow-hidden">
                <canvas id="simCanvas" className="block touch-none"></canvas>

                <div id="statusOverlay" className="absolute top-24 md:top-6 left-0 w-full pointer-events-none transition-all duration-500 text-center">
                    <h2 id="stateLabel" className="text-3xl md:text-4xl font-black uppercase tracking-widest opacity-20 transition-colors duration-300">Homeostasis</h2>
                    <p id="stateDesc" className="text-slate-400 mt-1 italic transition-opacity duration-300"></p>
                </div>

                <div id="failurePanel" className="absolute inset-0 bg-blue-950/80 hidden items-center justify-center z-50 backdrop-blur-md transition-opacity">
                    <div className="bg-slate-800/70 p-6 md:p-8 rounded-2xl max-w-md text-center border border-cyan-500/50 shadow-2xl backdrop-blur-lg mx-4">
                        <h2 id="failureTitle" className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">Severe Hypothermia</h2>
                        <p id="failureDesc" className="mb-6 text-slate-300 leading-relaxed text-sm md:text-base"></p>
                        <button className="reset-sim-btn bg-cyan-600 hover:bg-cyan-500 text-white px-6 md:px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg">
                            Seek Shelter & Recover
                        </button>
                    </div>
                </div>
            </main>

            {/* Controls Footer */}
            <footer className="bg-slate-800/70 backdrop-blur-md p-4 md:p-6 z-20 border-t border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-400">External Environment</label>
                                <span id="envVal" className="text-slate-200 font-mono font-bold text-lg md:text-xl">20°C</span>
                            </div>
                            <input type="range" id="envSlider" min="-50" max="50" defaultValue="20" className="thermo-sim-slider w-full h-2 bg-gradient-to-r from-cyan-600 via-slate-400 to-red-600 rounded-lg appearance-none cursor-pointer outline-none" />
                            <div className="flex justify-between text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider mt-1">
                                <span>COLD ZONE (&lt;20°C)</span>
                                <span>NEUTRAL (20-24°C)</span>
                                <span>HEAT ZONE (&gt;25°C)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-4 pt-1">
                            <div>
                                <div className="flex justify-between text-[8px] md:text-[10px] font-bold tracking-wider text-slate-400 mb-1">
                                    <span>CORE TEMP</span>
                                    <span id="coreTempVal" className="text-red-400 font-mono">37.0°C</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div id="coreTempBar" className="h-full bg-red-500 transition-all duration-200 w-[100%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[8px] md:text-[10px] font-bold tracking-wider text-slate-400 mb-1">
                                    <span>SHELL T</span>
                                    <span id="shellTempVal" className="text-orange-400 font-mono">33.0°C</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div id="shellTempBar" className="h-full bg-orange-400 transition-all duration-200 w-[80%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-400 block mb-1">Autonomic Regulators</label>
                        <div className="flex flex-wrap gap-2">
                            <button id="btnVaso" className="flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-slate-600 text-[10px] md:text-[11px] font-medium transition-all cursor-default focus:outline-none opacity-40">
                                <span className="text-xs md:text-sm mr-1.5">🩸</span> VasoC.
                            </button>
                            <button id="btnShiver" className="flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-slate-600 text-[10px] md:text-[11px] font-medium transition-all cursor-default focus:outline-none opacity-40">
                                <span className="text-xs md:text-sm mr-1.5">⚡</span> Shiver
                            </button>
                            <button id="btnVasodilation" className="flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-slate-600 text-[10px] md:text-[11px] font-medium transition-all cursor-default focus:outline-none opacity-40">
                                <span className="text-xs md:text-sm mr-1.5">🔴</span> VasoD.
                            </button>
                            <button id="btnSweat" className="flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-slate-600 text-[10px] md:text-[11px] font-medium transition-all cursor-default focus:outline-none opacity-40">
                                <span className="text-xs md:text-sm mr-1.5">💦</span> Sweat
                            </button>
                        </div>

                        <div className="mt-2 md:mt-4 pt-1 grid grid-cols-2 gap-2 md:gap-4">
                            <div>
                                <div className="flex justify-between text-[8px] md:text-[10px] font-bold tracking-wider text-slate-400 mb-1">
                                    <span>RESERVES</span>
                                    <span id="energyVal" className="text-emerald-400 font-mono">100%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div id="energyBar" className="h-full bg-emerald-400 transition-all duration-200 w-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[8px] md:text-[10px] font-bold tracking-wider text-slate-400 mb-1">
                                    <span>HYDRATION</span>
                                    <span id="hydroVal" className="text-blue-400 font-mono">100%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div id="hydroBar" className="h-full bg-blue-400 transition-all duration-200 w-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default ThermoregulationSim;
