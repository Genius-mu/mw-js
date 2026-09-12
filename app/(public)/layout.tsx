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
  const { user, getNextUncompletedDay, progressPercent } = useLearning();
  const [cookieConsent, setCookieConsent] = useState(true);

  const nextDay = getNextUncompletedDay();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-[#e2e2e2] relative bg-grid-pattern">
      {/* ReactBits Style Header Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
          {/* Brand & Core Section Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 no-underline group">
              <div className="w-7 h-7 rounded-[9px] bg-white text-black flex items-center justify-center text-xs font-black shadow-sm">
                ⚡
              </div>
              <div className="font-bold text-xs tracking-tight text-white flex items-center gap-1">
                <span>JS Learning</span>
                <span className="text-[#ff63f9]">Hub</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-white/70">
              <a href="#curriculum" className="no-underline text-white/80 hover:text-white transition-colors">Docs</a>
              <a href="#features" className="no-underline text-white/70 hover:text-white transition-colors">Tools</a>
              <span className="no-underline text-[#ff63f9] font-semibold flex items-center gap-1">
                Pro <span className="text-[9px] bg-[#ff63f9]/20 text-[#ff63f9] px-1.5 py-0.2 rounded font-mono">NEW</span>
              </span>
              <a href="#sponsors" className="no-underline text-white/70 hover:text-white transition-colors">Sponsors</a>
            </nav>
          </div>

          {/* Center Search Input Bar (ReactBits Style) */}
          <div className="flex-1 max-w-xs hidden md:block">
            <button
              onClick={() => {
                const el = document.getElementById("search-input");
                if (el) el.focus();
              }}
              className="w-full bg-[#08080c] border border-white/10 hover:border-white/20 text-white/40 text-xs px-3 py-1.5 rounded-[9px] flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Search lessons & docs...</span>
              <span className="text-[10px] font-mono bg-white/10 text-white/70 px-1.5 py-0.5 rounded">/</span>
            </button>
          </div>

          {/* Right Action Controls: Github Stars & Pro CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Genius-mu/mw-js"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[9px] bg-white/5 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors"
            >
              <span className="text-yellow-400">⭐</span>
              <span>47.1K</span>
            </a>

            {user ? (
              <Link href={`/learn/day/${nextDay}`}>
                <Button
                  type="primary"
                  icon={<RocketOutlined />}
                  className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 px-3.5 rounded-[9px] shadow-sm"
                >
                  Resume Day {nextDay}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 px-3.5 rounded-[9px] shadow-sm"
                >
                  Get JS Hub Pro
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Sub-Navigation Category Ribbon (ReactBits Style) */}
        <div className="border-t border-white/5 bg-[#08080c]/60 overflow-x-auto custom-scrollbar px-4 py-1.5 text-[11px] text-white/60">
          <div className="max-w-6xl mx-auto flex items-center gap-4 whitespace-nowrap font-medium">
            <span className="text-[#ff63f9] font-semibold">Introduction</span>
            <a href="#curriculum" className="no-underline text-white/70 hover:text-white">Installation</a>
            <span className="text-white/40">MCP</span>
            <a href="#curriculum" className="no-underline text-white/70 hover:text-white">Index</a>
            <span className="text-white/40">Favorites</span>
            <span className="text-white/30">•</span>
            <a href="#curriculum" className="no-underline text-white/70 hover:text-white">Components</a>
            <a href="#curriculum" className="no-underline text-white/70 hover:text-white">Blocks</a>
            <span className="text-[#ff63f9] font-medium">App UI</span>
            <span className="text-white/30">•</span>
            <span className="text-white/70">Background Studio</span>
            <span className="text-white/70">Text Animations</span>
            <span className="text-white/70">Animations</span>
            <span className="text-white/70">Backgrounds</span>
          </div>
        </div>
      </div>

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
              className="bg-white/75 text-black hover:bg-white/90 border-none font-bold text-[11px] h-6 px-2.5 rounded"
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
