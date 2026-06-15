"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MapPin,
  Camera,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  FileText,
  Navigation,
  Accessibility,
  Flame,
  Mail,
  Layers,
  Activity
} from "lucide-react";

const BASE_LAT = 42.3601;
const BASE_LNG = -71.0589;

interface Report {
  id: string;
  category: string;
  desc: string;
  lat: number;
  lng: number;
  time: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  trustScore: number;
  status: "Pending" | "Dispatched" | "Resolved";
  duplicates: number;
  ada?: boolean;
}

export default function StreetSyncLanding() {
  const [activeMode, setActiveMode] = useState<"voice" | "walking">("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [voiceStep, setVoiceStep] = useState(0);

  const [gridReports, setGridReports] = useState<Report[]>([
    {
      id: "1",
      category: "Roadway Hazard",
      desc: "Deep pothole middle lane",
      lat: BASE_LAT + 0.0001,
      lng: BASE_LNG - 0.0001,
      time: "2 mins ago",
      severity: "Medium",
      trustScore: 88,
      status: "Pending",
      duplicates: 0,
    },
  ]);
  const [duplicateMessage, setDuplicateMessage] = useState<string | null>(null);

  const [reporterTrust, setReporterTrust] = useState(75);
  const [verificationHistory] = useState([
    { task: "Pothole at Main St", impact: "Confirmed by 4 peers", change: "+5" },
    { task: "Trash Pile on 3rd Ave", impact: "Resolved & validated", change: "+10" },
    { task: "Duplicate spam filter check", impact: "Spam submission flag", change: "-15" },
  ]);

  const [activeFilter, setActiveFilter] = useState<"All" | "Critical" | "Resolved">("All");
  const [municipalReports, setMunicipalReports] = useState<Report[]>([
    {
      id: "101",
      category: "Accessibility (ADA)",
      desc: "Blocked wheelchair ramp at train exit",
      lat: BASE_LAT + 0.0012,
      lng: BASE_LNG - 0.0008,
      time: "5m ago",
      severity: "Critical",
      trustScore: 95,
      status: "Dispatched",
      duplicates: 3,
      ada: true,
    },
    {
      id: "102",
      category: "Public Works",
      desc: "Traffic signal signal blackout main intersection",
      lat: BASE_LAT - 0.0005,
      lng: BASE_LNG + 0.0011,
      time: "12m ago",
      severity: "High",
      trustScore: 82,
      status: "Dispatched",
      duplicates: 1,
    },
    {
      id: "103",
      category: "Environmental",
      desc: "Illegal appliance dump on curbside sidewalk",
      lat: BASE_LAT + 0.002,
      lng: BASE_LNG - 0.0015,
      time: "45m ago",
      severity: "Medium",
      trustScore: 90,
      status: "Pending",
      duplicates: 0,
    },
    {
      id: "104",
      category: "Graffiti",
      desc: "Spray paint on community garden fence",
      lat: BASE_LAT - 0.0022,
      lng: BASE_LNG - 0.002,
      time: "2h ago",
      severity: "Low",
      trustScore: 60,
      status: "Resolved",
      duplicates: 0,
    },
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      setVoiceStep(1);
      setVoiceText("");
      const transcriptText = "Deep roadway pothole detected blocking right-hand transit lane near Main crossing.";
      let index = 0;
      
      timer = setInterval(() => {
        if (index < transcriptText.length) {
          setVoiceText((prev) => prev + transcriptText.charAt(index));
          index++;
        } else {
          clearInterval(timer);
          setIsRecording(false);
          setVoiceStep(2);
        }
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleResetVoice = () => {
    setIsRecording(false);
    setVoiceText("");
    setVoiceStep(0);
  };

  const handleAddGridReport = (offsetLat: number, offsetLng: number) => {
    const DUP_LIMIT = 0.00015;
    const duplicate = gridReports.find((r) => {
      const latDiff = Math.abs(r.lat - (BASE_LAT + offsetLat));
      const lngDiff = Math.abs(r.lng - (BASE_LNG + offsetLng));
      return latDiff < DUP_LIMIT && lngDiff < DUP_LIMIT;
    });

    if (duplicate) {
      setGridReports(
        gridReports.map((r) =>
          r.id === duplicate.id ? { ...r, duplicates: r.duplicates + 1 } : r
        )
      );
      setDuplicateMessage(
        `Geospatial match: New report within 15m radius clustered into active ID #${duplicate.id}.`
      );
      setTimeout(() => setDuplicateMessage(null), 4000);
    } else {
      const newReport: Report = {
        id: (gridReports.length + 1).toString(),
        category: "Public Works",
        desc: "New infrastructure issue spotted",
        lat: BASE_LAT + offsetLat,
        lng: BASE_LNG + offsetLng,
        time: "Just now",
        severity: "Low",
        trustScore: reporterTrust,
        status: "Pending",
        duplicates: 0,
      };
      setGridReports([...gridReports, newReport]);
    }
  };

  const handleResolveTicket = (id: string) => {
    setMunicipalReports(
      municipalReports.map((r) =>
        r.id === id ? { ...r, status: "Resolved" } : r
      )
    );
  };

  return (
    <div className="min-h-screen text-[oklch(0.20_0.01_240)] bg-[#FAF9F6] font-sans selection:bg-[oklch(0.55_0.14_245)]/10 selection:text-[oklch(0.55_0.14_245)]">
      {/* Editorial layout thin border lines */}
      <div className="fixed inset-0 border-x border-neutral-200/50 max-w-7xl mx-auto pointer-events-none z-50" />

      {/* Header */}
      <header className="border-b border-neutral-200 bg-[#FAF9F6] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[oklch(0.55_0.14_245)] stroke-[2]" />
            <span className="font-display font-bold text-lg tracking-tight uppercase">
              StreetSync
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500">
              <span>Congressional App Challenge</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>2026</span>
            </div>
            <a
              href="#prd"
              className="text-xs font-bold uppercase tracking-wider text-[oklch(0.20_0.01_240)] border-b border-current pb-0.5 hover:text-[oklch(0.55_0.14_245)] transition-colors"
            >
              Specs
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-28 pb-20 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
              // Reimagining Civic Infrastructure
            </div>

            <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] text-[oklch(0.20_0.01_240)]">
              Your community, <br />
              synced in <span className="text-[oklch(0.55_0.14_245)] italic font-light font-serif">one tap.</span>
            </h1>

            <p className="text-lg text-[oklch(0.45_0.01_240)] max-w-[55ch] leading-relaxed font-normal">
              Traditional municipal reporting keeps residents on hold. By replacing legacy hotline queues and clunky web portals with voice automation and smart geospatial telemetry, StreetSync makes civic action effortless.
            </p>

            {/* Structured Stats Table (Replaced Pill Cards) */}
            <div className="border border-neutral-200 bg-white grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 max-w-2xl">
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Legacy Systems</span>
                <div className="text-4xl font-display font-bold text-neutral-800">6%</div>
                <p className="text-xs text-[oklch(0.45_0.01_240)]">Average resident reporting rate in standard municipalities.</p>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">StreetSync MVP</span>
                <div className="text-4xl font-display font-bold text-[oklch(0.55_0.14_245)]">30%</div>
                <p className="text-xs text-[oklch(0.45_0.01_240)]">Active user engagement benchmarks based on automated reporting trials.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a
                href="#demo"
                className="px-6 py-3.5 bg-[oklch(0.55_0.14_245)] text-white text-xs font-bold tracking-wider uppercase hover:bg-[oklch(0.50_0.14_245)] transition-colors shadow-[4px_4px_0px_0px_#1e293b] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1e293b]"
              >
                Launch Simulator
              </a>
              <a
                href="#prd"
                className="px-6 py-3.5 border border-neutral-200 bg-white text-xs font-bold tracking-wider uppercase hover:bg-neutral-50 transition-colors"
              >
                Review Technical PRD
              </a>
            </div>
          </div>

          {/* Telemetry panel - Editorial/Brutalist look */}
          <div className="lg:col-span-4 border border-neutral-200 bg-white p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[oklch(0.55_0.14_245)]" />
                <span className="text-xs font-bold uppercase tracking-wider">Telemetry Dispatch</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[oklch(0.62_0.14_140)]" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Pilot Coordinate Scope</div>
                <div className="text-xs font-bold font-mono">BOSTON_METRO (42.3601, -71.0589)</div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Active Incidents</div>
                
                <div className="p-3 border border-neutral-100 bg-neutral-50 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>ADA Curb Ramp Blockage</span>
                    <span className="text-red-600">CRITICAL</span>
                  </div>
                  <div className="text-[10px] text-neutral-500">Grouped Dispatch (3x confirmations)</div>
                </div>

                <div className="p-3 border border-neutral-100 bg-neutral-50 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Traffic Signal Blackout</span>
                    <span className="text-orange-600">HIGH</span>
                  </div>
                  <div className="text-[10px] text-neutral-500">Dispatched to District 4 Crew</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="demo" className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-200 pb-8">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
                // System Simulator
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                Try the Client Workflows
              </h2>
            </div>
            
            {/* Minimal tab style instead of pill tabs */}
            <div className="flex border border-neutral-200">
              <button
                onClick={() => setActiveMode("voice")}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-r border-neutral-200 last:border-0 ${
                  activeMode === "voice"
                    ? "bg-[oklch(0.55_0.14_245)] text-white"
                    : "bg-[#FAF9F6] text-neutral-600 hover:text-[oklch(0.20_0.01_240)]"
                }`}
              >
                Voice Capture
              </button>
              <button
                onClick={() => setActiveMode("walking")}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeMode === "walking"
                    ? "bg-[oklch(0.55_0.14_245)] text-white"
                    : "bg-[#FAF9F6] text-neutral-600 hover:text-[oklch(0.20_0.01_240)]"
                }`}
              >
                Walking Camera
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            {/* Phone shell redesigned - flat, diagrammatic */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-[300px] h-[550px] border-[2px] border-neutral-800 bg-[#FAF9F6] p-4 relative flex flex-col shadow-[8px_8px_0px_0px_#e5e5e5]">
                {/* Mock status indicator */}
                <div className="flex justify-between items-center text-[9px] font-bold tracking-wider uppercase text-neutral-400 border-b border-neutral-200 pb-2 mb-6">
                  <span>Client v1.2</span>
                  <span className="text-[oklch(0.55_0.14_245)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.14_245)]" />
                    GPS ACTIVE
                  </span>
                </div>

                {activeMode === "voice" ? (
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold text-[oklch(0.55_0.14_245)] uppercase tracking-wider">
                        Passenger Reporting Mode
                      </span>
                      <h3 className="text-base font-bold leading-tight">
                        Tap record & describe issue
                      </h3>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        Automatic voice processing tags coordinates and routes instantly.
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center py-6">
                      {voiceStep === 1 ? (
                        <div className="flex gap-1 items-center h-8 mb-6">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [8, 28, 8] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                              className="w-1 bg-[oklch(0.55_0.14_245)]"
                            />
                          ))}
                        </div>
                      ) : voiceStep === 2 ? (
                        <div className="w-full p-3 border border-neutral-200 bg-white text-[10px] mb-6 space-y-1">
                          <span className="font-bold text-[oklch(0.62_0.14_140)] block">✓ TRANSCRIBED TEXT:</span>
                          <p className="text-neutral-600 italic">"{voiceText}"</p>
                        </div>
                      ) : (
                        <div className="h-12 flex items-center justify-center text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                          Ready to transcribe
                        </div>
                      )}

                      <button
                        onClick={() => {
                          if (voiceStep === 2) {
                            handleResetVoice();
                          } else {
                            setIsRecording(true);
                          }
                        }}
                        disabled={isRecording}
                        className={`w-16 h-16 border-2 border-neutral-800 flex items-center justify-center transition-all ${
                          isRecording
                            ? "bg-red-500 text-white"
                            : voiceStep === 2
                            ? "bg-[oklch(0.62_0.14_140)] text-white"
                            : "bg-white text-neutral-800 hover:bg-neutral-50"
                        } shadow-[4px_4px_0px_0px_#1e293b] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1e293b]`}
                      >
                        {voiceStep === 2 ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Mic className="w-6 h-6" />
                        )}
                      </button>
                    </div>

                    <div className="border-t border-neutral-200 pt-3 text-[9px] font-mono text-neutral-400 space-y-0.5">
                      <div>LAT: {BASE_LAT.toFixed(4)}</div>
                      <div>LNG: {BASE_LNG.toFixed(4)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold text-[oklch(0.55_0.14_245)] uppercase tracking-wider">
                        Pedestrian Walkway Mode
                      </span>
                      <h3 className="text-base font-bold leading-tight">
                        Accessibility & Sidewalk reports
                      </h3>
                    </div>

                    <div className="flex-1 my-4 border border-neutral-200 bg-white relative flex items-center justify-center">
                      <div className="absolute inset-3 border border-dashed border-neutral-200 pointer-events-none" />
                      <div className="text-center p-4">
                        <Accessibility className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 block">
                          Malfunctioning Curb Ramp
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="border border-neutral-200 bg-white px-3 py-2 text-[9px] font-bold text-orange-700 flex justify-between">
                        <span>♿ ADA PRIORITIZED</span>
                        <span>ACTIVE</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation Column */}
            <div className="md:col-span-7 space-y-8">
              {activeMode === "voice" ? (
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-2xl tracking-tight text-[oklch(0.20_0.01_240)]">
                    Mode 1: Voice-Activated Routing
                  </h3>
                  <p className="text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
                    Designed for passengers and commuters, StreetSync leverages a clean voice trigger to capture details instantly. Using a localized speech-to-text API, spoken descriptions are parsed into structured report entries and tagged with live telemetry coords in milliseconds.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex gap-4">
                      <span className="text-xs font-mono font-bold text-[oklch(0.55_0.14_245)]">// 01</span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider">Speech-to-Text Processing</span>
                        <p className="text-xs text-[oklch(0.45_0.01_240)] leading-relaxed">Converts verbal reports directly to dispatch text entries.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xs font-mono font-bold text-[oklch(0.55_0.14_245)]">// 02</span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider">Instant Background Telemetry</span>
                        <p className="text-xs text-[oklch(0.45_0.01_240)] leading-relaxed">Automatically registers GPS coordinates and time signatures.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-2xl tracking-tight text-[oklch(0.20_0.01_240)]">
                    Mode 2: Community Walking Mode
                  </h3>
                  <p className="text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
                    Pedestrians and advocates can document hazards like blocked accessibility ramps or environmental issues. Using streamlined classification models, reports are automatically binned into city triage categories.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="flex gap-4">
                      <span className="text-xs font-mono font-bold text-[oklch(0.55_0.14_245)]">// 01</span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider">ADA Accessibility Priority</span>
                        <p className="text-xs text-[oklch(0.45_0.01_240)] leading-relaxed">Flags blockages on wheelchair ramps or crosswalk signals for immediate city resolution.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xs font-mono font-bold text-[oklch(0.55_0.14_245)]">// 02</span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider">Visual Verification Capture</span>
                        <p className="text-xs text-[oklch(0.45_0.01_240)] leading-relaxed">Leverages image analysis classification to expedite ticket routing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Triage & Pipeline Section */}
      <section className="py-20 max-w-7xl mx-auto px-8 space-y-24">
        {/* Proximity Deduplication */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
              // Backend Clustering
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Proximity-Based Deduplication
            </h2>
            <p className="text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
              Legacies receive dozens of identical tickets for a single road hazard, overwhelming municipal databases. StreetSync processes coordinates via a geospatial radius check. Any new entry within a **15-meter radius** automatically clusters into the master ticket.
            </p>

            <div className="p-4 border border-neutral-200 bg-white text-xs font-medium space-y-1">
              <span className="font-bold text-[oklch(0.55_0.14_245)]">// INTERACTIVE SANDBOX</span>
              <p>Click on the grid to drop a pin. Placing pins close to one another clusters them into a single report, increasing the ticket priority multiplier.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                <span>Deduplication Map View</span>
                <span>Radius: 15m</span>
              </div>

              {/* Map grid mockup */}
              <div 
                className="w-full h-44 bg-neutral-50 border border-neutral-200 relative overflow-hidden cursor-crosshair"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  handleAddGridReport(y * 0.001, x * 0.001);
                }}
              >
                {gridReports.map((r) => (
                  <div
                    key={r.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${(r.lng - BASE_LNG) * 1000 * 50}px)`,
                      top: `calc(50% + ${(r.lat - BASE_LAT) * 1000 * 50}px)`,
                    }}
                  >
                    <div className="relative -left-2.5 -top-2.5">
                      <div className="absolute w-8 h-8 -left-1.5 -top-1.5 rounded-full bg-[oklch(0.55_0.14_245)]/10 animate-ping" />
                      <div className="w-5 h-5 bg-[oklch(0.55_0.14_245)] text-white flex items-center justify-center text-[9px] font-bold border border-white">
                        {r.duplicates > 0 ? `+${r.duplicates}` : "📍"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {duplicateMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 border border-orange-200 bg-orange-50 text-orange-800 text-[10px] font-bold"
                  >
                    {duplicateMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Master Logs</span>
                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {gridReports.map((r) => (
                    <div key={r.id} className="flex justify-between items-center text-[10px] p-2 bg-neutral-50 border border-neutral-200 font-mono">
                      <span>ID-{r.id} | {r.category}</span>
                      <span className="font-bold text-[oklch(0.55_0.14_245)]">{r.duplicates + 1} CONFIRMATIONS</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Severity scoring and trust scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="border border-neutral-200 bg-white p-8 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
              // Priority Triage
            </div>
            <h3 className="font-display font-bold text-2xl">
              Urgency & Severity Score Matrix
            </h3>
            <p className="text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
              Each report is dynamically scored based on parameters including ADA accessibility constraints, duplicates confirmed, and location criticality.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 border border-neutral-200 bg-neutral-50 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">Critical</span>
                  <span className="text-xs font-bold block">Blocked Wheelchair Ramp (ADA)</span>
                </div>
                <span className="font-mono text-xs font-bold">Priority Score: 98</span>
              </div>

              <div className="p-4 border border-neutral-200 bg-neutral-50 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-600 tracking-wider">High</span>
                  <span className="text-xs font-bold block">Commuter Arterial Traffic Outage</span>
                </div>
                <span className="font-mono text-xs font-bold">Priority Score: 82</span>
              </div>

              <div className="p-4 border border-neutral-200 bg-neutral-50 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Low</span>
                  <span className="text-xs font-bold block">Aesthetic Graffiti Compliant</span>
                </div>
                <span className="font-mono text-xs font-bold">Priority Score: 24</span>
              </div>
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
                // Anti-Spam Filtering
              </div>
              <h3 className="font-display font-bold text-2xl">
                Reporter Trust Scores
              </h3>
              <p className="text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
                Calculates trust multipliers based on verification rates and confirmations. High-trust user reports bypass administrative holds.
              </p>

              <div className="space-y-3 p-4 border border-neutral-200 bg-neutral-50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold">Trust Multiplier Weight</span>
                  <span className="font-mono font-bold text-[oklch(0.55_0.14_245)]">{reporterTrust}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reporterTrust}
                  onChange={(e) => setReporterTrust(parseInt(e.target.value))}
                  className="w-full accent-[oklch(0.55_0.14_245)] cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block">Audit History</span>
              {verificationHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-neutral-500">{item.task} ({item.impact})</span>
                  <span className={`font-bold ${item.change.startsWith("+") ? "text-[oklch(0.62_0.14_140)]" : "text-red-600"}`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Admin Section */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-8 space-y-12">
          <div className="space-y-4 max-w-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
              // Control Center
            </div>
            <h2 className="font-display font-bold text-3xl">
              Automated Dispatch Dashboard
            </h2>
            <p className="text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
              Provides municipal work crews with a centralized hub, prioritizing incoming clustered tickets and streamlining city resource management.
            </p>
          </div>

          {/* Table Redesigned - Clean borders, raw typography, no rounded grids */}
          <div className="border border-neutral-200 bg-white">
            <div className="px-6 py-4 border-b border-neutral-200 bg-[#FAF9F6] flex flex-wrap justify-between items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider">Boston Active Triage Logs</span>
              <div className="flex border border-neutral-200">
                {["All", "Critical", "Resolved"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f as any)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors border-r border-neutral-200 last:border-0 ${
                      activeFilter === f
                        ? "bg-[oklch(0.55_0.14_245)] text-white"
                        : "bg-white text-neutral-600 hover:text-[oklch(0.20_0.01_240)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-center">Clustered Reports</th>
                    <th className="px-6 py-3 text-center">Urgency</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {municipalReports
                    .filter((r) => {
                      if (activeFilter === "Critical") return r.severity === "Critical";
                      if (activeFilter === "Resolved") return r.status === "Resolved";
                      return true;
                    })
                    .map((r) => (
                      <tr key={r.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold">
                          {r.ada && <span className="mr-1">♿</span>}
                          {r.category}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">{r.desc}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2 py-0.5 border border-neutral-200 text-[9px] font-mono">
                            {r.duplicates} grouped
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                              r.severity === "Critical"
                                ? "border-red-300 bg-red-50 text-red-700"
                                : r.severity === "High"
                                ? "border-orange-300 bg-orange-50 text-orange-700"
                                : "border-blue-300 bg-blue-50 text-blue-700"
                            }`}
                          >
                            {r.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold">
                          <span
                            className={`${
                              r.status === "Resolved"
                                ? "text-[oklch(0.62_0.14_140)]"
                                : r.status === "Dispatched"
                                ? "text-blue-600"
                                : "text-orange-600"
                            }`}
                          >
                            // {r.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {r.status !== "Resolved" ? (
                            <button
                              onClick={() => handleResolveTicket(r.id)}
                              className="px-3 py-1 border border-neutral-800 text-[10px] font-bold uppercase hover:bg-neutral-50 transition-colors"
                            >
                              Resolve
                            </button>
                          ) : (
                            <span className="text-neutral-400 font-bold uppercase tracking-wider">Archived</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* PRD & Authors */}
      <section id="prd" className="py-20 max-w-7xl mx-auto px-8 border-t border-neutral-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.14_245)]">
              // PRD Outline
            </div>
            <h2 className="font-display font-bold text-3xl">
              MVP Functional Requirements
            </h2>

            <div className="space-y-6 text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
              <div className="space-y-1">
                <h4 className="font-bold text-[oklch(0.20_0.01_240)]">1. Voice-Activated Reporting (Hands-Free/Passenger)</h4>
                <p>Simplified voice triggers or large single-tap interfaces minimize passenger interaction time. Integrated speech-to-text API transcribes issues, automatically appending location telemetry.</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-[oklch(0.20_0.01_240)]">2. Community Mode (Stationary/Pedestrian)</h4>
                <p>Enables photo capture and image classification matching city database tags. Provides targeted ADA categories (broken sidewalks, blocked access points) with emergency-bypassing priority routes.</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-[oklch(0.20_0.01_240)]">3. Backend Logic Pipeline</h4>
                <p>Consolidates tickets within 15 meters. Manages reporter reliability scoring metrics based on confirmation accuracy. Formats structured notifications to simulated municipal inboxes.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 border border-neutral-200 bg-white p-8 space-y-6 shadow-sm">
            <span className="text-[10px] font-bold text-[oklch(0.55_0.14_245)] uppercase tracking-wider block">
              CAC Submission Details
            </span>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Project ID</span>
                <span className="font-bold text-sm">StreetSync MVP</span>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Event target</span>
                <span className="font-bold text-sm">2026 Congressional App Challenge</span>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Authors</span>
                <div className="space-y-1 mt-2 font-mono font-bold text-neutral-800">
                  <div>// Aarav Garg</div>
                  <div>// Krish Sinha</div>
                  <div>// Rithvik Penmetsa</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 text-[10px] text-neutral-400 leading-relaxed">
              ⚠️ <strong>Emergency Notice:</strong> StreetSync is intended solely for non-emergency public works reporting. It does not connect to 911 or emergency services.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} StreetSync. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-[oklch(0.55_0.14_245)]" /> pilot-inbox@streetsync.gov
          </span>
        </div>
      </footer>
    </div>
  );
}
