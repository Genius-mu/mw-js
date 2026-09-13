"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Tag, Badge, Collapse } from "antd";
import {
  RocketOutlined,
  PlayCircleOutlined,
  BookOutlined,
  CheckCircleFilled,
  CodeOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  FieldTimeOutlined,
  RightOutlined,
  FolderOpenOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  BranchesOutlined,
  ApiOutlined
} from "@ant-design/icons";
import { MODULES_DATA } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";
import BlurText from "@/components/reactbits/BlurText";
import GlassSurface from "@/components/reactbits/GlassSurface";
import OptionWheel from "@/components/reactbits/OptionWheel";
import ScrambledText from "@/components/reactbits/ScrambledText";

export default function LandingPage() {
  const { user, getNextUncompletedDay, completedDays } = useLearning();
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);

  const nextDay = getNextUncompletedDay();
  const selectedModule = MODULES_DATA[selectedModuleIdx] || MODULES_DATA[0];

  // FAQ Items
  const faqItems = [
    {
      key: "1",
      label: <span className="font-semibold text-xs text-white">Do I need prior programming experience?</span>,
      children: (
        <p className="text-xs text-white/70 leading-relaxed m-0">
          No prior coding experience is required! Our curriculum starts from absolute fundamentals (variables, comments, data types) and progressively builds up to advanced ES2026 concepts, async operations, and full application architectures.
        </p>
      )
    },
    {
      key: "2",
      label: <span className="font-semibold text-xs text-white">How long does each daily lesson take?</span>,
      children: (
        <p className="text-xs text-white/70 leading-relaxed m-0">
          Each day is designed as a focused micro-habit requiring only 10 to 15 minutes. You read the key concept, examine code blueprints, complete an interactive sandbox challenge, and test 2 real-world projects.
        </p>
      )
    },
    {
      key: "3",
      label: <span className="font-semibold text-xs text-white">Are real-world projects included in every lesson?</span>,
      children: (
        <p className="text-xs text-white/70 leading-relaxed m-0">
          Yes! Every single lesson day includes 2 practical hands-on projects with full source code that you can copy, run, and test directly inside our interactive browser code runner.
        </p>
      )
    },
    {
      key: "4",
      label: <span className="font-semibold text-xs text-white">How do I claim my Certificate of Completion?</span>,
      children: (
        <p className="text-xs text-white/70 leading-relaxed m-0">
          Once you complete all daily micro-modules in the curriculum, the platform automatically generates your verifiable Certificate of Completion with your name, date, and completed skills breakdown.
        </p>
      )
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION - ReactBits ScrambledText, BlurText & Glass Styling */}
      <section className="relative pt-8 md:pt-14 pb-8 px-4 max-w-4xl mx-auto text-center overflow-hidden">
        {/* Interactive Gray Scrambled Text Hero Background */}
        <div className="absolute inset-0 pointer-events-auto opacity-40 hover:opacity-60 transition-opacity -z-10 flex flex-col justify-center items-center select-none overflow-hidden">
          <ScrambledText
            radius={140}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:#@$%&*<>~/+=-_[]{}01"
            className="text-[11px] font-mono text-[#71717a] max-w-3xl leading-relaxed text-center px-4"
          >
            {"CONST JS_HUB = NEW LEARNING_PLATFORM({ DAYS: 102, STATUS: 'ONLINE', CORE: 'ECMASCRIPT2026' }); FUNCTION EXECUTE_DAY(ID) { RETURN FETCH_LESSON(ID).THEN(RENDER_PROJECTS); }"}
          </ScrambledText>
        </div>

        {/* Soft Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-[#ff63f9]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-glow" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-[#08080c] text-white/80 text-[10px] font-medium mb-5">
          <ThunderboltOutlined className="text-[#ff63f9]" />
          <span>100+ DAYS JAVASCRIPT DEVELOPER PLATFORM</span>
        </div>

        {/* Headline - ReactBits BlurText Component */}
        <div className="mb-3">
          <BlurText
            text="Master Modern JavaScript in 100+ Days"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto"
          />
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-xs max-w-lg mx-auto mb-6 font-normal leading-relaxed text-white/60">
          Learn JavaScript step-by-step with daily micro-concepts, interactive MDN documentation guides, instant browser code evaluation, and 2 hands-on projects per day.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 mb-12">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-9 px-5 text-xs font-semibold bg-white text-black hover:bg-white/90 border-none rounded-[7px] min-w-[120px] shadow-sm"
            >
              {user ? `Resume Day ${nextDay}` : "Start Day 1 Lesson"}
            </Button>
          </Link>
          <a href="#architecture">
            <Button
              size="large"
              icon={<BranchesOutlined />}
              className="h-9 px-5 text-xs font-semibold rounded-[7px] border border-white/10 bg-[#08080c] text-white/80 hover:text-white hover:border-white/30 min-w-[120px]"
            >
              View Node Architecture
            </Button>
          </a>
        </div>

        {/* Product Diagram Showcase Grid - GlassSurface Panel */}
        <GlassSurface borderRadius={12} className="p-4 md:p-6 text-left border border-white/10">
          <div className="w-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4 text-[10px] text-white/40 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff63f9] animate-pulse" />
                <span>LEARNING ENGINE DIAGRAM</span>
              </div>
              <div>STATUS: ONLINE</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Diagram Card 1 */}
              <div className="glass-card p-3.5 rounded-[7px]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                    <BookOutlined />
                  </div>
                  <Tag color="rgba(255,255,255,0.15)" className="font-mono text-[9px] text-white/80 font-semibold m-0 border-none">CONCEPT</Tag>
                </div>
                <h3 className="text-xs font-bold text-white mb-1">Micro-Learning Units</h3>
                <p className="text-[11px] text-white/50 m-0 leading-relaxed">
                  Bite-sized daily concepts covering syntax, specs, and execution behavior cleanly.
                </p>
              </div>

              {/* Diagram Card 2 */}
              <div className="glass-card p-3.5 rounded-[7px]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                    <FolderOpenOutlined />
                  </div>
                  <Tag color="rgba(255,255,255,0.15)" className="font-mono text-[9px] text-white/80 font-semibold m-0 border-none">2 PROJECTS</Tag>
                </div>
                <h3 className="text-xs font-bold text-white mb-1">Real-World Projects</h3>
                <p className="text-[11px] text-white/50 m-0 leading-relaxed">
                  Every lesson comes equipped with 2 practical real-world project builds to solidify knowledge.
                </p>
              </div>

              {/* Diagram Card 3 */}
              <div className="glass-card p-3.5 rounded-[7px]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                    <CodeOutlined />
                  </div>
                  <Tag color="rgba(255,255,255,0.15)" className="font-mono text-[9px] text-white/80 font-semibold m-0 border-none">SANDBOX</Tag>
                </div>
                <h3 className="text-xs font-bold text-white mb-1">In-Browser Terminal</h3>
                <p className="text-[11px] text-white/50 m-0 leading-relaxed">
                  Instant JavaScript code runner with live console.log output, hint toggles, and solution code.
                </p>
              </div>
            </div>
          </div>
        </GlassSurface>
      </section>

      {/* TECH ECOSYSTEM MARQUEE BAR */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-3 rounded-[7px] bg-[#08080c] border border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-white/50">
          <span className="flex items-center gap-1.5"><span className="text-[#ff63f9]">●</span> ECMAScript 2026</span>
          <span className="flex items-center gap-1.5"><span className="text-[#ff63f9]">●</span> V8 Engine</span>
          <span className="flex items-center gap-1.5"><span className="text-[#ff63f9]">●</span> Async / Await</span>
          <span className="flex items-center gap-1.5"><span className="text-[#ff63f9]">●</span> Node.js APIs</span>
          <span className="flex items-center gap-1.5"><span className="text-[#ff63f9]">●</span> Next.js 16</span>
        </div>
      </section>

      {/* INTERACTIVE NODE BRANCH ARCHITECTURE SECTION (Matching app/us mockup) */}
      <section id="architecture" className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1.5">
          <Tag color="rgba(255, 99, 249, 0.15)" className="font-semibold text-[#ff63f9] border-none font-mono text-[9px]">SYSTEM ARCHITECTURE</Tag>
          <h2 className="text-xl font-bold text-white m-0">JavaScript Learning Node Map</h2>
          <p className="text-xs text-white/50 max-w-md mx-auto m-0">Click any connected module node to explore metrics, concepts & real-world projects.</p>
        </div>

        <div className="p-5 md:p-7 rounded-[7px] bg-[#08080c] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Branch Map Graphic */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-4 bg-[#000000] rounded-[7px] border border-white/10 min-h-[320px]">
            {/* SVG Branch Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/20" style={{ strokeDasharray: "4 4" }}>
              <path d="M 80 160 Q 180 50 260 40" fill="none" strokeWidth="1.5" />
              <path d="M 80 160 Q 180 90 260 95" fill="none" strokeWidth="1.5" />
              <path d="M 80 160 Q 180 140 260 150" fill="none" strokeWidth="1.5" />
              <path d="M 80 160 Q 180 180 260 205" fill="none" strokeWidth="1.5" />
              <path d="M 80 160 Q 180 230 260 260" fill="none" strokeWidth="1.5" />
              <path d="M 80 160 Q 180 280 260 305" fill="none" strokeWidth="1.5" />
            </svg>

            {/* Central Node */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#ff63f9]/10 border-2 border-[#ff63f9] flex flex-col items-center justify-center text-center p-1 z-10 shadow-[0_0_20px_rgba(255,99,249,0.3)]">
              <ApiOutlined className="text-xl text-[#ff63f9]" />
              <span className="text-[9px] font-bold text-white mt-1 leading-tight">JS CORE ENGINE</span>
            </div>

            {/* Branch Nodes */}
            <div className="ml-24 space-y-2.5 z-10 w-full max-w-[200px]">
              {MODULES_DATA.map((mod, idx) => {
                const isSelected = selectedModuleIdx === idx;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModuleIdx(idx)}
                    className={`w-full p-2 rounded-[5px] text-left text-xs transition-all flex items-center justify-between border ${
                      isSelected
                        ? "bg-white text-black font-bold border-white shadow-lg scale-105"
                        : "bg-[#08080c]/90 text-white/70 border-white/10 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <span className="truncate text-[11px] font-mono">0{idx + 1}. {mod.title.split(":")[1] || mod.title}</span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#ff63f9]" : "bg-white/20"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Selected Node Spec Card */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-[#ff63f9] font-bold uppercase">SELECTED NODE SPECIFICATION</span>
              <Tag color="rgba(255, 255, 255, 0.15)" className="font-mono text-[9px] text-white border-none">
                MODULE 0{selectedModuleIdx + 1} ACTIVE
              </Tag>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white m-0">{selectedModule.title}</h3>
              <p className="text-xs text-white/60 mt-1 m-0 leading-relaxed">{selectedModule.description}</p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2.5 rounded-[5px] bg-[#000000] border border-white/10 text-center">
                <div className="text-sm font-bold text-white font-mono">{selectedModule.days.length}</div>
                <div className="text-[9px] text-white/50 mt-0.5">Lessons</div>
              </div>
              <div className="p-2.5 rounded-[5px] bg-[#000000] border border-white/10 text-center">
                <div className="text-sm font-bold text-[#ff63f9] font-mono">{selectedModule.days.length * 2}</div>
                <div className="text-[9px] text-white/50 mt-0.5">Projects</div>
              </div>
              <div className="p-2.5 rounded-[5px] bg-[#000000] border border-white/10 text-center">
                <div className="text-sm font-bold text-white font-mono">{(selectedModule.days.length * 0.4).toFixed(1)}h</div>
                <div className="text-[9px] text-white/50 mt-0.5">Duration</div>
              </div>
            </div>

            {/* Concept Highlights */}
            <div>
              <span className="text-[10px] font-mono text-white/40 block mb-1.5">CORE CONCEPTS IN THIS MODULE:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedModule.days.slice(0, 4).map((d) => (
                  <span key={d.id} className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-[3px]">
                    {d.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link href={`/learn/day/${selectedModule.days[0].id}`}>
                <Button
                  type="primary"
                  icon={<RocketOutlined />}
                  className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 px-4 rounded-[7px] shadow-sm w-full sm:w-auto"
                >
                  Launch Day {selectedModule.days[0].day} Lesson
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID SECTION */}
      <section id="features" className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1.5">
          <Tag color="rgba(255, 255, 255, 0.15)" className="font-semibold text-white/80 border-none font-mono text-[9px]">FEATURES</Tag>
          <h2 className="text-xl font-bold text-white m-0">Everything You Need to Master JS</h2>
          <p className="text-xs text-white/50 max-w-md mx-auto m-0">Built with modern developer tools, structured micro-learning, and practical code execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 rounded-[7px] space-y-2">
            <div className="w-8 h-8 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-sm font-bold">
              <AppstoreOutlined />
            </div>
            <h3 className="text-sm font-bold text-white m-0">Structured 100+ Day Curriculum</h3>
            <p className="text-xs text-white/60 leading-relaxed m-0">
              Systematic modules covering Basics, Arrays, Functions, Objects, ES6 Classes, and Async JavaScript.
            </p>
          </div>

          <div className="glass-card p-5 rounded-[7px] space-y-2">
            <div className="w-8 h-8 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-sm font-bold">
              <FolderOpenOutlined />
            </div>
            <h3 className="text-sm font-bold text-white m-0">2 Real-World Projects Per Lesson</h3>
            <p className="text-xs text-white/60 leading-relaxed m-0">
              Hands-on mini projects designed for every daily concept so you learn by constructing actual software.
            </p>
          </div>

          <div className="glass-card p-5 rounded-[7px] space-y-2">
            <div className="w-8 h-8 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-sm font-bold">
              <CodeOutlined />
            </div>
            <h3 className="text-sm font-bold text-white m-0">Interactive Browser Code Runner</h3>
            <p className="text-xs text-white/60 leading-relaxed m-0">
              Test your code instantly in browser memory with zero installation or setup required.
            </p>
          </div>

          <div className="glass-card p-5 rounded-[7px] space-y-2">
            <div className="w-8 h-8 rounded-[7px] bg-white/10 text-white flex items-center justify-center text-sm font-bold">
              <SafetyCertificateOutlined />
            </div>
            <h3 className="text-sm font-bold text-white m-0">Verifiable Certificate of Mastery</h3>
            <p className="text-xs text-white/60 leading-relaxed m-0">
              Track progress automatically with browser storage and earn an official shareable certificate.
            </p>
          </div>
        </div>
      </section>

      {/* REACTBITS OPTIONWHEEL MODULE SELECTOR */}
      <section className="max-w-4xl mx-auto px-4">
        <GlassSurface borderRadius={12} className="p-6 text-center border border-white/10">
          <div className="w-full">
            <Tag color="rgba(255, 255, 255, 0.15)" className="font-semibold mb-2 text-white/80 border-none font-mono text-[9px]">3D MODULE SELECTOR</Tag>
            <h2 className="text-xl font-bold text-white mb-2">Explore JavaScript Learning Modules</h2>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-4">Click or scroll the 3D wheel to preview modules & concepts</p>

            <div className="max-w-lg mx-auto bg-[#000000] p-4 rounded-[7px] border border-white/10">
              <OptionWheel
                items={MODULES_DATA.map((m) => m.title)}
                defaultSelected={selectedModuleIdx}
                onChange={(idx) => setSelectedModuleIdx(idx)}
                fontSize={1.1}
                spacing={1.3}
                inset={20}
              />
            </div>
          </div>
        </GlassSurface>
      </section>

      {/* CURRICULUM ROADMAP SECTION */}
      <section id="curriculum" className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <Tag color="rgba(255, 255, 255, 0.15)" className="font-semibold mb-1 text-white/80 border-none font-mono text-[9px]">ROADMAP</Tag>
            <h2 className="text-xl font-bold text-white">JavaScript Curriculum Modules</h2>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button type="primary" icon={<CodeOutlined />} className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 px-3.5 rounded-[7px] shadow-sm">
              Launch Workspace
            </Button>
          </Link>
        </div>

        <div className="space-y-3.5">
          {MODULES_DATA.map((module, idx) => (
            <div
              key={module.id}
              className="glass-card p-4 rounded-[7px]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2.5 border-b border-white/10 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white/60 font-mono font-semibold text-[10px]">MODULE 0{idx + 1}</span>
                    <Badge count={`${module.days.length} Lessons`} style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", color: "#ffffff", fontWeight: "bold", fontSize: "9px" }} />
                  </div>
                  <h3 className="text-xs font-bold text-white m-0">{module.title.replace(/^Module \d+:\s*/, "")}</h3>
                  <p className="text-[11px] text-white/40 m-0 mt-0.5">{module.description}</p>
                </div>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {module.days.map((day) => {
                  const isCompleted = completedDays.includes(day.id);
                  return (
                    <Link key={day.id} href={`/learn/day/${day.id}`} className="no-underline">
                      <div
                        className={`p-2 rounded-[5px] border text-xs flex items-center justify-between transition-all group ${
                          isCompleted
                            ? "bg-white/10 border-white/20 text-white font-semibold"
                            : "bg-[#000000]/60 border-white/10 text-white/70 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isCompleted ? (
                            <CheckCircleFilled className="text-white text-xs shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full bg-white/10 text-white/70 font-bold text-[8px] flex items-center justify-center shrink-0 font-mono">
                              {day.day}
                            </span>
                          )}
                          <span className="truncate font-medium group-hover:text-white transition-colors text-[11px]">
                            {day.title}
                          </span>
                        </div>
                        <FieldTimeOutlined className="text-white/30 text-[9px] shrink-0 ml-1.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUILT FOR EVERY DEVELOPER SHOWCASE */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1.5">
          <Tag color="rgba(255, 255, 255, 0.15)" className="font-semibold text-white/80 border-none font-mono text-[9px]">TARGET AUDIENCE</Tag>
          <h2 className="text-xl font-bold text-white m-0">Built for Every Creator & Developer</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-[7px] bg-[#08080c] border border-white/10 space-y-1.5">
            <span className="text-base">🌱</span>
            <h3 className="text-xs font-bold text-white m-0">Beginner Learners</h3>
            <p className="text-[11px] text-white/50 m-0">Build strong foundational habits from day 1.</p>
          </div>

          <div className="p-4 rounded-[7px] bg-[#08080c] border border-white/10 space-y-1.5">
            <span className="text-base">⚡</span>
            <h3 className="text-xs font-bold text-white m-0">Frontend Engineers</h3>
            <p className="text-[11px] text-white/50 m-0">Master ES6+ syntax, arrays, objects & DOM logic.</p>
          </div>

          <div className="p-4 rounded-[7px] bg-[#08080c] border border-white/10 space-y-1.5">
            <span className="text-base">🚀</span>
            <h3 className="text-xs font-bold text-white m-0">Full-Stack Devs</h3>
            <p className="text-[11px] text-white/50 m-0">Solidify async/await, closures, & OOP patterns.</p>
          </div>

          <div className="p-4 rounded-[7px] bg-[#08080c] border border-white/10 space-y-1.5">
            <span className="text-base">🎯</span>
            <h3 className="text-xs font-bold text-white m-0">Interview Candidates</h3>
            <p className="text-[11px] text-white/50 m-0">Refine JS core questions with interactive sandbox.</p>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1.5">
          <Tag color="rgba(255, 255, 255, 0.15)" className="font-semibold text-white/80 border-none font-mono text-[9px]">FAQ</Tag>
          <h2 className="text-xl font-bold text-white m-0">Everything You Need to Know</h2>
        </div>

        <div className="bg-[#08080c] p-4 rounded-[7px] border border-white/10">
          <Collapse
            items={faqItems}
            bordered={false}
            defaultActiveKey={["1"]}
            className="bg-transparent"
          />
        </div>
      </section>

      {/* LOWER CTA SHOWCASE CONTAINER */}
      <section className="max-w-3xl mx-auto px-4">
        <GlassSurface borderRadius={12} className="p-6 md:p-8 text-center border border-white/10">
          <div className="relative z-10 space-y-2.5 w-full">
            <h2 className="text-xl md:text-2xl font-bold text-white">Ready to Start Your 100 Days JS Challenge?</h2>
            <p className="text-white/60 max-w-sm mx-auto text-xs font-normal leading-relaxed">
              Join students mastering JavaScript one daily micro-concept at a time. Free, structured, and interactive.
            </p>
            <div className="pt-2">
              <Link href={`/learn/day/${nextDay}`}>
                <Button size="large" className="h-9 px-6 text-xs font-semibold bg-white text-black hover:bg-white/90 border-none rounded-[7px] shadow-sm">
                  Launch Workspace Now
                </Button>
              </Link>
            </div>
          </div>
        </GlassSurface>
      </section>
    </div>
  );
}
