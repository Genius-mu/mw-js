"use client";

import React from "react";
import "./ScrollExpand.css";

interface ScrollExpandProps {
  src?: string;
  mediaType?: "image" | "video";
  alt?: string;
  title?: string;
  scrollHint?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function ScrollExpand({
  src = "",
  mediaType = "image",
  alt = "Media",
  title = "",
  children,
  className = ""
}: ScrollExpandProps) {
  return (
    <div className={`scroll-expand ${className}`}>
      <div className="scroll-expand__track">
        <div className="scroll-expand__stage">
          <div className="scroll-expand__frame">
            {src && mediaType === "video" ? (
              <video className="scroll-expand__media" src={src} autoPlay muted loop playsInline />
            ) : src ? (
              <img className="scroll-expand__media" src={src} alt={alt} />
            ) : null}

            {children ? (
              <div className="scroll-expand__overlay">{children}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
