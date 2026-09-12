"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

export default function BlurText({
  text = "",
  delay = 150,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {elements.map((segment, index) => {
        const itemDelay = (index * delay) / 1000;
        const translateY = direction === "top" ? "-20px" : "20px";

        return (
          <span
            key={index}
            className="inline-block transition-all duration-700 ease-out will-change-[transform,filter,opacity]"
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? "blur(0px)" : "blur(12px)",
              transform: inView ? "translateY(0)" : `translateY(${translateY})`,
              transitionDelay: `${itemDelay}s`
            }}
            onTransitionEnd={() => {
              if (index === elements.length - 1 && onAnimationComplete) {
                onAnimationComplete();
              }
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </p>
  );
}
