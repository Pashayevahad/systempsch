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

const getLevelConfig = (level) => {
    let nodes = [];
    let synapses = [];

    if (level === 1) {
        nodes = [
            { id: 'n1', x: 200, y: 350, potential: 0, baseline: 0, label: "Sensory A" },
            { id: 'n4', x: 600, y: 350, potential: 0, baseline: 0, label: "Motor C" }
        ];
        synapses = [
            { source: 'n1', target: 'n4', weight: 2.0, baseWeight: 2.0 }
        ];
    } else if (level === 2) {
        nodes = [
            { id: 'n1', x: 200, y: 300, potential: 0, baseline: 0, label: "Sensory A" },
            { id: 'n2', x: 200, y: 500, potential: 0, baseline: 0, label: "Sensory B" },
            { id: 'n3', x: 400, y: 400, potential: 0, baseline: 0, label: "Interneuron" },
            { id: 'n4', x: 600, y: 400, potential: 0, baseline: 0, label: "Motor C" }
        ];
        synapses = [
            { source: 'n1', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n2', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n3', target: 'n4', weight: 2.0, baseWeight: 2.0 }
        ];
    } else if (level === 3) {
        nodes = [
            { id: 'n1', x: 200, y: 300, potential: 0, baseline: 0, label: "Sensory A" },
            { id: 'n2', x: 200, y: 500, potential: 0, baseline: 0, label: "Sensory B" },
            { id: 'n_inh', x: 400, y: 600, potential: 0, baseline: 0, label: "Inhibitory Veto" },
            { id: 'n3', x: 400, y: 400, potential: 0, baseline: 0, label: "Interneuron" },
            { id: 'n4', x: 600, y: 400, potential: 0, baseline: 0, label: "Motor C" }
        ];
        synapses = [
            { source: 'n1', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n2', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n_inh', target: 'n3', weight: 1.0, baseWeight: 1.0, isVeto: true },
            { source: 'n3', target: 'n4', weight: 2.0, baseWeight: 2.0 }
        ];
    } else if (level === 4) {
        nodes = [
            { id: 'n1', x: 150, y: 350, potential: 0, baseline: 0, label: "Sensory A" },
            { id: 'n2', x: 150, y: 500, potential: 0, baseline: 0, label: "Sensory B" },
            { id: 'n_inh', x: 350, y: 600, potential: 0, baseline: 0, label: "Inhibitory Veto" },
            { id: 'n3', x: 350, y: 425, potential: 0, baseline: 0, label: "Interneuron" },
            { id: 'n4', x: 600, y: 300, potential: 0, baseline: 0, label: "Motor C" },
            { id: 'n6', x: 450, y: 120, potential: 0, baseline: 0, label: "Loop Alpha" },
            { id: 'n7', x: 750, y: 120, potential: 0, baseline: 0, label: "Loop Beta" }
        ];
        synapses = [
            { source: 'n1', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n2', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n_inh', target: 'n3', weight: 1.0, baseWeight: 1.0, isVeto: true },
            { source: 'n3', target: 'n4', weight: 2.0, baseWeight: 2.0 },
            { source: 'n4', target: 'n6', weight: 2.5, baseWeight: 2.5 },
            { source: 'n6', target: 'n7', weight: 2.5, baseWeight: 2.5 },
            { source: 'n7', target: 'n4', weight: 2.5, baseWeight: 2.5 }
        ];
    } else {
        nodes = [
            { id: 'n1', x: 150, y: 350, potential: 0, baseline: 0, label: "Sensory A" },
            { id: 'n2', x: 150, y: 500, potential: 0, baseline: 0, label: "Sensory B" },
            { id: 'n_inh', x: 200, y: 650, potential: 0, baseline: 0, label: "Inhibitory Veto" },
            { id: 'n_sensX', x: 200, y: 200, potential: 0, baseline: 0, label: "Sensory X" },
            { id: 'n3', x: 350, y: 425, potential: 0, baseline: 0, label: "Interneuron" },
            { id: 'n4', x: 600, y: 300, potential: 0, baseline: 0, label: "Motor C" },
            { id: 'n5', x: 600, y: 500, potential: 0, baseline: 0, label: "Motor D" },
            { id: 'n6', x: 450, y: 120, potential: 0, baseline: 0, label: "Loop Alpha" },
            { id: 'n7', x: 750, y: 120, potential: 0, baseline: 0, label: "Loop Beta" }
        ];
        synapses = [
            { source: 'n1', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n2', target: 'n3', weight: 1.0, baseWeight: 1.0 },
            { source: 'n_inh', target: 'n3', weight: 1.0, baseWeight: 1.0, isVeto: true },
            { source: 'n_sensX', target: 'n5', weight: 2.0, baseWeight: 2.0 },
            { source: 'n3', target: 'n4', weight: 2.0, baseWeight: 2.0 },
            { source: 'n3', target: 'n5', weight: 2.0, baseWeight: 2.0 },
            { source: 'n4', target: 'n6', weight: 2.5, baseWeight: 2.5 },
            { source: 'n6', target: 'n7', weight: 2.5, baseWeight: 2.5 },
            { source: 'n7', target: 'n4', weight: 2.5, baseWeight: 2.5 }
        ];
    }
    return JSON.parse(JSON.stringify({ nodes, synapses }));
};

export default function NeuralSimulation() {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const lastTimeRef = useRef(0);

    // Simulation state
    const simRef = useRef({
        nodes: getLevelConfig(1).nodes,
        synapses: getLevelConfig(1).synapses,
        pulses: [],
        psychons: [],
        clockAccumulator: 0,
        lastSpikes: {}
    });

    const [uiState, setUiState] = useState({ level: 1, hebbian: true, decay: true, discrete: false, running: true });
    const [, triggerRender] = useState(0);

    const resetSimulation = (levelOverride = null) => {
        const targetLevel = levelOverride || uiState.level;
        const state = simRef.current;
        const config = getLevelConfig(targetLevel);
        state.pulses = [];
        state.psychons = [];
        state.clockAccumulator = 0;
        state.lastSpikes = {};
        state.nodes = config.nodes;
        state.synapses = config.synapses;
        triggerRender(prev => prev + 1);
    };

    useEffect(() => {
        resetSimulation(uiState.level);
    }, [uiState.level]);

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
            let tickDiscrete = false;
            if (uiState.discrete) {
                state.clockAccumulator += dt;
                if (state.clockAccumulator >= 0.5) { // Discrete tick every 500ms
                    tickDiscrete = true;
                    state.clockAccumulator = 0;
                }
            }

            // Hebbian Plasticity Degradation (inactive pathways degrade over time)
            if (uiState.hebbian) {
                state.synapses.forEach(synapse => {
                    if (synapse.weight > 0.1) {
                        synapse.weight = Math.max(0.1, synapse.weight - 0.05 * dt);
                    }
                });
            }

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
                    if (uiState.discrete && !tickDiscrete) {
                        return; // Wait for the discrete clock tick
                    }

                    // Neuron Fires (Fire component)
                    node.potential = REFRACTORY_POTENTIAL;
                    state.lastSpikes[node.id] = time;
                    node.generation = (node.generation || 0) + 1; // Track generation for indefinite reference

                    // Visualize the Psychon (Emission of a mental atom)
                    state.psychons.push({ x: node.x, y: node.y, age: 0 });

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
                            isVeto: synapse.isVeto,
                            generation: node.generation,
                            step: 0, // For discrete jumping
                            vx: (dx / totalDist) * PULSE_SPEED,
                            vy: (dy / totalDist) * PULSE_SPEED,
                            startX: node.x,
                            startY: node.y
                        });
                    });

                    // Hebbian Plasticity Strengthening
                    if (uiState.hebbian) {
                        state.synapses.filter(s => s.target === node.id).forEach(synapse => {
                            const sourceSpikeTime = state.lastSpikes[synapse.source];
                            if (sourceSpikeTime && (time - sourceSpikeTime) < 800) {
                                synapse.weight = Math.min(MAX_WEIGHT, synapse.weight + HEBBIAN_LEARNING_RATE + 0.1);
                            }
                        });
                    }
                }
            });

            // 3. Update Travelling Pulses
            for (let i = state.pulses.length - 1; i >= 0; i--) {
                const pulse = state.pulses[i];

                if (!uiState.discrete) {
                    pulse.distance += PULSE_SPEED * dt;
                } else if (tickDiscrete) {
                    if (pulse.step === 0) {
                        pulse.distance = pulse.totalDistance * 0.5; // Midpoint at time t
                        pulse.step = 1;
                    } else {
                        pulse.distance = pulse.totalDistance; // Arrival at time t+1
                    }
                }

                if (pulse.distance >= pulse.totalDistance) {
                    const targetNode = state.nodes.find(n => n.id === pulse.target);
                    // Add potential based on graded synaptic weight
                    if (targetNode.potential >= 0 || pulse.isVeto) {
                        if (pulse.isVeto) {
                            targetNode.potential = REFRACTORY_POTENTIAL - 2.0; // Absolute Inhibition
                        } else {
                            targetNode.potential += pulse.weight * 0.55; // Threshold Logic (0.55 ensures 2 inputs needed)
                            targetNode.generation = pulse.generation; // Carry timestamp forwards
                        }
                    }
                    state.pulses.splice(i, 1);
                }
            }

            // 4. Update Psychons
            for (let i = state.psychons.length - 1; i >= 0; i--) {
                state.psychons[i].age += dt;
                if (state.psychons[i].age > 1.5) {
                    state.psychons.splice(i, 1);
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
            ctx.strokeStyle = syn.isVeto ? `rgba(239, 68, 68, ${intensity})` : `rgba(100, 150, 255, ${intensity})`;
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

            // Indefinite reference: color fades as generation loop increases
            const maxGen = 10;
            const blend = Math.min(1, (pulse.generation || 1) / maxGen);
            const r = Math.round(255);
            const g = Math.round(215 + (255 - 215) * blend); // From Gold to White
            const b = Math.round(0 + (255 - 0) * blend);     // From Gold to White
            const color = pulse.isVeto ? '#EF4444' : `rgb(${r}, ${g}, ${b})`;

            ctx.beginPath();
            ctx.arc(px, py, 3 + pulse.weight, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Draw Psychons (Mental atomic propositions)
        state.psychons.forEach(psychon => {
            const alpha = Math.max(0, 1 - (psychon.age / 1.5));
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.font = 'italic 18px serif';
            ctx.fillText('Ψ', psychon.x + 15, psychon.y - 20 - (psychon.age * 20));
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
                            <Settings className="w-4 h-4 mr-2 text-[#60A5FA]" /> Assembly Level
                        </h2>

                        {/* Level Selector */}
                        <div className="flex bg-[#0A0D14] p-1 rounded-xl mb-6">
                            {[1, 2, 3, 4, 5].map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setUiState(prev => ({ ...prev, level: lvl }))}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${uiState.level === lvl ? 'bg-[#334155] text-white shadow-md' : 'text-[#6482A3] hover:text-[#94A3B8]'}`}
                                >
                                    L{lvl}
                                </button>
                            ))}
                        </div>

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

                            {/* Conditional Toggles based on level */}
                            {uiState.level >= 4 && (
                                <div className="flex items-center justify-between bg-[#1A2235] p-4 rounded-xl border border-[#334155]">
                                    <div className="pr-4">
                                        <div className="text-white font-bold text-sm mb-1">Hebbian Plasticity</div>
                                        <div className="text-[#94A3B8] text-xs">Active pathways functionally thicken, inactive ones degrade.</div>
                                    </div>
                                    <button
                                        onClick={() => setUiState(prev => ({ ...prev, hebbian: !prev.hebbian }))}
                                        className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${uiState.hebbian ? 'bg-[#FFD700]' : 'bg-[#334155]'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-[#121826] absolute top-1 transition-transform ${uiState.hebbian ? 'translate-x-7' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            )}

                            {uiState.level >= 3 && (
                                <div className="flex items-center justify-between bg-[#1A2235] p-4 rounded-xl border border-[#334155]">
                                    <div className="pr-4">
                                        <div className="text-white font-bold text-sm mb-1">Discrete Time Sync</div>
                                        <div className="text-[#94A3B8] text-xs">Simulate synaptic delay (t to t+1 jumps).</div>
                                    </div>
                                    <button
                                        onClick={() => setUiState(prev => ({ ...prev, discrete: !prev.discrete }))}
                                        className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${uiState.discrete ? 'bg-[#10B981]' : 'bg-[#334155]'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${uiState.discrete ? 'translate-x-7' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col text-[#94A3B8] bg-[#0A0D14] overflow-y-auto">
                        <div className="mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#6482A3] mb-3 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2" />
                                {uiState.level === 1 ? 'Phase 1: Basic Transmission' :
                                    uiState.level === 2 ? 'Phase 2: Threshold Logic' :
                                        uiState.level === 3 ? 'Phase 3: Absolute Inhibition' :
                                            uiState.level === 4 ? 'Phase 4: Functional Reverberation' :
                                                'Phase 5: Mind-Body Epistemology'}
                            </h3>
                            <p className="text-[11px] leading-relaxed bg-[#121826] p-4 rounded-xl border border-[#1E293B]">
                                {uiState.level === 1 && "A single sensory node transmits an action potential to a motor node. Observe the pulse traveling, delivering graded potential, and degrading via 'leakage' over time."}
                                {uiState.level === 2 && "The introduction of an Interneuron. Notice that firing only A or B isn't enough to trigger it. This transforms inert biological relays into physical AND-gates (Threshold Logic)."}
                                {uiState.level === 3 && "Adding the 'Veto' signal. Firing the inhibitory node forces the Interneuron into a deep refractory state (-5.0), perfectly canceling out any simultaneous excitatory summations."}
                                {uiState.level === 4 && "The recurrent memory loop. Signals spin indefinitely, maintaining working memory. Watch the circulating pulse turn white as it loses its original temporal timestamp (Indefinite Reference)."}
                                {uiState.level === 5 && <span>Observe <b>Motor D</b>: It fires identically whether triggered by the Interneuron or Sensory X—its origin is causally opaque. The <b>Psychon (Ψ)</b> emerges as the atomic "mental" realization of these collective physical thresholds.</span>}
                            </p>
                        </div>

                        <div className="mt-auto space-y-2">
                            {uiState.level === 1 && (
                                <button
                                    onClick={() => fireNode('n1')}
                                    className="w-full bg-[#1A2235] hover:bg-[#232D45] border border-[#334155] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center text-[10px] tracking-widest uppercase"
                                >
                                    <Zap className="w-3 h-3 mr-2 text-[#FFD700]" /> Fire Sensory A
                                </button>
                            )}

                            {uiState.level >= 2 && (
                                <>
                                    <div className="flex gap-2 mb-2">
                                        <button onClick={() => fireNode('n1')} className="flex-1 bg-[#1A2235] hover:bg-[#232D45] border border-[#334155] text-white font-bold py-2 rounded-xl text-[10px] uppercase tracking-wider">Fire A</button>
                                        <button onClick={() => fireNode('n2')} className="flex-1 bg-[#1A2235] hover:bg-[#232D45] border border-[#334155] text-white font-bold py-2 rounded-xl text-[10px] uppercase tracking-wider">Fire B</button>
                                    </div>
                                    <button
                                        onClick={() => { fireNode('n1'); setTimeout(() => fireNode('n2'), 150); }}
                                        className="w-full bg-[#1A2235] hover:bg-[#232D45] border border-[#334155] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center text-[10px] tracking-widest uppercase"
                                    >
                                        <Zap className="w-3 h-3 mr-2 text-[#FFD700]" /> Burst Sensory (A+B)
                                    </button>
                                </>
                            )}

                            {uiState.level >= 3 && (
                                <button
                                    onClick={() => fireNode('n_inh')}
                                    className="w-full bg-[#1A2235] hover:bg-[#452323] border border-[#EF4444] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center text-[10px] tracking-widest uppercase"
                                >
                                    <Zap className="w-3 h-3 mr-2 text-[#EF4444]" /> Trigger Veto Signal
                                </button>
                            )}

                            {uiState.level >= 5 && (
                                <button
                                    onClick={() => fireNode('n_sensX')}
                                    className="w-full bg-[#1A2235] hover:bg-[#232D45] border border-[#334155] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center text-[10px] tracking-widest uppercase"
                                >
                                    <Zap className="w-3 h-3 mr-2 text-[#60A5FA]" /> Trigger Sensory X
                                </button>
                            )}

                            <button
                                onClick={() => resetSimulation()}
                                className="w-full bg-transparent hover:bg-[#1A2235] text-[#94A3B8] font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center text-[10px] tracking-widest uppercase mt-4"
                            >
                                <RotateCcw className="w-3 h-3 mr-2" /> Reset Network
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
