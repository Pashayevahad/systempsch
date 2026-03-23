import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ThermoregulationSim from '../components/ThermoregulationSim';
import StabilityLandscape from '../components/StabilityLandscape';

const RegulatoryCircuit = () => {
    const [activeTab, setActiveTab] = useState('theory');
    const [simView, setSimView] = useState('menu'); // 'menu' | 'thermo'
    const [coreTemp, setCoreTemp] = useState(37.0);
    const [envTemp, setEnvTemp] = useState(20);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0E0A08] text-white font-sans overflow-x-hidden pb-12">

            {/* Top Navigation */}
            <div className="flex justify-start p-6 mb-4 mt-2">
                <Link to="/chapter-1" className="text-white hover:text-[#D95A11] transition-colors p-2 -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div className="flex-1 text-center flex justify-center -ml-8">
                    <span className="text-[#D95A11] text-[10px] font-bold tracking-widest uppercase mt-1">Easy Explanation</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mt-8 lg:mt-12">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Core Text & Controls */}
                    <div className="flex flex-col">

                        {/* Header Section */}
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-2">
                                The Regulatory <br />
                                Circuit: <span className="text-[#E65C00] italic">Simply Put</span>
                            </h1>
                            <div className="w-16 h-1 bg-[#D95A11] mt-6"></div>
                        </div>

                        {/* Tabs */}
                        <div className="flex bg-[#160D07] rounded-[0.8rem] p-1.5 mb-10 overflow-hidden border border-[#2A1D13]">
                            <button
                                onClick={() => setActiveTab('theory')}
                                className={`flex-1 py-3 px-4 rounded-lg text-[13px] font-bold tracking-wider transition-all duration-300 ${activeTab === 'theory' ? 'bg-[#D95A11] text-white shadow-md' : 'text-[#8A5A38] hover:text-[#D95A11]'}`}
                            >
                                Theory
                            </button>
                            <button
                                onClick={() => setActiveTab('simulation')}
                                className={`flex-1 py-3 px-4 rounded-lg text-[13px] font-bold tracking-wider transition-all duration-300 ${activeTab === 'simulation' ? 'bg-[#D95A11] text-white shadow-md' : 'text-[#8A5A38] hover:text-[#D95A11]'}`}
                            >
                                Simulation
                            </button>
                        </div>

                        {/* Context Text based on tab */}
                        <div className="tab-content transition-opacity duration-300">
                            {activeTab === 'theory' ? (
                                <div className="border border-[#2A1D13] rounded-[2rem] p-8 md:p-10 bg-[#120D0A] relative overflow-hidden">
                                    {/* Thermostat Metaphor Card */}
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-8">
                                            <div className="w-10 h-10 bg-[#3A1F0D] rounded-lg flex items-center justify-center mr-4">
                                                <svg className="w-5 h-5 text-[#E65C00]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-sans font-bold text-white">The Thermostat<br />Metaphor</h2>
                                        </div>

                                        <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
                                            Think of the heating system in your house. To keep a constant temperature, three parts must work together.
                                        </p>

                                        <div className="space-y-8">
                                            {/* Step 1 */}
                                            <div className="flex">
                                                <div className="text-[#E65C00] font-bold text-lg mr-4 mt-0.5">1.</div>
                                                <div>
                                                    <h3 className="text-[#F2C94C] text-[13px] font-bold tracking-wider mb-1 uppercase">
                                                        The Receptor <span className="text-gray-500 font-normal normal-case tracking-normal">(The Sensor Input)</span>
                                                    </h3>
                                                    <p className="text-gray-400 text-[14px] leading-relaxed">
                                                        The thermometer on the wall that detects the room is getting cold.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="flex">
                                                <div className="text-[#E65C00] font-bold text-lg mr-4 mt-0.5">2.</div>
                                                <div>
                                                    <h3 className="text-[#F2C94C] text-[13px] font-bold tracking-wider mb-1 uppercase">
                                                        The Control Center <span className="text-gray-500 font-normal normal-case tracking-normal">(Process Input vs Set Point, Decide Action)</span>
                                                    </h3>
                                                    <p className="text-gray-400 text-[14px] leading-relaxed">
                                                        The computer inside the thermostat that decides "It's too cold, turn on the heat."
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="flex">
                                                <div className="text-[#E65C00] font-bold text-lg mr-4 mt-0.5">3.</div>
                                                <div>
                                                    <h3 className="text-[#F2C94C] text-[13px] font-bold tracking-wider mb-1 uppercase">
                                                        The Effector <span className="text-gray-500 font-normal normal-case tracking-normal">(The Actor - Creates Response - Heater)</span>
                                                    </h3>
                                                    <p className="text-gray-400 text-[14px] leading-relaxed">
                                                        The furnace that actually kicks on and blows warm air. It can increase heat or decrease or remain as it is.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="border border-[#2A1D13] rounded-[2rem] p-8 md:p-10 bg-[#120D0A]">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 bg-[#3A1F0D] rounded-lg flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-[#E65C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-sans font-bold text-white">
                                            {simView === 'menu' ? 'Select Simulation' : 'Thermoregulation Simulation'}
                                        </h2>
                                    </div>
                                    <p className="text-gray-400 text-[15px] leading-relaxed">
                                        {simView === 'menu'
                                            ? 'Choose between biological and psychological regulatory models to explore how stability is maintained across different systems.'
                                            : 'Observe how the regulatory circuit responds to environmental changes in real-time. Adjust parameters to see the system balance itself.'}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Visuals & Simulation */}
                    <div className="flex flex-col">
                        <div className="tab-content transition-opacity duration-300 min-h-[400px]">
                            {activeTab === 'theory' ? (
                                <div className="flex flex-col h-full">
                                    {/* Flow Diagram Graphic */}
                                    <div className="relative flex flex-col items-center justify-center py-10 w-full mb-12">
                                        {/* SENSORS */}
                                        <div className="relative text-center w-full max-w-[240px] py-6 border border-[#1A2642] bg-[#0A101C] rounded-xl shadow-[0_0_20px_rgba(26,38,66,0.3)] z-10">
                                            <div className="text-[#8BB3E6] font-bold text-[11px] tracking-widest uppercase mb-2">Sensors</div>
                                            <div className="text-[#4C8CBF] font-bold text-[12px] tracking-widest uppercase mb-1">Input</div>
                                            <div className="text-gray-500 text-[11px]">Detects Change</div>
                                        </div>

                                        {/* Arrow down */}
                                        <div className="h-12 flex items-center justify-center text-[#4C8CBF] z-10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>

                                        {/* CONTROL */}
                                        <div className="relative text-center w-full max-w-[240px] py-6 border border-[#4A2610] bg-[#1A100B] rounded-xl shadow-[0_0_20px_rgba(74,38,16,0.3)] z-10">
                                            <div className="text-[#D95A11] font-bold text-[11px] tracking-widest uppercase mb-2">Control</div>
                                            <div className="text-[#B3450B] font-bold text-[12px] tracking-widest uppercase mb-1">Process</div>
                                            <div className="text-gray-500 text-[11px]">Decides Action</div>
                                        </div>

                                        {/* Arrow down */}
                                        <div className="h-12 flex items-center justify-center text-[#D95A11] z-10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>

                                        {/* EFFECTOR */}
                                        <div className="relative text-center w-full max-w-[240px] py-6 border border-[#103A2A] bg-[#0B1A14] rounded-xl shadow-[0_0_20px_rgba(16,58,42,0.3)] z-10">
                                            <div className="text-[#4CAF50] font-bold text-[11px] tracking-widest uppercase mb-2">Effector</div>
                                            <div className="text-[#388E3C] font-bold text-[12px] tracking-widest uppercase mb-1">Output</div>
                                            <div className="text-gray-500 text-[11px]">Creates Response</div>
                                        </div>

                                        {/* Negative Feedback Arc */}
                                        <div className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 flex items-center justify-end w-full max-w-[320px] pointer-events-none z-0 hidden md:flex">
                                            <svg className="h-[340px] w-[160px]" viewBox="0 0 100 200" fill="none">
                                                <path d="M 10 10 C 140 10, 140 190, 10 190" stroke="#4C8CBF" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                                                <polygon points="10,10 18,6 18,14" fill="#4C8CBF" />
                                            </svg>
                                            <div className="absolute right-[-20px] translate-x-full rotate-90 text-[#4C8CBF] text-[10px] font-bold tracking-[0.2em] whitespace-nowrap">
                                                NEGATIVE FEEDBACK
                                            </div>
                                        </div>
                                    </div>

                                    {/* Return Loop Takeaway Section */}
                                    <div className="pl-6 border-l-[3px] border-[#E65C00] mt-auto lg:mb-10">
                                        <div className="text-[#E65C00] text-[10px] font-bold tracking-widest uppercase mb-4">Takeaway</div>
                                        <p className="text-2xl text-white font-sans font-medium leading-[1.4]">
                                            "Life is a loop. We don't just react to the world; we <span className="text-[#E65C00]">regulate against it</span> through these three steps."
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full">
                                    {simView === 'menu' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in">
                                            {/* Card 1: Biological Regulation */}
                                            <div
                                                onClick={() => setSimView('thermo')}
                                                className="group relative bg-[#120D0A] border border-white/5 rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#D95A11]/30 hover:shadow-[0_0_40px_rgba(217,90,17,0.15)] hover:-translate-y-1"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#D95A11]/5 via-transparent to-[#4C8CBF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                <div className="relative z-10 h-full flex flex-col">
                                                    <div className="w-14 h-14 bg-[#1C1410] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#D95A11]/30 transition-colors shadow-inner">
                                                        <svg className="w-7 h-7 text-[#D95A11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    </div>

                                                    <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-tight">Thermoregulation Circuit</h3>
                                                    <p className="text-[#8A5A38] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Biological Homeostasis</p>

                                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                                        Observe how the body dynamically balances cold and heat stress using metabolic feedback loops.
                                                    </p>

                                                    <div className="flex items-center text-[#D95A11] text-xs font-bold tracking-widest uppercase">
                                                        Initialize Module
                                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card 2: Psychological Regulation */}
                                            <Link
                                                to="/autonomic-simulation"
                                                className="group relative bg-[#120D0A] border border-white/5 rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#B32424]/30 hover:shadow-[0_0_40px_rgba(179,36,36,0.15)] hover:-translate-y-1 text-left block no-underline"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-tr from-[#B32424]/5 via-transparent to-[#000]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                <div className="relative z-10 h-full flex flex-col">
                                                    <div className="w-14 h-14 bg-[#1C1410] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#B32424]/30 transition-colors shadow-inner">
                                                        <svg className="w-7 h-7 text-[#B32424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </div>

                                                    <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-tight">Autonomic Stress Circuit</h3>
                                                    <p className="text-[#B32424] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Psychological Homeostasis</p>

                                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                                        Observe the Window of Tolerance and how the nervous system reacts to chronic and acute stress.
                                                    </p>

                                                    <div className="flex items-center text-[#B32424] text-xs font-bold tracking-widest uppercase">
                                                        Configure Circuit
                                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-6 animate-fade-in">
                                            <button
                                                onClick={() => setSimView('menu')}
                                                className="flex items-center text-[#8A5A38] hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase mb-2 group"
                                            >
                                                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                                </svg>
                                                Back to Selection
                                            </button>
                                            <ThermoregulationSim onUpdate={(c, e) => { setCoreTemp(c); setEnvTemp(e); }} />
                                            <StabilityLandscape coreTemp={coreTemp} envTemp={envTemp} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Footer Action */}
                <div className="mt-16 lg:mt-24 flex flex-col items-center max-w-xl mx-auto">
                    <Link to="/chapter-1" className="bg-[#D95A11] hover:bg-[#E86A21] transition-colors text-white text-[13px] font-bold tracking-widest uppercase py-4 px-8 rounded-lg w-full text-center shadow-[0_8px_20px_rgba(217,90,17,0.2)] hover:shadow-[0_12px_25px_rgba(217,90,17,0.3)] hover:-translate-y-0.5 transform duration-200 group flex items-center justify-center">
                        Got it, Back to Chapter
                        <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold mt-8">
                        Systems Thinking &bull; Foundation Module
                    </p>
                </div>

            </div>
        </div >
    );
};

export default RegulatoryCircuit;
