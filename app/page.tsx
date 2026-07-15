"use client";

import {
  FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  Construction,
  Inbox,
  Layers,
  MapPin,
  Mic,
  Sparkles,
} from "lucide-react";

const PIPELINE = [
  {
    id: "01",
    title: "Proximity-based deduplication",
    desc: "If a new report matches an unresolved issue within 15 meters, it joins one master ticket — so cities stop drowning in the same pothole five times.",
    visual: "dedupe" as const,
  },
  {
    id: "02",
    title: "Severity & urgency scoring",
    desc: "Each report is ranked by category, duplicate confirmations, ADA impact, time unresolved, and photo evidence. A blocked curb ramp near transit jumps the queue.",
    visual: "severity" as const,
  },
  {
    id: "03",
    title: "Reporter trust scoring",
    desc: "Lightweight reliability scores weigh accurate past reports and usable evidence. High-trust submissions get more prioritization weight; spam drops.",
    visual: "trust" as const,
  },
  {
    id: "04",
    title: "Automated municipal dispatch",
    desc: "Structured packets — transcript, category, GPS, timestamp, severity, trust, image — go to the pilot inbox and a live dashboard for sort, track, and resolve.",
    visual: "dispatch" as const,
  },
] as const;

function DeviceShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[280px] ${className}`}
      aria-hidden="true"
    >
      <div className="rounded-[1.75rem] border border-border bg-[#dfe3e1] p-1.5 shadow-[0_20px_50px_-28px_rgba(18,24,22,0.5)]">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-[#f4f7fb]">
          <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink/90" />
          {children}
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <DeviceShell className="mx-auto">
      <div className="flex min-h-[540px] flex-col pt-8">
        <div className="bg-[#2196F3] px-4 pb-5 pt-3 text-white">
          <p className="text-[10px] font-medium text-white/80">Good afternoon</p>
          <p className="mt-0.5 text-lg font-extrabold tracking-tight">StreetSync</p>
          <p className="mt-1 text-[11px] text-white/85">
            Near you · Nassau &amp; Mercer
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-3 bg-[#e8eaed] px-3 py-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { n: "6", l: "Nearby" },
              { n: "3", l: "In progress" },
              { n: "12", l: "Resolved" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl bg-white px-2 py-2.5 shadow-sm"
              >
                <p className="text-lg font-extrabold text-ink">{s.n}</p>
                <p className="text-[9px] font-medium text-muted">{s.l}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-bold text-ink">Quick actions</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#2196F3] px-2 py-5 text-white shadow-md">
              <Mic className="h-7 w-7" />
              <span className="text-center text-[11px] font-bold leading-tight">
                Voice report
              </span>
              <span className="text-center text-[9px] text-white/85">Speak to report</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#2E7D4F] px-2 py-5 text-white shadow-md">
              <Camera className="h-7 w-7" />
              <span className="text-center text-[11px] font-bold leading-tight">
                Community
              </span>
              <span className="text-center text-[9px] text-white/85">Take a picture</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-[11px] font-bold text-ink">Recent reports</p>
              <p className="text-[10px] italic text-muted">Near you</p>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-200">
                <Construction className="h-5 w-5 text-rose-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-ink">Large pothole</p>
                <p className="flex items-center gap-0.5 truncate text-[10px] text-muted">
                  <MapPin className="h-3 w-3" />
                  Nassau St &amp; Mercer St
                </p>
              </div>
              <div className="text-right">
                <span className="mb-1 block h-2 w-2 rounded-full bg-red-500" />
                <span className="text-[9px] text-muted">12 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}

function VoiceModeGraphic() {
  return (
    <DeviceShell className="mx-auto">
      <div className="flex min-h-[420px] flex-col">
        <div className="bg-[#2196F3] px-4 pb-4 pt-9 text-white">
          <p className="text-xl font-extrabold tracking-tight">Voice Report</p>
          <p className="mt-1 text-[11px] text-white/80">
            Describe the issue clearly with your voice
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between bg-[#e8eaed] px-4 py-6">
          <p className="text-center text-sm font-medium text-[#455a64]">
            Listening…
          </p>
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-400/30" />
            <span className="absolute inset-2 rounded-full bg-red-500/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30">
              <Mic className="h-9 w-9" />
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className="rounded-2xl border border-[#2196F3]/20 bg-white p-3">
              <p className="text-center text-[11px] leading-relaxed text-ink italic">
                &ldquo;Large pothole on Nassau St near Mercer — slowing
                traffic.&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-brunswick">
              <MapPin className="h-3 w-3" />
              40.3486° N · 74.6597° W · pinned
            </div>
            <div className="rounded-xl bg-[#2E7D4F] py-2.5 text-center text-xs font-bold text-white">
              Submit Report
            </div>
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}

function CommunityModeGraphic() {
  return (
    <DeviceShell className="mx-auto">
      <div className="flex min-h-[420px] flex-col bg-[#f4f7fb] px-3 pb-3 pt-9">
        <p className="text-center text-xs font-bold text-[#152033]">Report</p>
        <h4 className="mt-3 text-[1.35rem] font-extrabold tracking-tight text-[#152033]">
          Camera report
        </h4>
        <p className="mt-0.5 text-[11px] text-[#5B677A]">
          Capture issues as you walk
        </p>

        <div className="relative mt-3 overflow-hidden rounded-2xl bg-[#1a2a36]">
          <div
            className="aspect-[5/3] w-full"
            style={{
              background:
                "linear-gradient(145deg, #3d5a4c 0%, #2a3f4a 45%, #1c2d38 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_55%,transparent_28%,rgba(0,0,0,0.35)_100%)]" />
          <div className="absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[9px] text-white">
            LIVE
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold text-white">Curb ramp damage</p>
              <p className="text-[9px] text-white/75">Nassau St · ADA</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2196F3]">
              <Camera className="h-4 w-4" />
            </div>
          </div>
        </div>

        <p className="mt-3 text-[10px] font-bold text-[#152033]">Category</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {["Public Works", "Mobility / ADA", "Environment"].map((c, i) => (
            <span
              key={c}
              className={`rounded-lg border px-2 py-1 text-[9px] font-semibold ${
                i === 1
                  ? "border-[#2196F3] bg-[#2196F3]/10 text-[#1565C0]"
                  : "border-zinc-200 bg-white text-[#5B677A]"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[10px] font-bold text-[#152033]">Severity</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {[
            { l: "Low", c: "border-emerald-300 bg-emerald-50 text-emerald-800" },
            { l: "Med", c: "border-amber-300 bg-amber-50 text-amber-800" },
            { l: "High", c: "border-red-400 bg-red-50 text-red-700 ring-1 ring-red-300" },
          ].map((s) => (
            <span
              key={s.l}
              className={`rounded-lg border py-1.5 text-center text-[9px] font-bold ${s.c}`}
            >
              {s.l}
            </span>
          ))}
        </div>

        <div className="mt-auto rounded-xl bg-[#2196F3] py-2.5 text-center text-xs font-bold text-white">
          Submit to city
        </div>
      </div>
    </DeviceShell>
  );
}

function PipelineVisual({ kind }: { kind: (typeof PIPELINE)[number]["visual"] }) {
  if (kind === "dedupe") {
    return (
      <div className="relative h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1714] p-3">
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <p className="relative font-mono text-[9px] text-mint/70">15 m cluster · Nassau St</p>
        <div className="relative mt-3 flex items-center justify-center">
          <span className="absolute h-16 w-16 rounded-full border border-dashed border-mint/40" />
          <span className="absolute h-3 w-3 -translate-x-3 -translate-y-2 rounded-full bg-rose-400" />
          <span className="absolute h-3 w-3 translate-x-2 -translate-y-1 rounded-full bg-rose-400/80" />
          <span className="absolute h-3 w-3 translate-x-1 translate-y-3 rounded-full bg-rose-400/70" />
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-brunswick">
            1×
          </span>
        </div>
        <p className="relative mt-2 text-center text-[10px] text-zinc-400">
          3 reports → 1 master ticket
        </p>
      </div>
    );
  }

  if (kind === "severity") {
    return (
      <div className="space-y-1.5 rounded-xl border border-white/10 bg-[#0f1714] p-3">
        {[
          { t: "Blocked curb ramp · ADA", s: "Urgent", c: "bg-red-500" },
          { t: "Pothole · Nassau St", s: "High", c: "bg-orange-400" },
          { t: "Graffiti · alley", s: "Low", c: "bg-zinc-500" },
        ].map((row) => (
          <div
            key={row.t}
            className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-2.5 py-2"
          >
            <span className="truncate text-[10px] text-zinc-200">{row.t}</span>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold text-white ${row.c}`}
            >
              {row.s}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "trust") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f1714] p-3">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#d9ebe3"
              strokeWidth="3"
              strokeDasharray="70 88"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute font-mono text-sm font-bold text-mint">92</span>
        </div>
        <div>
          <p className="text-xs font-bold text-white">Reporter trust</p>
          <p className="mt-0.5 text-[10px] leading-snug text-zinc-400">
            14 confirmed · 2 with photos · weight ↑ in queue
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#0f1714] p-3">
      <div className="mb-2 flex items-center gap-2 text-mint">
        <Inbox className="h-3.5 w-3.5" />
        <span className="font-mono text-[9px] font-semibold uppercase tracking-wide">
          Pilot inbox
        </span>
      </div>
      <div className="space-y-1 rounded-lg bg-white/5 p-2.5 font-mono text-[9px] leading-relaxed text-zinc-300">
        <p>CAT · Mobility / ADA</p>
        <p>GPS · 40.3486, -74.6597</p>
        <p>SEV · 0.91 · TRUST · 92</p>
        <p className="text-mint">→ dashboard · open ticket</p>
      </div>
    </div>
  );
}

export default function StreetSyncLanding() {
  const [emailInput, setEmailInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActiveStep(idx);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setFormError("Enter a valid municipal email (e.g. admin@city.gov).");
      return;
    }
    setFormError("");
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brunswick focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-canvas/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brunswick font-serif text-sm font-bold text-white">
              S
            </span>
            <span className="text-lg font-extrabold tracking-tight">StreetSync</span>
          </a>

          <nav
            className="hidden items-center gap-7 text-sm font-semibold text-ink/80 md:flex"
            aria-label="Primary"
          >
            <a href="#modes" className="transition-colors hover:text-ink">
              Reporting modes
            </a>
            <a href="#pipeline" className="transition-colors hover:text-ink">
              City pipeline
            </a>
            <a href="#proof" className="transition-colors hover:text-ink">
              Why it works
            </a>
          </nav>

          <a
            href="#pilot"
            className="inline-flex items-center rounded-xl bg-brunswick px-4 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:bg-brunswick-soft active:scale-[0.97]"
          >
            Request pilot
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 85% 20%, rgba(31,86,70,0.14), transparent 60%), linear-gradient(165deg, #eef3f0 0%, #f4f6f5 45%, #e7eee9 100%)",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-12 lg:gap-10 lg:py-16">
            <div className="lg:col-span-7">
              <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brunswick">
                StreetSync
              </p>
              <h1 className="max-w-[16ch] font-serif text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                Report it once.{" "}
                <em className="font-normal italic text-brunswick">City hall hears it.</em>
              </h1>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted md:text-xl">
                Hands-free voice reporting, GPS telemetry, and photo evidence for
                residents — with 15-meter deduplication and severity routing for
                municipalities.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#modes"
                  className="inline-flex items-center gap-2 rounded-xl bg-brunswick px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:bg-brunswick-soft active:scale-[0.97]"
                >
                  See how reporting works
                  <ArrowUpRight className="h-4 w-4 opacity-80" />
                </a>
                <a
                  href="#pilot"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-mint/40"
                >
                  Partner as a city
                </a>
              </div>
              <p className="mt-5 max-w-md text-xs leading-relaxed text-muted">
                Non-emergency public works only. StreetSync does not connect to
                911.
              </p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <PhoneMock />
            </div>
          </div>
        </section>

        {/* Proof — always readable, no scroll-gated opacity */}
        <section id="proof" className="border-y border-border bg-mint/35 px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8 space-y-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brunswick">
                Why friction kills reporting
              </p>
              <h2 className="max-w-[22ch] font-serif text-[clamp(1.85rem,3.5vw,3rem)] font-semibold tracking-tight text-ink">
                Residents want to help. Clunky portals get in the way.
              </h2>
              <p className="max-w-[65ch] text-base leading-relaxed text-muted md:text-lg">
                Civic systems like Boston&apos;s BOS:311 show the pattern: when
                reporting moves into an accessible mobile flow, app-based
                requests can climb from a small share of tickets toward nearly
                a third of volume. StreetSync removes the effort barrier with
                voice, automatic location, and photographic proof — then filters
                noise before it hits the city inbox.
              </p>
              <dl className="grid gap-6 pt-2 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Dedup radius
                  </dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold text-brunswick">
                    15 m
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Target report time
                  </dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold text-brunswick">
                    &lt;10 s
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                    MVP scope
                  </dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold text-brunswick">
                    1 city
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="space-y-4 rounded-2xl border border-border bg-surface p-7 lg:col-span-4">
              <p className="text-sm font-bold text-ink">Built for two jobs</p>
              <ul className="space-y-4 text-sm leading-relaxed text-muted">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brunswick" />
                  Commuters report hazards without typing a portal form
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brunswick" />
                  Pedestrians flag ADA barriers with photo evidence
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brunswick" />
                  Cities get prioritized, deduplicated tickets — not inbox spam
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Two modes — equal columns, real app UI */}
        <section id="modes" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-ink">
                Two ways to report — same home screen, two taps
              </h2>
              <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted md:text-lg">
                Straight from the StreetSync app: Voice Report for passengers,
                Community Report when you&apos;re walking with a camera in hand.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-6 lg:gap-10">
              <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 md:p-7">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg bg-[#2196F3]/12 px-3 py-1.5 text-xs font-bold text-[#1565C0]">
                  <Mic className="h-3.5 w-3.5" />
                  Voice report
                </div>
                <h3 className="font-serif text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                  Speak it. GPS pins itself.
                </h3>
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted md:text-base">
                  Big mic for transit riders and roadside observers. Whisper or
                  talk — we transcribe, stamp the time, and attach coordinates
                  without a portal form.
                </p>
                <div className="mt-8 flex flex-1 items-end justify-center">
                  <VoiceModeGraphic />
                </div>
              </article>

              <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 md:p-7">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg bg-[#2E7D4F]/12 px-3 py-1.5 text-xs font-bold text-[#1B5E38]">
                  <Camera className="h-3.5 w-3.5" />
                  Community report
                </div>
                <h3 className="font-serif text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                  Photo it. Tag ADA. Send.
                </h3>
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted md:text-base">
                  Walking mode from the app: snap the curb, pick Public Works /
                  Mobility / Environment, set severity, and elevate accessibility
                  barriers before they get buried.
                </p>
                <div className="mt-8 flex flex-1 items-end justify-center">
                  <CommunityModeGraphic />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Municipal pipeline — fixed sticky stack + sync labels */}
        <section id="pipeline" className="bg-ink px-5 py-24 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-mint">
                <Layers className="h-3.5 w-3.5" />
                Government pipeline
              </div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight leading-[1.08]">
                Municipal intelligence that keeps the inbox useful
              </h2>
              <p className="max-w-[40ch] text-base leading-relaxed text-zinc-400">
                Backend logic from the StreetSync PRD — dedupe, score, trust, and
                dispatch — so pilot city staff see signal, not duplicate noise.
              </p>
              <ol className="hidden space-y-2 lg:block">
                {PIPELINE.map((step, i) => (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() =>
                        stepRefs.current[i]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        activeStep === i
                          ? "bg-white/10 text-white"
                          : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                      }`}
                    >
                      <span className="font-mono text-xs text-mint/80">
                        {step.id}
                      </span>
                      <span className="font-semibold">{step.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <a
                href="#pilot"
                className="inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-3 text-sm font-semibold text-brunswick transition-[transform,background-color] duration-200 ease-out hover:bg-white active:scale-[0.97]"
              >
                Join municipal pilot
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="lg:col-span-7">
              {/* Same sticky top for every card so the last one pins flush under the nav */}
              <div className="hidden lg:block">
                <div className="relative">
                  {PIPELINE.map((step, index) => (
                    <article
                      key={step.id}
                      ref={(el) => {
                        stepRefs.current[index] = el;
                      }}
                      data-index={index}
                      className="mb-6 rounded-2xl border border-white/10 bg-[#1a2621] p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.65)] lg:sticky lg:top-24 lg:mb-5 last:lg:mb-0"
                      style={{ zIndex: index + 1 }}
                    >
                      <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-start">
                        <div className="space-y-3">
                          <span className="font-mono text-sm font-semibold text-mint/80">
                            {step.id}
                          </span>
                          <h3 className="font-serif text-2xl font-semibold tracking-tight">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                            {step.desc}
                          </p>
                        </div>
                        <PipelineVisual kind={step.visual} />
                      </div>
                    </article>
                  ))}
                  {/* Scroll runway so card 04 can fully sit at top */}
                  <div className="h-[55vh]" aria-hidden="true" />
                </div>
              </div>

              <div className="space-y-4 lg:hidden">
                {PIPELINE.map((step) => (
                  <article
                    key={step.id}
                    className="rounded-2xl border border-white/10 bg-[#1a2621] p-6"
                  >
                    <span className="font-mono text-sm font-semibold text-mint/80">
                      {step.id}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {step.desc}
                    </p>
                    <div className="mt-4">
                      <PipelineVisual kind={step.visual} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pilot */}
        <section id="pilot" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-mint px-3 py-1.5 text-xs font-bold text-brunswick">
              <Sparkles className="h-3.5 w-3.5" />
              Pilot municipality
            </div>
            <h2 className="font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight">
              Bring StreetSync to your city inbox
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-base leading-relaxed text-muted">
              MVP routes to a single pilot municipality with structured email
              dispatch and a dashboard to sort by severity, track duplicates, and
              mark issues resolved.
            </p>

            <div className="mt-10 rounded-2xl border border-border bg-surface p-7 text-left shadow-[0_1px_0_rgba(18,24,22,0.04)] md:p-9">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted"
                    >
                      Municipality email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="administrator@city.gov"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full rounded-xl border border-border bg-canvas px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brunswick"
                    />
                    {formError ? (
                      <p
                        className="flex items-center gap-1.5 text-xs font-semibold text-alert"
                        role="alert"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {formError}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brunswick py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:bg-brunswick-soft active:scale-[0.97]"
                  >
                    Request pilot access
                  </button>
                </form>
              ) : (
                <div className="space-y-3 py-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint text-brunswick">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Request received</h3>
                  <p className="mx-auto max-w-sm text-sm text-muted">
                    We&apos;ll follow up at <strong className="text-ink">{emailInput}</strong>{" "}
                    about dashboard access for your pilot municipality.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brunswick font-serif text-sm font-bold text-white">
                  S
                </span>
                <span className="text-lg font-extrabold tracking-tight">StreetSync</span>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-muted">
                2026 Congressional App Challenge entry. Voice + community reporting
                for residents; prioritized dispatch for municipal teams.
              </p>
            </div>
            <p className="text-xs text-muted md:text-right">
              App builds in progress · Flutter ·{" "}
              <span className="font-semibold text-ink">street_sync</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-alert-bg p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-alert">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-alert">
                  Emergency services disclaimer
                </p>
                <p className="mt-1 max-w-3xl text-xs font-semibold leading-relaxed text-alert">
                  StreetSync is for non-emergency public works reporting only. It
                  does not connect to 911, dispatch emergency services, or resolve
                  life-threatening crises.
                </p>
              </div>
            </div>
            <span className="shrink-0 self-start rounded-lg border border-red-200 bg-white/50 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-alert md:self-center">
              Non-emergency only
            </span>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted md:flex-row md:items-center">
            <span>
              © 2026 StreetSync · Aarav Garg, Krish Sinha, Rithvik Penmetsa
            </span>
            <span className="font-mono">MVP · single pilot municipality</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
