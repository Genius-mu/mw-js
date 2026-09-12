"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import {
  UserOutlined,
  RocketOutlined,
  CheckCircleFilled,
  CloseOutlined
} from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, getNextUncompletedDay, progressPercent } = useLearning();
  const [cookieConsent, setCookieConsent] = useState(true);

  const nextDay = getNextUncompletedDay();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-white relative">
      {/* Floating Bordered Navbar Container (pxxl.app style) */}
      <div className="p-4 max-w-5xl mx-auto w-full sticky top-0 z-50">
        <header className="rounded-2xl border border-[#ffffff25] bg-[#211327]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-lg">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-9 h-9 rounded-lg bg-[#ff63f9] text-black flex items-center justify-center text-lg font-extrabold shadow-sm">
              ⚡
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <span className="text-white">JS Learning</span>
                <span className="text-[#ff63f9]">Hub</span>
              </div>
              <p className="text-[10px] m-0 font-medium tracking-wide text-white/50">
                100+ DAYS OF JAVASCRIPT
              </p>
            </div>
          </Link>

          {/* Navigation Links - Only Curriculum & Features (no video/docs links) */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a
              href="#curriculum"
              className="no-underline text-white hover:text-[#ff63f9] transition-colors"
            >
              Curriculum
            </a>
            <a
              href="#features"
              className="no-underline text-white hover:text-[#ff63f9] transition-colors"
            >
              Features
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-4">
            {user ? (
              <Link href={`/learn/day/${nextDay}`}>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md"
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
                  className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md"
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

      {/* Persistent Cookie Notice (pxxl.app component spec) */}
      {cookieConsent && (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm p-4 rounded-[19.2px] bg-[#211327] border border-[#ffffff25] shadow-2xl text-xs space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <span>🍪 Storage Notice</span>
            </div>
            <button
              onClick={() => setCookieConsent(false)}
              className="text-white/40 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <CloseOutlined />
            </button>
          </div>
          <p className="text-white/70 m-0 leading-relaxed">
            We store your 100+ Days JS progress & notes locally in your browser. No third-party tracking.
          </p>
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              size="small"
              type="primary"
              onClick={() => setCookieConsent(false)}
              className="bg-[#ff63f9] text-black border-none font-bold text-xs rounded-md"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#ffffff15] py-8 px-4 text-center text-xs bg-[#000000] text-white/50">
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
