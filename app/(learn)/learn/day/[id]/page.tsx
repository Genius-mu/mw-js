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
import { CURRICULUM_DATA, LessonDay, LessonProject } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";
import SpecularButton from "@/components/reactbits/SpecularButton";

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
        message: `Day ${lesson.day} Completed! 🎉`,
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
    <div className="space-y-8 sm:space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ff63f9]/10 text-[#ff63f9] border border-[#ff63f9]/30 shadow-[0_0_12px_rgba(255,99,249,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff63f9] animate-pulse" />
                {lesson.module}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isCompleted 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" 
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              }`}>
                {isCompleted ? <><CheckCircleFilled /> Completed</> : "In Progress"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight m-0 text-white leading-tight">
              Day {lesson.day}: {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm mt-1 m-0 text-white/70 leading-relaxed max-w-2xl">
              {lesson.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
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
        </div>
      </div>

      {/* Main Grid: Concept Blueprint + Sidebar Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Concept Deep Dive Card (Col-span 2) */}
        <div className="lg:col-span-2">
          <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-2.5">
                <ThunderboltOutlined className="text-[#ff63f9] text-base" />
                <span className="font-extrabold text-sm sm:text-base text-white">Concept Architecture & Code Blueprint</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-white/90 border border-white/10">ES2026 Core</span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
              {lesson.description}
            </p>

            {/* Code Snippet Box */}
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-[#000000] text-white/90 font-mono text-xs sm:text-sm overflow-x-auto border border-white/10 leading-relaxed">
                <code>{lesson.codeSnippet}</code>
              </pre>
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopySnippet(lesson.codeSnippet, "main-snippet")}
                className="absolute top-3.5 right-3.5 text-[11px] font-medium bg-white/10 hover:bg-white/20 text-white border-none rounded-md cursor-pointer px-2.5 py-0.5"
              >
                {copiedId === "main-snippet" ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 text-xs text-white/60 border-t border-white/10">
              <span className="flex items-center gap-2 text-xs text-white/80">
                <BulbOutlined className="text-[#ff63f9] text-sm shrink-0" />
                <span><strong>Key takeaway:</strong> {lesson.summaryNotes[0]}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Lesson Specs Sidebar (Col-span 1) */}
        <div>
          <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
            <span className="font-extrabold text-sm flex items-center gap-2.5 text-white border-b border-white/10 pb-3">
              <BookOutlined className="text-[#ff63f9]" /> Lesson Specs
            </span>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-white/40 font-semibold uppercase text-[10px] tracking-wider">Lesson Concept:</span>
                <div className="font-bold text-sm text-white mt-1">{lesson.title}</div>
              </div>

              <div>
                <span className="text-white/40 font-semibold uppercase text-[10px] tracking-wider">Module Group:</span>
                <div className="font-medium text-xs text-white/80 mt-1">{lesson.module}</div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <SpecularButton
                  size="md"
                  radius={10}
                  tint="#ff63f9"
                  tintOpacity={0.9}
                  lineColor="#ffffff"
                  baseColor="#ff63f9"
                  textColor="#000000"
                  icon={<RocketOutlined />}
                  onClick={handleNextDay}
                  className="w-full justify-center"
                >
                  {dayId < totalDays ? "Complete & Go to Next Day" : "Claim Certificate 🎉"}
                </SpecularButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 REAL-WORLD PROJECTS SECTION */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2.5 m-0">
              <FolderOpenOutlined className="text-[#ff63f9]" /> Real-World Projects (Day {lesson.day})
            </h2>
            <p className="text-xs text-white/60 m-0 mt-1 leading-relaxed">
              Practice today's core concept with hands-on examples.
            </p>
          </div>
          <Tag color="rgba(255, 99, 249, 0.15)" className="text-[#ff63f9] border-none font-bold text-xs px-3 py-1 self-start sm:self-auto">
            2 Practical Projects
          </Tag>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentProjects.map((proj, idx) => (
            <div key={idx} className="bg-[#080810] border border-white/10 rounded-xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white">{proj.title}</span>
                  <Tag className="bg-white/10 text-white text-[10px] border-none px-2 py-0.5">Project #{idx + 1}</Tag>
                </div>
                <p className="text-xs text-white/70 leading-relaxed m-0">{proj.description}</p>

                <div className="relative pt-1">
                  <pre className="p-4 rounded-lg bg-[#08080c] text-white/90 font-mono text-xs overflow-x-auto border border-white/10 max-h-48 leading-relaxed">
                    <code>{proj.code}</code>
                  </pre>
                </div>

                <div className="text-xs text-white/60 bg-white/[0.04] p-3 rounded-lg border border-white/5">
                  💡 <strong>Outcome:</strong> {proj.outcome}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
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
                    setUserCode(proj.code);
                    handleRunCode(proj.code);
                  }}
                >
                  Run & Test Project #{idx + 1}
                </SpecularButton>
                <SpecularButton
                  size="sm"
                  radius={10}
                  tint="#181824"
                  tintOpacity={0.8}
                  lineColor="#ffffff"
                  baseColor="#333344"
                  textColor="#ffffff"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopySnippet(proj.code, `proj-${idx}`)}
                >
                  {copiedId === `proj-${idx}` ? "Copied!" : "Copy Code"}
                </SpecularButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs: Documentation, Interactive Code Practice & Personal Notes */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <Tabs
          defaultActiveKey="sandbox"
          items={[
            {
              key: "sandbox",
              label: (
                <span className="font-semibold text-xs sm:text-sm flex items-center gap-2.5 text-white py-1">
                  <CodeOutlined className="text-[#ff63f9]" /> Interactive Exercise & Sandbox
                </span>
              ),
              children: (
                <div className="space-y-6 pt-4">
                  {/* Exercise Prompt */}
                  <Alert
                    type="warning"
                    showIcon
                    icon={<TrophyOutlined className="text-[#ff63f9] text-base" />}
                    message={<span className="font-bold text-xs sm:text-sm text-white">Micro-Exercise Challenge</span>}
                    description={<p className="text-xs sm:text-sm m-0 mt-1.5 text-white/80 leading-relaxed">{lesson.exercise.prompt}</p>}
                    className="bg-[#000000] border-white/10 p-4 sm:p-5 rounded-xl"
                  />

                  {/* Code Textarea & Console Output Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Code Editor Area */}
                    <div className="space-y-3 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <span>JavaScript Editor</span>
                          <span className="text-[10px] text-white/70 font-mono bg-white/10 px-2 py-0.5 rounded-md">Ctrl + Enter to run</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="small"
                            icon={<ReloadOutlined />}
                            onClick={() => setUserCode(lesson.exercise.starterCode)}
                            className="text-xs bg-[#000000] hover:bg-white/10 text-white/80 border border-white/10 rounded-lg cursor-pointer px-3 py-1 h-auto"
                          >
                            Reset
                          </Button>
                          <Button
                            size="small"
                            icon={<BulbOutlined />}
                            onClick={() => setShowHint(!showHint)}
                            className="text-xs bg-[#000000] hover:bg-white/10 text-white/80 border border-white/10 rounded-lg cursor-pointer px-3 py-1 h-auto"
                          >
                            {showHint ? "Hide Hint" : "Hint"}
                          </Button>
                        </div>
                      </div>

                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-64 sm:h-72 p-4 rounded-xl bg-[#000000] text-white font-mono text-xs sm:text-sm border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#ff63f9]/50 resize-none leading-relaxed"
                        placeholder="Write your JavaScript code here..."
                      />

                      {showHint && (
                        <Alert
                          type="info"
                          message={<span className="text-xs font-medium text-white/90">Hint: {lesson.exercise.hint}</span>}
                          className="py-2 px-3.5 bg-[#000000] border-white/10 rounded-lg"
                        />
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <SpecularButton
                          size="md"
                          radius={12}
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
                          radius={12}
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
                      <span className="text-xs font-bold text-white flex items-center justify-between">
                        <span>Terminal Output (console.log)</span>
                        <span className="text-[10px] text-white/40 font-mono">Output Log</span>
                      </span>
                      <div className="w-full h-64 sm:h-72 p-4 rounded-xl bg-[#000000] text-white/90 font-mono text-xs sm:text-sm border border-white/10 overflow-y-auto space-y-1.5 leading-relaxed">
                        {consoleOutput.length === 0 ? (
                          <span className="text-white/30 italic">Click "Run Code" or press Ctrl+Enter to view console output...</span>
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
              )
            },
            {
              key: "docs",
              label: (
                <span className="font-semibold text-xs sm:text-sm flex items-center gap-2.5 text-white py-1">
                  <BookOutlined className="text-white/60" /> Lesson Takeaways & Notes
                </span>
              ),
              children: (
                <div className="space-y-6 pt-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold mb-3 flex items-center gap-2.5 text-white">
                      <BulbOutlined className="text-[#ff63f9]" /> Key Concept Takeaways
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5 text-white/80 leading-relaxed">
                      {lesson.summaryNotes.map((note, i) => (
                        <li key={i} className="text-white/70">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )
            },
            {
              key: "notes",
              label: (
                <span className="font-semibold text-xs sm:text-sm flex items-center gap-2.5 text-white py-1">
                  <FileTextOutlined className="text-white/60" /> Personal Study Notes
                </span>
              ),
              children: (
                <div className="space-y-5 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold m-0 flex items-center gap-2 text-white">
                        <FileTextOutlined className="text-[#ff63f9]" /> Personal Notes for Day {lesson.day}
                      </h3>
                      <p className="text-xs text-white/50 m-0 mt-1">Write down key observations or code snippets. Saved automatically to your browser.</p>
                    </div>
                    <SpecularButton
                      size="sm"
                      radius={10}
                      tint="#ff63f9"
                      tintOpacity={0.9}
                      lineColor="#ffffff"
                      baseColor="#ff63f9"
                      textColor="#000000"
                      icon={<SaveOutlined />}
                      onClick={handleSaveNote}
                    >
                      {noteSaved ? "Saved!" : "Save Notes"}
                    </SpecularButton>
                  </div>

                  <TextArea
                    rows={8}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your study notes here..."
                    className="font-sans text-xs sm:text-sm rounded-xl p-4 bg-[#000000] text-white border-white/10 focus:ring-1 focus:ring-[#ff63f9]/50"
                  />
                </div>
              )
            }
          ]}
        />
      </div>

      {/* Navigation Footer */}
      <div className="bg-[#0c0c14] border border-white/10 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <SpecularButton
            size="md"
            radius={12}
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
            radius={12}
            tint="#ff63f9"
            tintOpacity={0.9}
            lineColor="#ffffff"
            baseColor="#ff63f9"
            textColor="#000000"
            icon={<RightOutlined />}
            onClick={handleNextDay}
          >
            {dayId < totalDays ? "Next Day" : "Claim Certificate 🎉"}
          </SpecularButton>
        </div>
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
        <pre className="p-3 rounded-lg bg-[#000000] text-white/90 font-mono text-xs overflow-x-auto border border-white/10">
          <code>{lesson.exercise.solutionCode}</code>
        </pre>
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
          <div className="w-16 h-16 mx-auto rounded-full bg-white/15 text-white flex items-center justify-center text-3xl">
            🏆
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
