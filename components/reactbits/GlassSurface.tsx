"use client";

import React, { useEffect, useState, useRef, useId } from "react";
import "./GlassSurface.css";

interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: string;
  yChannel?: string;
  mixBlendMode?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassSurface({
  children,
  width = "100%",
  height = "auto",
  borderRadius = 16,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {}
}: GlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerStyle: React.CSSProperties = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface glass-surface--fallback ${className}`}
      style={containerStyle}
    >
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
