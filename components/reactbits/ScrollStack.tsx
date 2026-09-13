"use client";

import React from "react";
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
    className={`scroll-stack-card ${itemClassName}`.trim()}
    style={{
      top: `calc(85px + ${index * 26}px)`,
      ...style
    }}
  >
    {children}
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
