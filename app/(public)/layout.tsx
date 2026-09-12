"use client";

import React from "react";
import Link from "next/link";
import { Button, Switch, Tooltip } from "antd";
import {
  CodeOutlined,
  BulbOutlined,
  UserOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  BookOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, themeMode, toggleTheme, getNextUncompletedDay, progressPercent } = useLearning();

  const isDark = themeMode === "dark";
  const nextDay = getNextUncompletedDay();

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300">
      {/* Header Navigation */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b px-4 lg:px-8 py-3 flex items-center justify-between transition-colors ${
          isDark ? "bg-slate-900/90 border-slate-800 text-slate-100" : "bg-white/90 border-slate-200 text-slate-900"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight flex items-center gap-2">
              <span className={isDark ? "text-white" : "text-slate-900"}>JS Learning</span>
              <span className="text-amber-500">Hub</span>
            </div>
            <p className="text-[11px] text-slate-400 m-0 font-medium tracking-wide">100+ DAYS OF JAVASCRIPT</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
          <a
            href="#curriculum"
            className={`no-underline hover:text-amber-500 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Curriculum
          </a>
          <a
            href="#features"
            className={`no-underline hover:text-amber-500 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Features
          </a>
          <a
            href="https://www.youtube.com/watch?v=PkZNo7MFNFg"
            target="_blank"
            rel="noopener noreferrer"
            className={`no-underline flex items-center gap-1 hover:text-red-500 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            <PlayCircleOutlined /> freeCodeCamp Video
          </a>
          <a
            href="https://www.w3schools.com/js/"
            target="_blank"
            rel="noopener noreferrer"
            className={`no-underline flex items-center gap-1 hover:text-emerald-500 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            <BookOutlined /> W3Schools Docs
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <BulbOutlined className={isDark ? "text-amber-400" : "text-slate-500"} />
              <Switch checked={isDark} onChange={toggleTheme} size="small" />
            </div>
          </Tooltip>

          {user ? (
            <div className="flex items-center gap-3">
              <Link href={`/learn/day/${nextDay}`}>
                <Button type="primary" size="large" icon={<RocketOutlined />} className="bg-amber-500 hover:bg-amber-600 border-none font-semibold">
                  Resume Day {nextDay} ({progressPercent}%)
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <Button type="primary" size="large" icon={<UserOutlined />} className="font-semibold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 text-center text-xs transition-colors ${isDark ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-amber-500">⚡ JS Learning Hub</span>
            <span>— Master JavaScript in bite-sized daily micro-lessons</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by freeCodeCamp & Beau Carnes</span>
            <span>•</span>
            <span>W3Schools Reference</span>
            <span>•</span>
            <span>Next.js & Ant Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
