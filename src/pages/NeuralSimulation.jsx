import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCcw, Network, Zap, Settings, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Simulation Logic Config */
const SIM_SPEED = 1.2;
const DECAY_RATE = 0.5; // per second
const SPIKE_THRESHOLD = 1.0;
const REFRACTORY_POTENTIAL = -0.5;
const PULSE_SPEED = 250; // pixels per second
const HEBBIAN_LEARNING_RATE = 0.4;
const MAX_WEIGHT = 4.0;

export default function NeuralSimulation() {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const lastTimeRef = useRef(0);

    // Simulation state
    const simRef = useRef({
        nodes: [
            { id: 'n1', x: 200, y: 350, potential: 0, baseline: 0, label: "Sensory A" },
            { id: 'n2', x: 200, y: 550, potential: 0, baseline: 0, label: "Sensory B" },
            { id: 'n3', x: 400, y: 450, potential: 0, baseline: 0, label: "Interneuron" },
            { id: 'n4', x: 600, y: 350, potential: 0, baseline: 0, label: "Motor C" },
            { id: 'n5', x: 600, y: 550, potential: 0, baseline: 0, label: "Motor D" },
            // Circular loop for reverberation (memory)
            { id: 'n6', x: 500, y: 180, potential: 0, baseline: 0, label: "Loop Alpha" },
            { id: 'n7', x: 700, y: 180, potential: 0, baseline: 0, label: "Loop Beta" }
        ],
        synapses: [
            { source: 'n1', target: 'n3', weight: 1.0 },
            { source: 'n2', target: 'n3', weight: 1.0 },
            { source: 'n3', target: 'n4', weight: 1.0 },
            { source: 'n3', target: 'n5', weight: 1.0 },
            // The Reverberation Loop Setup
            { source: 'n4', target: 'n6', weight: 1.0 },
            { source: 'n6', target: 'n7', weight: 1.0 },
            { source: 'n7', target: 'n4', weight: 1.2 },
        ],
        pulses: [],
        // For Hebbian learning tracking
        lastSpikes: {}
    });

    const [uiState, setUiState] = useState({ hebbian: true, decay: true, running: true });
    const [, triggerRender] = useState(0);

    const resetSimulation = () => {
        const state = simRef.current;
        state.pulses = [];
        state.lastSpikes = {};
        state.nodes.forEach(n => n.potential = 0);
        state.synapses.forEach(s => s.weight = 1.0);
        triggerRender(prev => prev + 1);
    };

    const fireNode = (nodeId) => {
        const state = simRef.current;
        const node = state.nodes.find(n => n.id === nodeId);
        if (node && node.potential >= 0) {
            node.potential = SPIKE_THRESHOLD + 0.1;
        }
    };

    // The core asynchronous game loop
    const update = (time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const dt = (time - lastTimeRef.current) / 1000 * SIM_SPEED;
        lastTimeRef.current = time;
        const state = simRef.current;

        if (uiState.running) {
            // 1. Decay potentials (Leaky Integrate component)
            if (uiState.decay) {
                state.nodes.forEach(node => {
                    if (node.potential > node.baseline) {
                        node.potential = Math.max(node.baseline, node.potential - DECAY_RATE * dt);
                    } else if (node.potential < node.baseline) {
                        node.potential = Math.min(node.baseline, node.potential + DECAY_RATE * dt * 2); // recover from refractory
                    }
                });
            }

            // 2. Check for Spikes
            state.nodes.forEach(node => {
                if (node.potential >= SPIKE_THRESHOLD) {
                    // Neuron Fires (Fire component)
                    node.potential = REFRACTORY_POTENTIAL;
                    state.lastSpikes[node.id] = time;

                    // Generate travelling pulses asynchronously 
                    state.synapses.filter(s => s.source === node.id).forEach(synapse => {
                        const targetNode = state.nodes.find(n => n.id === synapse.target);
                        const dx = targetNode.x - node.x;
                        const dy = targetNode.y - node.y;
                        const totalDist = Math.sqrt(dx * dx + dy * dy);

                        state.pulses.push({
                            id: Math.random().toString(36).substring(2, 9),
                            source: node.id,
                            target: synapse.target,
                            distance: 0,
                            totalDistance: totalDist,
                            weight: synapse.weight,
                            vx: (dx / totalDist) * PULSE_SPEED,
                            vy: (dy / totalDist) * PULSE_SPEED,
                            startX: node.x,
                            startY: node.y
                        });
                    });

                    // Hebbian Plasticity
                    if (uiState.hebbian) {
                        state.synapses.filter(s => s.target === node.id).forEach(synapse => {
                            const sourceSpikeTime = state.lastSpikes[synapse.source];
                            if (sourceSpikeTime && (time - sourceSpikeTime) < 800) {
                                synapse.weight = Math.min(MAX_WEIGHT, synapse.weight + HEBBIAN_LEARNING_RATE);
                            }
                        });
                    }
                }
            });

            // 3. Update Travelling Pulses
            for (let i = state.pulses.length - 1; i >= 0; i--) {
                const pulse = state.pulses[i];
                pulse.distance += PULSE_SPEED * dt;

                if (pulse.distance >= pulse.totalDistance) {
                    const targetNode = state.nodes.find(n => n.id === pulse.target);
                    // Add potential based on graded synaptic weight
                    if (targetNode.potential >= 0) {
                        targetNode.potential += pulse.weight * 0.45;
                    }
                    state.pulses.splice(i, 1);
                }
            }
        }

        drawCanvas();
        requestRef.current = requestAnimationFrame(update);
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Handle DPI scaling for Retina displays
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        const ctx = canvas.getContext('2d');
        const state = simRef.current;

        ctx.clearRect(0, 0, width, height);

        // Calculate offset to perfectly center the graph diagram
        const offsetX = (width - 800) / 2;
        const offsetY = (height - 600) / 2;

        ctx.save();
        ctx.translate(offsetX, offsetY);

        // Draw Synapses
        state.synapses.forEach(syn => {
            const source = state.nodes.find(n => n.id === syn.source);
            const target = state.nodes.find(n => n.id === syn.target);

            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            const cx = (source.x + target.x) / 2;
            const cy = (source.y + target.y) / 2 - 40;
            ctx.quadraticCurveTo(cx, cy, target.x, target.y);

            ctx.lineWidth = 1 + (syn.weight * 0.8);
            const intensity = Math.min(1.0, 0.2 + syn.weight * 0.25);
            ctx.strokeStyle = `rgba(100, 150, 255, ${intensity})`;
            ctx.stroke();
        });

        // Draw Pulses
        state.pulses.forEach(pulse => {
            const source = state.nodes.find(n => n.id === pulse.source);
            const target = state.nodes.find(n => n.id === pulse.target);

            const progress = pulse.distance / pulse.totalDistance;
            const cx = (source.x + target.x) / 2;
            const cy = (source.y + target.y) / 2 - 40;

            const px = Math.pow(1 - progress, 2) * source.x + 2 * (1 - progress) * progress * cx + Math.pow(progress, 2) * target.x;
            const py = Math.pow(1 - progress, 2) * source.y + 2 * (1 - progress) * progress * cy + Math.pow(progress, 2) * target.y;

            ctx.beginPath();
            ctx.arc(px, py, 3 + pulse.weight, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Draw Nodes
        state.nodes.forEach(node => {
            ctx.beginPath();
            const radius = 22 + Math.max(0, Math.min(node.potential * 8, 15));
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

            if (node.potential < 0) {
                // Refractory state
                ctx.fillStyle = '#1e1b4b'; // deep indigo
                ctx.strokeStyle = '#4338ca';
            } else {
                // Resting or Building potential
                const intensity = Math.floor(Math.min(255, Math.max(0, (node.potential / SPIKE_THRESHOLD) * 255)));
                ctx.fillStyle = `rgb(10, ${10 + intensity}, ${30 + intensity * 2})`;
                ctx.strokeStyle = `rgb(100, 150, 255)`;

                if (node.potential >= SPIKE_THRESHOLD - 0.1) {
                    ctx.shadowColor = '#60A5FA';
                    ctx.shadowBlur = 25;
                }
            }

            ctx.lineWidth = 3;
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Text Label
            ctx.fillStyle = '#cbd5e1';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.x, node.y + radius + 18);

            // Inner Visual Potential Meter
            if (node.potential > 0) {
                ctx.fillStyle = '#60A5FA';
                const meterHeight = (node.potential / SPIKE_THRESHOLD) * (radius * 1.4);
                ctx.fillRect(node.x - 4, node.y + radius * 0.7 - meterHeight, 8, meterHeight);
            }
        });

        ctx.restore();
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    }, [uiState]);

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Reverse mappings
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const offsetX = (width - 800) / 2;
        const offsetY = (height - 600) / 2;

        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;

        // Find nearest node
        const clickedNode = simRef.current.nodes.find(n => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 30;
        });

        if (clickedNode) {
            fireNode(clickedNode.id);
        }
    };

    return (
        <div className="min-h-screen pt-16 bg-[#0A0D14] flex flex-col font-sans overflow-hidden">
            {/* Header */}
            <header className="bg-[#121826] border-b border-[#1E293B] px-6 py-4 shadow-md z-20 flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link to="/chapter-2/first-order" className="text-[#94A3B8] hover:text-white transition-colors bg-[#1E293B] p-2 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
                                <Network className="w-5 h-5 mr-3 text-[#FFD700]" />
                                A Logical Calculus
                            </h1>
                            <p className="text-xs text-[#94A3B8] mt-1">McCulloch & Pitts (1943) — Modern Biological Update</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* Lateral Control Panel */}
                <div className="w-full lg:w-96 bg-[#121826] border-r border-[#1E293B] shadow-xl flex flex-col z-20 flex-shrink-0">
                    <div className="p-6 border-b border-[#1E293B]">
                        <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-[#60A5FA]" /> System Parameters
                        </h2>

                        <div className="space-y-4">
                            {/* Leaky Integrate Toggle */}
                            <div className="flex items-center justify-between bg-[#1A2235] p-4 rounded-xl border border-[#334155]">
                                <div className="pr-4">
                                    <div className="text-white font-bold text-sm mb-1">Leaky Integrate-and-Fire</div>
                                    <div className="text-[#94A3B8] text-xs">Membrane potential continuously leaks toward resting point.</div>
                                </div>
                                <button
                                    onClick={() => setUiState(prev => ({ ...prev, decay: !prev.decay }))}
                                    className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${uiState.decay ? 'bg-[#60A5FA]' : 'bg-[#334155]'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${uiState.decay ? 'translate-x-7' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            {/* Hebbian Plasticity Toggle */}
                            <div className="flex items-center justify-between bg-[#1A2235] p-4 rounded-xl border border-[#334155]">
                                <div className="pr-4">
                                    <div className="text-white font-bold text-sm mb-1">Hebbian Plasticity</div>
                                    <div className="text-[#94A3B8] text-xs">Neural pathways physically thicken and strengthen when fired sequentially.</div>
                                </div>
                                <button
                                    onClick={() => setUiState(prev => ({ ...prev, hebbian: !prev.hebbian }))}
                                    className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${uiState.hebbian ? 'bg-[#FFD700]' : 'bg-[#334155]'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-[#121826] absolute top-1 transition-transform ${uiState.hebbian ? 'translate-x-7' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col text-[#94A3B8] bg-[#0A0D14] overflow-y-auto">
                        <div className="mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#6482A3] mb-3 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2" /> Mechanical Fixes
                            </h3>
                            <p className="text-xs leading-relaxed bg-[#121826] p-4 rounded-xl border border-[#1E293B]">
                                The original 1943 logic paper assumed rigid global clock intervals and binary gates perfectly holding signals without degradation.
                                <br /><br />
                                By implementing Piccinini's (2004) corrections, this model introduces <b>graded potentials</b>, <b>asynchronous spatial signaling</b> via pulses, and <b>dynamic topological reverberation</b> loops that sustain cyclic cybernetic memory on their own.
                            </p>
                        </div>

                        <div className="mt-auto space-y-3">
                            <button
                                onClick={() => { fireNode('n1'); setTimeout(() => fireNode('n2'), 150); }}
                                className="w-full bg-[#1A2235] hover:bg-[#232D45] border border-[#334155] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center text-xs tracking-widest uppercase"
                            >
                                <Zap className="w-4 h-4 mr-2 text-[#FFD700]" /> Burst Sensory Input
                            </button>
                            <button
                                onClick={resetSimulation}
                                className="w-full bg-transparent hover:bg-[#1A2235] text-[#94A3B8] font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center text-xs tracking-widest uppercase"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" /> Erase Plasticity
                            </button>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 relative cursor-crosshair bg-[#05080F]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at center, #1E293B 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                        opacity: 0.9
                    }}>
                    <canvas
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute top-6 right-6 text-[#94A3B8] text-[10px] tracking-widest uppercase font-mono pointer-events-none bg-[#121826]/80 px-4 py-2 border border-[#1E293B] rounded-lg shadow-lg">
                        <span className="text-[#FFD700] mr-2">✦</span> Click any node to manually stimulate
                    </div>
                </div>
            </main>
        </div>
    );
}
