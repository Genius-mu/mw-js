"use client";

import React, { useEffect, useRef, useState } from "react";
import "./ScrambledText.css";

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

export default function ScrambledText({
  radius = 120,
  duration = 1.0,
  speed = 0.5,
  scrambleChars = ".:#@$%&*<>~/+=-_[]{}",
  className = "",
  style = {},
  children
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [charList, setCharList] = useState<{ char: string; orig: string }[]>([]);

  useEffect(() => {
    const chars = children.split("").map((c) => ({ char: c, orig: c }));
    setCharList(chars);
  }, [children]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const charElements = Array.from(el.querySelectorAll(".scramble-char")) as HTMLSpanElement[];
    if (charElements.length === 0) return;

    const timers = new Map<number, NodeJS.Timeout>();
    const originalChars = charElements.map((c) => c.dataset.orig || c.textContent || "");

    const handlePointerMove = (e: PointerEvent) => {
      charElements.forEach((charEl, idx) => {
        const rect = charEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < radius) {
          if (!timers.has(idx)) {
            let step = 0;
            const maxSteps = Math.floor(10 * (1 - dist / radius)) + 5;
            const interval = setInterval(() => {
              step++;
              if (step < maxSteps) {
                const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                charEl.textContent = randomChar;
              } else {
                charEl.textContent = originalChars[idx];
                clearInterval(interval);
                timers.delete(idx);
              }
            }, Math.max(30, 80 * speed));
            timers.set(idx, interval);
          }
        }
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      timers.forEach((t) => clearInterval(t));
      timers.clear();
    };
  }, [radius, speed, scrambleChars, charList]);

  return (
    <div ref={rootRef} className={`scrambled-text-block ${className}`} style={style}>
      <p className="m-0 leading-relaxed font-mono select-none">
        {charList.map((item, i) => (
          <span key={i} className="scramble-char inline-block transition-colors" data-orig={item.orig}>
            {item.orig === " " ? "\u00A0" : item.orig}
          </span>
        ))}
      </p>
    </div>
  );
}
