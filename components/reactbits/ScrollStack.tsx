"use client";

import React from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({
  children,
  itemClassName = ""
}: {
  children: React.ReactNode;
  itemClassName?: string;
}) => <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;

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
