"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import "./OptionWheel.css";

const DEFAULT_ITEMS = [
  "Module 1: Basics & Data Types",
  "Module 2: Arrays & Logic",
  "Module 3: Functions & Scope",
  "Module 4: Objects & Data Structures",
  "Module 5: Loops & Iteration",
  "Module 6: Advanced Concepts & ES6"
];

interface OptionWheelProps {
  items?: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  textColor?: string;
  activeColor?: string;
  side?: "left" | "right";
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  minOpacity?: number;
  smoothing?: number;
  inset?: number;
  loop?: boolean;
  draggable?: boolean;
  className?: string;
}

export default function OptionWheel({
  items = DEFAULT_ITEMS,
  defaultSelected = 0,
  onChange,
  textColor = "#a6a6a6",
  activeColor = "#ffffff",
  side = "left",
  fontSize = 1.2,
  spacing = 1.4,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  minOpacity = 0.05,
  smoothing = 200,
  inset = 40,
  loop = false,
  draggable = true,
  className = ""
}: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef(defaultSelected);
  const dragRef = useRef<{ y: number; start: number; id: number } | null>(null);
  const dragMovedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  onChangeRef.current = onChange;

  const runFrame = useCallback(
    (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const tau = Math.max(smoothing, 1) / 1000;
      const k = 1 - Math.exp(-dt / tau);
      const target = targetRef.current;
      const cur = posRef.current;
      let next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.001;
      if (settled) next = target;
      posRef.current = next;

      const els = itemRefs.current;
      const n = items.length;
      const mirror = side === "right" ? -1 : 1;
      const rowH = fontSize * spacing * 16;
      const tiltRad = (tilt * Math.PI) / 180;
      const R = tiltRad > 0.0005 ? rowH / tiltRad : 0;

      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (!el) continue;
        let d = i - next;
        if (loop && n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }
        const dist = Math.abs(d);
        let x = 0;
        let y = d * rowH;
        let rot = 0;
        if (R > 0) {
          const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
          y = R * Math.sin(ang);
          x = -mirror * R * (1 - Math.cos(ang)) * curve;
          rot = (mirror * ang * 180) / Math.PI;
        }
        el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
        el.style.opacity = String(Math.max(minOpacity, 1 - dist * fade));
        el.style.filter = blur > 0 && dist > 0.5 ? `blur(${(dist * blur).toFixed(2)}px)` : "none";
      }
      rafRef.current = settled ? null : requestAnimationFrame(runFrame);
    },
    [items.length, side, fontSize, spacing, tilt, curve, loop, smoothing, fade, minOpacity, blur]
  );

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const applyTarget = useCallback(
    (value: number, snap: boolean) => {
      let v = value;
      if (!loop) v = Math.min(Math.max(v, 0), Math.max(items.length - 1, 0));
      if (snap) v = Math.round(v);
      targetRef.current = v;
      const idx = ((Math.round(v) % items.length) + items.length) % items.length;
      if (idx !== selectedRef.current) {
        selectedRef.current = idx;
        setSelectedIndex(idx);
        onChangeRef.current?.(idx, items[idx]);
      }
      startLoop();
    },
    [items, loop, startLoop]
  );

  const handleItemClick = (index: number) => {
    applyTarget(index, true);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    applyTarget(targetRef.current + delta, true);
  };

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [items, applyTarget]);

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      onWheel={handleWheel}
      className={`option-wheel ${side === "right" ? "option-wheel--right" : ""} ${isDragging ? "option-wheel--dragging" : ""} ${className}`}
      style={
        {
          "--ow-text-color": textColor,
          "--ow-active-color": activeColor,
          "--ow-font-size": `${fontSize}rem`,
          "--ow-inset": `${inset}px`
        } as React.CSSProperties
      }
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`option-wheel__item ${selectedIndex === index ? "option-wheel__item--selected" : ""}`}
          onClick={() => handleItemClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
