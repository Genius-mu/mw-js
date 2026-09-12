"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import {
  UserOutlined,
  RocketOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, getNextUncompletedDay } = useLearning();
  const [cookieConsent, setCookieConsent] = useState(true);

  const nextDay = getNextUncompletedDay();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-[#e2e2e2] relative bg-grid-pattern">
      {/* pxxl.app Style Minimal Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4 text-xs">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 rounded-[9px] bg-white text-black flex items-center justify-center text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1">
              <span>JS Learning</span>
              <span className="text-[#ff63f9]">Hub</span>
            </div>
          </Link>

          {/* Minimal Essential Navigation Links (pxxl.app style) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-white/70">
            <a href="#curriculum" className="no-underline text-white/70 hover:text-white transition-colors">
              Curriculum
            </a>
            <a href="#features" className="no-underline text-white/70 hover:text-white transition-colors">
              Features
            </a>
            <a href="#docs" className="no-underline text-white/70 hover:text-white transition-colors">
              Docs
            </a>
            <span className="inline-flex items-center gap-1 text-[#ff63f9] font-semibold">
              Pro <span className="text-[9px] bg-[#ff63f9]/20 text-[#ff63f9] px-1.5 py-0.5 rounded-[5px] font-mono">v1.0</span>
            </span>
          </nav>

          {/* Right Action Button (Crisp White, 9px Radius) */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link href={`/learn/day/${nextDay}`}>
                <Button
                  type="primary"
                  icon={<RocketOutlined />}
                  className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 px-4 rounded-[9px] shadow-sm"
                >
                  Resume Day {nextDay}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 px-4 rounded-[9px] shadow-sm"
                >
                  Get JS Hub Pro
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">{children}</main>

      {/* Persistent Cookie Notice */}
      {cookieConsent && (
        <div className="fixed bottom-4 left-4 z-50 max-w-xs p-3.5 rounded-xl bg-[#08080c] border border-white/10 shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-white text-xs">🍪 Storage Notice</span>
            <button
              onClick={() => setCookieConsent(false)}
              className="text-white/40 hover:text-white bg-transparent border-none cursor-pointer p-0"
            >
              <CloseOutlined className="text-xs" />
            </button>
          </div>
          <p className="text-white/60 text-[11px] m-0 leading-relaxed">
            We store your 100+ Days JS progress & notes locally in your browser.
          </p>
          <div className="flex items-center justify-end pt-0.5">
            <Button
              size="small"
              type="primary"
              onClick={() => setCookieConsent(false)}
              className="bg-white text-black hover:bg-white/90 border-none font-bold text-[11px] h-6 px-2.5 rounded-[9px]"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs bg-[#000000] text-white/40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-[#ff63f9]">⚡ JS Learning Hub</span>
            <span className="text-[11px]">— Master JavaScript in daily micro-lessons</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/40">
            <span>Interactive 100+ Days Learning Platform</span>
            <span>•</span>
            <span>Next.js & Ant Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
