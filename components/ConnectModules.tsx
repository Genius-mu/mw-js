"use client";

import React, { useState } from "react";
import {
  CodeOutlined,
  TableOutlined,
  FunctionOutlined,
  AppstoreOutlined,
  SyncOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  BulbFilled
} from "@ant-design/icons";
import { MODULES_DATA } from "@/lib/curriculum";

export default function ConnectModules() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const icons = [
    <CodeOutlined key="1" className="text-xl sm:text-2xl text-white group-hover:text-[#ff63f9] transition-colors" />,
    <TableOutlined key="2" className="text-xl sm:text-2xl text-white group-hover:text-[#ff63f9] transition-colors" />,
    <FunctionOutlined key="3" className="text-xl sm:text-2xl text-white group-hover:text-[#ff63f9] transition-colors" />,
    <AppstoreOutlined key="4" className="text-xl sm:text-2xl text-white group-hover:text-[#ff63f9] transition-colors" />,
    <SyncOutlined key="5" className="text-xl sm:text-2xl text-white group-hover:text-[#ff63f9] transition-colors" />,
    <RocketOutlined key="6" className="text-xl sm:text-2xl text-white group-hover:text-[#ff63f9] transition-colors" />
  ];

  // SVG Coordinates for 6 icon positions across 800px width connecting to bottom center (400, 180)
  const wirePoints = [
    { startX: 65, startY: 0, endX: 400, endY: 180 },
    { startX: 200, startY: 0, endX: 400, endY: 180 },
    { startX: 335, startY: 0, endX: 400, endY: 180 },
    { startX: 465, startY: 0, endX: 400, endY: 180 },
    { startX: 600, startY: 0, endX: 400, endY: 180 },
    { startX: 735, startY: 0, endX: 400, endY: 180 }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 text-center space-y-10 select-none">
      {/* Title */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight m-0">
          Connect your modules to CODA Core.
        </h2>
        <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto m-0 leading-relaxed">
          Structured concepts stream into the high-performance CODA runtime. Hover any module to inspect data flow.
        </p>
      </div>

      {/* Interactive Node Architecture Canvas (pxxl.app style) */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center pt-4 pb-8">
        {/* Top Row of 6 Tool/Module Icon Boxes */}
        <div className="w-full grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 z-20 relative px-2">
          {MODULES_DATA.map((mod, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={mod.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative group rounded-2xl bg-[#0c0c0f] border transition-all duration-300 p-4 h-20 sm:h-24 flex flex-col items-center justify-center cursor-pointer shadow-xl ${
                  isHovered
                    ? "border-[#ff63f9] scale-105 shadow-[0_0_20px_rgba(255,99,249,0.35)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Module Number Tag */}
                <span className="text-[10px] font-mono text-white/40 mb-1">0{idx + 1}</span>

                {/* Icon */}
                {icons[idx]}

                {/* Hover Tooltip Box */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#140824] border border-[#ff63f9]/40 text-[#ff63f9] text-[11px] font-bold whitespace-nowrap pointer-events-none transition-all duration-200 z-30 shadow-lg ${
                    isHovered ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"
                  }`}
                >
                  {mod.title.replace(/^Module \d+:\s*/, "")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Connecting SVG Wires with Dashed Animation & Flowing Purple Pulses */}
        <div className="w-full h-44 -mt-2 -mb-4 relative z-10 hidden sm:block">
          <svg className="w-full h-full" viewBox="0 0 800 180" fill="none" preserveAspectRatio="none">
            {wirePoints.map((pt, i) => {
              const isHovered = hoveredIdx === i;
              const pathD = `M ${pt.startX} ${pt.startY} C ${pt.startX} 90, ${pt.endX} 110, ${pt.endX} ${pt.endY}`;

              return (
                <g key={i}>
                  {/* Base Broken/Dashed Line */}
                  <path
                    d={pathD}
                    stroke={isHovered ? "#ff63f9" : "rgba(255, 255, 255, 0.12)"}
                    strokeWidth={isHovered ? "2.5" : "1.5"}
                    strokeDasharray="5 5"
                    className="transition-colors duration-300"
                    style={{
                      animation: "dashFlow 20s linear infinite"
                    }}
                  />

                  {/* Flowing Purple Dashed Highlight Pulse */}
                  <path
                    d={pathD}
                    stroke="#ff63f9"
                    strokeWidth={isHovered ? "3" : "2"}
                    strokeDasharray="12 140"
                    strokeLinecap="round"
                    style={{
                      animation: `dashPulse ${1.8 + i * 0.2}s ease-in-out infinite`,
                      opacity: isHovered ? 1 : 0.75
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Central Bottom Node: JS V8 Core Runtime */}
        <div className="z-20 mt-4 sm:mt-0 relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0a0a0d] border border-[#ff63f9]/40 shadow-[0_0_35px_rgba(255,99,249,0.35)] flex flex-col items-center justify-center text-center p-3 transition-transform duration-300 group-hover:scale-105">
            <div className="w-10 h-10 rounded-xl bg-[#ff63f9] text-black flex items-center justify-center text-xl font-black shadow-[0_0_15px_rgba(255,99,249,0.5)] mb-1.5">
              <BulbFilled className="text-black text-xl" />
            </div>
            <span className="text-xs font-black tracking-tight text-white leading-tight">
              CODA CORE
            </span>
            <span className="text-[9px] font-mono text-[#ff63f9] mt-0.5 font-bold">
              ECMASCRIPT
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dashFlow {
          from {
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes dashPulse {
          0% {
            stroke-dashoffset: 160;
          }
          100% {
            stroke-dashoffset: -40;
          }
        }
      `}</style>
    </div>
  );
}
