"use client";

import React from "react";
import GlassSurface from "./GlassSurface";
import "./ScrollStack.css";

export const ScrollStackItem = ({
  children,
  index = 0,
  itemClassName = "",
  style = {}
}: {
  children: React.ReactNode;
  index?: number;
  itemClassName?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`scroll-stack-wrapper ${itemClassName}`.trim()}
    style={{
      position: "sticky",
      top: `calc(85px + ${index * 26}px)`,
      zIndex: 10 + index,
      ...style
    }}
  >
    <GlassSurface
      borderRadius={22}
      className="scroll-stack-card p-6 sm:p-8"
      glowColor="#ff63f9"
    >
      {children}
    </GlassSurface>
  </div>
);

export default function ScrollStack({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">{children}</div>
    </div>
  );
}
