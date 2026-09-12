"use client";

import React from "react";
import Link from "next/link";
import { Button, Tag, Badge } from "antd";
import {
  RocketOutlined,
  PlayCircleOutlined,
  BookOutlined,
  CheckCircleFilled,
  CodeOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  FieldTimeOutlined,
  ApiOutlined,
  SafetyCertificateOutlined,
  DatabaseOutlined,
  CodeFilled,
  AimOutlined
} from "@ant-design/icons";
import { MODULES_DATA } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";

export default function LandingPage() {
  const { user, progressPercent, getNextUncompletedDay, completedDays } = useLearning();

  const nextDay = getNextUncompletedDay();

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION - pxxl.app Centered & Space-Tech Style */}
      <section className="relative pt-16 md:pt-28 pb-12 px-4 max-w-5xl mx-auto text-center">
        {/* Soft Magenta Ambient Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff63f9]/15 blur-[120px] rounded-full pointer-events-none -z-10 animate-glow" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ffffff25] bg-[#211327] text-[#ff63f9] text-xs font-semibold mb-8 shadow-[0_0_34px_rgba(255,99,249,0.08)]">
          <ThunderboltOutlined className="text-[#ff63f9]" />
          <span>100+ DAYS JAVASCRIPT DEVELOPER PLATFORM</span>
        </div>

        {/* Headline Display */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6 text-white">
          Master JavaScript with <br />
          <span className="text-[#ff63f9]">
            Daily Micro-Habits
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed text-white/80">
          Learn JavaScript step-by-step with Beau Carnes’ 3.5-hour freeCodeCamp course. 
          Split into 100+ daily micro-concepts with timestamped videos, W3Schools documentation, and instant progress tracking.
        </p>

        {/* Paired Contrast CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-12 px-8 text-sm font-semibold bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none rounded-md min-w-[150px] shadow-none"
            >
              {user ? `Resume Day ${nextDay}` : "Get Started Free"}
            </Button>
          </Link>
          <a href="#curriculum">
            <Button
              size="large"
              icon={<BookOutlined />}
              className="h-12 px-8 text-sm font-semibold rounded-md border border-[#ffffff25] bg-[#000000] text-white hover:border-[#ff63f9] hover:text-[#ff63f9] min-w-[150px]"
            >
              View Curriculum
            </Button>
          </a>
        </div>

        {/* Connected Node Showcase Diagram (pxxl.app Product Diagram Canvas) */}
        <div className="p-6 md:p-10 rounded-[24px] bg-[#211327]/60 border border-[#ffffff15] relative overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[#ffffff15] pb-4 mb-6 text-xs text-white/60">
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff63f9] animate-ping" />
              <span>LIVE LEARNING WORKSPACE DIAGRAM</span>
            </div>
            <div className="font-mono text-white/40">SYSTEM STATUS: OPTIMAL</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connected Node 1 */}
            <div className="glass-card p-6 text-left relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff63f9]/20 text-[#ff63f9] flex items-center justify-center text-xl font-bold">
                  <PlayCircleOutlined />
                </div>
                <Tag color="#ff63f9" className="font-mono text-[10px] text-black font-bold m-0 border-none">01 TIMESTAMPED</Tag>
              </div>
              <h3 className="text-base font-bold text-white mb-2">Automated Video Segments</h3>
              <p className="text-xs text-white/70 m-0 leading-relaxed">
                Pre-configured YouTube timestamp playback starting and ending at exact micro-concept seconds.
              </p>
            </div>

            {/* Connected Node 2 */}
            <div className="glass-card p-6 text-left relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center text-xl font-bold">
                  <BookOutlined />
                </div>
                <Tag color="#ffffff25" className="font-mono text-[10px] text-white font-bold m-0 border-none">02 DOCS</Tag>
              </div>
              <h3 className="text-base font-bold text-white mb-2">W3Schools Integration</h3>
              <p className="text-xs text-white/70 m-0 leading-relaxed">
                Direct reference cards, syntax guides, and outbound documentation for deeper comprehension.
              </p>
            </div>

            {/* Connected Node 3 */}
            <div className="glass-card p-6 text-left relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff63f9]/20 text-[#ff63f9] flex items-center justify-center text-xl font-bold">
                  <CodeOutlined />
                </div>
                <Tag color="#ff63f9" className="font-mono text-[10px] text-black font-bold m-0 border-none">03 SANDBOX</Tag>
              </div>
              <h3 className="text-base font-bold text-white mb-2">Interactive Code Runner</h3>
              <p className="text-xs text-white/70 m-0 leading-relaxed">
                Evaluate JavaScript code directly in-browser with live console output and solution hints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Tag color="#ff63f9" className="font-semibold mb-2 text-black border-none font-mono">ROADMAP</Tag>
            <h2 className="text-3xl font-bold text-white">JavaScript Curriculum Modules</h2>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button type="primary" icon={<CodeOutlined />} className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md">
              Launch Dashboard
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {MODULES_DATA.map((module, idx) => (
            <div
              key={module.id}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ffffff15] mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#ff63f9] font-mono font-extrabold text-xs">MODULE 0{idx + 1}</span>
                    <Badge count={`${module.days.length} Lessons`} style={{ backgroundColor: "#ff63f9", color: "#000000", fontWeight: "bold" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white m-0">{module.title.replace(/^Module \d+:\s*/, "")}</h3>
                  <p className="text-xs text-white/60 m-0 mt-1">{module.description}</p>
                </div>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {module.days.map((day) => {
                  const isCompleted = completedDays.includes(day.id);
                  return (
                    <Link key={day.id} href={`/learn/day/${day.id}`} className="no-underline">
                      <div
                        className={`p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all group ${
                          isCompleted
                            ? "bg-[#ff63f9]/15 border-[#ff63f9] text-[#ff63f9]"
                            : "bg-[#000000]/60 border-[#ffffff15] text-white hover:border-[#ff63f9]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isCompleted ? (
                            <CheckCircleFilled className="text-[#ff63f9] text-base shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-full bg-[#ff63f9]/20 text-[#ff63f9] font-bold text-[10px] flex items-center justify-center shrink-0 font-mono">
                              {day.day}
                            </span>
                          )}
                          <span className="truncate font-medium group-hover:text-[#ff63f9] transition-colors">
                            {day.title}
                          </span>
                        </div>
                        <FieldTimeOutlined className="text-white/40 text-xs shrink-0 ml-2" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOWER CTA SHOWCASE CONTAINER */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-[24px] bg-[#211327] text-white p-8 md:p-14 text-center border border-[#ffffff25] relative overflow-hidden shadow-[0_0_50px_rgba(255,99,249,0.08)]">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Start Your 100 Days JS Challenge?</h2>
            <p className="text-white/80 max-w-xl mx-auto text-sm font-medium leading-relaxed">
              Join students mastering JavaScript one daily micro-concept at a time. Free, structured, and interactive.
            </p>
            <div className="pt-2">
              <Link href={`/learn/day/${nextDay}`}>
                <Button size="large" className="h-12 px-10 text-sm font-bold bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none rounded-md">
                  Launch Learning Workspace Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
