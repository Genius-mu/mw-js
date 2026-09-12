"use client";

import React from "react";
import Link from "next/link";
import { Button, Switch, Tooltip } from "antd";
import {
  BulbOutlined,
  UserOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  BookOutlined
} from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, themeMode, toggleTheme, getNextUncompletedDay, progressPercent } = useLearning();

  const isDark = themeMode === "dark";
  const nextDay = getNextUncompletedDay();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header Navigation - Pure Brown Palette */}
      <header
        className={`sticky top-0 z-50 border-b px-4 lg:px-8 py-3 flex items-center justify-between transition-colors ${
          isDark
            ? "bg-[#2B1D0E] border-[#755C1B] text-[#D7BE82]"
            : "bg-[#D7BE82] border-[#7A4419] text-[#1A120B]"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-xl bg-[#7A4419] text-[#D7BE82] flex items-center justify-center text-xl font-bold border border-[#755C1B]">
            ⚡
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight flex items-center gap-2">
              <span className={isDark ? "text-white" : "text-[#1A120B]"}>JS Learning</span>
              <span className="text-[#D7BE82]">Hub</span>
            </div>
            <p className={`text-[11px] m-0 font-medium tracking-wide ${isDark ? "text-[#E5C989]" : "text-[#7A4419]"}`}>
              100+ DAYS OF JAVASCRIPT
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
          <a
            href="#curriculum"
            className={`no-underline hover:text-[#E5C989] transition-colors ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}
          >
            Curriculum
          </a>
          <a
            href="#features"
            className={`no-underline hover:text-[#E5C989] transition-colors ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}
          >
            Features
          </a>
          <a
            href="https://www.youtube.com/watch?v=PkZNo7MFNFg"
            target="_blank"
            rel="noopener noreferrer"
            className={`no-underline flex items-center gap-1 hover:text-[#E5C989] transition-colors ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}
          >
            <PlayCircleOutlined /> freeCodeCamp Video
          </a>
          <a
            href="https://www.w3schools.com/js/"
            target="_blank"
            rel="noopener noreferrer"
            className={`no-underline flex items-center gap-1 hover:text-[#E5C989] transition-colors ${isDark ? "text-[#D7BE82]" : "text-[#1A120B]"}`}
          >
            <BookOutlined /> W3Schools Docs
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <BulbOutlined className={isDark ? "text-[#E5C989]" : "text-[#7A4419]"} />
              <Switch checked={isDark} onChange={toggleTheme} size="small" />
            </div>
          </Tooltip>

          {user ? (
            <Link href={`/learn/day/${nextDay}`}>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                className="bg-[#7A4419] text-[#D7BE82] hover:bg-[#93521E] border-none font-bold"
              >
                Resume Day {nextDay} ({progressPercent}%)
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                type="primary"
                size="large"
                icon={<UserOutlined />}
                className="bg-[#7A4419] text-[#D7BE82] hover:bg-[#93521E] border-none font-bold"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className={`border-t py-8 px-4 text-center text-xs ${
          isDark
            ? "bg-[#1A120B] border-[#755C1B] text-[#D7BE82]"
            : "bg-[#D7BE82] border-[#7A4419] text-[#1A120B]"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#E5C989]">⚡ JS Learning Hub</span>
            <span>— Master JavaScript in bite-sized daily micro-lessons</span>
          </div>
          <div className="flex items-center gap-4 opacity-80">
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
