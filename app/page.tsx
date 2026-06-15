"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Filter,
  FileText,
  Navigation,
  Accessibility,
  Flame,
  Mail,
  Layers,
  Activity,
  Plus
} from "lucide-react";

// Mock coordinate presets for pilot municipality
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
  image?: string;
  ada?: boolean;
}

export default function StreetSyncLanding() {
  // Simulator state
  const [activeMode, setActiveMode] = useState<"voice" | "walking">("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [voiceStep, setVoiceStep] = useState(0); // 0: Idle, 1: Transcribing, 2: Done

  // Geospatial deduplication state
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

  // Trust score demo state
  const [reporterTrust, setReporterTrust] = useState(75);
  const [verificationHistory, setVerificationHistory] = useState([
    { task: "Pothole at Main St", impact: "Confirmed by 4 peers", change: "+5" },
    { task: "Trash Pile on 3rd Ave", impact: "Resolved & validated", change: "+10" },
    { task: "Duplicate spam filter check", impact: "Spam submission flag", change: "-15" },
  ]);

  // Municipal Dashboard State
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

  // Voice transcript simulation loop
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

  // Reset voice simulator
  const handleResetVoice = () => {
    setIsRecording(false);
    setVoiceText("");
    setVoiceStep(0);
  };

  // Add report on grid for duplicate mapping demo
  const handleAddGridReport = (offsetLat: number, offsetLng: number) => {
    // 15 meters in degrees is roughly 0.00013
    const DUP_LIMIT = 0.00015;
    
    // Check if within proximity limit of any existing report
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
        `🚨 Geospatial match! New report within 15m radius clustered into active ID #${duplicate.id}.`
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

  // Resolve a ticket on Admin Dashboard
  const handleResolveTicket = (id: string) => {
    setMunicipalReports(
      municipalReports.map((r) =>
        r.id === id ? { ...r, status: "Resolved" } : r
      )
    );
  };

  return (
    <div className="min-h-screen relative font-sans text-[oklch(0.20_0.01_240)] antialiased bg-[oklch(0.99_0.003_70)] overflow-x-hidden selection:bg-[oklch(0.55_0.14_245)]/20 selection:text-[oklch(0.55_0.14_245)]">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60" />

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-[oklch(0.91_0.005_70)] bg-[oklch(0.99_0.003_70)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.55_0.14_245)] flex items-center justify-center text-white shadow-sm shadow-[oklch(0.55_0.14_245)]/20">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-[oklch(0.20_0.01_240)]">
              StreetSync
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-700 border border-orange-200">
              <Flame className="w-3.5 h-3.5 fill-orange-700" />
              Congressional App Challenge 2026
            </span>
            <a
              href="#prd"
              className="text-xs font-medium text-[oklch(0.45_0.01_240)] hover:text-[oklch(0.20_0.01_240)] transition-colors"
            >
              Specifications
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[oklch(0.55_0.14_245)]/10 text-[oklch(0.55_0.14_245)] border border-[oklch(0.55_0.14_245)]/20">
              <span>Next-Gen Civic Action Platform</span>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight leading-[1.05] text-[oklch(0.20_0.01_240)] max-w-[18ch]">
              Your community, synced in <span className="text-[oklch(0.55_0.14_245)]">one tap.</span>
            </h1>

            <p className="text-lg text-[oklch(0.45_0.01_240)] max-w-[55ch] leading-relaxed">
              Traditional city hotlines keep residents on hold, and clunky web portals discourage reporting. 
              <strong> StreetSync</strong> solves this friction using native voice automation, automated telemetry, and 
              geospatial sorting.
            </p>

            {/* Metrics Callout */}
            <div className="p-5 rounded-2xl bg-white border border-[oklch(0.91_0.005_70)] flex flex-col sm:flex-row gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[oklch(0.91_0.005_70)] shadow-xs">
              <div className="flex-1 space-y-1">
                <span className="text-xs font-semibold text-[oklch(0.45_0.01_240)] uppercase tracking-wider block">Traditional System</span>
                <span className="text-3xl font-display font-bold text-red-600 block">6%</span>
                <span className="text-xs text-[oklch(0.45_0.01_240)] block">Average city report submission rate</span>
              </div>
              <div className="flex-1 sm:pl-6 space-y-1">
                <span className="text-xs font-semibold text-[oklch(0.55_0.14_245)] uppercase tracking-wider block">With StreetSync</span>
                <span className="text-3xl font-display font-bold text-[oklch(0.62_0.14_140)] block">30%</span>
                <span className="text-xs text-[oklch(0.45_0.01_240)] block">Resident participation metrics benchmark</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[oklch(0.55_0.14_245)] text-white text-sm font-semibold hover:bg-[oklch(0.50_0.14_245)] transition-all shadow-xs"
              >
                Try the Simulator <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#prd"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[oklch(0.91_0.005_70)] bg-white text-sm font-semibold hover:bg-[oklch(0.95_0.005_70)] transition-all"
              >
                Read PRD specs
              </a>
            </div>
          </div>

          {/* Hero Feature Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 rounded-3xl bg-white border border-[oklch(0.91_0.005_70)] shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.55_0.14_245)]/5 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-[oklch(0.91_0.005_70)] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[oklch(0.55_0.14_245)]" />
                  <span className="text-xs font-semibold text-[oklch(0.20_0.01_240)] uppercase tracking-wider">Live System Telemetry</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.62_0.14_140)] animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[oklch(0.99_0.003_70)] border border-[oklch(0.91_0.005_70)] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[oklch(0.45_0.01_240)]">Active Pilot Municipality</span>
                    <span className="font-semibold text-[oklch(0.20_0.01_240)]">Boston (Hardcoded MVP)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[oklch(0.45_0.01_240)]">Response Dispatch Rate</span>
                    <span className="font-semibold text-[oklch(0.62_0.14_140)]">94.8% resolved</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold text-[oklch(0.45_0.01_240)] uppercase tracking-wider">Recent Dispatches</div>
                  
                  <div className="flex gap-3 items-center text-xs">
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">C</div>
                    <div className="flex-1">
                      <div className="font-medium text-[oklch(0.20_0.01_240)]">Blocked ADA Curb Ramp</div>
                      <div className="text-[oklch(0.45_0.01_240)]">Priority Critical • Grouped (3x reports)</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center text-xs">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">H</div>
                    <div className="flex-1">
                      <div className="font-medium text-[oklch(0.20_0.01_240)]">Broken Signal Light</div>
                      <div className="text-[oklch(0.45_0.01_240)]">Priority High • Dispatched to local crew</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section (Interactive Demo) */}
      <section id="demo" className="py-20 bg-white border-y border-[oklch(0.91_0.005_70)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-[oklch(0.20_0.01_240)]">
              Interactive App Simulator
            </h2>
            <p className="text-[oklch(0.45_0.01_240)] max-w-xl mx-auto">
              Toggle between the two primary mobile reporting workflows built into the StreetSync client application.
            </p>

            {/* Mode selector tab */}
            <div className="inline-flex p-1 rounded-xl bg-[oklch(0.95_0.005_70)] border border-[oklch(0.91_0.005_70)]">
              <button
                onClick={() => setActiveMode("voice")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === "voice"
                    ? "bg-white text-[oklch(0.55_0.14_245)] shadow-xs"
                    : "text-[oklch(0.45_0.01_240)] hover:text-[oklch(0.20_0.01_240)]"
                }`}
              >
                <Mic className="w-4 h-4" />
                Mode 1: Voice Automation
              </button>
              <button
                onClick={() => setActiveMode("walking")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === "walking"
                    ? "bg-white text-[oklch(0.55_0.14_245)] shadow-xs"
                    : "text-[oklch(0.45_0.01_240)] hover:text-[oklch(0.20_0.01_240)]"
                }`}
              >
                <Camera className="w-4 h-4" />
                Mode 2: Community Walking
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Phone Shell mockup */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-[300px] h-[580px] rounded-[40px] border-[8px] border-slate-900 bg-slate-950 p-3 shadow-xl relative flex flex-col">
                <div className="w-24 h-4 bg-slate-950 rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">
                  <div className="w-12 h-1 bg-neutral-800 rounded-full" />
                </div>

                {/* Phone screen context */}
                <div className="flex-1 bg-[oklch(0.99_0.003_70)] rounded-[28px] overflow-hidden p-4 relative flex flex-col text-[oklch(0.20_0.01_240)] select-none">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[10px] font-semibold text-[oklch(0.45_0.01_240)] pt-1 mb-6">
                    <span>9:41 AM</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[oklch(0.55_0.14_245)] fill-[oklch(0.55_0.14_245)]/20" />
                      <span>GPS Active</span>
                    </div>
                  </div>

                  {activeMode === "voice" ? (
                    /* Phone Voice Mode UI */
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-[oklch(0.55_0.14_245)] uppercase tracking-wider block">
                          Hands-Free Passenger Mode
                        </span>
                        <h3 className="font-display font-bold text-lg leading-tight">
                          Press & describe the road hazard.
                        </h3>
                        <p className="text-[11px] text-[oklch(0.45_0.01_240)]">
                          Telemetry coordinates and dispatch targets are processed instantly in the background.
                        </p>
                      </div>

                      {/* Waveform and Audio text */}
                      <div className="flex-1 flex flex-col justify-center items-center py-6">
                        {voiceStep === 1 ? (
                          <div className="flex gap-1 items-center h-8 mb-4">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ height: [8, 32, 8] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                                className="w-1 bg-[oklch(0.55_0.14_245)] rounded-full"
                              />
                            ))}
                          </div>
                        ) : voiceStep === 2 ? (
                          <div className="w-full p-3 rounded-xl bg-green-50 border border-green-200 text-[11px] mb-4 flex items-start gap-2 animate-fade-in">
                            <CheckCircle className="w-4 h-4 text-[oklch(0.62_0.14_140)] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block text-green-800">Transcription complete</span>
                              <p className="text-green-700 italic">"{voiceText}"</p>
                            </div>
                          </div>
                        ) : (
                          <div className="h-16 flex items-center justify-center text-xs text-[oklch(0.45_0.01_240)]">
                            Tap mic to begin voice capture
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
                          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                            isRecording
                              ? "bg-red-500 text-white animate-pulse"
                              : voiceStep === 2
                              ? "bg-[oklch(0.62_0.14_140)] text-white"
                              : "bg-[oklch(0.55_0.14_245)] text-white hover:scale-105"
                          } shadow-md`}
                        >
                          {voiceStep === 2 ? (
                            <CheckCircle className="w-8 h-8" />
                          ) : (
                            <Mic className="w-8 h-8" />
                          )}
                        </button>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="border-t border-[oklch(0.91_0.005_70)] pt-3 text-[10px] text-[oklch(0.45_0.01_240)] space-y-1">
                        <div className="flex justify-between">
                          <span>LAT:</span>
                          <span className="font-mono font-medium text-[oklch(0.20_0.01_240)]">{BASE_LAT.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>LNG:</span>
                          <span className="font-mono font-medium text-[oklch(0.20_0.01_240)]">{BASE_LNG.toFixed(4)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Phone Walking Mode UI */
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-[oklch(0.55_0.14_245)] uppercase tracking-wider block">
                          Pedestrian Walking Mode
                        </span>
                        <h3 className="font-display font-bold text-lg leading-tight">
                          ADA Barrier & Environment reporting.
                        </h3>
                      </div>

                      {/* Camera viewfinder mockup */}
                      <div className="flex-1 my-4 border border-[oklch(0.91_0.005_70)] rounded-xl overflow-hidden bg-neutral-100 relative flex items-center justify-center">
                        <div className="absolute inset-4 border border-dashed border-neutral-300 rounded-lg pointer-events-none" />
                        <div className="text-center p-4">
                          <Accessibility className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                            Malfunctioning Curb Ramp
                          </span>
                          <span className="text-[9px] text-neutral-400">Target aligned</span>
                        </div>
                      </div>

                      {/* Streamlined categories */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-[oklch(0.45_0.01_240)] uppercase tracking-wider block">
                          Accessibility Flag Checked
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-[9px] font-semibold">
                          <div className="px-2.5 py-1.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-center">
                            ♿ ADA Priority
                          </div>
                          <div className="px-2.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-center">
                            Mobility Barrier
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Explanation Column */}
            <div className="md:col-span-7 space-y-8">
              {activeMode === "voice" ? (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <Mic className="w-3.5 h-3.5" /> Speech-To-Text Pipeline
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[oklch(0.20_0.01_240)]">
                    Voice-Activated Reporting
                  </h3>
                  <p className="text-[oklch(0.45_0.01_240)] leading-relaxed">
                    Designed for passengers and commuters, StreetSync leverages a native hands-free voice trigger to capture details instantly. Using OpenAI's Whisper API, spoken descriptions are parsed into machine-readable text and tagged with real-time GPS coordinates.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <p className="text-xs text-[oklch(0.45_0.01_240)] mt-0.5">
                        <strong>Speech Capture:</strong> High accuracy transcription is processed over cellular links.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <p className="text-xs text-[oklch(0.45_0.01_240)] mt-0.5">
                        <strong>Telemetry Tagging:</strong> Native device sensors record location, altitude, and timestamp metrics.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Camera className="w-3.5 h-3.5" /> Visual & Accessibility Triage
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[oklch(0.20_0.01_240)]">
                    Community Walking Mode
                  </h3>
                  <p className="text-[oklch(0.45_0.01_240)] leading-relaxed">
                    Pedestrians and sidewalk advocates use interactive image capture to tag specific accessibility blockages. Google Cloud Vision parses target images to identify obstacles (wheelchair ramp blockages, broken pavement) and tags it directly.
                  </p>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <p className="text-xs text-[oklch(0.45_0.01_240)] mt-0.5">
                        <strong>ADA Priority Flagging:</strong> Reports tagged with wheel-chair accessibility or pedestrian signal blockages are automatically routed to critical service pipelines.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <p className="text-xs text-[oklch(0.45_0.01_240)] mt-0.5">
                        <strong>Object Detection Triage:</strong> Pre-classifies reports into city agency bins (Public Works, Greenery, Mobility Barriers) instantly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Backend & Smart sorting pipeline (Deduplication / Trust Scores) */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-24">
        {/* Proximity Deduplication */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              <Layers className="w-3.5 h-3.5" /> Smart Geospatial Clustering
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-[oklch(0.20_0.01_240)]">
              Proximity-Based Deduplication
            </h2>
            <p className="text-[oklch(0.45_0.01_240)] leading-relaxed">
              When issues arise on a busy roadway, city halls are typically flooded with identical reports, jamming support databases. StreetSync runs a geospatial radius check. Multiple reports for the same issue within a **15-meter radius** are clustered into a single master ticket, raising its severity multiplier instead of creating duplicate clutter.
            </p>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-xs text-orange-950 font-medium">
              💡 <strong>Try it:</strong> Click anywhere on the map grid mockup to drop a pin. If you drop a pin close to an existing one, watch them cluster.
            </div>
          </div>

          {/* Interactive Map Deduplication Mock */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white border border-[oklch(0.91_0.005_70)] shadow-xs space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold">MVP Deduplication Grid (15m check)</span>
                <span className="font-mono text-neutral-500">Center: Boston, MA</span>
              </div>

              {/* Grid map mockup */}
              <div 
                className="w-full h-48 bg-neutral-100 rounded-xl relative border border-[oklch(0.91_0.005_70)] overflow-hidden cursor-crosshair"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  handleAddGridReport(y * 0.001, x * 0.001);
                }}
              >
                {/* 15m radius overlay on reports */}
                {gridReports.map((r, i) => (
                  <div
                    key={r.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${(r.lng - BASE_LNG) * 1000 * 50}px)`,
                      top: `calc(50% + ${(r.lat - BASE_LAT) * 1000 * 50}px)`,
                    }}
                  >
                    <div className="relative -left-3 -top-3">
                      <div className="absolute w-12 h-12 -left-3 -top-3 rounded-full bg-blue-500/10 animate-ping" />
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                        {r.duplicates > 0 ? `+${r.duplicates}` : "📍"}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 text-white text-[9px] font-mono">
                  Scale: 15m boundary radius shown
                </div>
              </div>

              {/* Alert prompt on merge */}
              <AnimatePresence>
                {duplicateMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3 rounded-lg bg-orange-100 border border-orange-200 text-orange-900 text-xs"
                  >
                    {duplicateMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reports list in mock */}
              <div className="space-y-2 max-h-36 overflow-y-auto pt-2">
                <span className="text-[10px] font-bold text-[oklch(0.45_0.01_240)] uppercase tracking-wider block">Grouped Tickets</span>
                {gridReports.map((r) => (
                  <div key={r.id} className="flex justify-between items-center text-xs p-2 rounded bg-[oklch(0.99_0.003_70)] border border-[oklch(0.91_0.005_70)]">
                    <div>
                      <span className="font-semibold block text-[oklch(0.20_0.01_240)]">ID #{r.id} • {r.category}</span>
                      <span className="text-[10px] text-[oklch(0.45_0.01_240)]">{r.desc}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
                      {r.duplicates + 1} Confirmations
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Severity & Urgency Scoring & Trust Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Severity scoring matrix card */}
          <div className="p-8 rounded-3xl bg-white border border-[oklch(0.91_0.005_70)] space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
              <Flame className="w-3.5 h-3.5" /> Severity & Urgency Matrix
            </div>
            <h3 className="font-display font-bold text-2xl text-[oklch(0.20_0.01_240)]">
              Automated Ticket Prioritization
            </h3>
            <p className="text-[oklch(0.45_0.01_240)] text-sm leading-relaxed">
              StreetSync uses dynamic severity scoring to ensure dispatchers respond to immediate roadway hazards and accessibility issues first, rather than aesthetic complaints.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[oklch(0.99_0.003_70)] border border-l-4 border-red-500 flex justify-between items-start gap-4">
                <div>
                  <span className="font-bold text-xs text-red-800 uppercase tracking-wide block">Priority: Critical</span>
                  <span className="text-xs font-semibold block mt-1">Blocked Wheelchair Ramp (ADA)</span>
                  <p className="text-[10px] text-[oklch(0.45_0.01_240)] mt-0.5">High accessibility penalty score. Dispatched instantly.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">Score: 98/100</span>
              </div>

              <div className="p-4 rounded-xl bg-[oklch(0.99_0.003_70)] border border-l-4 border-orange-500 flex justify-between items-start gap-4">
                <div>
                  <span className="font-bold text-xs text-orange-800 uppercase tracking-wide block">Priority: High</span>
                  <span className="text-xs font-semibold block mt-1">Main St Traffic Light Blackout</span>
                  <p className="text-[10px] text-[oklch(0.45_0.01_240)] mt-0.5">High safety concern, roadway commute artery.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">Score: 82/100</span>
              </div>

              <div className="p-4 rounded-xl bg-[oklch(0.99_0.003_70)] border border-l-4 border-neutral-300 flex justify-between items-start gap-4">
                <div>
                  <span className="font-bold text-xs text-neutral-600 uppercase tracking-wide block">Priority: Low</span>
                  <span className="text-xs font-semibold block mt-1">Minor Graffiti on Park Fence</span>
                  <p className="text-[10px] text-[oklch(0.45_0.01_240)] mt-0.5">Low safety impact, aesthetic concern.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-bold">Score: 24/100</span>
              </div>
            </div>
          </div>

          {/* Reporter Trust Score Demo */}
          <div className="p-8 rounded-3xl bg-white border border-[oklch(0.91_0.005_70)] space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Reliability Analytics
              </div>
              <h3 className="font-display font-bold text-2xl text-[oklch(0.20_0.01_240)]">
                Reporter Trust Scores
              </h3>
              <p className="text-[oklch(0.45_0.01_240)] text-sm leading-relaxed">
                To prevent spam and spoofed locations, the system logs submission health metrics. High-trust reporters (demonstrated by valid photos and verified issues) receive instant dispatch weightings.
              </p>

              {/* Slider simulation */}
              <div className="space-y-3 p-4 rounded-xl bg-[oklch(0.99_0.003_70)] border border-[oklch(0.91_0.005_70)]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Simulated User Trust Score</span>
                  <span className="font-bold text-[oklch(0.55_0.14_245)]">{reporterTrust}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reporterTrust}
                  onChange={(e) => setReporterTrust(parseInt(e.target.value))}
                  className="w-full accent-[oklch(0.55_0.14_245)] cursor-pointer"
                />
                <span className="text-[9px] text-neutral-400 block text-center">
                  Drag the slider to adjust trust impact score.
                </span>
              </div>
            </div>

            {/* Verification log */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[oklch(0.45_0.01_240)] uppercase tracking-wider block">Trust Score Audit Logs</span>
              {verificationHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className="text-[oklch(0.45_0.01_240)]">{item.task} ({item.impact})</span>
                  <span className={`font-bold ${item.change.startsWith("+") ? "text-[oklch(0.62_0.14_140)]" : "text-red-600"}`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Dashboard Triage Section */}
      <section className="py-20 bg-white border-t border-[oklch(0.91_0.005_70)]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
              <Navigation className="w-3.5 h-3.5" /> City Hall Control Room
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-[oklch(0.20_0.01_240)]">
              Automated Dispatch Dashboard
            </h2>
            <p className="text-[oklch(0.45_0.01_240)] text-sm">
              See how city administrators can track reports, sort by severity, view grouped duplicate confirmations, and dispatch repair teams.
            </p>
          </div>

          {/* Full Dashboard Mockup */}
          <div className="max-w-5xl mx-auto rounded-2xl border border-[oklch(0.91_0.005_70)] bg-white overflow-hidden shadow-md">
            {/* Top dashboard header bar */}
            <div className="px-6 py-4 bg-[oklch(0.99_0.003_70)] border-b border-[oklch(0.91_0.005_70)] flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold">Municipality Pipeline: Boston Active Triage</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Operational
                </span>
              </div>
              <div className="flex gap-2">
                {["All", "Critical", "Resolved"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeFilter === f
                        ? "bg-[oklch(0.55_0.14_245)] text-white"
                        : "bg-white border border-[oklch(0.91_0.005_70)] text-[oklch(0.45_0.01_240)] hover:text-[oklch(0.20_0.01_240)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard table body */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[oklch(0.99_0.003_70)] border-b border-[oklch(0.91_0.005_70)] text-[oklch(0.45_0.01_240)] font-semibold uppercase tracking-wider">
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-center">Duplicates</th>
                    <th className="px-6 py-3 text-center">Urgency Rating</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[oklch(0.91_0.005_70)]">
                  {municipalReports
                    .filter((r) => {
                      if (activeFilter === "Critical") return r.severity === "Critical";
                      if (activeFilter === "Resolved") return r.status === "Resolved";
                      return true;
                    })
                    .map((r) => (
                      <tr key={r.id} className="hover:bg-[oklch(0.99_0.003_70)]/50 transition-colors">
                        <td className="px-6 py-4 font-bold flex items-center gap-2">
                          {r.ada && <span className="text-orange-600" title="ADA accessibility priority">♿</span>}
                          {r.category}
                        </td>
                        <td className="px-6 py-4 text-[oklch(0.45_0.01_240)]">{r.desc}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-medium">
                            {r.duplicates} grouped
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                              r.severity === "Critical"
                                ? "bg-red-100 text-red-700"
                                : r.severity === "High"
                                ? "bg-orange-100 text-orange-700"
                                : r.severity === "Medium"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-neutral-100 text-neutral-700"
                            }`}
                          >
                            {r.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${
                              r.status === "Resolved"
                                ? "text-[oklch(0.62_0.14_140)]"
                                : r.status === "Dispatched"
                                ? "text-blue-600 animate-pulse"
                                : "text-orange-600"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {r.status !== "Resolved" ? (
                            <button
                              onClick={() => handleResolveTicket(r.id)}
                              className="px-3 py-1 rounded border border-[oklch(0.62_0.14_140)]/30 hover:bg-[oklch(0.62_0.14_140)]/10 text-[oklch(0.62_0.14_140)] font-semibold transition-all"
                            >
                              Mark Resolved
                            </button>
                          ) : (
                            <span className="text-neutral-400 font-semibold italic">Completed</span>
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

      {/* PRD, Congressional App Challenge & Authors Section */}
      <section id="prd" className="py-20 max-w-7xl mx-auto px-6 border-t border-[oklch(0.91_0.005_70)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* PRD summary */}
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
              <FileText className="w-3.5 h-3.5" /> Product Requirement Document
            </div>
            <h2 className="font-display font-bold text-3xl text-[oklch(0.20_0.01_240)]">
              Product Requirements & MVP Scope
            </h2>

            <div className="space-y-6 text-sm text-[oklch(0.45_0.01_240)] leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-[oklch(0.20_0.01_240)]">1. Vision & Purpose</h4>
                <p>
                  StreetSync reduces the friction of traditional civic hotlines by combining voice automation, background telemetry capture, and accessibility priority tagging to simplify residential issue reporting.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[oklch(0.20_0.01_240)]">2. Backend Logic Specs</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Geospatial radius check:</strong> Groups concurrent reports within a 15-meter boundary limit.</li>
                  <li><strong>Reporter trust scoring:</strong> Calculates user weights based on prior validation accuracy to decrease spam.</li>
                  <li><strong>ADA urgency prioritize:</strong> Flags broken sidewalks, faulty signals, or blocked wheelchair ramps with high priority.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[oklch(0.20_0.01_240)]">3. Technical Architecture Stack</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3 bg-white border border-[oklch(0.91_0.005_70)] rounded-xl">
                    <span className="font-bold text-[oklch(0.20_0.01_240)] text-xs block">Frontend</span>
                    <span className="text-[10px] text-neutral-500">Flutter / React Native</span>
                  </div>
                  <div className="p-3 bg-white border border-[oklch(0.91_0.005_70)] rounded-xl">
                    <span className="font-bold text-[oklch(0.20_0.01_240)] text-xs block">Database</span>
                    <span className="text-[10px] text-neutral-500">Firestore / Storage</span>
                  </div>
                  <div className="p-3 bg-white border border-[oklch(0.91_0.005_70)] rounded-xl">
                    <span className="font-bold text-[oklch(0.20_0.01_240)] text-xs block">Voice-to-Text</span>
                    <span className="text-[10px] text-neutral-500">OpenAI Whisper API</span>
                  </div>
                  <div className="p-3 bg-white border border-[oklch(0.91_0.005_70)] rounded-xl">
                    <span className="font-bold text-[oklch(0.20_0.01_240)] text-xs block">Functions</span>
                    <span className="text-[10px] text-neutral-500">Python Cloud Rules</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authors & CAC Box */}
          <div className="lg:col-span-4 bg-white border border-[oklch(0.91_0.005_70)] rounded-3xl p-8 space-y-6 shadow-xs">
            <span className="text-[10px] font-bold text-[oklch(0.55_0.14_245)] uppercase tracking-wider block">
              CAC Team Specifications
            </span>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Submission Project</span>
                <span className="font-display font-bold text-lg">StreetSync MVP</span>
              </div>

              <div>
                <span className="text-xs text-neutral-400 block font-medium">Target Event</span>
                <span className="font-bold text-sm">2026 Congressional App Challenge</span>
              </div>

              <div>
                <span className="text-xs text-neutral-400 block font-medium">Authors</span>
                <div className="space-y-1 mt-1 text-sm font-semibold text-[oklch(0.20_0.01_240)]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" /> Aarav Garg
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" /> Krish Sinha
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" /> Rithvik Penmetsa
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[oklch(0.91_0.005_70)] text-[10px] text-[oklch(0.45_0.01_240)] space-y-2 leading-relaxed">
              <p>⚠️ <strong>Emergency Disclaimer:</strong> StreetSync is intended solely for non-emergency public works reporting. This app does not connect to 911 or emergency services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.91_0.005_70)] bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[oklch(0.45_0.01_240)]">
          <span>&copy; {new Date().getFullYear()} StreetSync. All rights reserved.</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Mail className="w-3.5 h-3.5" /> pilot-inbox@streetsync.gov (Simulated Pilot Municipal Target)
          </span>
        </div>
      </footer>
    </div>
  );
}
