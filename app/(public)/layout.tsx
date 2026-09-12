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
      {/* Floating Bordered Navbar Container */}
      <div className="p-4 max-w-6xl mx-auto w-full sticky top-0 z-50">
        <header
          className={`rounded-2xl border px-6 py-3.5 flex items-center justify-between transition-colors shadow-sm ${
            isDark
              ? "bg-[#211327] border-[#ffffff25] text-white"
              : "bg-[#faf5ff] border-[#e9d5ff] text-[#211327]"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-9 h-9 rounded-lg bg-[#ff63f9] text-black flex items-center justify-center text-lg font-extrabold shadow-sm">
              ⚡
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <span className={isDark ? "text-white" : "text-[#211327]"}>JS Learning</span>
                <span className="text-[#ff63f9]">Hub</span>
              </div>
              <p className={`text-[10px] m-0 font-medium tracking-wide ${isDark ? "text-[#ffffff80]" : "text-[#9333ea]"}`}>
                100+ DAYS OF JAVASCRIPT
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <a
              href="#curriculum"
              className={`no-underline hover:text-[#ff63f9] transition-colors ${isDark ? "text-white" : "text-[#211327]"}`}
            >
              Curriculum
            </a>
            <a
              href="#features"
              className={`no-underline hover:text-[#ff63f9] transition-colors ${isDark ? "text-white" : "text-[#211327]"}`}
            >
              Features
            </a>
            <a
              href="https://www.youtube.com/watch?v=PkZNo7MFNFg"
              target="_blank"
              rel="noopener noreferrer"
              className={`no-underline flex items-center gap-1 hover:text-[#ff63f9] transition-colors ${isDark ? "text-white" : "text-[#211327]"}`}
            >
              <PlayCircleOutlined /> freeCodeCamp Video
            </a>
            <a
              href="https://www.w3schools.com/js/"
              target="_blank"
              rel="noopener noreferrer"
              className={`no-underline flex items-center gap-1 hover:text-[#ff63f9] transition-colors ${isDark ? "text-white" : "text-[#211327]"}`}
            >
              <BookOutlined /> W3Schools Docs
            </a>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-4">
            <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <BulbOutlined className={isDark ? "text-[#ff63f9]" : "text-[#9333ea]"} />
                <Switch checked={isDark} onChange={toggleTheme} size="small" />
              </div>
            </Tooltip>

            {user ? (
              <Link href={`/learn/day/${nextDay}`}>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  className={
                    isDark
                      ? "bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md"
                      : "bg-[#211327] text-white hover:bg-[#9333ea] border-none font-bold rounded-md"
                  }
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
                  className={
                    isDark
                      ? "bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md"
                      : "bg-[#211327] text-white hover:bg-[#9333ea] border-none font-bold rounded-md"
                  }
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </header>
      </div>

      {/* Main Public Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className={`border-t py-8 px-4 text-center text-xs ${
          isDark
            ? "bg-[#000000] border-[#ffffff15] text-[#ffffff80]"
            : "bg-[#faf5ff] border-[#e9d5ff] text-[#211327]"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#ff63f9]">⚡ JS Learning Hub</span>
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
