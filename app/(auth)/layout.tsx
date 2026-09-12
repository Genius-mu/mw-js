"use client";

import React from "react";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { themeMode } = useLearning();
  const isDark = themeMode === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-amber-500/30">
            ⚡
          </div>
          <div className="text-left">
            <div className="font-extrabold text-xl tracking-tight">
              <span>JS Learning</span> <span className="text-amber-500">Hub</span>
            </div>
            <p className="text-xs text-slate-400 m-0 font-medium">100+ DAYS OF JAVASCRIPT</p>
          </div>
        </Link>
      </div>

      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
