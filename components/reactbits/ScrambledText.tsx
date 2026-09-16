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
  radius = 180,
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
          const proximity = 1 - dist / radius; // 0 (at radius) to 1 (at center)
          const targetOpacity = Math.min(1.0, 0.2 + proximity * 0.8);
          
          charEl.style.opacity = targetOpacity.toFixed(2);
          charEl.style.color = proximity > 0.5 ? "#ffffff" : "#9ca3af";
          charEl.style.textShadow = proximity > 0.6 ? "0 0 10px rgba(255, 99, 249, 0.6)" : "none";

          if (!timers.has(idx)) {
            let step = 0;
            const maxSteps = Math.floor(10 * proximity) + 4;
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
        } else {
          charEl.style.opacity = "0.15";
          charEl.style.color = "#6b7280";
          charEl.style.textShadow = "none";
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
        {charList.map((item, i) => {
          if (item.orig === "\n") {
            return <br key={i} className="select-none" />;
          }
          return (
            <span key={i} className="scramble-char" data-orig={item.orig}>
              {item.orig === " " ? "\u00A0" : item.orig}
            </span>
          );
        })}
      </p>
    </div>
  );
}
