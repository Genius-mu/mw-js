"use client";

import React, { useState, useEffect } from "react";
import { CheckCircleFilled, CodeOutlined, PlayCircleOutlined, SyncOutlined } from "@ant-design/icons";
import GlassSurface from "@/components/reactbits/GlassSurface";

// 1. Basics & Data Types Visual
export function BasicsDataTypesVisual() {
  const types = [
    { name: "string", example: '"Modern JS Core"', bytes: "16 bytes", type: "primitive" },
    { name: "number", example: "2026", bytes: "8 bytes (float64)", type: "primitive" },
    { name: "boolean", example: "true", bytes: "4 bytes", type: "primitive" },
    { name: "symbol", example: 'Symbol("id")', bytes: "Unique token", type: "primitive" },
    { name: "object", example: '{ engine: "V8" }', bytes: "Heap allocated", type: "reference" }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % types.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [types.length]);

  const active = types[activeIdx];

  return (
    <GlassSurface borderRadius={20} className="w-full shadow-xl select-none font-mono">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff63f9] animate-pulse" />
            <span className="text-white/80 font-bold">V8 Type Inspector</span>
          </div>
          <span className="text-[10px] text-white/40">ECMAScript 2026</span>
        </div>

        {/* Type Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {types.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActiveIdx(i)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border ${
                activeIdx === i
                  ? "bg-[#ff63f9] text-black border-[#ff63f9] shadow-[0_0_12px_rgba(255,99,249,0.4)]"
                  : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/25"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Code Preview Box */}
        <div className="bg-black/70 p-3 rounded-xl border border-white/5 space-y-1.5 text-xs">
          <div className="text-white/40 text-[10px]">// Dynamic Evaluation</div>
          <div className="text-white/80">
            <span className="text-purple-400">const</span> target ={" "}
            <span className="text-[#ff63f9]">{active.example}</span>;
          </div>
          <div className="text-emerald-400">
            typeof target <span className="text-white/50">===</span> &quot;{active.name}&quot;{" "}
            <span className="text-white/40">// true</span>
          </div>
        </div>

        {/* Memory & Allocation Metrics */}
        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-white/40 text-[10px]">Memory Model</div>
            <div className="text-white/90 font-bold capitalize mt-0.5">{active.type}</div>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-white/40 text-[10px]">Size Footprint</div>
            <div className="text-[#ff63f9] font-bold mt-0.5">{active.bytes}</div>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

// 2. Arrays & Logic Visual
export function ArraysLogicVisual() {
  const [array, setArray] = useState([12, 25, 42, 88]);
  const [filterThreshold, setFilterThreshold] = useState(20);

  const filtered = array.filter((n) => n > filterThreshold);

  return (
    <GlassSurface borderRadius={20} className="w-full shadow-xl select-none font-mono">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-white/80 font-bold">Array Pipeline & Filter Gate</span>
          </div>
          <span className="text-[10px] text-emerald-400">Reactive Stream</span>
        </div>

        {/* Input Array Visual */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-white/40">INPUT ARRAY: nums</div>
          <div className="flex items-center gap-2">
            {array.map((num, idx) => (
              <div
                key={idx}
                className={`flex-1 py-2 px-1 text-center rounded-lg border transition-all ${
                  num > filterThreshold
                    ? "bg-[#ff63f9]/15 border-[#ff63f9] text-white shadow-[0_0_10px_rgba(255,99,249,0.25)]"
                    : "bg-white/[0.03] border-white/10 text-white/40"
                }`}
              >
                <div className="text-[9px] text-white/30">[{idx}]</div>
                <div className="text-sm font-bold">{num}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Filter Condition */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
          <div className="text-white/70">
            <span className="text-purple-400">nums</span>.filter(n =&gt; n &gt;{" "}
            <span className="text-[#ff63f9] font-bold">{filterThreshold}</span>)
          </div>
          <button
            onClick={() => setFilterThreshold((prev) => (prev === 20 ? 30 : 20))}
            className="text-[10px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white border-none cursor-pointer"
          >
            Toggle Gate
          </button>
        </div>

        {/* Result Array */}
        <div className="space-y-1.5 pt-1 border-t border-white/5">
          <div className="text-[10px] text-emerald-400">OUTPUT: [{filtered.join(", ")}]</div>
          <div className="flex items-center gap-2">
            {filtered.map((num, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold"
              >
                {num}
              </div>
            ))}
            <div className="text-[10px] text-white/40 ml-auto">
              {filtered.length} items passed gate
            </div>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

// 3. Functions & Scope Visual
export function FunctionsScopeVisual() {
  const stackFrames = [
    { fn: "calculateTax(rate: 0.15)", scope: "Local Scope", vars: "tax = $450" },
    { fn: "processOrder(id: 1042)", scope: "Lexical Closure", vars: "total = $3,000" },
    { fn: "GlobalExecutionContext()", scope: "Window/Global", vars: "currency = 'USD'" }
  ];

  return (
    <GlassSurface borderRadius={20} className="w-full shadow-xl select-none font-mono">
      <div className="p-5 space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-white/80 font-bold">Call Stack & Lexical Scope</span>
          </div>
          <span className="text-[10px] text-white/40">V8 Call Frame</span>
        </div>

        {/* Stack Frames (LIFO Order) */}
        <div className="space-y-2">
          {stackFrames.map((frame, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all ${
                idx === 0
                  ? "bg-[#ff63f9]/10 border-[#ff63f9] shadow-[0_0_15px_rgba(255,99,249,0.2)]"
                  : "bg-white/[0.02] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={idx === 0 ? "text-[#ff63f9]" : "text-white/80"}>
                  {frame.fn}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                  {frame.scope}
                </span>
              </div>
              <div className="text-[11px] text-white/50 mt-1 flex items-center justify-between">
                <span>Captured: {frame.vars}</span>
                {idx === 0 && <span className="text-[10px] text-emerald-400">ACTIVE FRAME</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-white/40 text-center pt-1">
          Outer variables resolve seamlessly through the closure chain
        </div>
      </div>
    </GlassSurface>
  );
}

// 4. Objects & Data Structures Visual
export function ObjectsDataVisual() {
  const [selectedKey, setSelectedKey] = useState<string>("engine");

  const objectData = {
    engine: '"V8 JavaScript Core"',
    version: "2026.4",
    isImmutable: "true",
    features: '["Records", "Tuples", "Temporal"]'
  };

  return (
    <GlassSurface borderRadius={20} className="w-full shadow-xl select-none font-mono">
      <div className="p-5 space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff63f9]" />
            <span className="text-white/80 font-bold">Object Memory Graph</span>
          </div>
          <span className="text-[10px] text-white/40">Heap Reference</span>
        </div>

        {/* JSON Tree Viewer */}
        <div className="bg-black/70 p-3 rounded-xl border border-white/5 text-xs space-y-1 leading-relaxed">
          <div className="text-purple-400">const runtimeConfig = &#123;</div>
          {Object.entries(objectData).map(([k, val]) => (
            <div
              key={k}
              onClick={() => setSelectedKey(k)}
              className={`pl-4 py-0.5 rounded cursor-pointer transition-colors flex items-center justify-between ${
                selectedKey === k ? "bg-[#ff63f9]/20 text-[#ff63f9]" : "hover:bg-white/5 text-white/70"
              }`}
            >
              <span>
                <span className="text-white/90">{k}</span>:{" "}
                <span className="text-emerald-400">{val}</span>,
              </span>
              {selectedKey === k && (
                <span className="text-[9px] text-[#ff63f9] font-bold mr-1">SELECTED</span>
              )}
            </div>
          ))}
          <div className="text-purple-400">&#125;;</div>
        </div>

        {/* Lookup Bar */}
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
          <span className="text-white/50">runtimeConfig.{selectedKey}</span>
          <span className="text-emerald-400 font-bold">
            {objectData[selectedKey as keyof typeof objectData]}
          </span>
        </div>
      </div>
    </GlassSurface>
  );
}

// 5. Loops & Iteration Visual
export function LoopsIterationVisual() {
  const [step, setStep] = useState(0);
  const items = ["Lexer", "Parser", "Bytecode", "JIT Compiler"];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % items.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <GlassSurface borderRadius={20} className="w-full shadow-xl select-none font-mono">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SyncOutlined spin className="text-[#ff63f9]" />
            <span className="text-white/80 font-bold">Iteration Protocol Engine</span>
          </div>
          <span className="text-[10px] text-white/40">Step {step + 1} of {items.length}</span>
        </div>

        {/* Pipeline Cycle Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {items.map((item, idx) => (
            <div
              key={item}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                step === idx
                  ? "bg-[#ff63f9]/20 border-[#ff63f9] text-white shadow-[0_0_15px_rgba(255,99,249,0.3)] scale-105"
                  : "bg-white/[0.02] border-white/10 text-white/40"
              }`}
            >
              <div className="text-[9px] text-white/30">i = {idx}</div>
              <div className="text-xs font-bold mt-1 truncate">{item}</div>
            </div>
          ))}
        </div>

        {/* Code Snippet */}
        <div className="bg-black/60 p-3 rounded-xl border border-white/5 text-xs space-y-1">
          <div className="text-white/70">
            for (const item of pipeline) &#123;
          </div>
          <div className="pl-4 text-emerald-400">
            processNode(&quot;{items[step]}&quot;); // ➜ Active
          </div>
          <div className="text-white/70">&#125;</div>
        </div>
      </div>
    </GlassSurface>
  );
}

// 6. Advanced ES6 & Asynchronous Visual
export function AdvancedES6Visual() {
  const [asyncStatus, setAsyncStatus] = useState("RESOLVED");

  useEffect(() => {
    const states = ["FETCHING", "PENDING", "RESOLVED"];
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % states.length;
      setAsyncStatus(states[i]);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassSurface borderRadius={20} className="w-full shadow-xl select-none font-mono">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 font-bold">Microtask Event Loop</span>
          </div>
          <span className="text-[10px] text-[#ff63f9]">Async/Await Core</span>
        </div>

        {/* Asynchronous Pipeline Stream */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-white/60">Promise.resolve()</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                asyncStatus === "RESOLVED"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              }`}
            >
              {asyncStatus}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-white/60">Microtask Queue</span>
            <span className="text-white/90 font-bold">Priority: 0ms</span>
          </div>

          <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-[#ff63f9]/10 border border-[#ff63f9]/30">
            <span className="text-[#ff63f9]">V8 Turbopack Output</span>
            <span className="text-white font-bold">ES2026 Production Ready</span>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/5 text-[11px] text-white/70">
          <span className="text-purple-400">const</span> res ={" "}
          <span className="text-purple-400">await</span> fetch(&quot;/api/modules&quot;);
        </div>
      </div>
    </GlassSurface>
  );
}
