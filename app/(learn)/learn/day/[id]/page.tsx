"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  Button,
  Tag,
  Tabs,
  Alert,
  Tooltip,
  notification,
  Modal,
  Input
} from "antd";
import {
  PlayCircleOutlined,
  BookOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined,
  CodeOutlined,
  CopyOutlined,
  BulbOutlined,
  ExportOutlined,
  TrophyOutlined,
  ReloadOutlined,
  RocketOutlined,
  FileTextOutlined,
  SaveOutlined,
  ShareAltOutlined,
  FolderOpenOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { CURRICULUM_DATA, LessonDay, LessonProject, getComprehensiveExplanation } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";
import SpecularButton from "@/components/reactbits/SpecularButton";
import { CodeEditor, CodeBlock } from "@/components/CodeEditor";

const { TextArea } = Input;

export default function DayLearningPage() {
  const params = useParams();
  const router = useRouter();
  const {
    markDayCompleted,
    markDayUncompleted,
    isDayCompleted,
    totalDays,
    getUserNote,
    saveUserNote,
    user,
    completedCount
  } = useLearning();

  const dayId = parseInt(params.id as string, 10) || 1;
  const lesson = CURRICULUM_DATA.find((d) => d.id === dayId) || CURRICULUM_DATA[0];

  const isCompleted = isDayCompleted(lesson.id);

  // Code runner state
  const [userCode, setUserCode] = useState(lesson.exercise.starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  // User notes state
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  // Sync starter code & notes when day changes
  useEffect(() => {
    setUserCode(lesson.exercise.starterCode);
    setConsoleOutput([]);
    setShowHint(false);
    setNoteText(getUserNote(lesson.id));
  }, [lesson, getUserNote]);

  // Keyboard shortcut: Ctrl + Enter to run code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userCode]);

  const handleCopySnippet = (text: string, id: string = "main") => {
    const performCopy = () => {
      setCopiedId(id);
      notification.success({
        message: "Code Copied!",
        description: "Snippet copied to your clipboard.",
        placement: "bottomRight",
        duration: 2
      });
      setTimeout(() => setCopiedId(null), 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(performCopy)
        .catch(() => fallbackCopy(text, id));
    } else {
      fallbackCopy(text, id);
    }
  };

  const fallbackCopy = (text: string, id: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(id);
      notification.success({
        message: "Code Copied!",
        description: "Snippet copied to your clipboard.",
        placement: "bottomRight",
        duration: 2
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      notification.error({
        message: "Copy Failed",
        description: "Unable to copy code snippet.",
        placement: "bottomRight"
      });
    }
  };

  const handleSaveNote = () => {
    saveUserNote(lesson.id, noteText);
    setNoteSaved(true);
    notification.success({
      message: "Note Saved",
      description: `Personal study notes for Day ${lesson.day} saved.`,
      placement: "bottomRight"
    });
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      markDayUncompleted(lesson.id);
      notification.info({
        message: "Status Updated",
        description: `Day ${lesson.day} marked as incomplete.`,
        placement: "bottomRight"
      });
    } else {
      markDayCompleted(lesson.id);
      notification.success({
        message: `Day ${lesson.day} Completed!`,
        description: `Great job! You mastered "${lesson.title}".`,
        placement: "bottomRight"
      });

      if (completedCount + 1 >= totalDays || lesson.id === totalDays) {
        setTimeout(() => setCertModalOpen(true), 800);
      }
    }
  };

  const handleNextDay = () => {
    if (!isCompleted) {
      markDayCompleted(lesson.id);
    }
    if (dayId < totalDays) {
      router.push(`/learn/day/${dayId + 1}`);
    } else {
      setCertModalOpen(true);
    }
  };

  const handlePrevDay = () => {
    if (dayId > 1) {
      router.push(`/learn/day/${dayId - 1}`);
    }
  };

  // Safe JavaScript Code Evaluator with console.log interception
  const handleRunCode = (codeToRun?: string) => {
    const targetCode = codeToRun || userCode;
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
      },
      error: (...args: any[]) => {
        logs.push(`[ERROR] ${args.join(" ")}`);
      },
      warn: (...args: any[]) => {
        logs.push(`[WARN] ${args.join(" ")}`);
      }
    };

    try {
      const runFn = new Function("console", targetCode);
      runFn(customConsole);
      if (logs.length === 0) {
        logs.push("=> Code executed cleanly with 0 console logs.");
      }
      setConsoleOutput(logs);
    } catch (err: any) {
      setConsoleOutput([`Execution Error: ${err.message}`]);
    }
  };

  // Default projects fallback generator for each lesson day
  const getProjectsForLesson = (): LessonProject[] => {
    if (lesson.projects && lesson.projects.length >= 2) {
      return lesson.projects;
    }

    return [
      {
        title: `Project 1: ${lesson.title}`,
        description: `Practical application of ${lesson.title.toLowerCase()}.`,
        code: `// Practical Example: ${lesson.title}\n${lesson.codeSnippet}`,
        outcome: `Hands-on usage of ${lesson.title}.`
      },
      {
        title: `Project 2: Solution Implementation`,
        description: `Implementation for ${lesson.title.toLowerCase()} exercise.`,
        code: `// Practical Solution\n${lesson.exercise.solutionCode}`,
        outcome: `Applies core concepts to exercise logic.`
      }
    ];
  };

  const currentProjects = getProjectsForLesson();

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 max-w-5xl mx-auto">
      {/* 1. TOP HEADER BANNER: Title + Detailed Explanatory Paragraph */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight m-0 text-white leading-tight">
            Day {lesson.day}: {lesson.title}
          </h1>
          <SpecularButton
            size="sm"
            radius={10}
            tint={isCompleted ? "#181824" : "#ff63f9"}
            tintOpacity={0.9}
            lineColor="#ffffff"
            baseColor={isCompleted ? "#404050" : "#ff63f9"}
            textColor={isCompleted ? "#ffffff" : "#000000"}
            icon={isCompleted ? <CheckCircleFilled className="text-white" /> : <CheckCircleOutlined />}
            onClick={handleToggleComplete}
          >
            {isCompleted ? "Marked Completed" : "Mark as Completed"}
          </SpecularButton>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal m-0 pt-1">
          {getComprehensiveExplanation(lesson)}
        </p>
      </div>

      {/* 2. FOUR WELL-STRUCTURED BOXES */}

      {/* BOX 1: Example & Syntax Execution */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5 m-0">
            <ThunderboltOutlined className="text-[#ff63f9]" /> Example & Syntax Execution
          </h2>
        </div>
        <div className="relative group">
          <CodeBlock code={lesson.codeSnippet} />
          <button
            type="button"
            onClick={() => handleCopySnippet(lesson.codeSnippet, "example-snippet")}
            className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 bg-[#12121e]/90 hover:bg-[#ff63f9]/20 border border-white/15 hover:border-[#ff63f9]/50 hover:text-[#ff63f9] shadow-md hover:shadow-[0_0_15px_rgba(255,99,249,0.3)] backdrop-blur-md transition-all cursor-pointer active:scale-95"
          >
            <CopyOutlined className={copiedId === "example-snippet" ? "text-emerald-400" : "text-[#ff63f9]"} />
            <span>{copiedId === "example-snippet" ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      {/* BOX 2: Interactive Practice Sandbox & Execution */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5 m-0">
            <CodeOutlined className="text-[#ff63f9]" /> Interactive Practice Sandbox & Execution
          </h2>
          <p className="text-xs sm:text-sm text-white/70 m-0 mt-1.5 leading-relaxed">{lesson.exercise.prompt}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Area */}
          <div className="space-y-3 flex flex-col">
            <span className="text-xs font-bold text-white">JavaScript Editor</span>
            <CodeEditor
              value={userCode}
              onChange={(val) => setUserCode(val)}
            />
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <SpecularButton
                size="md"
                radius={10}
                tint="#ff63f9"
                tintOpacity={0.9}
                lineColor="#ffffff"
                baseColor="#ff63f9"
                textColor="#000000"
                icon={<PlayCircleOutlined />}
                onClick={() => handleRunCode()}
              >
                Run Code & Test Output
              </SpecularButton>
              <SpecularButton
                size="md"
                radius={10}
                tint="#181824"
                tintOpacity={0.8}
                lineColor="#ffffff"
                baseColor="#333344"
                textColor="#ffffff"
                icon={<CodeOutlined />}
                onClick={() => setSolutionModalOpen(true)}
              >
                View Solution
              </SpecularButton>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="space-y-3 flex flex-col">
            <span className="text-xs font-bold text-white">Terminal Output (console.log)</span>
            <div className="w-full h-64 sm:h-72 p-4 rounded-xl bg-[#08080d] text-white/90 font-mono text-xs sm:text-sm border border-white/10 overflow-y-auto space-y-1.5 leading-relaxed">
              {consoleOutput.length === 0 ? (
                <span className="text-white/30 italic">Click "Run Code" to view console output...</span>
              ) : (
                consoleOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith("[ERROR]")
                        ? "text-red-400 font-medium"
                        : line.startsWith("=>")
                        ? "text-white/40 italic"
                        : "text-white/90"
                    }
                  >
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOX 3: Project 1 & Execution */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5 m-0">
            <FolderOpenOutlined className="text-[#ff63f9]" /> {currentProjects[0].title} & Execution
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed m-0">{currentProjects[0].description}</p>
        <CodeBlock code={currentProjects[0].code} />
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
          <SpecularButton
            size="sm"
            radius={10}
            tint="#ff63f9"
            tintOpacity={0.85}
            lineColor="#ffffff"
            baseColor="#ff63f9"
            textColor="#000000"
            icon={<PlayCircleOutlined />}
            onClick={() => {
              setUserCode(currentProjects[0].code);
              handleRunCode(currentProjects[0].code);
            }}
          >
            Run & Test Project #1
          </SpecularButton>
          <button
            type="button"
            onClick={() => handleCopySnippet(currentProjects[0].code, "proj-0")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white/90 bg-[#12121e] hover:bg-[#ff63f9]/15 border border-white/15 hover:border-[#ff63f9]/50 hover:text-[#ff63f9] shadow-sm hover:shadow-[0_0_15px_rgba(255,99,249,0.25)] transition-all cursor-pointer active:scale-95"
          >
            <CopyOutlined className={copiedId === "proj-0" ? "text-emerald-400 text-sm" : "text-[#ff63f9] text-sm"} />
            <span>{copiedId === "proj-0" ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      {/* BOX 4: Project 2 & Execution */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5 m-0">
            <FolderOpenOutlined className="text-[#ff63f9]" /> {currentProjects[1].title} & Execution
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed m-0">{currentProjects[1].description}</p>
        <CodeBlock code={currentProjects[1].code} />
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
          <SpecularButton
            size="sm"
            radius={10}
            tint="#ff63f9"
            tintOpacity={0.85}
            lineColor="#ffffff"
            baseColor="#ff63f9"
            textColor="#000000"
            icon={<PlayCircleOutlined />}
            onClick={() => {
              setUserCode(currentProjects[1].code);
              handleRunCode(currentProjects[1].code);
            }}
          >
            Run & Test Project #2
          </SpecularButton>
          <button
            type="button"
            onClick={() => handleCopySnippet(currentProjects[1].code, "proj-1")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white/90 bg-[#12121e] hover:bg-[#ff63f9]/15 border border-white/15 hover:border-[#ff63f9]/50 hover:text-[#ff63f9] shadow-sm hover:shadow-[0_0_15px_rgba(255,99,249,0.25)] transition-all cursor-pointer active:scale-95"
          >
            <CopyOutlined className={copiedId === "proj-1" ? "text-emerald-400 text-sm" : "text-[#ff63f9] text-sm"} />
            <span>{copiedId === "proj-1" ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION FOOTER */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-4 sm:p-6 flex items-center justify-between gap-4">
        <SpecularButton
          size="md"
          radius={10}
          disabled={dayId <= 1}
          tint="#181824"
          tintOpacity={0.8}
          lineColor="#ffffff"
          baseColor="#333344"
          textColor="#ffffff"
          icon={<LeftOutlined />}
          onClick={handlePrevDay}
        >
          Previous Day
        </SpecularButton>

        <div className="text-xs sm:text-sm text-white/60 font-semibold hidden sm:block">
          Day {dayId} of {totalDays}
        </div>

        <SpecularButton
          size="md"
          radius={10}
          tint="#ff63f9"
          tintOpacity={0.9}
          lineColor="#ffffff"
          baseColor="#ff63f9"
          textColor="#000000"
          icon={<RightOutlined />}
          onClick={handleNextDay}
        >
          {dayId < totalDays ? "Next Day" : "Claim Certificate"}
        </SpecularButton>
      </div>

      {/* Solution Modal */}
      <Modal
        title={`Solution Code for Day ${lesson.day}`}
        open={solutionModalOpen}
        onCancel={() => setSolutionModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setSolutionModalOpen(false)} className="text-xs bg-[#000000] text-white border-white/10 rounded-[7px]">
            Close
          </Button>,
          <Button
            key="apply"
            type="primary"
            className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs rounded-[7px]"
            onClick={() => {
              setUserCode(lesson.exercise.solutionCode);
              setSolutionModalOpen(false);
            }}
          >
            Apply Solution Code to Editor
          </Button>
        ]}
      >
        <CodeBlock code={lesson.exercise.solutionCode} />
      </Modal>

      {/* Certificate of Completion Modal */}
      <Modal
        open={certModalOpen}
        onCancel={() => setCertModalOpen(false)}
        footer={null}
        width={600}
        centered
      >
        <div className="text-center py-5 px-3 space-y-5 bg-[#08080c] text-white rounded-[7px] border border-white/10">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/10 text-[#ff63f9] flex items-center justify-center text-3xl border border-white/10 shadow-[0_0_20px_rgba(255,99,249,0.3)]">
            <TrophyOutlined />
          </div>

          <div>
            <Tag color="rgba(255,99,249,0.2)" className="font-bold px-2.5 py-0.5 text-xs uppercase mb-2 text-[#ff63f9] border-none">OFFICIAL CERTIFICATE OF COMPLETION</Tag>
            <h2 className="text-xl font-bold text-white">JavaScript Mastery Curriculum Completed!</h2>
            <p className="text-xs text-white/70 max-w-sm mx-auto mt-1">
              This certifies that <strong className="text-white">{user?.name || "Student"}</strong> has successfully mastered all micro-concepts and modules in modern JavaScript core concepts and ES6 standards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#000000] border border-white/10 text-left space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 font-medium">Student Name:</span>
              <span className="font-semibold text-white">{user?.name || "JS Student"}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 font-medium">Curriculum:</span>
              <span className="font-semibold text-white">JavaScript Micro-Learning Core Modules</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 font-medium">Total Modules Completed:</span>
              <span className="font-semibold text-white">6 Core Modules ({totalDays} Lessons)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 font-medium">Completion Date:</span>
              <span className="font-semibold text-white">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="primary"
              size="medium"
              icon={<ShareAltOutlined />}
              onClick={() => {
                notification.success({
                  message: "Certificate Copied!",
                  description: "Share your JavaScript learning achievement on LinkedIn or Twitter!",
                  placement: "bottomRight"
                });
              }}
              className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs rounded-[7px] h-9 px-4 shadow-sm"
            >
              Share Certificate
            </Button>
            <Button size="medium" onClick={() => setCertModalOpen(false)} className="bg-[#000000] text-white/80 border border-white/10 rounded-[7px] text-xs h-9 px-4">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
