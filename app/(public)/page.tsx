"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Tag } from "antd";
import {
  RocketOutlined,
  BookOutlined,
  CheckCircleFilled,
  CodeOutlined,
  ThunderboltOutlined,
  RightOutlined,
  PlusOutlined,
  MinusOutlined
} from "@ant-design/icons";
import { MODULES_DATA } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";
import BlurText from "@/components/reactbits/BlurText";
import OptionWheel from "@/components/reactbits/OptionWheel";
import ScrambledText from "@/components/reactbits/ScrambledText";
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack";
import ScrollBlurSlide from "@/components/reactbits/ScrollBlurSlide";
import ConnectModules from "@/components/ConnectModules";
import GlassSurface from "@/components/reactbits/GlassSurface";
import {
  BasicsDataTypesVisual,
  ArraysLogicVisual,
  FunctionsScopeVisual,
  ObjectsDataVisual,
  LoopsIterationVisual,
  AdvancedES6Visual
} from "@/components/ModuleShowcase";

export default function LandingPage() {
  const { getNextUncompletedDay, completedDays } = useLearning();
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const nextDay = getNextUncompletedDay();

  const faqList = [
    {
      q: "Do I need prior coding experience?",
      a: "No prior experience is necessary. We start from foundational fundamentals like variables, syntax, and data types, advancing smoothly through ES6+, asynchronous patterns, and real-world architectures."
    },
    {
      q: "How long does each lesson take?",
      a: "Each lesson is designed as a daily micro-habit requiring only 10 to 15 minutes: concept overview, syntax blueprint, interactive sandbox exercise, and 2 hands-on mini-projects."
    },
    {
      q: "Are real-world projects included?",
      a: "Yes! Every single lesson includes 2 practical projects with complete source code that you can copy, test, and execute directly in the browser runner."
    },
    {
      q: "How does the Certificate of Completion work?",
      a: "Upon completing all modules and micro-lessons, the platform automatically generates your verifiable completion certificate with your name and skills breakdown."
    }
  ];

  const HERO_SCRAMBLE_MATRIX = `// ECMASCRIPT 2026 ENGINE RUNTIME & JAVASCRIPT CORE PLATFORM
const RUNTIME = new V8Engine({ mode: 'DEVELOPER', asyncContext: true, jit: 'TURBOPAN' });
async function initializeCurriculum() { return await ModuleLoader.import('/core/javascript'); }
class ASTCompiler extends RuntimeEnvironment { parse(code) { return tokenize(code, { es2026: true }); } }
const PROMISE_STREAM = new AsyncIterator({ buffer: 1024, concurrency: 'WORKER_POOL' });
function benchmark(fn) { const t0 = performance.now(); fn(); return performance.now() - t0; }`;

  const scrollStackSteps = [
    {
      number: "01",
      badge: "HABIT SYSTEM",
      title: "Daily Micro-Learning Habits",
      subtitle: "Focus on one high-yield JavaScript concept every day.",
      description: "No overwhelming 3-hour videos. Learn syntax rules, edge cases, and best practices in bite-sized, digestible lessons.",
      features: ["10-15 Min Daily Habit", "100+ Step-by-Step Concepts", "Verified Retention System"],
      graphic: (
        <div className="p-4 rounded-xl bg-[#0e0e14] border border-white/10 space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
            <span className="font-mono text-[#ff63f9] font-bold">🔥 14-Day Streak</span>
            <span className="text-white/50 font-mono text-[11px]">Daily 15m Target</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.03] text-white/80">
              <span>Day 01: Core Syntax</span>
              <CheckCircleFilled className="text-[#ff63f9] text-xs" />
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.03] text-white/80">
              <span>Day 02: Scopes & Closures</span>
              <CheckCircleFilled className="text-[#ff63f9] text-xs" />
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#ff63f9]/10 border border-[#ff63f9]/30 text-white font-semibold">
              <span>Day 03: Event Loop</span>
              <span className="text-[10px] text-[#ff63f9] font-bold">Today 🚀</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "02",
      badge: "LIVE TERMINAL",
      title: "Interactive In-Browser Sandbox",
      subtitle: "Execute code instantly without complex local setups.",
      description: "Write JavaScript directly inside our terminal, intercept console.log calls, test custom inputs, and review instant error diagnostics.",
      features: ["Live V8 In-Browser Runner", "Console Log Interception", "Zero Config Setup"],
      graphic: (
        <div className="p-4 rounded-xl bg-[#050508] border border-white/10 space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-[10px] text-white/40">v8-sandbox.js</span>
          </div>
          <pre className="font-mono text-[11px] text-emerald-400 m-0 leading-relaxed bg-black/50 p-2.5 rounded border border-white/5 overflow-x-auto">
            <code>{`// Real-time In-Browser Run\nconst sum = (a, b) => a + b;\nconsole.log("Avg:", sum(40, 2));`}</code>
          </pre>
          <div className="flex items-center justify-between text-[11px] font-mono text-white/60 bg-white/[0.03] px-2 py-1 rounded">
            <span>➜ Output: Avg: 42</span>
            <span className="text-emerald-400">0.3ms</span>
          </div>
        </div>
      )
    },
    {
      number: "03",
      badge: "CODE PROJECTS",
      title: "Two Production Projects Per Day",
      subtitle: "Build real tools and utilities from day one.",
      description: "Every concept is backed by 2 functional real-world projects so you cement theory through practical application code.",
      features: ["200+ Production Utilities", "Full Source Code Included", "Real-World Architecture"],
      graphic: (
        <div className="p-4 rounded-xl bg-[#0e0e14] border border-white/10 space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/10">
            <span className="font-mono text-xs font-bold text-white">2 Hands-on Projects</span>
            <span className="text-[10px] font-mono text-[#ff63f9]">Ready to Run</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-2 rounded bg-white/[0.03] border border-white/8 space-y-1">
              <div className="flex items-center justify-between text-white font-medium text-[11px]">
                <span>Project 1: Rate Engine</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-[#ff63f9]">Async API</span>
              </div>
              <p className="text-[10px] text-white/50 m-0">Live currency calculator with fetch caching.</p>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/8 space-y-1">
              <div className="flex items-center justify-between text-white font-medium text-[11px]">
                <span>Project 2: Event Bus</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">Patterns</span>
              </div>
              <p className="text-[10px] text-white/50 m-0">Custom publish/subscribe reactive channel.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "04",
      badge: "CREDENTIAL",
      title: "Verifiable Proof of Mastery",
      subtitle: "Track your progress and claim your official credential.",
      description: "Save your personal study notes to local storage, track completion metrics in real time, and earn an official completion certificate.",
      features: ["Verifiable Certificate", "Persistent Local Notes", "LinkedIn & GitHub Ready"],
      graphic: (
        <div className="p-4 rounded-xl bg-[#0e0e14] border border-[#ff63f9]/30 space-y-2.5 shadow-[0_0_25px_rgba(255,99,249,0.12)]">
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/10">
            <span className="font-mono text-[10px] font-bold text-[#ff63f9]">OFFICIAL CREDENTIAL</span>
            <CheckCircleFilled className="text-[#ff63f9] text-sm" />
          </div>
          <div className="text-center py-2 space-y-1">
            <div className="text-sm font-extrabold text-white tracking-wide">
              JavaScript Mastery
            </div>
            <p className="text-[11px] font-mono text-white/60 m-0">
              Certified ECMAScript Developer
            </p>
          </div>
          <div className="pt-1 border-t border-white/8 flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>VERIFIED ID: #JS-2026</span>
            <span className="text-emerald-400">Verifiable</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-36 sm:space-y-44 pb-36">
      {/* 1. HERO SECTION (pxxl.app style with Fluid Glass card surface) */}
      <section className="max-w-5xl mx-auto px-4">
        <GlassSurface borderRadius={28} className="relative pt-16 sm:pt-24 md:pt-28 pb-14 sm:pb-20 md:pb-24 px-6 sm:px-10 text-center overflow-hidden group">
          {/* Interactive Scrambled Text Hero Background - Pitch Black Normally, Gray Scramble on Hover */}
          <div className="absolute inset-0 pointer-events-auto opacity-0 group-hover:opacity-75 transition-opacity duration-500 -z-10 flex flex-col justify-center items-center select-none overflow-hidden p-4">
            <ScrambledText
              radius={180}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:#@$%&*<>~/+=-_[]{}01"
              className="text-[11px] sm:text-xs font-mono text-zinc-400 max-w-4xl leading-relaxed text-center px-4 tracking-wider"
            >
              {HERO_SCRAMBLE_MATRIX}
            </ScrambledText>
          </div>

          {/* Soft Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-[#ff63f9]/5 blur-[140px] rounded-full pointer-events-none -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Headline - Large, bold pxxl.app typography with Re-triggering Blur Animation */}
          <div className="mb-8">
            <BlurText
              text="Master Modern JavaScript Core & ES2026"
              delay={70}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight"
            />
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-12 font-normal leading-relaxed text-white/70">
            Learn JavaScript step-by-step with structured micro-concepts, interactive MDN documentation guides, live in-browser terminal, and 2 hands-on projects per lesson.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-5">
            <Link href={`/learn/day/${nextDay}`}>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                className="h-12 px-8 text-sm font-bold bg-[#ff63f9] text-black hover:bg-[#ff63f9]/90 border-none rounded-md shadow-[0_0_20px_rgba(255,99,249,0.35)] cursor-pointer"
              >
                Start Learning Now
              </Button>
            </Link>
            <a href="#curriculum">
              <Button
                size="large"
                className="h-12 px-8 text-sm font-bold rounded-md border border-white/20 bg-transparent text-white/80 hover:text-white hover:border-white/40 cursor-pointer"
              >
                View Curriculum
              </Button>
            </a>
          </div>
        </GlassSurface>
      </section>

      {/* 2. SCROLLSTACK SECTION (Scroll-Triggered Stacking with Vertical Divider & Visuals) */}
      <section className="max-w-4xl mx-auto px-4">
        <ScrollBlurSlide>
          <ScrollStack>
            {scrollStackSteps.map((step, idx) => (
              <ScrollStackItem key={idx} index={idx}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Side: Step Details & Highlights */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="text-xs font-mono font-bold text-[#ff63f9] tracking-wider uppercase flex items-center gap-2">
                      <span>STEP {step.number}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/50">{step.badge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white m-0 tracking-tight">
                      {step.title}
                    </h3>
                    <div className="text-sm font-medium text-white/80">
                      {step.subtitle}
                    </div>
                    <p className="text-sm text-white/60 m-0 leading-relaxed pt-1">
                      {step.description}
                    </p>
                    {/* Highlight Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/70"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vertical Divider Line */}
                  <div className="hidden md:flex md:col-span-1 justify-center self-stretch py-2">
                    <div className="w-px bg-white/12 h-full" />
                  </div>

                  {/* Right Side: Visual Graphic / Code / Interactive Mockup */}
                  <div className="md:col-span-5 relative">
                    {step.graphic}
                    {/* Subtle Background Watermark Number */}
                    <div className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-black text-white/[0.04] font-mono select-none pointer-events-none -z-0">
                      {step.number}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </ScrollBlurSlide>
      </section>

      {/* 3. CONNECT MODULES SECTION (pxxl.app 'Connect your tools to pxxl' Animated Architecture) */}
      <section id="architecture">
        <ScrollBlurSlide>
          <ConnectModules />
        </ScrollBlurSlide>
      </section>

      {/* 4. CURRICULUM SLICK GRID BAR & INTERACTIVE DISPLAY (Directly matching pxxl.app format) */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4 space-y-8">
        <ScrollBlurSlide>
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white m-0 tracking-tight">
              JavaScript Modules & Core Curriculum
            </h2>
            <p className="text-sm sm:text-base text-white/60 m-0 leading-relaxed">
              All concepts organized systematically from foundational primitives to modern ECMAScript 2026.
            </p>
          </div>

          {/* Slick Horizontal Grid Bar (matching pxxl.app stats grid bar from user's image) */}
          <div className="w-full border-t border-b border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-white/10 bg-[#08080c]/60 backdrop-blur-xl">
            {MODULES_DATA.map((mod, idx) => {
              const isSelected = selectedModuleIdx === idx;
              const shortTitles = [
                "SYNTAX & TYPES",
                "ARRAYS & LOGIC",
                "FUNCTIONS & SCOPE",
                "OBJECTS & DATA",
                "LOOPS & DOM",
                "ASYNC & ES2026"
              ];
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleIdx(idx)}
                  className={`py-6 px-3 text-center cursor-pointer transition-all border-none relative group ${
                    isSelected
                      ? "bg-white/[0.08]"
                      : "bg-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Top active indicator line */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#ff63f9] shadow-[0_0_12px_#ff63f9]" />
                  )}
                  <div
                    className={`font-mono text-xl sm:text-2xl font-black tracking-tight transition-colors ${
                      isSelected ? "text-[#ff63f9]" : "text-white group-hover:text-white/90"
                    }`}
                  >
                    MOD 0{idx + 1}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/50 mt-1 truncate">
                    {shortTitles[idx] || `MODULE 0${idx + 1}`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Area Directly Below Bar (matching pxxl.app screenshot layout) */}
          {(() => {
            const currentMod = MODULES_DATA[selectedModuleIdx] || MODULES_DATA[0];
            const moduleVisuals = [
              <BasicsDataTypesVisual key="mod-0" />,
              <ArraysLogicVisual key="mod-1" />,
              <FunctionsScopeVisual key="mod-2" />,
              <ObjectsDataVisual key="mod-3" />,
              <LoopsIterationVisual key="mod-4" />,
              <AdvancedES6Visual key="mod-5" />
            ];
            const currentVisual = moduleVisuals[selectedModuleIdx] || moduleVisuals[0];
            const firstDay = currentMod.days[0];

            return (
              <div className="pt-10 pb-4 space-y-10">
                {/* Center Heading with Purple Glow Highlight & Playful Handwritten Annotation */}
                <div className="relative text-center max-w-3xl mx-auto px-4 space-y-4">
                  {/* Handwritten Note with arrow */}
                  <div className="hidden md:flex items-center gap-1.5 absolute -top-7 right-0 text-white/60 font-mono text-xs select-none">
                    <span>Lowkey faster than 3hr videos</span>
                    <svg className="w-5 h-5 text-[#ff63f9] -rotate-45 transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 10l5 5 5-5" />
                    </svg>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight m-0">
                    Master {currentMod.title.replace(/^Module \d+:\s*/, "")} on{" "}
                    <span className="relative inline-block text-[#ff63f9]">
                      <span className="absolute -inset-2 bg-[#ff63f9]/25 blur-xl rounded-full -z-10 pointer-events-none" />
                      CODA.
                    </span>
                  </h3>

                  <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed m-0">
                    {currentMod.description}
                  </p>

                  {/* Action Button matching pxxl.app 'Search domains' button style */}
                  <div className="pt-2 flex justify-center">
                    <Link href={`/learn/day/${firstDay.id}`} className="no-underline">
                      <button
                        type="button"
                        className="bg-white text-black font-extrabold text-xs sm:text-sm h-11 px-7 rounded-[8px] shadow-[0_4px_0_0_#ff63f9] hover:bg-[#ff63f9] hover:text-black transition-all transform active:translate-y-1 flex items-center gap-2 cursor-pointer border-none"
                      >
                        <span>Explore Module 0{selectedModuleIdx + 1}</span>
                        <span className="font-bold">↗</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Interactive Showcase & Lessons Matrix wrapped in GlassSurface */}
                <GlassSurface borderRadius={28} className="p-6 sm:p-10 shadow-2xl overflow-hidden relative group">
                  <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#ff63f9]/5 rounded-full blur-[120px] pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Side: Curriculum highlights for this module */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff63f9] tracking-wider uppercase">
                        <span>TRACK BREAKDOWN</span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/50">{currentMod.days.length} Lessons</span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/50">{currentMod.days.length * 2} Projects</span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                          Featured Lessons in this Track:
                        </div>
                        <div className="space-y-2">
                          {currentMod.days.slice(0, 4).map((day) => {
                            const isCompleted = completedDays.includes(day.id);
                            return (
                              <Link
                                key={day.id}
                                href={`/learn/day/${day.id}`}
                                className="no-underline flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all group/item"
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  {isCompleted ? (
                                    <CheckCircleFilled className="text-[#ff63f9] text-xs shrink-0" />
                                  ) : (
                                    <span className="w-4 h-4 rounded-full border border-white/20 text-white/50 font-mono text-[9px] flex items-center justify-center shrink-0">
                                      {day.day}
                                    </span>
                                  )}
                                  <span className="text-xs text-white/80 group-hover/item:text-white truncate">
                                    {day.title}
                                  </span>
                                </div>
                                <RightOutlined className="text-[9px] text-white/20 group-hover/item:text-[#ff63f9] transition-colors shrink-0 ml-1.5" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Interactive Visual Component for that module */}
                    <div className="lg:col-span-7 relative">
                      {currentVisual}
                    </div>
                  </div>
                </GlassSurface>
              </div>
            );
          })()}
        </ScrollBlurSlide>
      </section>

      {/* 5. RESTRUCTURED MINIMAL FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 space-y-10 sm:space-y-12">
        <ScrollBlurSlide>
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white m-0">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-white/60 max-w-md mx-auto m-0 leading-relaxed">
              Everything you need to know about the curriculum, sandbox, and certification.
            </p>
          </div>

          {/* Clean Line-Separated Accordion with Slide Down & Slide Up */}
          <div className="border-t border-b border-white/10 divide-y divide-white/10">
            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6 sm:py-7">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-white hover:text-[#ff63f9] transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    <span>{item.q}</span>
                    <span className="text-sm text-white/40 transition-transform duration-300">
                      {isOpen ? <MinusOutlined /> : <PlusOutlined />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed m-0 pb-1">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollBlurSlide>
      </section>

      {/* 6. LOWER CTA BANNER */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <ScrollBlurSlide>
          <GlassSurface borderRadius={28} className="p-12 sm:p-16 md:p-20 space-y-6 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight m-0">
              Ready to Master JavaScript?
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-md mx-auto leading-relaxed m-0">
              Begin learning modern ECMAScript with hands-on projects and instant in-browser code execution.
            </p>
            <div className="pt-4">
              <Link href={`/learn/day/${nextDay}`}>
                <Button
                  size="large"
                  className="h-12 px-9 text-sm font-bold bg-[#ff63f9] text-black hover:bg-[#ff63f9]/90 border-none rounded-md shadow-[0_0_20px_rgba(255,99,249,0.35)] cursor-pointer"
                >
                  Launch Workspace
                </Button>
              </Link>
            </div>
          </GlassSurface>
        </ScrollBlurSlide>
      </section>
    </div>
  );
}
