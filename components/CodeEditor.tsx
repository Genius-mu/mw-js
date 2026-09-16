"use client";

import React, { useRef, useEffect } from "react";

// Tokenize JavaScript code into colorful syntax-highlighted HTML spans
export function highlightJS(code: string): string {
  if (!code) return "";

  // 1. Sanitize HTML entities
  const text = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Regex tokens matcher
  // Group 1: Comments (single or multi line)
  // Group 2: Strings (double, single, template literals)
  // Group 3: Keywords
  // Group 4: Booleans / null / undefined / NaN
  // Group 5: Numbers
  // Group 6: Built-ins & Console
  // Group 7: Function call names
  // Group 8: Operators & Punctuation
  const pattern = /(\/\*[\s\S]*?\*\/|\/\/.online.*$|\/\/.*$)|(`(?:\\.|[^`])*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*')|(\b(?:const|let|var|function|return|if|else|for|while|async|await|try|catch|class|new|import|export|from|typeof|instanceof|switch|case|default|break|continue|in|of|this|throw|finally|yield)\b)|(\b(?:true|false|null|undefined|NaN|Infinity)\b)|(\b\d+(?:\.\d+)?\b)|(\b(?:console|log|warn|error|Math|Array|Object|String|Number|Boolean|Promise|JSON|Map|Set|Symbol|Reflect|Proxy)\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|([=+\-*\/%&|^!~<>?:;,.(){}\[\]])/gm;

  return text.replace(
    pattern,
    (
      match,
      comment,
      str,
      keyword,
      boolNull,
      num,
      builtin,
      fnName,
      operator
    ) => {
      if (comment) {
        return `<span style="color: #6b7280; font-style: italic;">${comment}</span>`;
      }
      if (str) {
        return `<span style="color: #34d399; font-weight: 500;">${str}</span>`;
      }
      if (keyword) {
        return `<span style="color: #ff63f9; font-weight: 600;">${keyword}</span>`;
      }
      if (boolNull) {
        return `<span style="color: #38bdf8; font-weight: 600;">${boolNull}</span>`;
      }
      if (num) {
        return `<span style="color: #fbbf24; font-weight: 500;">${num}</span>`;
      }
      if (builtin) {
        return `<span style="color: #f472b6; font-weight: 600;">${builtin}</span>`;
      }
      if (fnName) {
        return `<span style="color: #60a5fa; font-weight: 600;">${fnName}</span>`;
      }
      if (operator) {
        return `<span style="color: #94a3b8;">${operator}</span>`;
      }
      return match;
    }
  );
}

// Interactive Code Editor Component with Live Syntax Highlighting
interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  heightClass?: string;
  placeholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  heightClass = "h-64 sm:h-72",
  placeholder = "Write your JavaScript code here..."
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Synchronize scroll position between textarea and highlighted background
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Handle Tab key pressing (inserts 2 spaces)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const highlightedHTML = highlightJS(value || "");

  return (
    <div className={`relative w-full ${heightClass} rounded-xl bg-[#08080d] border border-white/10 overflow-hidden group focus-within:ring-1 focus-within:ring-[#ff63f9]/50`}>
      {/* Background Syntax Highlighted Pre Container */}
      <pre
        ref={preRef}
        className="absolute inset-0 p-4 m-0 font-mono text-xs sm:text-sm leading-relaxed overflow-auto pointer-events-none select-none whitespace-pre wrap-break-words text-slate-100"
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: highlightedHTML + (value.endsWith("\n") ? "<br/>" : "")
        }}
      />

      {/* Foreground Transparent Editable Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        spellCheck={false}
        className="absolute inset-0 w-full h-full p-4 m-0 font-mono text-xs sm:text-sm leading-relaxed bg-transparent text-transparent caret-[#ff63f9] focus:outline-none resize-none overflow-auto whitespace-pre wrap-break-words selection:bg-white/20 selection:text-white"
        style={{
          WebkitTextFillColor: "transparent"
        }}
      />
    </div>
  );
}

// Static Code Highlight Component for code blueprints & previews
export function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const html = highlightJS(code);
  return (
    <pre className={`p-4 rounded-xl bg-[#08080d] font-mono text-xs sm:text-sm overflow-x-auto border border-white/10 leading-relaxed text-slate-100 ${className}`}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
