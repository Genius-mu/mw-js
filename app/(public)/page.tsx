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
      {/* HERO SECTION - Pure Brown Palette */}
      <section className="relative pt-12 md:pt-20 pb-12 px-4 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#755C1B] bg-[#2B1D0E] text-[#E5C989] text-xs font-semibold mb-6">
          <ThunderboltOutlined className="text-[#E5C989]" />
          <span>Interactive 100+ Days JavaScript Micro-Learning Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Break Down JavaScript into <br />
          <span className="text-[#E5C989]">
            Bite-Sized Daily Habits
          </span>
        </h1>

        <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-normal leading-relaxed ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}>
          Learn JavaScript step-by-step with Beau Carnes’ 3.5-hour freeCodeCamp course. 
          Split into 100+ daily micro-concepts with timestamped videos, W3Schools documentation, and instant progress tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href={`/learn/day/${nextDay}`}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="h-14 px-8 text-base font-bold bg-[#7A4419] text-[#D7BE82] hover:bg-[#93521E] border-none shadow-md rounded-xl"
            >
              {user ? `Continue Learning (Day ${nextDay})` : "Start Learning Free"}
            </Button>
          </Link>
          <a href="#curriculum">
            <Button
              size="large"
              icon={<BookOutlined />}
              className={`h-14 px-8 text-base font-semibold rounded-xl border-[#755C1B] ${
                isDark ? "bg-[#2B1D0E] text-[#D7BE82] hover:border-[#E5C989]" : "bg-white text-[#1A120B] hover:border-[#7A4419]"
              }`}
            >
              Explore 6 Modules
            </Button>
          </a>
        </div>

        {/* Stats Grid - Solid Brown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className={`text-center border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="text-3xl font-extrabold text-[#E5C989] mb-1">102</div>
            <div className="text-xs text-[#D7BE82] font-medium uppercase tracking-wider">Micro Concepts</div>
          </Card>
          <Card className={`text-center border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="text-3xl font-extrabold text-[#D7BE82] mb-1">6</div>
            <div className="text-xs text-[#D7BE82] font-medium uppercase tracking-wider">Core Modules</div>
          </Card>
          <Card className={`text-center border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="text-3xl font-extrabold text-[#7A4419] mb-1">3.5h</div>
            <div className="text-xs text-[#D7BE82] font-medium uppercase tracking-wider">freeCodeCamp Video</div>
          </Card>
          <Card className={`text-center border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="text-3xl font-extrabold text-[#755C1B] mb-1">100%</div>
            <div className="text-xs text-[#D7BE82] font-medium uppercase tracking-wider">Free & Interactive</div>
          </Card>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-[#E5C989]">Designed for Stress-Free Daily Consistency</h2>
          <p className={`text-base ${isDark ? "text-[#D7BE82]" : "text-[#7A4419]"}`}>
            No long overwhelming lectures. Focus on one single concept each day with immediate visual feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="w-12 h-12 rounded-xl bg-[#7A4419] text-[#D7BE82] flex items-center justify-center text-2xl mb-4 font-bold border border-[#755C1B]">
              <PlayCircleOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#E5C989]">Automated Video Timestamps</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}>
              Each daily lesson embeds the freeCodeCamp tutorial automatically pre-configured to start and end at the exact video segment.
            </p>
          </Card>

          <Card className={`border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="w-12 h-12 rounded-xl bg-[#755C1B] text-[#D7BE82] flex items-center justify-center text-2xl mb-4 font-bold border border-[#7A4419]">
              <BookOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#E5C989]">W3Schools Documentation</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}>
              Direct links and structured cards mapping to official W3Schools documentation with syntax guides and code examples.
            </p>
          </Card>

          <Card className={`border shadow-sm ${isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"}`}>
            <div className="w-12 h-12 rounded-xl bg-[#400406] text-[#D7BE82] flex items-center justify-center text-2xl mb-4 font-bold border border-[#755C1B]">
              <TrophyOutlined />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#E5C989]">Ant Design Dashboard</h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}>
              Track your progress visually. Completed chapters turn green in the Ant Design sidebar with instant progress updates.
            </p>
          </Card>
        </div>
      </section>

      {/* CURRICULUM PREVIEW SECTION */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Tag color="#7A4419" className="font-semibold mb-2 text-[#D7BE82] border-none">COMPLETE ROADMAP</Tag>
            <h2 className="text-3xl font-bold text-[#E5C989]">JavaScript Curriculum Modules</h2>
          </div>
          <Link href={`/learn/day/${nextDay}`}>
            <Button type="primary" icon={<CodeOutlined />} className="bg-[#7A4419] text-[#D7BE82] hover:bg-[#93521E] border-none font-bold">
              Open Learning Dashboard
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {MODULES_DATA.map((module, idx) => (
            <Card
              key={module.id}
              className={`border transition-all ${
                isDark ? "bg-[#2B1D0E] border-[#755C1B]" : "bg-white border-[#D7BE82]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#755C1B] mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E5C989] font-extrabold text-sm">MODULE 0{idx + 1}</span>
                    <Badge count={`${module.days.length} Lessons`} style={{ backgroundColor: "#7A4419", color: "#D7BE82" }} />
                  </div>
                  <h3 className="text-xl font-bold mt-1 mb-1 text-[#E5C989]">{module.title.replace(/^Module \d+:\s*/, "")}</h3>
                  <p className={`text-xs m-0 ${isDark ? "text-[#D7BE82]" : "text-[#7A4419]"}`}>{module.description}</p>
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
                              ? "bg-[#7A4419] border-[#7A4419] text-[#E5C989]"
                              : "bg-[#D7BE82] border-[#7A4419] text-[#1A120B]"
                            : isDark
                            ? "bg-[#1A120B] border-[#755C1B] text-[#D7BE82] hover:border-[#E5C989]"
                            : "bg-[#FAF4E8] border-[#D7BE82] text-[#1A120B] hover:border-[#7A4419]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isCompleted ? (
                            <CheckCircleFilled className="text-[#E5C989] text-base shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-full bg-[#7A4419] text-[#D7BE82] font-bold text-[11px] flex items-center justify-center shrink-0">
                              {day.day}
                            </span>
                          )}
                          <span className="truncate font-medium group-hover:text-[#E5C989] transition-colors">
                            {day.title}
                          </span>
                        </div>
                        <FieldTimeOutlined className="text-[#755C1B] text-xs shrink-0 ml-2" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA CARD - Solid Brown Palette */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl bg-[#2B1D0E] text-[#D7BE82] p-8 md:p-12 text-center shadow-xl relative overflow-hidden border border-[#755C1B]">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#E5C989]">Ready to Start Your 100 Days JS Challenge?</h2>
            <p className="text-[#D7BE82] max-w-xl mx-auto mb-8 text-base font-medium">
              Join students mastering JavaScript one daily micro-concept at a time. Free, structured, and interactive.
            </p>
            <Link href={`/learn/day/${nextDay}`}>
              <Button size="large" className="h-14 px-10 text-lg font-bold bg-[#7A4419] text-[#D7BE82] hover:bg-[#93521E] border-none shadow-md rounded-xl">
                Launch Learning Workspace Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
