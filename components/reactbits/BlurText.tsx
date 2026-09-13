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
  delay = 80,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let hasLeftView = false;
    let hasScrolledPast = false;

    // IntersectionObserver to detect element leaving and re-entering viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasLeftView) {
            hasLeftView = false;
            setInView(false);
            requestAnimationFrame(() => {
              setAnimKey((k) => k + 1);
              setInView(true);
            });
          } else {
            setInView(true);
          }
        } else {
          hasLeftView = true;
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // Scroll listener to detect scrolling down and scrolling back up to top
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 180) {
        hasScrolledPast = true;
      }
      if (hasScrolledPast && currentScrollY <= 30) {
        hasScrolledPast = false;
        setInView(false);
        requestAnimationFrame(() => {
          setAnimKey((k) => k + 1);
          setInView(true);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, rootMargin]);

  const translateY = direction === "top" ? "-22px" : "22px";

  return (
    <p
      key={animKey}
      ref={ref}
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {elements.map((segment, index) => {
        const itemDelay = (index * delay) / 1000;

        return (
          <span
            key={`${animKey}-${index}`}
            className="inline-block will-change-[transform,filter,opacity]"
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? "blur(0px)" : "blur(14px)",
              transform: inView ? "translateY(0)" : `translateY(${translateY})`,
              transitionProperty: "opacity, filter, transform",
              transitionDuration: inView ? "700ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: inView ? `${itemDelay}s` : "0s"
            }}
            onTransitionEnd={() => {
              if (index === elements.length - 1 && onAnimationComplete && inView) {
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
