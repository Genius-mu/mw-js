"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, Tag, Badge } from "antd";
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
  const { user, themeMode, progressPercent, getNextUncompletedDay, completedDays } = useLearning();

  const isDark = themeMode === "dark";
  const nextDay = getNextUncompletedDay();

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION - Space Tech Theme */}
      <section className="relative pt-12 md:pt-24 pb-12 px-4 max-w-5xl mx-auto text-center">
        {/* Soft Pink Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#ff63f9]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff25] bg-[#211327] text-[#ff63f9] text-xs font-semibold mb-8 shadow-[0_0_34px_rgba(255,99,249,0.08)]">
          <ThunderboltOutlined className="text-[#ff63f9]" />
          <span>100+ DAYS JAVASCRIPT DEVELOPER PLATFORM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Break Down JavaScript into <br />
          <span className="text-[#ff63f9]">
            Bite-Sized Daily Habits
          </span>
        </h1>

        <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed ${isDark ? "text-white/80" : "text-[#211327]"}`}>
          Learn JavaScript step-by-step with Beau Carnes’ 3.5-hour freeCodeCamp course. 
          Split into 100+ daily micro-concepts with timestamped videos, W3Schools documentation, and instant progress tracking.
        </p>

        {/* Paired CTAs Spec */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-12 px-8 text-sm font-semibold bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none rounded-md shadow-none min-w-[140px]"
            >
              {user ? `Resume Day ${nextDay}` : "Get Started Free"}
            </Button>
          </Link>
          <a href="#curriculum">
            <Button
              size="large"
              icon={<BookOutlined />}
              className={`h-12 px-8 text-sm font-semibold rounded-md border min-w-[140px] ${
                isDark ? "bg-[#000000] text-white border-[#ffffff25] hover:border-[#ff63f9]" : "bg-[#faf5ff] text-[#211327] border-[#e9d5ff] hover:border-[#9333ea]"
              }`}
            >
              View Curriculum
            </Button>
          </a>
        </div>

        {/* Stats Grid - Soft Purple Glass Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className={`p-6 rounded-[19.2px] border text-center ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="text-3xl font-extrabold text-[#ff63f9] mb-1">102</div>
            <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/70" : "text-[#211327]"}`}>Micro Concepts</div>
          </div>
          <div className={`p-6 rounded-[19.2px] border text-center ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="text-3xl font-extrabold text-white mb-1">6</div>
            <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/70" : "text-[#211327]"}`}>Core Modules</div>
          </div>
          <div className={`p-6 rounded-[19.2px] border text-center ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="text-3xl font-extrabold text-white mb-1">3.5h</div>
            <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/70" : "text-[#211327]"}`}>freeCodeCamp Video</div>
          </div>
          <div className={`p-6 rounded-[19.2px] border text-center ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="text-3xl font-extrabold text-[#ff63f9] mb-1">100%</div>
            <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/70" : "text-[#211327]"}`}>Free & Interactive</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Designed for Daily Tech Consistency</h2>
          <p className={`text-base ${isDark ? "text-white/70" : "text-[#211327]"}`}>
            No long overwhelming lectures. Focus on one single concept each day with immediate visual feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-[19.2px] border ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="w-10 h-10 rounded-lg bg-[#ff63f9]/20 text-[#ff63f9] flex items-center justify-center text-xl mb-4 font-bold">
              <PlayCircleOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2">Automated Video Timestamps</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-[#211327]"}`}>
              Each daily lesson embeds the freeCodeCamp tutorial automatically pre-configured to start and end at the exact video segment.
            </p>
          </div>

          <div className={`p-6 rounded-[19.2px] border ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center text-xl mb-4 font-bold">
              <BookOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2">W3Schools Documentation</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-[#211327]"}`}>
              Direct links and structured cards mapping to official W3Schools documentation with syntax guides and code examples.
            </p>
          </div>

          <div className={`p-6 rounded-[19.2px] border ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <div className="w-10 h-10 rounded-lg bg-[#ff63f9]/20 text-[#ff63f9] flex items-center justify-center text-xl mb-4 font-bold">
              <TrophyOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2">Ant Design Dashboard</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-[#211327]"}`}>
              Track your progress visually. Completed chapters turn pink in the Ant Design sidebar with instant progress updates.
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM PREVIEW SECTION */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Tag color="#ff63f9" className="font-semibold mb-2 text-black border-none">COMPLETE ROADMAP</Tag>
            <h2 className="text-3xl font-bold">JavaScript Curriculum Modules</h2>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button type="primary" icon={<CodeOutlined />} className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md">
              Open Learning Workspace
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {MODULES_DATA.map((module, idx) => (
            <div
              key={module.id}
              className={`p-6 rounded-[19.2px] border transition-all ${
                isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ffffff15] mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff63f9] font-extrabold text-sm">MODULE 0{idx + 1}</span>
                    <Badge count={`${module.days.length} Lessons`} style={{ backgroundColor: "#ff63f9", color: "#000000" }} />
                  </div>
                  <h3 className="text-xl font-bold mt-1 mb-1">{module.title.replace(/^Module \d+:\s*/, "")}</h3>
                  <p className={`text-xs m-0 ${isDark ? "text-white/70" : "text-[#211327]"}`}>{module.description}</p>
                </div>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {module.days.map((day) => {
                  const isCompleted = completedDays.includes(day.id);
                  return (
                    <Link key={day.id} href={`/learn/day/${day.id}`} className="no-underline">
                      <div
                        className={`p-3 rounded-lg border text-sm flex items-center justify-between transition-all group ${
                          isCompleted
                            ? isDark
                              ? "bg-[#ff63f9]/20 border-[#ff63f9] text-[#ff63f9]"
                              : "bg-[#9333ea]/10 border-[#9333ea] text-[#9333ea]"
                            : isDark
                            ? "bg-[#000000] border-[#ffffff15] text-white hover:border-[#ff63f9]"
                            : "bg-white border-[#e9d5ff] text-[#211327] hover:border-[#9333ea]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isCompleted ? (
                            <CheckCircleFilled className="text-[#ff63f9] text-base shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-full bg-[#ff63f9]/20 text-[#ff63f9] font-bold text-[11px] flex items-center justify-center shrink-0">
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

      {/* CTA CARD - Purple Glass Spec */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-[24px] bg-[#211327] text-white p-8 md:p-12 text-center shadow-none relative overflow-hidden border border-[#ffffff25]">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Ready to Start Your 100 Days JS Challenge?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-base font-medium">
              Join students mastering JavaScript one daily micro-concept at a time. Free, structured, and interactive.
            </p>
            <Link href={`/learn/day/${nextDay}`}>
              <Button size="large" className="h-12 px-10 text-sm font-bold bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none rounded-md">
                Launch Learning Workspace Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
