import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Target, Zap, Activity, BookOpen, Crosshair, GitCommit, Feather, Dices,
    ArrowRight, Eye, MousePointer2, Rocket, Play, RotateCcw, Cat, Bug, Bot,
    Baby, Heart, Megaphone, MessageCircle, UserMinus, Users, ArrowLeft
} from 'lucide-react';

// Enhanced taxonomy data with explicit color themes and specific icons for visual learning
const taxonomyData = {
    id: "behavior",
    label: "Behavior",
    icon: <Activity className="w-6 h-6" />,
    theme: "blue",
    definition: "Any externally detectable change of an entity with respect to its surroundings.",
    examples: [],
    children: [
        {
            id: "active",
            label: "Active",
            icon: <Zap className="w-6 h-6" />,
            theme: "orange",
            definition: "The object itself is the source of the output energy.",
            examples: [],
            children: [
                {
                    id: "purposeful",
                    label: "Purposeful",
                    icon: <Target className="w-6 h-6" />,
                    theme: "emerald",
                    definition: "Behavior directed to the attainment of a specific goal.",
                    examples: ["Taking a glass of water", "Target-seeking torpedo"],
                    children: [
                        {
                            id: "feedback",
                            label: "Feed-back (Teleological)",
                            icon: <GitCommit className="w-6 h-6" />,
                            theme: "indigo",
                            definition: "Behavior controlled and corrected by the margin of error from the goal (negative feed-back).",
                            examples: [],
                            children: [
                                {
                                    id: "predictive",
                                    label: "Predictive (Extrapolative)",
                                    icon: <Crosshair className="w-6 h-6" />,
                                    theme: "violet",
                                    definition: "Moves toward an extrapolated future position of the goal (requires time/space prediction).",
                                    examples: [],
                                    children: [
                                        {
                                            id: "first-order",
                                            label: "1st-Order Prediction",
                                            icon: <MousePointer2 className="w-6 h-6" />,
                                            theme: "fuchsia",
                                            definition: "Predicting only the future path of the moving target.",
                                            examples: ["A cat running to intercept a fleeing mouse"],
                                            children: []
                                        },
                                        {
                                            id: "second-order",
                                            label: "2nd-Order+ Prediction",
                                            icon: <Rocket className="w-6 h-6" />,
                                            theme: "pink",
                                            definition: "Predicting paths of BOTH the target and the acting object/projectile.",
                                            examples: ["Throwing a stone at a moving target"],
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    id: "non-predictive",
                                    label: "Non-predictive",
                                    icon: <Eye className="w-6 h-6" />,
                                    theme: "teal",
                                    definition: "Reacts to a source continuously without predicting its future path.",
                                    examples: ["Amoeba following a light source", "Bloodhound trailing a scent"],
                                    children: []
                                }
                            ]
                        },
                        {
                            id: "non-feedback",
                            label: "Non-feed-back",
                            icon: <ArrowRight className="w-6 h-6" />,
                            theme: "cyan",
                            definition: "Action triggered without continuous goal signals to correct the movement once started.",
                            examples: ["A snake striking at a frog", "A frog striking at a fly"],
                            children: []
                        }
                    ]
                },
                {
                    id: "non-purposeful",
                    label: "Random (Purposeless)",
                    icon: <Dices className="w-6 h-6" />,
                    theme: "rose",
                    definition: "Active behavior that is not directed toward a specific final goal condition.",
                    examples: ["A clock ticking", "A roulette wheel spinning", "Randomly firing a gun"],
                    children: []
                }
            ]
        },
        {
            id: "passive",
            label: "Passive",
            icon: <Feather className="w-6 h-6" />,
            theme: "slate",
            definition: "The object is NOT the source of energy; it only controls external energy or reacts to immediate input.",
            examples: ["A thrown object", "The soaring flight of a bird riding air currents"],
            children: []
        }
    ]
};

// Helper to get tailwind classes based on theme string
const getThemeClasses = (theme, isSelected, inPath) => {
    const themes = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-400', glow: 'shadow-blue-200', path: 'stroke-blue-400' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-400', glow: 'shadow-orange-200', path: 'stroke-orange-400' },
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-400', glow: 'shadow-emerald-200', path: 'stroke-emerald-400' },
        rose: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-400', glow: 'shadow-rose-200', path: 'stroke-rose-400' },
        indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-400', glow: 'shadow-indigo-200', path: 'stroke-indigo-400' },
        cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-400', glow: 'shadow-cyan-200', path: 'stroke-cyan-400' },
        violet: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-400', glow: 'shadow-violet-200', path: 'stroke-violet-400' },
        teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-400', glow: 'shadow-teal-200', path: 'stroke-teal-400' },
        fuchsia: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', border: 'border-fuchsia-400', glow: 'shadow-fuchsia-200', path: 'stroke-fuchsia-400' },
        pink: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-400', glow: 'shadow-pink-200', path: 'stroke-pink-400' },
        slate: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-400', glow: 'shadow-slate-200', path: 'stroke-slate-400' }
    };
    const t = themes[theme] || themes.slate;
    if (isSelected) return `${t.bg} ${t.text} ${t.border} shadow-lg ${t.glow} ring-4 ring-opacity-30 ring-${theme}-400 scale-110 z-20 font-bold`;
    if (inPath) return `bg-white ${t.text} border-2 ${t.border} shadow-md z-10 font-bold`;
    return `bg-white text-slate-500 border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 opacity-60 hover:opacity-100 z-0`;
};

// Hook to track window size for redrawing lines
const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() { setSize([window.innerWidth, window.innerHeight]); }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

// SIMULATION SCENARIOS
const scenarios = [
    {
        id: "passive",
        title: "1. The Thrown Rock",
        taxonomyPath: ["behavior", "passive"],
        description: "The rock has no internal energy source. It only moves because you (the environment) threw it. It completely ignores the fly.",
        icon: <div className="w-4 h-4 rounded-full bg-slate-500" />
    },
    {
        id: "random",
        title: "2. The Wandering Robot",
        taxonomyPath: ["behavior", "active", "non-purposeful"],
        description: "The robot has batteries (Active), but it wanders aimlessly. It is not trying to reach a goal (Purposeless).",
        icon: <Bot className="w-5 h-5 text-rose-500" />
    },
    {
        id: "strike",
        title: "3. The Blind Strike (Snake)",
        taxonomyPath: ["behavior", "active", "purposeful", "non-feedback"],
        description: "The strike aims at exactly where the fly is right now. But once fired, it cannot change direction. If the fly moves, it misses! (No feedback).",
        icon: <Zap className="w-5 h-5 text-cyan-500" />
    },
    {
        id: "cat",
        title: "4. The Hunting Cat",
        taxonomyPath: ["behavior", "active", "purposeful", "feedback", "predictive", "first-order"],
        description: "The cat chases the fly. It constantly watches the fly and updates its own direction to intercept it (Negative Feed-back).",
        icon: <Cat className="w-5 h-5 text-indigo-500" />
    }
];

const familyScenarios = [
    {
        id: "family_passive",
        title: "1. The Reluctant Teen",
        taxonomyPath: ["behavior", "passive"],
        description: "No internal motivation. They are just 'dragged along' to the family event by external pressure, completely ignoring the family's actual goal.",
        icon: <UserMinus className="w-5 h-5 text-slate-500" />
    },
    {
        id: "family_random",
        title: "2. The Toddler Tantrum",
        taxonomyPath: ["behavior", "active", "non-purposeful"],
        description: "High emotional energy (Active), but aimless. They are crying and wandering, but not actively trying to achieve a specific resolution.",
        icon: <MessageCircle className="w-5 h-5 text-rose-500" />
    },
    {
        id: "family_strike",
        title: "3. The Rehearsed Lecture",
        taxonomyPath: ["behavior", "active", "purposeful", "non-feedback"],
        description: "A parent starts a rigid, rehearsed lecture. Even if the child apologizes or the situation changes, the parent cannot adjust course until the speech is done.",
        icon: <Megaphone className="w-5 h-5 text-cyan-500" />
    },
    {
        id: "family_cat",
        title: "4. Active Empathy",
        taxonomyPath: ["behavior", "active", "purposeful", "feedback"],
        description: "Trying to comfort a distressed sibling. You try an approach, watch their reaction (negative feedback), and adjust your tone until you successfully connect.",
        icon: <Heart className="w-5 h-5 text-indigo-500" />
    }
];

export default function BehaviorTaxonomy() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'map'); // 'map' or 'sim_phys' or 'sim_family'

    // MAP STATE
    const [selectedNode, setSelectedNode] = useState(taxonomyData);
    const [activePath, setActivePath] = useState(['behavior']);
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const windowSize = useWindowSize();

    // SIMULATION STATE
    const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
    const [simRunning, setSimRunning] = useState(false);
    const arenaRef = useRef(null);
    const bugRef = useRef(null);
    const actorRef = useRef(null);
    const simState = useRef({
        bug: { x: 250, y: 100, vx: 1, vy: 0.5 },
        actor: { x: 250, y: 450, vx: 0, vy: 0, active: false, type: 'passive', targetX: 0, targetY: 0 },
        lastFrame: 0
    });
    const requestRef = useRef();

    // Helper to find the path from root to a specific node
    const findPath = (targetId, currentNode = taxonomyData, currentPath = []) => {
        const path = [...currentPath, currentNode.id];
        if (currentNode.id === targetId) return path;
        if (currentNode.children) {
            for (let child of currentNode.children) {
                const found = findPath(targetId, child, path);
                if (found) return found;
            }
        }
        return null;
    };

    const handleSelectNode = (node) => {
        setSelectedNode(node);
        setActivePath(findPath(node.id) || [node.id]);
    };

    // Draw SVG lines connecting the nodes (only in Map tab)
    useEffect(() => {
        if (activeTab !== 'map' || !containerRef.current) return;
        const timer = setTimeout(() => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newLines = [];
            const traverse = (node) => {
                if (node.children) {
                    node.children.forEach(child => {
                        const parentEl = document.getElementById(`node-${node.id}`);
                        const childEl = document.getElementById(`node-${child.id}`);
                        if (parentEl && childEl) {
                            const pRect = parentEl.getBoundingClientRect();
                            const cRect = childEl.getBoundingClientRect();
                            const startX = pRect.right - containerRect.left;
                            const startY = pRect.top + pRect.height / 2 - containerRect.top;
                            const endX = cRect.left - containerRect.left;
                            const endY = cRect.top + cRect.height / 2 - containerRect.top;
                            const isHighlighted = activePath.includes(node.id) && activePath.includes(child.id);
                            newLines.push({ id: `${node.id}-${child.id}`, startX, startY, endX, endY, isHighlighted, theme: child.theme });
                        }
                        traverse(child);
                    });
                }
            };
            traverse(taxonomyData);
            setLines(newLines);
        }, 50);
        return () => clearTimeout(timer);
    }, [activePath, windowSize, selectedNode, activeTab]);

    // SIMULATION LOOP
    const updateSimulation = (time) => {
        if (!simState.current.lastFrame) simState.current.lastFrame = time;
        const dt = Math.min((time - simState.current.lastFrame) / 16, 2); // Normalize to ~60fps, cap at 2x
        simState.current.lastFrame = time;

        const state = simState.current;

        // 1. Update Bug (Fly) - Wanders randomly
        state.bug.x += state.bug.vx * dt;
        state.bug.y += state.bug.vy * dt;

        // Bug wall bounce & random direction changes
        if (state.bug.x <= 20 || state.bug.x >= 480) state.bug.vx *= -1;
        if (state.bug.y <= 20 || state.bug.y >= 250) state.bug.vy *= -1;
        if (Math.random() < 0.02) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random();
            state.bug.vx = Math.cos(angle) * speed;
            state.bug.vy = Math.sin(angle) * speed;
        }

        // 2. Update Actor
        if (state.actor.active) {
            if (state.actor.type === 'passive') {
                // Rock: Parabolic arc
                state.actor.vy += 0.1 * dt; // gravity
                state.actor.x += state.actor.vx * dt;
                state.actor.y += state.actor.vy * dt;
                if (state.actor.y > 480) { state.actor.active = false; state.actor.y = 480; }
            }
            else if (state.actor.type === 'random') {
                // Robot: Wanders blindly
                state.actor.x += state.actor.vx * dt;
                state.actor.y += state.actor.vy * dt;
                if (state.actor.x <= 10 || state.actor.x >= 490) state.actor.vx *= -1;
                if (state.actor.y <= 10 || state.actor.y >= 490) state.actor.vy *= -1;
            }
            else if (state.actor.type === 'strike') {
                // Blind Strike: Moves to locked target, stops when reached
                const dx = state.actor.targetX - state.actor.x;
                const dy = state.actor.targetY - state.actor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 5) {
                    state.actor.active = false; // Stopped
                } else {
                    state.actor.x += state.actor.vx * dt;
                    state.actor.y += state.actor.vy * dt;
                }
            }
            else if (state.actor.type === 'cat') {
                // Cat: Continuously updates trajectory towards bug
                const dx = state.bug.x - state.actor.x;
                const dy = state.bug.y - state.actor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 5) {
                    const speed = 2.5;
                    state.actor.vx = (dx / dist) * speed;
                    state.actor.vy = (dy / dist) * speed;
                    state.actor.x += state.actor.vx * dt;
                    state.actor.y += state.actor.vy * dt;
                }
            }
            else if (state.actor.type === 'family_passive') {
                // Reluctant teen drifts slowly, pushed by initial momentum
                state.actor.x += state.actor.vx * dt;
                state.actor.y += state.actor.vy * dt;
            }
            else if (state.actor.type === 'family_random') {
                // Tantrum wanders blindly
                state.actor.x += state.actor.vx * dt;
                state.actor.y += state.actor.vy * dt;
                if (state.actor.x <= 10 || state.actor.x >= 490) state.actor.vx *= -1;
                if (state.actor.y <= 10 || state.actor.y >= 490) state.actor.vy *= -1;
            }
            else if (state.actor.type === 'family_strike') {
                // Delivers lecture to where the target WAS
                const dx = state.actor.targetX - state.actor.x;
                const dy = state.actor.targetY - state.actor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 5) {
                    state.actor.active = false;
                } else {
                    state.actor.x += state.actor.vx * dt;
                    state.actor.y += state.actor.vy * dt;
                }
            }
            else if (state.actor.type === 'family_cat') {
                // Active Empathy: Uses feedback to adjust to target's emotional state
                const dx = state.bug.x - state.actor.x;
                const dy = state.bug.y - state.actor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 5) {
                    const speed = 2.2;
                    state.actor.vx = (dx / dist) * speed;
                    state.actor.vy = (dy / dist) * speed;
                    state.actor.x += state.actor.vx * dt;
                    state.actor.y += state.actor.vy * dt;
                } else {
                    // Connected! Catch it and continue with it!
                    state.actor.x = state.bug.x;
                    state.actor.y = state.bug.y;

                    // Simulate calming down the erratic toddler movement gradually
                    state.bug.vx *= 0.95;
                    state.bug.vy *= 0.95;
                }
            }
        }

        // 3. Render directly to DOM for smoothness
        if (bugRef.current) {
            bugRef.current.style.transform = `translate(${state.bug.x}px, ${state.bug.y}px)`;
        }
        if (actorRef.current) {
            actorRef.current.style.transform = `translate(${state.actor.x}px, ${state.actor.y}px)`;
        }

        requestRef.current = requestAnimationFrame(updateSimulation);
    };

    useEffect(() => {
        if (activeTab === 'sim' || activeTab === 'sim_phys' || activeTab === 'sim_family') {
            requestRef.current = requestAnimationFrame(updateSimulation);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [activeTab]);

    const triggerSimulation = () => {
        const type = currentScenario.id;
        simState.current.actor.type = type;
        simState.current.actor.active = true;

        if (type === 'passive') {
            // Throw from bottom center
            simState.current.actor.x = 250;
            simState.current.actor.y = 450;
            simState.current.actor.vx = (Math.random() - 0.5) * 6;
            simState.current.actor.vy = -6; // upward throw
        } else if (type === 'family_passive') {
            simState.current.actor.x = 250;
            simState.current.actor.y = 450;
            simState.current.actor.vx = (Math.random() - 0.5) * 2;
            simState.current.actor.vy = -2; // Slow reluctant drag
        } else if (type === 'random' || type === 'family_random') {
            simState.current.actor.x = 250;
            simState.current.actor.y = 450;
            const angle = Math.random() * Math.PI * 2;
            simState.current.actor.vx = Math.cos(angle) * 3;
            simState.current.actor.vy = Math.sin(angle) * 3;
        } else if (type === 'strike' || type === 'family_strike') {
            simState.current.actor.x = 250;
            simState.current.actor.y = 450;
            // Lock onto current bug position (Non-feedback)
            simState.current.actor.targetX = simState.current.bug.x;
            simState.current.actor.targetY = simState.current.bug.y;
            const dx = simState.current.actor.targetX - 250;
            const dy = simState.current.actor.targetY - 450;
            const dist = Math.sqrt(dx * dx + dy * dy);
            simState.current.actor.vx = (dx / dist) * 8; // Fast lecture
            simState.current.actor.vy = (dy / dist) * 8;
        } else if (type === 'cat' || type === 'family_cat') {
            simState.current.actor.x = 250;
            simState.current.actor.y = 450;
            // Velocity is calculated dynamically in the loop
        }
    };

    const resetSimulation = () => {
        simState.current.actor.active = false;
        simState.current.actor.x = 250;
        simState.current.actor.y = 450;
        if (actorRef.current) {
            actorRef.current.style.transform = `translate(250px, 450px)`;
        }
    };

    // Node Rendering (For Map)
    const renderNode = (node) => {
        const isSelected = selectedNode.id === node.id;
        const inPath = activePath.includes(node.id);
        const classes = getThemeClasses(node.theme, isSelected, inPath);

        return (
            <div key={node.id} className="flex items-center space-x-12">
                <div
                    id={`node-${node.id}`}
                    onClick={() => handleSelectNode(node)}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-300 w-32 h-32 text-center ${classes}`}
                >
                    <div className="mb-2">{node.icon}</div>
                    <span className="text-xs leading-tight">{node.label}</span>
                </div>
                {node.children && node.children.length > 0 && (
                    <div className="flex flex-col justify-center space-y-6">
                        {node.children.map(child => renderNode(child))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-16 bg-slate-900 flex flex-col font-sans overflow-hidden">

            {/* Top Navigation */}
            <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 shadow-md z-20 flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link to="/chapter-2/first-order" className="text-slate-400 hover:text-white transition-colors bg-slate-700 p-2 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
                                <Activity className="w-5 h-5 mr-3 text-indigo-400" />
                                Taxonomy of Behavior
                            </h1>
                            <p className="text-xs text-slate-400 mt-1">Rosenblueth, Wiener, & Bigelow (1943)</p>
                        </div>
                    </div>

                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('map')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'map' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                            Theory Map
                        </button>
                        <button
                            onClick={() => { setActiveTab('sim_phys'); setCurrentScenario(scenarios[0]); resetSimulation(); }}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center whitespace-nowrap ${activeTab === 'sim_phys' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Play className="w-4 h-4 mr-2" />
                            Physics Sim
                        </button>
                        <button
                            onClick={() => { setActiveTab('sim_family'); setCurrentScenario(familyScenarios[0]); resetSimulation(); }}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center whitespace-nowrap ${activeTab === 'sim_family' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Family Dynamics
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* VIEW 1: THE MAP */}
                {activeTab === 'map' && (
                    <>
                        <div className="flex-1 relative overflow-auto custom-scrollbar" ref={scrollRef}>
                            <div className="p-12 min-w-max relative" ref={containerRef} style={{ minHeight: '100%' }}>
                                <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
                                    {lines.map((line) => {
                                        const offset = Math.abs(line.endX - line.startX) / 2;
                                        const pathData = `M ${line.startX} ${line.startY} C ${line.startX + offset} ${line.startY}, ${line.endX - offset} ${line.endY}, ${line.endX} ${line.endY}`;
                                        const strokeColor = line.isHighlighted
                                            ? (line.theme === 'orange' ? '#fb923c' : line.theme === 'emerald' ? '#34d399' : line.theme === 'rose' ? '#fb7185' : line.theme === 'indigo' ? '#818cf8' : line.theme === 'cyan' ? '#22d3ee' : line.theme === 'violet' ? '#a78bfa' : line.theme === 'teal' ? '#2dd4bf' : line.theme === 'fuchsia' ? '#e879f9' : line.theme === 'pink' ? '#f472b6' : line.theme === 'blue' ? '#60a5fa' : '#94a3b8')
                                            : '#334155';
                                        return (
                                            <path key={line.id} d={pathData} fill="none" stroke={strokeColor} strokeWidth={line.isHighlighted ? 4 : 2} className="transition-all duration-500 ease-in-out" strokeLinecap="round" />
                                        );
                                    })}
                                </svg>
                                <div className="relative z-10 flex">{renderNode(taxonomyData)}</div>
                            </div>
                        </div>

                        {/* Map Detail Sidebar */}
                        <div className="w-full lg:w-96 bg-slate-800 border-l border-slate-700 shadow-xl flex flex-col z-20 flex-shrink-0 overflow-y-auto hidden lg:flex">
                            <div className="p-8 border-b border-slate-700 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-700/50 to-transparent">
                                <div className={`p-4 rounded-full bg-slate-800 text-white shadow-lg mb-4 ring-4 ring-opacity-50 ring-${selectedNode.theme}-400`}>
                                    {React.cloneElement(selectedNode.icon, { className: "w-10 h-10" })}
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedNode.label}</h2>
                                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold text-slate-400">
                                    {activePath.map((nodeId, idx) => {
                                        const isLast = idx === activePath.length - 1;
                                        const findName = (id, n = taxonomyData) => n.id === id ? n.label : (n.children ? n.children.map(c => findName(id, c)).find(Boolean) : null);
                                        return (
                                            <React.Fragment key={idx}>
                                                <span className={isLast ? "text-white" : ""}>{findName(nodeId)}</span>
                                                {!isLast && <ChevronRightIcon />}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="p-6 flex-1 text-slate-300">
                                <div className="mb-8">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center"><BookOpen className="w-4 h-4 mr-2" /> Definition</h3>
                                    <p className="text-lg leading-relaxed text-slate-200 bg-slate-900/50 p-4 rounded-xl border border-slate-700">"{selectedNode.definition}"</p>
                                </div>
                                {selectedNode.examples && selectedNode.examples.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center"><Target className="w-4 h-4 mr-2" /> Real-World Examples</h3>
                                        <ul className="space-y-3">
                                            {selectedNode.examples.map((ex, idx) => (
                                                <li key={idx} className="flex items-start bg-slate-700/30 p-3 rounded-lg border border-slate-700">
                                                    <div className={`w-2 h-2 rounded-full bg-${selectedNode.theme}-400 mt-2 mr-3 flex-shrink-0`} />
                                                    <span className="text-slate-200">{ex}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* VIEW 2 & 3: THE SIMULATIONS */}
                {(activeTab === 'sim_phys' || activeTab === 'sim_family') && (
                    <div className="flex-1 flex flex-col lg:flex-row bg-slate-900">

                        {/* Arena */}
                        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
                            <div
                                ref={arenaRef}
                                className={`w-[500px] h-[500px] rounded-2xl border-4 relative overflow-hidden shadow-2xl ${activeTab === 'sim_family' ? 'bg-slate-800/80 border-rose-900/50' : 'bg-slate-800 border-slate-700'}`}
                                style={{
                                    backgroundImage: activeTab === 'sim_family'
                                        ? 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)'
                                        : 'radial-gradient(#334155 1px, transparent 1px)',
                                    backgroundSize: activeTab === 'sim_family' ? '100% 100%' : '20px 20px'
                                }}
                            >
                                {/* Target */}
                                <div
                                    ref={bugRef}
                                    className={`absolute w-6 h-6 -ml-3 -mt-3 z-10 transition-transform duration-75 ${activeTab === 'sim_family' ? 'text-emerald-400' : 'text-amber-400'}`}
                                >
                                    {activeTab === 'sim_family' ? (
                                        <Baby className="w-full h-full drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    ) : (
                                        <Bug className="w-full h-full drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                                    )}
                                </div>

                                {/* Actor */}
                                <div
                                    ref={actorRef}
                                    className="absolute w-8 h-8 -ml-4 -mt-4 z-20 transition-transform duration-75"
                                >
                                    <div className={`rounded-full p-1 shadow-xl border-2 flex items-center justify-center w-full h-full ${activeTab === 'sim_family' ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-600'}`}>
                                        {currentScenario.id === 'passive' && <div className="w-4 h-4 rounded-full bg-slate-400" />}
                                        {currentScenario.id === 'random' && <Bot className="text-rose-400 w-5 h-5" />}
                                        {currentScenario.id === 'strike' && <Zap className="text-cyan-400 w-5 h-5" />}
                                        {currentScenario.id === 'cat' && <Cat className="text-indigo-400 w-5 h-5" />}

                                        {currentScenario.id === 'family_passive' && <UserMinus className="text-slate-400 w-5 h-5" />}
                                        {currentScenario.id === 'family_random' && <MessageCircle className="text-rose-400 w-5 h-5" />}
                                        {currentScenario.id === 'family_strike' && <Megaphone className="text-cyan-400 w-5 h-5" />}
                                        {currentScenario.id === 'family_cat' && <Heart className="text-indigo-400 w-5 h-5" />}
                                    </div>
                                </div>

                                {/* Start Location Indicator */}
                                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-4 border-b-2 border-dashed text-[10px] text-center uppercase tracking-widest ${activeTab === 'sim_family' ? 'border-rose-700 text-rose-500' : 'border-slate-600 text-slate-500'}`}>
                                    {activeTab === 'sim_family' ? 'Action' : 'Start'}
                                </div>
                            </div>
                        </div>

                        {/* Simulation Controls Sidebar */}
                        <div className="w-full lg:w-96 bg-slate-800 border-l border-slate-700 shadow-xl flex flex-col z-20 flex-shrink-0">
                            <div className="p-6 border-b border-slate-700 bg-slate-800/80">
                                <h2 className="text-xl font-bold text-white mb-4">
                                    {activeTab === 'sim_family' ? 'Family Dynamics' : 'Physical Scenarios'}
                                </h2>
                                <div className="space-y-3">
                                    {(activeTab === 'sim_family' ? familyScenarios : scenarios).map(scenario => (
                                        <button
                                            key={scenario.id}
                                            onClick={() => { setCurrentScenario(scenario); resetSimulation(); }}
                                            className={`w-full text-left p-4 rounded-xl flex items-center transition-all ${currentScenario.id === scenario.id ? 'bg-indigo-600/20 border-indigo-500 border ring-1 ring-indigo-500' : 'bg-slate-700/50 border-slate-600 border hover:bg-slate-700'}`}
                                        >
                                            <div className="bg-slate-900 p-2 rounded-lg mr-4 shadow-sm">
                                                {scenario.icon}
                                            </div>
                                            <span className={`font-semibold ${currentScenario.id === scenario.id ? 'text-indigo-300' : 'text-slate-300'}`}>
                                                {scenario.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col text-slate-300 bg-slate-900">
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold text-white mb-2">How it fits the theory:</h3>
                                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold mb-4">
                                        {currentScenario.taxonomyPath.map((step, idx) => (
                                            <React.Fragment key={idx}>
                                                <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-slate-300 capitalize">{step}</span>
                                                {idx < currentScenario.taxonomyPath.length - 1 && <ChevronRightIcon />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-400 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                        {currentScenario.description}
                                    </p>
                                </div>

                                <div className="mt-auto space-y-3">
                                    <button
                                        onClick={triggerSimulation}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center"
                                    >
                                        <Play className="w-5 h-5 mr-2" />
                                        Trigger Action
                                    </button>
                                    <button
                                        onClick={resetSimulation}
                                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
        </div>
    );
}

function ChevronRightIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
