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
  FieldTimeOutlined
} from "@ant-design/icons";
import { MODULES_DATA } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";

export default function LandingPage() {
  const { user, getNextUncompletedDay, completedDays } = useLearning();

  const nextDay = getNextUncompletedDay();

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION - pxxl.app Typography & Spacing */}
      <section className="relative pt-10 md:pt-16 pb-8 px-4 max-w-4xl mx-auto text-center">
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#ff63f9]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-glow" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-[#08080c] text-white/80 text-[10px] font-medium mb-5">
          <ThunderboltOutlined className="text-[#ff63f9]" />
          <span>100+ DAYS JAVASCRIPT DEVELOPER PLATFORM</span>
        </div>

        {/* Headline - Sized precisely for pxxl.app spec */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto mb-3 text-white">
          Master JavaScript with <br />
          <span className="text-[#ff63f9]">
            Daily Micro-Habits
          </span>
        </h1>

        {/* Subtitle - compact body size */}
        <p className="text-xs sm:text-xs max-w-lg mx-auto mb-6 font-normal leading-relaxed text-white/60">
          Learn JavaScript step-by-step with 100+ daily micro-concepts, timestamped video lessons, interactive documentation guides, and instant progress tracking.
        </p>

        {/* Feint Contrast Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 mb-12">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-9 px-5 text-xs font-medium bg-white/75 text-black hover:bg-white/90 border-none rounded-md min-w-[120px] shadow-none"
            >
              {user ? `Resume Day ${nextDay}` : "Get Started"}
            </Button>
          </Link>
          <a href="#curriculum">
            <Button
              size="large"
              icon={<BookOutlined />}
              className="h-9 px-5 text-xs font-medium rounded-md border border-white/10 bg-[#08080c] text-white/75 hover:text-white hover:border-white/25 min-w-[120px]"
            >
              Curriculum
            </Button>
          </a>
        </div>

        {/* Product Diagram Showcase Grid - Dark Obsidian Panels with Thin Borders & Grid Lines */}
        <div className="p-4 md:p-6 rounded-2xl bg-[#08080c] border border-white/10 relative overflow-hidden text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4 text-[10px] text-white/40 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff63f9] animate-pulse" />
              <span>LEARNING SYSTEM DIAGRAM</span>
            </div>
            <div>STATUS: ACTIVE</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Diagram Card 1 */}
            <div className="glass-card p-3.5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                  <PlayCircleOutlined />
                </div>
                <Tag color="#ffffff15" className="font-mono text-[9px] text-white/80 font-semibold m-0 border-none">TIMESTAMPED</Tag>
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Automated Video Segments</h3>
              <p className="text-[11px] text-white/50 m-0 leading-relaxed">
                Pre-configured video playback starting and ending at exact micro-concept seconds.
              </p>
            </div>

            {/* Diagram Card 2 */}
            <div className="glass-card p-3.5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                  <BookOutlined />
                </div>
                <Tag color="#ffffff15" className="font-mono text-[9px] text-white/80 font-semibold m-0 border-none">DOCS</Tag>
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Structured Documentation</h3>
              <p className="text-[11px] text-white/50 m-0 leading-relaxed">
                Direct reference cards, syntax guides, and documentation for deeper comprehension.
              </p>
            </div>

            {/* Diagram Card 3 */}
            <div className="glass-card p-3.5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                  <CodeOutlined />
                </div>
                <Tag color="#ffffff15" className="font-mono text-[9px] text-white/80 font-semibold m-0 border-none">SANDBOX</Tag>
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Interactive Code Runner</h3>
              <p className="text-[11px] text-white/50 m-0 leading-relaxed">
                Evaluate JavaScript code directly in-browser with live console output and solution hints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <Tag color="#ffffff15" className="font-semibold mb-1 text-white/80 border-none font-mono text-[9px]">ROADMAP</Tag>
            <h2 className="text-xl font-bold text-white">JavaScript Curriculum Modules</h2>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button type="primary" icon={<CodeOutlined />} className="bg-white/75 text-black hover:bg-white/90 border-none font-medium text-xs h-8 px-3.5 rounded-md">
              Launch Workspace
            </Button>
          </Link>
        </div>

        <div className="space-y-3.5">
          {MODULES_DATA.map((module, idx) => (
            <div
              key={module.id}
              className="glass-card p-4"
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
                        className={`p-2 rounded-lg border text-xs flex items-center justify-between transition-all group ${
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

      {/* LOWER CTA SHOWCASE CONTAINER */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="rounded-2xl bg-[#08080c] text-white p-6 md:p-8 text-center border border-white/10 relative overflow-hidden">
          <div className="relative z-10 space-y-2.5">
            <h2 className="text-xl md:text-2xl font-bold text-white">Ready to Start Your 100 Days JS Challenge?</h2>
            <p className="text-white/60 max-w-sm mx-auto text-xs font-normal leading-relaxed">
              Join students mastering JavaScript one daily micro-concept at a time. Free, structured, and interactive.
            </p>
            <div className="pt-2">
              <Link href={`/learn/day/${nextDay}`}>
                <Button size="large" className="h-9 px-6 text-xs font-semibold bg-white/75 text-black hover:bg-white/90 border-none rounded-md">
                  Launch Workspace Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
