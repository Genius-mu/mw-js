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
import ConnectModules from "@/components/ConnectModules";

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

  const scrollStackSteps = [
    {
      number: "01",
      title: "Daily Micro-Learning Habits",
      subtitle: "Focus on one high-yield JavaScript concept every day.",
      description: "No overwhelming 3-hour videos. Learn syntax rules, edge cases, and best practices in bite-sized, digestible lessons."
    },
    {
      number: "02",
      title: "Interactive In-Browser Sandbox",
      subtitle: "Execute code instantly without complex local setups.",
      description: "Write JavaScript directly inside our terminal, intercept console.log calls, test custom inputs, and review instant error diagnostics."
    },
    {
      number: "03",
      title: "Two Production Projects Per Day",
      subtitle: "Build real tools and utilities from day one.",
      description: "Every concept is backed by 2 functional real-world projects so you cement theory through practical application code."
    },
    {
      number: "04",
      title: "Verifiable Proof of Mastery",
      subtitle: "Track your progress and claim your official credential.",
      description: "Save your personal study notes to local storage, track completion metrics in real time, and earn an official completion certificate."
    }
  ];

  return (
    <div className="space-y-28 pb-28">
      {/* 1. HERO SECTION (pxxl.app style - No Badge, Clean Black Backdrop, ScrambledText Matrix) */}
      <section className="relative pt-12 md:pt-20 pb-12 px-4 max-w-5xl mx-auto text-center overflow-hidden">
        {/* Interactive Scrambled Text Hero Background */}
        <div className="absolute inset-0 pointer-events-auto opacity-30 hover:opacity-50 transition-opacity -z-10 flex flex-col justify-center items-center select-none overflow-hidden">
          <ScrambledText
            radius={160}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:#@$%&*<>~/+=-_[]{}01"
            className="text-xs font-mono text-[#71717a] max-w-4xl leading-relaxed text-center px-4"
          >
            {"CONST JS_HUB = NEW LEARNING_PLATFORM({ STATUS: 'ONLINE', CORE: 'ECMASCRIPT2026' }); FUNCTION EXECUTE_LESSON(ID) { RETURN FETCH_LESSON(ID).THEN(RENDER_PROJECTS); }"}
          </ScrambledText>
        </div>

        {/* Soft Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-[#ff63f9]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Headline - Large, bold pxxl.app typography */}
        <div className="mb-6">
          <BlurText
            text="Master Modern JavaScript Core & ES2026"
            delay={80}
            animateBy="words"
            direction="top"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight"
          />
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-white/70">
          Learn JavaScript step-by-step with structured micro-concepts, interactive MDN documentation guides, live in-browser terminal, and 2 hands-on projects per lesson.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row items-center justify-center gap-4">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-11 px-7 text-sm font-bold bg-[#ff63f9] text-black hover:bg-[#ff63f9]/90 border-none rounded-md shadow-[0_0_20px_rgba(255,99,249,0.35)]"
            >
              Start Learning Now
            </Button>
          </Link>
          <a href="#curriculum">
            <Button
              size="large"
              className="h-11 px-7 text-sm font-bold rounded-md border border-white/20 bg-transparent text-white/80 hover:text-white hover:border-white/40"
            >
              View Curriculum
            </Button>
          </a>
        </div>
      </section>

      {/* 2. SCROLLSTACK SECTION (Scroll-Triggered Blur Stacking Animation with Numbers from pxxl.app) */}
      <section className="max-w-4xl mx-auto px-4">
        <ScrollStack>
          {scrollStackSteps.map((step, idx) => (
            <ScrollStackItem key={idx}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-[#ff63f9] tracking-wider uppercase">
                    STEP {step.number}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white m-0">
                    {step.title}
                  </h3>
                  <div className="text-sm font-medium text-white/80">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-white/60 m-0 leading-relaxed max-w-xl pt-2">
                    {step.description}
                  </p>
                </div>

                <div className="text-6xl sm:text-8xl font-black text-white/10 font-mono shrink-0 select-none">
                  {step.number}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* 3. CONNECT MODULES SECTION (pxxl.app 'Connect your tools to pxxl' Animated Architecture) */}
      <section id="architecture">
        <ConnectModules />
      </section>

      {/* 4. REACTBITS OPTIONWHEEL MODULE SELECTOR */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white m-0">
            Interactive Module Navigator
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto m-0">
            Scroll or drag the 3D wheel to preview modules & concepts.
          </p>
        </div>

        <div className="max-w-md mx-auto p-4 rounded-2xl border border-white/10 bg-[#08080b]">
          <OptionWheel
            items={MODULES_DATA.map((m) => m.title)}
            defaultSelected={selectedModuleIdx}
            onChange={(idx) => setSelectedModuleIdx(idx)}
            fontSize={1.15}
            spacing={1.35}
            inset={20}
          />
        </div>
      </section>

      {/* 5. JAVASCRIPT MODULES & MICRO-LESSONS (Separated by ONLY Lines, Grid Format, No Gray Boxes) */}
      <section id="curriculum" className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white m-0 tracking-tight">
              JavaScript Modules & Micro-Lessons
            </h2>
            <p className="text-sm text-white/60 m-0 mt-1">
              All concepts organized systematically from basics to asynchronous programming.
            </p>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              icon={<CodeOutlined />}
              className="bg-[#ff63f9] text-black hover:bg-[#ff63f9]/90 border-none font-bold text-xs h-9 px-4 rounded-md shadow-sm"
            >
              Launch Workspace
            </Button>
          </Link>
        </div>

        {/* Grid Separated by ONLY Lines */}
        <div className="border-t border-b border-white/10 divide-y divide-white/10">
          {MODULES_DATA.map((mod, idx) => (
            <div key={mod.id} className="py-6 sm:py-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#ff63f9]">0{idx + 1}.</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white m-0">
                    {mod.title.replace(/^Module \d+:\s*/, "")}
                  </h3>
                </div>
                <span className="text-xs font-mono text-white/40">
                  {mod.days.length} Lessons · {mod.days.length * 2} Practical Projects
                </span>
              </div>

              <p className="text-sm text-white/60 m-0 leading-relaxed max-w-3xl">
                {mod.description}
              </p>

              {/* Minimal Line-Divided Lessons List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                {mod.days.map((day) => {
                  const isCompleted = completedDays.includes(day.id);
                  return (
                    <Link
                      key={day.id}
                      href={`/learn/day/${day.id}`}
                      className="no-underline flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-white/15 hover:bg-white/[0.03] transition-all group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isCompleted ? (
                          <CheckCircleFilled className="text-[#ff63f9] text-sm shrink-0" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-white/20 text-white/60 font-mono text-[10px] flex items-center justify-center shrink-0">
                            {day.day}
                          </span>
                        )}
                        <span className="text-xs text-white/80 group-hover:text-white truncate font-medium">
                          {day.title}
                        </span>
                      </div>
                      <RightOutlined className="text-[10px] text-white/20 group-hover:text-[#ff63f9] transition-colors shrink-0 ml-2" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RESTRUCTURED MINIMAL FAQ SECTION (Divided by Lines, No Gray/Hash Boxes) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white m-0">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto m-0">
            Everything you need to know about the curriculum, sandbox, and certification.
          </p>
        </div>

        {/* Clean Line-Separated Accordion */}
        <div className="border-t border-b border-white/10 divide-y divide-white/10">
          {faqList.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-white hover:text-[#ff63f9] transition-colors"
                >
                  <span>{item.q}</span>
                  <span className="text-sm text-white/40">
                    {isOpen ? <MinusOutlined /> : <PlusOutlined />}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-sm text-white/70 leading-relaxed pt-3 m-0 animate-fadeIn">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. LOWER CTA BANNER */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-10 md:p-14 rounded-3xl border border-white/15 bg-[#08080b] space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to Master JavaScript?
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-md mx-auto leading-relaxed">
            Begin learning modern ECMAScript with hands-on projects and instant in-browser code execution.
          </p>
          <div className="pt-3">
            <Link href={`/learn/day/${nextDay}`}>
              <Button
                size="large"
                className="h-11 px-8 text-sm font-bold bg-[#ff63f9] text-black hover:bg-[#ff63f9]/90 border-none rounded-md shadow-[0_0_20px_rgba(255,99,249,0.35)]"
              >
                Launch Workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
