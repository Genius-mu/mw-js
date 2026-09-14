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
          {/* Brand Logo - Bulb Icon + CODA */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-xl flex items-center justify-center border border-white/15 shadow-[0_0_15px_rgba(255,99,249,0.3)] group-hover:scale-110 transition-transform">
              💡
            </div>
            <span className="font-extrabold text-sm tracking-wider text-white">CODA</span>
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
      <main className="flex-1 pt-20 md:pt-24">{children}</main>

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
            We store your 100+ Days CODA progress & notes locally in your browser.
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

      {/* Exact pxxl.app Style Footer */}
      <footer className="border-t border-white/10 pt-20 pb-8 px-6 sm:px-12 lg:px-16 bg-[#000000] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Row: Left Brand/Social + Right 3 Columns */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
            {/* Left Side: Single-line text, 4 social icon boxes, copyright */}
            <div className="max-w-md">
              <p className="text-sm text-white/60 mb-8 leading-relaxed font-normal">
                Develop with your favorite tools. Master modern JavaScript, instantly.
              </p>

              {/* 4 Social Media Boxes exactly matching pxxl.app */}
              <div className="flex items-center gap-3 mb-8">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-lg bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-lg bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-lg bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.52c-.01 2.37-1.12 4.67-3.03 6.09-1.92 1.43-4.48 1.93-6.84 1.34-2.36-.59-4.37-2.27-5.32-4.51-.95-2.24-.76-4.88.51-6.95 1.27-2.07 3.56-3.42 6-3.56v4.08c-1.3.11-2.52.88-3.13 2.04-.61 1.16-.5 2.59.29 3.65.79 1.06 2.16 1.63 3.49 1.45 1.33-.18 2.45-1.12 2.85-2.39.19-.6.28-1.23.28-1.87V.02z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="w-10 h-10 rounded-lg bg-[#0c0c10] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <div className="text-xs text-white/40 font-normal">
                © CODA • MMXXIV — MMXXVI
              </div>
            </div>

            {/* Right Side: Exactly 3 Columns (Links, Support, Legal) */}
            <div className="grid grid-cols-3 gap-8 sm:gap-14 lg:gap-20">
              {/* Column 1: Links */}
              <div>
                <h4 className="text-sm font-bold text-white mb-6 tracking-wide">
                  Links
                </h4>
                <ul className="space-y-3.5 text-sm list-none p-0 m-0">
                  <li>
                    <a href="#curriculum" className="text-white/50 hover:text-white transition-colors no-underline">
                      Curriculum
                    </a>
                  </li>
                  <li>
                    <Link href={`/learn/day/${nextDay}`} className="text-white/50 hover:text-white transition-colors no-underline">
                      Workspace
                    </Link>
                  </li>
                  <li>
                    <a href="#features" className="text-white/50 hover:text-white transition-colors no-underline">
                      Projects
                    </a>
                  </li>
                  <li>
                    <Link href={`/learn/day/${nextDay}`} className="text-white/50 hover:text-white transition-colors no-underline">
                      Terminal
                    </Link>
                  </li>
                  <li>
                    <Link href="/certificate" className="text-white/50 hover:text-white transition-colors no-underline">
                      Certificate
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Support */}
              <div>
                <h4 className="text-sm font-bold text-white mb-6 tracking-wide">
                  Support
                </h4>
                <ul className="space-y-3.5 text-sm list-none p-0 m-0">
                  <li>
                    <a href="#faq" className="text-white/50 hover:text-white transition-colors no-underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@coda.dev" className="text-white/50 hover:text-white transition-colors no-underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-white/50 hover:text-white transition-colors no-underline">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Legal */}
              <div>
                <h4 className="text-sm font-bold text-white mb-6 tracking-wide">
                  Legal
                </h4>
                <ul className="space-y-3.5 text-sm list-none p-0 m-0">
                  <li>
                    <Link href="/terms" className="text-white/50 hover:text-white transition-colors no-underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-white/50 hover:text-white transition-colors no-underline">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Large Outlined Stroked Watermark Text at the Bottom with Dark Overlay Fade (matching PXXL SPACE) */}
          <div className="relative w-full text-center overflow-hidden pointer-events-none select-none pt-20 sm:pt-28 md:pt-36 pb-0">
            <span
              className="font-black text-8xl sm:text-[140px] md:text-[200px] lg:text-[280px] tracking-[0.2em] sm:tracking-[0.25em] uppercase block leading-none text-transparent whitespace-nowrap"
              style={{
                WebkitTextStroke: "1.5px rgba(255, 99, 249, 0.52)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 90%)"
              }}
            >
              CODA
            </span>
            {/* Dark Overlay Gradient to smoothly dissolve the bottom of the letters into black */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </footer>
    </div>
  );
}
