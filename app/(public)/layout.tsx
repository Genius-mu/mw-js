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
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-[#e2e2e2] relative bg-grid-pattern overflow-x-hidden">
      {/* pxxl.app Style Floating Centered Fixed Glass Navigation Header */}
      <div className="fixed top-3 left-0 right-0 z-50 px-4 flex justify-center w-full pointer-events-auto">
        <header className="w-full max-w-4xl bg-[#0a0a0e]/60 backdrop-blur-2xl border border-white/12 rounded-[14px] px-5 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.65)] flex items-center justify-between gap-4 text-xs transition-all">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-7 h-7 rounded-[9px] bg-[#ff63f9] text-black flex items-center justify-center text-xs font-black shadow-[0_0_12px_rgba(255,99,249,0.4)] group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div className="font-bold text-xs md:text-sm tracking-tight text-white flex items-center gap-1">
              <span>JS Learning</span>
              <span className="text-[#ff63f9]">Hub</span>
            </div>
          </Link>

          {/* Minimal Navigation Links (pxxl.app style) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-white/70">
            <a href="#curriculum" className="no-underline text-white/70 hover:text-white transition-colors">
              Curriculum
            </a>
            <a href="#features" className="no-underline text-white/70 hover:text-white transition-colors">
              Features
            </a>
            <a href="#architecture" className="no-underline text-white/70 hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#faq" className="no-underline text-white/70 hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action Button - Vibrant Purple Sign In */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                type="primary"
                icon={<UserOutlined />}
                className="bg-[#ff63f9] text-black hover:bg-[#ff63f9]/90 border-none font-bold text-xs h-8 px-4 rounded-[7px] shadow-[0_0_18px_rgba(255,99,249,0.4)]"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </header>
      </div>

      {/* Main Public Content */}
      <main className="flex-1 pt-16">{children}</main>

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
