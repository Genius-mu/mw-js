"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, Tag, Progress, Badge } from "antd";
import {
  RocketOutlined,
  PlayCircleOutlined,
  BookOutlined,
  CheckCircleFilled,
  CodeOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";
import { MODULES_DATA, CURRICULUM_DATA } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";

export default function LandingPage() {
  const { user, themeMode, progressPercent, getNextUncompletedDay, completedDays } = useLearning();

  const isDark = themeMode === "dark";
  const nextDay = getNextUncompletedDay();

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-12 px-4 max-w-6xl mx-auto text-center">
        {/* Glow effect background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 dark:bg-amber-500/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-6">
          <ThunderboltOutlined className="text-amber-500 animate-pulse" />
          <span>Interactive 100+ Days JavaScript Micro-Learning Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Break Down JavaScript into <br />
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Bite-Sized Daily Habits
          </span>
        </h1>

        <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-normal leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          Learn JavaScript step-by-step with Beau Carnes’ 3.5-hour freeCodeCamp course. 
          Split into 100+ daily micro-concepts with timestamped videos, W3Schools documentation, and instant progress tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-14 px-8 text-base font-bold bg-amber-500 hover:bg-amber-600 border-none shadow-lg shadow-amber-500/30 rounded-xl"
            >
              {user ? `Continue Learning (Day ${nextDay})` : "Start Learning Free"}
            </Button>
          </Link>
          <a href="#curriculum">
            <Button
              size="large"
              icon={<BookOutlined />}
              className={`h-14 px-8 text-base font-semibold rounded-xl ${
                isDark ? "bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500" : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
              }`}
            >
              Explore 6 Modules
            </Button>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className={`text-center border shadow-sm ${isDark ? "bg-slate-800/60 border-slate-700" : "bg-white/80 border-slate-200"}`}>
            <div className="text-3xl font-extrabold text-amber-500 mb-1">102</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Micro Concepts</div>
          </Card>
          <Card className={`text-center border shadow-sm ${isDark ? "bg-slate-800/60 border-slate-700" : "bg-white/80 border-slate-200"}`}>
            <div className="text-3xl font-extrabold text-blue-500 mb-1">6</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Core Modules</div>
          </Card>
          <Card className={`text-center border shadow-sm ${isDark ? "bg-slate-800/60 border-slate-700" : "bg-white/80 border-slate-200"}`}>
            <div className="text-3xl font-extrabold text-emerald-500 mb-1">3.5h</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">freeCodeCamp Video</div>
          </Card>
          <Card className={`text-center border shadow-sm ${isDark ? "bg-slate-800/60 border-slate-700" : "bg-white/80 border-slate-200"}`}>
            <div className="text-3xl font-extrabold text-purple-500 mb-1">100%</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Free & Interactive</div>
          </Card>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Designed for Stress-Free Daily Consistency</h2>
          <p className={`text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            No long overwhelming lectures. Focus on one single concept each day with immediate visual feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`border hover:shadow-xl transition-all ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-2xl mb-4">
              <PlayCircleOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2">Automated Video Timestamps</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Each daily lesson embeds the freeCodeCamp tutorial automatically pre-configured to start and end at the exact video segment.
            </p>
          </Card>

          <Card className={`border hover:shadow-xl transition-all ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl mb-4">
              <BookOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2">W3Schools Documentation</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Direct links and structured cards mapping to official W3Schools documentation with syntax guides and code examples.
            </p>
          </Card>

          <Card className={`border hover:shadow-xl transition-all ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl mb-4">
              <TrophyOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2">Ant Design Dashboard</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Track your progress visually. Completed chapters turn green in the Ant Design sidebar with instant progress updates.
            </p>
          </Card>
        </div>
      </section>

      {/* CURRICULUM PREVIEW SECTION */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Tag color="amber" className="font-semibold mb-2">COMPLETE ROADMAP</Tag>
            <h2 className="text-3xl font-bold">JavaScript Curriculum Modules</h2>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button type="primary" icon={<CodeOutlined />} className="bg-amber-500 hover:bg-amber-600 border-none font-semibold">
              Open Learning Dashboard
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {MODULES_DATA.map((module, idx) => (
            <Card
              key={module.id}
              className={`border transition-all ${
                isDark ? "bg-slate-800/40 border-slate-700 hover:border-amber-500/50" : "bg-white border-slate-200 hover:border-amber-500/50"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700/60 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-extrabold text-sm">MODULE 0{idx + 1}</span>
                    <Badge count={`${module.days.length} Lessons`} style={{ backgroundColor: isDark ? "#334155" : "#e2e8f0", color: isDark ? "#cbd5e1" : "#475569" }} />
                  </div>
                  <h3 className="text-xl font-bold mt-1 mb-1">{module.title.replace(/^Module \d+:\s*/, "")}</h3>
                  <p className={`text-xs m-0 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{module.description}</p>
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
                              ? "bg-emerald-950/20 border-emerald-800/60 text-emerald-300"
                              : "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : isDark
                            ? "bg-slate-900/60 border-slate-700/60 text-slate-200 hover:border-amber-500/50"
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isCompleted ? (
                            <CheckCircleFilled className="text-emerald-500 text-base shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 font-bold text-[11px] flex items-center justify-center shrink-0">
                              {day.day}
                            </span>
                          )}
                          <span className="truncate font-medium group-hover:text-amber-500 transition-colors">
                            {day.title}
                          </span>
                        </div>
                        <FieldTimeOutlined className="text-slate-400 text-xs shrink-0 ml-2" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA CARD */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Ready to Start Your 100 Days JS Challenge?</h2>
            <p className="text-amber-100 max-w-xl mx-auto mb-8 text-base font-medium">
              Join students mastering JavaScript one daily micro-concept at a time. Free, structured, and interactive.
            </p>
            <Link href={`/learn/day/${nextDay}`}>
              <Button size="large" className="h-14 px-10 text-lg font-bold bg-white text-amber-600 hover:bg-slate-100 border-none shadow-lg rounded-xl">
                Launch Learning Workspace Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
