"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Mic,
  MapPin,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building,
  Smartphone,
  Check,
  ChevronRight,
  TrendingUp,
  Inbox,
  AlertCircle
} from "lucide-react";

// ===================== REUSABLE DESIGN ENGINEER COMPONENTS =====================

// 1. Magnet Component: Mouse-following magnetic hover effect
function Magnet({ children, strength = 4, padding = 120 }: { children: React.ReactNode; strength?: number; padding?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < padding) {
        setIsHovered(true);
        setPosition({
          x: distanceX / strength,
          y: distanceY / strength,
        });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// 2. AnimatedText: Word-by-word scroll-reveal animation
function AnimatedText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const words = text.split(" ");
  
  return (
    <p ref={containerRef} className="text-base md:text-xl text-muted-pine leading-relaxed max-w-4xl">
      {words.map((word, wordIndex) => {
        return (
          <span key={wordIndex} className="inline-block mr-1.5 relative">
            <WordProgress word={word} progress={scrollYProgress} index={wordIndex} total={words.length} />
          </span>
        );
      })}
    </p>
  );
}

function WordProgress({ word, progress, index, total }: { word: string; progress: MotionValue<number>; index: number; total: number }) {
  const start = index / total;
  const end = (index + 1.5) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

// 3. Stacking Card Item Component
function StackingCard({
  id,
  title,
  desc,
  index,
  progress,
  total
}: {
  id: string;
  title: string;
  desc: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  
  return (
    <motion.div
      style={{
        scale,
        top: `calc(50vh - 160px + ${index * 28}px)`,
        boxShadow: "0 4px 30px rgba(9, 9, 11, 0.04)"
      }}
      className="sticky w-full bg-white border border-whisper-border p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-[35vh] last:mb-0"
    >
      <div className="space-y-4 max-w-xl">
        <span className="font-serif text-4xl font-light text-brunswick/40 italic block">{id}</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal tracking-tight">{title}</h3>
        <p className="text-muted-pine text-sm md:text-base leading-relaxed">{desc}</p>
      </div>

      <div className="w-10 h-10 rounded-full bg-mint-highlight flex items-center justify-center text-brunswick shrink-0 self-end md:self-center">
        <ChevronRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
}



// ===================== MAIN LANDING PAGE =====================
export default function StreetSyncLanding() {
  const [emailInput, setEmailInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  


  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [200, 450], [0, -110]);

  const headlineX = useTransform(heroScroll, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  
  const phoneRotateY = useTransform(heroScroll, [0, 1], [0, -25]);
  const phoneRotateX = useTransform(heroScroll, [0, 1], [0, 12]);
  const phoneY = useTransform(heroScroll, [0, 1], [0, 40]);
  const phoneX = useTransform(heroScroll, [0, 1], [0, 500]);
  const phoneScale = useTransform(heroScroll, [0, 1], [1, 0.9]);
  const phoneOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const bgScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const bgY = useTransform(heroScroll, [0, 1], [0, 80]);
  const bgOpacity = useTransform(heroScroll, [0, 0.8], [0.75, 0]);

  const card1X = useTransform(heroScroll, [0, 1], [0, -60]);
  const card1Y = useTransform(heroScroll, [0, 1], [0, -100]);
  const card2X = useTransform(heroScroll, [0, 1], [0, 60]);
  const card2Y = useTransform(heroScroll, [0, 1], [0, -30]);
  const card3X = useTransform(heroScroll, [0, 1], [0, -40]);
  const card3Y = useTransform(heroScroll, [0, 1], [0, 70]);

  const pipelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pipelineScroll } = useScroll({
    target: pipelineContainerRef,
    offset: ["start start", "end end"]
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");
    setFormSubmitted(true);
  };

  const pipelineSteps = [
    {
      id: "01",
      title: "Proximity-Based Deduplication",
      desc: "A geospatial radius check groups duplicate reports of the same infrastructure issue (within a 15-meter threshold) into a single master ticket, avoiding redundant municipal responses and inbox clutter."
    },
    {
      id: "02",
      title: "Severity & Urgency Scoring",
      desc: "Incoming tickets are prioritized algorithmically based on issue classification, accessibility impact, photo proof presence, and nearby user confirmations. ADA barriers near transit score maximum urgency."
    },
    {
      id: "03",
      title: "Reporter Trust System",
      desc: "Reduces spam with lightweight user reliability scoring. Verified submissions from trusted users receive higher prioritization weight, while invalid flags drop lower down the city's queue."
    },
    {
      id: "04",
      title: "Automated Dispatch & Dashboard",
      desc: "Integrates standard email report dispatches directly to pilot municipality inboxes, backed by a real-time web dashboard for city administrators to sort, monitor, and resolve outstanding issues."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7E6] text-charcoal selection:bg-brunswick/10 overflow-x-clip">
      {/* Top Header Navigation (Sticky + Scroll Exit) */}
      <motion.nav
        style={{ y: navY }}
        className="sticky top-0 w-full bg-[#F4F7E6]/90 backdrop-blur-md border-b border-zinc-200/20 py-6 px-8 flex items-center justify-between z-50 transition-shadow duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brunswick flex items-center justify-center text-white font-serif text-sm font-bold">
            S
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-charcoal">StreetSync</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-charcoal/80">
          <a href="#residents" className="hover:text-charcoal transition-custom">Residents</a>
          <a href="#pipeline" className="hover:text-charcoal transition-custom">Government Pipeline</a>
          <a href="#impact" className="hover:text-charcoal transition-custom">Case Study</a>
        </div>

        <div>
          <a
            href="#pilot"
            className="inline-flex items-center bg-[#D2D6F2] text-charcoal px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#C2C6E5] transition-custom hover-lift hover-sink"
          >
            Try now
          </a>
        </div>
      </motion.nav>

      {/* Hero Section styled exactly like Life Track */}
      <section ref={heroRef} className="relative min-h-[calc(100dvh-88px)] bg-[#F4F7E6] pt-16 pb-20 px-8 md:px-16 flex items-center overflow-hidden">
        
        {/* Soft green backdrop circle behind mockup (Parallax motion) */}
        <motion.div
          style={{ scale: bgScale, y: bgY, opacity: bgOpacity }}
          className="absolute right-[-10%] top-[10%] w-[650px] h-[650px] rounded-full bg-[#E6EBD1] blur-3xl -z-10 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left Text */}
          <motion.div style={{ x: headlineX, opacity: headlineOpacity }} className="lg:col-span-7 flex flex-col justify-center">
            
            <h1 className="font-sans text-5xl md:text-[5.25rem] font-bold tracking-tight text-charcoal leading-[1.05] mb-8">
              Your neighborhood<br />is under control
            </h1>
            
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-10 max-w-xl">
              Report critical infrastructure failures instantly using speech-to-text, background GPS telemetry, and automatic image analysis. Customize reports, stay in control of your neighborhood.
            </p>

            {/* Apple & Play Store Badges */}
            <div className="flex flex-wrap gap-4">
              <a href="#download" className="bg-black hover:bg-zinc-900 text-white rounded-xl px-5 py-3.5 flex items-center gap-3 transition-custom hover-lift hover-sink">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M18.71,19.5 C17.88,20.74 17,21.95 15.66,21.97 C14.32,22 13.89,21.18 12.37,21.18 C10.84,21.18 10.37,21.95 9.1,22 C7.79,22.05 6.8,20.68 5.96,19.47 C4.25,17 2.94,12.45 4.7,9.39 C5.57,7.87 7.13,6.91 8.82,6.88 C10.1,6.85 11.32,7.75 12.11,7.75 C12.89,7.75 14.37,6.68 15.92,6.84 C16.57,6.87 18.39,7.1 19.56,8.82 C19.47,8.88 17.39,10.1 17.41,12.63 C17.44,15.65 20.06,16.66 20.1,16.67 C20.08,16.74 19.67,18.11 18.71,19.5 M15.97,4.17 C16.63,3.37 17.07,2.28 16.95,1 C16,1.04 14.9,1.6 14.24,2.38 C13.68,3.04 13.19,4.14 13.34,5.39 C14.39,5.47 15.4,4.88 15.97,4.17 Z"/>
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[8px] uppercase tracking-wider text-zinc-300 font-semibold">Download on the</p>
                  <p className="text-sm font-bold font-sans">App Store</p>
                </div>
              </a>

              <a href="#download" className="bg-black hover:bg-zinc-900 text-white rounded-xl px-5 py-3.5 flex items-center gap-3 transition-custom hover-lift hover-sink">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M5,3.06C4.8,3.26 4.67,3.6 4.67,4.06V19.94C4.67,20.4 4.8,20.74 5,20.94L5.07,21L14.6,11.47V11.33L5.07,3L5,3.06M17.81,14.68L15.11,11.98V11.83L17.82,11.13L21,12.95C21.91,13.47 21.91,14.33 21,14.85L17.81,14.68M5.72,21.62L15.11,12.23L17.82,14.94L5.72,21.62M5.72,2.38L17.82,9.06L15.11,11.77L5.72,2.38Z"/>
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[8px] uppercase tracking-wider text-zinc-300 font-semibold">GET IT ON</p>
                  <p className="text-sm font-bold font-sans">Google Play</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Phone Mockup (Silver Device, Zero Marketing Badges) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Magnetic Mockup Element (Slides, rotates, and fades out on scroll) */}
            <motion.div style={{ rotateY: phoneRotateY, rotateX: phoneRotateX, y: phoneY, x: phoneX, scale: phoneScale, opacity: phoneOpacity }} className="z-10">
              <Magnet strength={5}>
                {/* Silver Bezel iPhone container */}
                <div className="relative w-[320px] h-[650px] bg-[#EAEAEA] rounded-[48px] p-2.5 shadow-2xl border-4 border-[#CCCCCC] overflow-hidden">
                  
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-zinc-900 rounded-full ml-auto mr-4" />
                  </div>

                  {/* Internal Screen Content */}
                  <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col pt-8 px-4 pb-4">
                    
                    {/* Simulated App Header */}
                    <div className="flex items-center justify-between border-b border-whisper-border pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-brunswick flex items-center justify-center text-white text-xs font-serif font-bold">S</div>
                        <span className="text-xs font-bold tracking-tight">StreetSync</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] bg-mint-highlight text-brunswick font-mono px-2 py-0.5 rounded-full font-semibold">
                        <span className="w-1.5 h-1.5 bg-brunswick rounded-full animate-pulse" />
                        PILOT ACTIVE
                      </div>
                    </div>

                    {/* Voice reporting UI */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-wider text-muted-pine uppercase font-mono block">Voice Reporter</span>
                        
                        <div className="bg-[#F4F7E6]/40 border border-whisper-border p-4 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-pine">Live Telemetry</span>
                            <div className="flex items-center gap-1 text-[10px] text-brunswick font-mono">
                              <MapPin className="w-3 h-3" />
                              <span>42.3519° N, 71.0645° W</span>
                            </div>
                          </div>
                          
                          <div className="bg-canvas border border-whisper-border p-3 rounded-xl min-h-[90px] flex items-center justify-center">
                            <p className="text-xs text-charcoal font-medium leading-relaxed italic text-center">
                              "Malfunctioning pedestrian signal at Tremont St and Boylston St. The crosswalk signal is dark and not changing..."
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Active Visualizer Waveform */}
                      <div className="py-6 flex flex-col items-center gap-4">
                        <div className="flex items-end justify-center gap-1.5 h-12 w-full px-8">
                          <span className="w-1 bg-brunswick rounded-full animate-wave-1" />
                          <span className="w-1 bg-brunswick rounded-full animate-wave-2" />
                          <span className="w-1 bg-brunswick rounded-full animate-wave-3" />
                          <span className="w-1 bg-brunswick rounded-full animate-wave-4" />
                          <span className="w-1 bg-brunswick rounded-full animate-wave-5" />
                          <span className="w-1 bg-brunswick rounded-full animate-wave-6" />
                          <span className="w-1 bg-brunswick rounded-full animate-wave-7" />
                        </div>

                        <button
                          role="button"
                          aria-label="Simulate audio recording trigger"
                          className="w-16 h-16 rounded-full bg-brunswick flex items-center justify-center text-white shadow-lg hover:scale-105 transition-custom cursor-pointer active:scale-95 outline-none focus:ring-2 focus:ring-brunswick/50"
                        >
                          <Mic className="w-7 h-7" />
                        </button>
                        
                        <span className="text-xs font-medium text-brunswick animate-pulse">Listening & Transcribing...</span>
                      </div>

                      {/* Emergency Services Disclaimer inside App */}
                      <div className="bg-red-50 border border-red-100 p-2.5 rounded-xl flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-[9px] text-red-700 font-medium leading-tight">
                          This app does not connect to 911 or emergency services.
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </Magnet>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study / Real-World Validation (Scroll-Driven Character Opacity Reveal) */}
      <section id="impact" className="py-24 bg-mint-highlight/20 border-y border-whisper-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="font-serif text-5xl font-light text-brunswick/40 italic block">BOS:311 Analysis</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal">
                Friction is the single biggest barrier to municipal engagement.
              </h2>
              
              {/* Scroll-driven typography reveal */}
              <AnimatedText text="Real-world data from civic systems (like Boston's BOS:311) proves that residents want to improve their communities, but clunky websites and telephone queues prevent it. By offering an accessible mobile interface, app-based reports in Boston skyrocketed from 6% to nearly 30% of all city service requests. Voice-activated reporting solves this effort barrier." />
              
              <div className="pt-4 flex flex-wrap gap-8">
                <div className="space-y-1">
                  <span className="text-3xl font-serif font-bold text-brunswick">5x Growth</span>
                  <p className="text-xs text-muted-pine font-medium uppercase font-mono tracking-wider">In app reporting rates</p>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-serif font-bold text-brunswick">Under 10s</span>
                  <p className="text-xs text-muted-pine font-medium uppercase font-mono tracking-wider">Report submission time</p>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-serif font-bold text-brunswick">15-Meter</span>
                  <p className="text-xs text-muted-pine font-medium uppercase font-mono tracking-wider">Deduplication threshold</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-whisper-border p-8 rounded-3xl shadow-sm space-y-6">
              <span className="text-xs font-mono font-bold text-brunswick tracking-wider uppercase">Why Voice Automation?</span>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint-highlight flex items-center justify-center shrink-0 text-brunswick">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-semibold text-charcoal">No clunky keyboards or portals</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint-highlight flex items-center justify-center shrink-0 text-brunswick">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-semibold text-charcoal">Allows passengers to report safely</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint-highlight flex items-center justify-center shrink-0 text-brunswick">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-semibold text-charcoal">Automatic location pinning</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Two Modes / Workflows - Custom Asymmetric Layout */}
      <section id="residents" className="py-32 px-6 max-w-7xl mx-auto border-t border-whisper-border">
        <div className="max-w-3xl mb-24">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-none text-charcoal">
            Choose the mode that fits your context
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Mode 1: Voice Activated (Left Column - Spans 5) */}
          <div className="lg:col-span-5 space-y-8 group">
            <div className="space-y-4">
              <div className="font-serif text-5xl font-light text-brunswick/40 italic">01</div>
              <h3 className="text-3xl font-serif font-bold text-charcoal leading-tight">
                Voice-Activated Reporting
              </h3>
              <p className="text-muted-pine text-base leading-relaxed">
                Designed for commuters, transit passengers, or stationary observers. Minimizes cognitive load with native voice activation and a large tap-to-record interface. It automatically gathers background GPS coordinates and structures spoken reports using speech-to-text API processing.
              </p>
            </div>
            
            {/* Visual Telemetry Demo block */}
            <div className="bg-white border border-whisper-border p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-custom">
              <div className="flex justify-between items-center text-xs font-mono text-muted-pine">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                  Live Audio Capture
                </span>
                <span>Active Telemetry</span>
              </div>
              <div className="h-1 bg-canvas rounded-full overflow-hidden">
                <div className="h-full bg-brunswick w-1/3 rounded-full animate-pulse" />
              </div>
              <p className="text-xs font-mono text-charcoal bg-canvas p-3 rounded-lg leading-relaxed">
                TRANSCRIPTION: "Pothole detected on right lane of Huntington Ave near..."
              </p>
            </div>
          </div>

          {/* Mode 2: Community Walking Mode (Right Column - Spans 7 - Offset downwards) */}
          <div className="lg:col-span-7 space-y-8 lg:pt-24 group">
            <div className="space-y-4">
              <div className="font-serif text-5xl font-light text-brunswick/40 italic">02</div>
              <h3 className="text-3xl font-serif font-bold text-charcoal leading-tight">
                Community Walking Mode
              </h3>
              <p className="text-muted-pine text-base leading-relaxed">
                For pedestrians and neighborhood advocates tracking accessibility (ADA) and environmental concerns. Residents easily take photos of physical hazards, identify mobility barriers, and route the visual evidence directly through visual processing algorithms.
              </p>
            </div>

            {/* Visual Photo Upload Demo block */}
            <div className="bg-mint-highlight/20 border border-brunswick/10 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center shadow-sm">
              <div className="w-full md:w-48 aspect-video md:aspect-square bg-white border border-whisper-border rounded-2xl flex items-center justify-center text-muted-pine shrink-0 relative overflow-hidden">
                {/* Camera Viewfinder HUD Overlay */}
                <div className="absolute inset-3 border border-brunswick/5 rounded-lg overflow-hidden pointer-events-none">
                  {/* Corners */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-brunswick/40" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-brunswick/40" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-brunswick/40" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-brunswick/40" />
                  
                  {/* Reticle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-brunswick/20 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-brunswick/40 rounded-full" />
                  </div>
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex justify-between px-[33%] pointer-events-none opacity-5">
                    <div className="w-px h-full bg-charcoal" />
                    <div className="w-px h-full bg-charcoal" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between py-[33%] pointer-events-none opacity-5">
                    <div className="w-full h-px bg-charcoal" />
                    <div className="w-full h-px bg-charcoal" />
                  </div>

                  {/* Camera Telemetry */}
                  <span className="absolute bottom-2 left-2.5 text-[8px] font-mono text-brunswick/50 tracking-wider">EV +0.0</span>
                  <span className="absolute bottom-2 right-2.5 text-[8px] font-mono text-brunswick/50 tracking-wider">ISO 64</span>
                </div>
                <div className="w-full h-full bg-[radial-gradient(rgba(27,77,62,0.1)_1.5px,transparent_1.5px)] [background-size:16px_16px] flex items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-muted-pine/60 z-10 bg-white px-2.5 py-1 rounded border border-whisper-border">CAMERA READY</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="inline-flex text-[10px] font-bold font-mono tracking-widest bg-brunswick text-white px-2 py-0.5 rounded uppercase">
                  ADA Barrier Detected
                </div>
                <h4 className="text-sm font-bold text-charcoal">Broken curb ramp at 42.3486° N</h4>
                <p className="text-xs text-muted-pine leading-relaxed">
                  Visual analysis tags matching: Curb damage, Mobility hazard, Public Works. Priority elevated.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Government Pipeline Section - Interactive Sticky-Stacking Cards */}
      <section id="pipeline" ref={pipelineContainerRef} className="relative py-32 bg-charcoal text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column (Sticky Heading - Vertically Centered in Viewport) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:sticky lg:top-0 lg:h-screen">
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-none">
              Backend Municipal Intelligence
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              StreetSync formats citizen submissions into prioritized, high-signal actionable items for municipalities.
            </p>
            <div className="pt-6">
              <a
                href="#pilot"
                className="inline-flex items-center gap-2 bg-mint-highlight text-brunswick px-6 py-3 rounded-xl text-sm font-semibold hover:bg-mint-highlight/90 transition-custom w-fit"
              >
                Join Municipal Pilot
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column (Sticky Stacking Cards Deck) */}
          <div className="lg:col-span-7 relative pb-[10vh]">
            {pipelineSteps.map((step, idx) => (
              <StackingCard
                key={step.id}
                id={step.id}
                title={step.title}
                desc={step.desc}
                index={idx}
                progress={pipelineScroll}
                total={pipelineSteps.length}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Request Pilot Form Section */}
      <section id="pilot" className="py-28 px-6 bg-canvas flex justify-center">
        <div className="max-w-3xl w-full text-center space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-brunswick tracking-wider uppercase block">Get Started</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal">
              Empower your community with StreetSync
            </h2>
            <p className="text-muted-pine text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Ready to reduce barriers to civic engagement in your pilot city? Join our pilot municipal program to receive a dedicated dashboard and inbox routing.
            </p>
          </div>

          <div className="bg-white border border-whisper-border p-8 md:p-10 rounded-[32px] shadow-sm text-left">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-muted-pine tracking-wider uppercase font-mono">
                    Municipality Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. administrator@boston.gov"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-canvas border border-whisper-border p-4 rounded-xl text-charcoal text-sm outline-none focus:border-brunswick transition-custom"
                  />
                  {formError && (
                    <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formError}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-brunswick text-white py-4 rounded-xl font-semibold hover:bg-brunswick/95 transition-custom hover-lift hover-sink"
                >
                  Request Pilot Access
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-mint-highlight flex items-center justify-center text-brunswick mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal">Request Submitted</h3>
                <p className="text-sm text-muted-pine max-w-sm mx-auto">
                  Thank you! We've received your pilot request for <strong>{emailInput}</strong>. Our team will reach out with dashboard access credentials.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer & Emergency Services Disclaimer */}
      <footer id="download" className="bg-canvas border-t border-whisper-border/50 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-whisper-border/40">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brunswick flex items-center justify-center text-white font-serif text-sm font-bold">S</div>
                <span className="font-serif text-lg font-bold">StreetSync</span>
              </div>
              <p className="text-xs text-muted-pine">
                2026 Congressional App Challenge entry. Built for neighborhood advocates and municipal administrators.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-charcoal text-white inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-custom hover-lift hover-sink">
                Download for iOS
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </button>
              <button className="border border-whisper-border bg-white text-charcoal inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-semibold hover:bg-canvas transition-custom hover-lift hover-sink">
                Download for Android
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </button>
            </div>
          </div>

          {/* Legal / ADA / Non-Emergency Disclaimer */}
          <div className="p-6 bg-red-50/60 border border-red-100 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center text-red-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-800 uppercase font-mono tracking-wider">Emergency Services Disclaimer</span>
                <p className="text-xs font-semibold text-red-700 leading-normal max-w-3xl">
                  StreetSync is strictly intended for non-emergency public works reporting. This application does not connect to 911, dispatch emergency services, or resolve life-threatening crises.
                </p>
              </div>
            </div>
            
            <span className="text-[10px] font-bold text-red-800/60 font-mono shrink-0 select-none border border-red-200/50 px-3 py-1.5 rounded-lg bg-red-100/30 uppercase">
              Non-Emergency Only
            </span>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-pine gap-4 pt-2">
            <span>© 2026 StreetSync. Developed by Aarav Garg, Krish Sinha, and Rithvik Penmetsa.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
