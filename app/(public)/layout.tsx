"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import {
  UserOutlined,
  RocketOutlined,
  CloseOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, getNextUncompletedDay } = useLearning();
  const [cookieConsent, setCookieConsent] = useState(true);

  const nextDay = getNextUncompletedDay();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-[#e2e2e2] relative bg-grid-pattern overflow-x-clip">
      {/* pxxl.app Style Floating Centered Fixed Glass Navigation Header */}
      <div className="fixed top-3 left-0 right-0 z-50 px-4 flex justify-center w-full pointer-events-auto">
        <header className="w-full max-w-4xl bg-[#0a0a0e]/60 backdrop-blur-2xl border border-white/12 rounded-[14px] px-5 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.65)] flex items-center justify-between gap-4 text-xs transition-all">
          {/* Brand Logo - Pure Bulb Icon, No Text */}
          <Link href="/" className="flex items-center no-underline group">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-xl flex items-center justify-center border border-white/15 shadow-[0_0_15px_rgba(255,99,249,0.3)] group-hover:scale-110 transition-transform">
              💡
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

          {/* Right Action Button - White with Purple Glitch Bottom Shadow, turns purple on hover */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="no-underline">
              <button
                type="button"
                className="bg-white text-black font-extrabold text-xs h-8 px-4 rounded-[6px] shadow-[0_4px_0_0_#ff63f9] hover:bg-[#ff63f9] hover:text-black hover:shadow-[0_2px_0_0_#ffffff] transition-all transform active:translate-y-1 active:shadow-none flex items-center gap-1.5 cursor-pointer border-none"
              >
                <UserOutlined />
                <span>Sign In</span>
              </button>
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

      {/* pxxl.app Style Multi-Column Footer */}
      <footer className="border-t border-white/10 pt-16 pb-12 px-4 md:px-8 bg-[#000000] text-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand & Social Column (Spans 2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              <Link href="/" className="flex items-center gap-2.5 no-underline group w-fit">
                <div className="w-8 h-8 rounded-xl bg-white/10 text-xl flex items-center justify-center border border-white/15 shadow-[0_0_15px_rgba(255,99,249,0.3)] group-hover:scale-110 transition-transform">
                  💡
                </div>
                <div className="font-extrabold text-base tracking-tight text-white">
                  JS Learning <span className="text-[#ff63f9]">Hub</span>
                </div>
              </Link>

              <p className="text-sm text-white/50 leading-relaxed max-w-sm m-0">
                Master modern ECMAScript with structured daily micro-habits, interactive in-browser V8 execution, and verified completion credentials.
              </p>

              {/* Social Icon Boxes matching pxxl.app */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#ff63f9] hover:border-[#ff63f9] transition-all no-underline shadow-sm"
                >
                  <GithubOutlined className="text-base" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-xl bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#ff63f9] hover:border-[#ff63f9] transition-all no-underline shadow-sm"
                >
                  <TwitterOutlined className="text-base" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#ff63f9] hover:border-[#ff63f9] transition-all no-underline shadow-sm"
                >
                  <LinkedinOutlined className="text-base" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#ff63f9] hover:border-[#ff63f9] transition-all no-underline shadow-sm"
                >
                  <YoutubeOutlined className="text-base" />
                </a>
                <a
                  href="https://developer.mozilla.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MDN Web Docs"
                  className="w-10 h-10 rounded-xl bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#ff63f9] hover:border-[#ff63f9] transition-all no-underline shadow-sm"
                >
                  <GlobalOutlined className="text-base" />
                </a>
              </div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>V8 Runtime • ES2026 Systems Online</span>
              </div>
            </div>

            {/* Column 2: Curriculum */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-white/40 m-0">
                Curriculum
              </h4>
              <ul className="space-y-2.5 text-sm list-none p-0 m-0">
                <li>
                  <a href="#curriculum" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    01. Basics & Data Types
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    02. Arrays & Logic
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    03. Functions & Scope
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    04. Objects & Structures
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    05. Loops & Iteration
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    06. Modern ES2026 Core
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-white/40 m-0">
                Platform
              </h4>
              <ul className="space-y-2.5 text-sm list-none p-0 m-0">
                <li>
                  <Link href={`/learn/day/${nextDay}`} className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    Daily Habit Tracker
                  </Link>
                </li>
                <li>
                  <Link href={`/learn/day/${nextDay}`} className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    Live In-Browser Terminal
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    200+ Production Projects
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    JS Architecture Stream
                  </a>
                </li>
                <li>
                  <Link href="/certificate" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    Verifiable Certificate
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-white/40 m-0">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm list-none p-0 m-0">
                <li>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline"
                  >
                    MDN Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://tc39.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline"
                  >
                    ECMAScript Standards
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <Link href="/login" className="text-white/60 hover:text-[#ff63f9] transition-colors no-underline">
                    Developer Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar Separator */}
          <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div className="font-mono">
              © JS Learning Hub • MMXXIV – MMXXVI. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-white/40">
              <span>Next.js Turbopack</span>
              <span>•</span>
              <span>Ant Design</span>
              <span>•</span>
              <span className="text-[#ff63f9]">Built for Developers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
