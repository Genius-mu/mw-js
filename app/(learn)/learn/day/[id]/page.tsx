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
  FieldTimeOutlined,
  TrophyOutlined,
  ReloadOutlined,
  RocketOutlined,
  FileTextOutlined,
  SaveOutlined,
  ShareAltOutlined
} from "@ant-design/icons";
import { CURRICULUM_DATA, LessonDay, YOUTUBE_VIDEO_ID } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";

const { TextArea } = Input;

export default function DayLearningPage() {
  const params = useParams();
  const router = useRouter();
  const {
    markDayCompleted,
    markDayUncompleted,
    isDayCompleted,
    themeMode,
    totalDays,
    getUserNote,
    saveUserNote,
    user,
    completedCount
  } = useLearning();

  const dayId = parseInt(params.id as string, 10) || 1;
  const lesson = CURRICULUM_DATA.find((d) => d.id === dayId) || CURRICULUM_DATA[0];

  const isCompleted = isDayCompleted(lesson.id);
  const isDark = themeMode === "dark";

  // Code runner state
  const [userCode, setUserCode] = useState(lesson.exercise.starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
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

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(lesson.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    saveUserNote(lesson.id, noteText);
    setNoteSaved(true);
    notification.success({
      message: "Note Saved",
      description: `Personal study notes for Day ${lesson.day} saved to local storage.`,
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
        description: `Great job! You mastered "${lesson.title}". Proceed to the next lesson!`,
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
  const handleRunCode = () => {
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
      const runFn = new Function("console", userCode);
      runFn(customConsole);
      if (logs.length === 0) {
        logs.push("=> Code executed cleanly with 0 console logs.");
      }
      setConsoleOutput(logs);
    } catch (err: any) {
      setConsoleOutput([`Execution Error: ${err.message}`]);
    }
  };

  const durationSeconds = lesson.videoEndTime - lesson.videoStartTime;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner - Space Purple Theme */}
      <div className={`p-6 rounded-[19.2px] border ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag color="#ff63f9" className="font-semibold m-0 text-black border-none">{lesson.module}</Tag>
              <Tag color={isCompleted ? "#ff63f9" : "#211327"} className="font-semibold m-0 border border-[#ffffff25] text-white">
                {isCompleted ? <span className="flex items-center gap-1 text-black"><CheckCircleFilled /> Completed</span> : "In Progress"}
              </Tag>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight m-0 text-[#ff63f9]">
              Day {lesson.day}: {lesson.title}
            </h1>
            <p className={`text-sm mt-1 m-0 ${isDark ? "text-white/80" : "text-[#211327]"}`}>
              {lesson.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              type={isCompleted ? "default" : "primary"}
              size="large"
              icon={isCompleted ? <CheckCircleFilled className="text-[#ff63f9]" /> : <CheckCircleOutlined />}
              onClick={handleToggleComplete}
              className={!isCompleted ? "bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md" : "font-bold border-[#ffffff25] text-white rounded-md"}
            >
              {isCompleted ? "Marked Completed" : "Mark as Completed"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: YouTube Video + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* YouTube Video Player (Col-span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-[19.2px] border overflow-hidden ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            {/* Embed Video Iframe */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?start=${lesson.videoStartTime}&end=${lesson.videoEndTime}&autoplay=0&rel=0&modestbranding=1`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Control & Timestamp Footer */}
            <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-[#000000] border-t border-[#ffffff15] text-xs text-white">
              <div className="flex items-center gap-2 font-semibold">
                <FieldTimeOutlined className="text-[#ff63f9] text-sm" />
                <span>Timestamp: {formatTime(lesson.videoStartTime)} - {formatTime(lesson.videoEndTime)} ({durationSeconds} seconds)</span>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}&t=${lesson.videoStartTime}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-[#ff63f9] hover:underline font-bold flex items-center gap-1"
              >
                Watch on YouTube <ExportOutlined />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Lesson Specs Sidebar (Col-span 1) */}
        <div className="space-y-4">
          <div className={`p-6 rounded-[19.2px] border ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
            <span className="font-bold text-sm flex items-center gap-2 text-[#ff63f9] mb-4"><BookOutlined /> Lesson Specs</span>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/50 font-semibold">Lesson Concept:</span>
                <div className="font-bold text-sm text-white mt-0.5">{lesson.title}</div>
              </div>

              <div>
                <span className="text-white/50 font-semibold">Module Group:</span>
                <div className="font-medium text-white mt-0.5">{lesson.module}</div>
              </div>

              <div>
                <span className="text-white/50 font-semibold">Documentation Reference:</span>
                <div className="mt-1">
                  <a
                    href={lesson.w3SchoolsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#ff63f9]/20 text-[#ff63f9] font-bold hover:bg-[#ff63f9] hover:text-black transition-colors"
                  >
                    W3Schools Docs <ExportOutlined />
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-[#ffffff15]">
                <Button
                  block
                  type="primary"
                  icon={<RocketOutlined />}
                  onClick={handleNextDay}
                  className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold h-10 rounded-md"
                >
                  {dayId < totalDays ? "Complete & Go to Next Day" : "Claim Certificate 🎉"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Documentation, Interactive Code Practice & Personal Notes */}
      <div className={`p-6 rounded-[19.2px] border ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
        <Tabs
          defaultActiveKey="docs"
          items={[
            {
              key: "docs",
              label: (
                <span className="font-semibold text-sm flex items-center gap-2 text-white">
                  <BookOutlined className="text-[#ff63f9]" /> W3Schools Documentation & Notes
                </span>
              ),
              children: (
                <div className="space-y-6 pt-2">
                  {/* Summary Notes */}
                  <div>
                    <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-[#ff63f9]">
                      <BulbOutlined /> Key Concept Takeaways
                    </h3>
                    <ul className="space-y-2 text-sm list-disc pl-5">
                      {lesson.summaryNotes.map((note, i) => (
                        <li key={i} className={isDark ? "text-white" : "text-[#211327]"}>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Snippet Box */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold m-0 flex items-center gap-2 text-[#ff63f9]">
                        <CodeOutlined /> Syntax & Code Example
                      </h3>
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={handleCopySnippet}
                        className="text-xs font-medium bg-[#000000] text-white border border-[#ffffff25] rounded-md"
                      >
                        {copied ? "Copied!" : "Copy Snippet"}
                      </Button>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#000000] text-[#ff63f9] font-mono text-sm overflow-x-auto border border-[#ffffff15] leading-relaxed">
                      <code>{lesson.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* W3Schools Documentation Banner */}
                  <Alert
                    type="info"
                    showIcon
                    icon={<BookOutlined />}
                    message={<span className="font-bold text-white">Official W3Schools Documentation Link</span>}
                    description={
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
                        <span className="text-xs text-white/80">
                          Deepen your knowledge by reading the full documentation, parameters, and browser compatibility on W3Schools.
                        </span>
                        <a
                          href={lesson.w3SchoolsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex items-center gap-1 px-4 py-1.5 rounded-md bg-white text-black font-bold text-xs hover:bg-[#ff63f9] hover:text-black transition-colors shrink-0"
                        >
                          Open W3Schools Topic <ExportOutlined />
                        </a>
                      </div>
                    }
                    className="bg-[#000000] border-[#ffffff25]"
                  />
                </div>
              )
            },
            {
              key: "sandbox",
              label: (
                <span className="font-semibold text-sm flex items-center gap-2 text-white">
                  <CodeOutlined className="text-[#ff63f9]" /> Interactive Exercise & Sandbox
                </span>
              ),
              children: (
                <div className="space-y-6 pt-2">
                  {/* Exercise Prompt */}
                  <Alert
                    type="warning"
                    showIcon
                    icon={<TrophyOutlined />}
                    message={<span className="font-bold text-white">Micro-Exercise</span>}
                    description={<p className="text-sm m-0 mt-1 text-white/80">{lesson.exercise.prompt}</p>}
                    className="bg-[#000000] border-[#ffffff15]"
                  />

                  {/* Code Textarea & Console Output Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Code Editor Area */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>JavaScript Editor</span>
                          <span className="text-[10px] text-[#ff63f9] font-semibold bg-[#ff63f9]/20 px-2 py-0.5 rounded">Ctrl + Enter to run</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="small"
                            icon={<ReloadOutlined />}
                            onClick={() => setUserCode(lesson.exercise.starterCode)}
                            className="text-xs bg-[#000000] text-white border border-[#ffffff25] rounded-md"
                          >
                            Reset Code
                          </Button>
                          <Button
                            size="small"
                            icon={<BulbOutlined />}
                            onClick={() => setShowHint(!showHint)}
                            className="text-xs bg-[#000000] text-white border border-[#ffffff25] rounded-md"
                          >
                            {showHint ? "Hide Hint" : "Show Hint"}
                          </Button>
                        </div>
                      </div>

                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-56 p-3 rounded-xl bg-[#000000] text-[#ff63f9] font-mono text-sm border border-[#ffffff25] focus:outline-none focus:ring-2 focus:ring-[#ff63f9] resize-none leading-relaxed"
                        placeholder="Write your JavaScript code here..."
                      />

                      {showHint && (
                        <Alert
                          type="info"
                          message={<span className="text-xs font-semibold text-white">Hint: {lesson.exercise.hint}</span>}
                          className="py-1 px-3 bg-[#000000] border-[#ffffff25]"
                        />
                      )}

                      <div className="flex items-center gap-3">
                        <Button
                          type="primary"
                          icon={<PlayCircleOutlined />}
                          onClick={handleRunCode}
                          className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold h-10 px-6 rounded-md"
                        >
                          Run Code & Test Output
                        </Button>
                        <Button
                          icon={<CodeOutlined />}
                          onClick={() => setSolutionModalOpen(true)}
                          className="text-xs font-bold bg-[#000000] text-white border border-[#ffffff25] rounded-md"
                        >
                          View Solution
                        </Button>
                      </div>
                    </div>

                    {/* Terminal Console Output */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-white">Terminal Output (console.log)</span>
                      <div className="w-full h-56 p-3 rounded-xl bg-[#000000] text-white font-mono text-xs border border-[#ffffff25] overflow-y-auto space-y-1">
                        {consoleOutput.length === 0 ? (
                          <span className="text-white/40 italic">Click "Run Code" or press Ctrl+Enter to view console output here...</span>
                        ) : (
                          consoleOutput.map((line, idx) => (
                            <div
                              key={idx}
                              className={
                                line.startsWith("[ERROR]")
                                  ? "text-red-400 font-bold"
                                  : line.startsWith("=>")
                                  ? "text-white/40 italic"
                                  : "text-[#ff63f9]"
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
              key: "notes",
              label: (
                <span className="font-semibold text-sm flex items-center gap-2 text-white">
                  <FileTextOutlined className="text-[#ff63f9]" /> Personal Study Notes
                </span>
              ),
              children: (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold m-0 flex items-center gap-2 text-[#ff63f9]">
                        <FileTextOutlined /> Personal Notes for Day {lesson.day}
                      </h3>
                      <p className="text-xs text-white/50 m-0">Write down key observations or code snippets. Saved to browser localStorage.</p>
                    </div>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveNote}
                      className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold text-xs rounded-md"
                    >
                      {noteSaved ? "Saved!" : "Save Notes"}
                    </Button>
                  </div>

                  <TextArea
                    rows={8}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your study notes here..."
                    className="font-sans text-sm rounded-xl p-3 bg-[#000000] text-white border-[#ffffff25]"
                  />
                </div>
              )
            }
          ]}
        />
      </div>

      {/* Navigation Footer */}
      <div className={`p-4 rounded-[19.2px] border flex items-center justify-between gap-4 ${isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"}`}>
        <Button
          size="large"
          icon={<LeftOutlined />}
          disabled={dayId <= 1}
          onClick={handlePrevDay}
          className="font-bold bg-[#000000] text-white border border-[#ffffff25] rounded-md disabled:opacity-40"
        >
          Previous Day
        </Button>

        <div className="text-xs text-white font-medium hidden sm:block">
          Day {dayId} of {totalDays}
        </div>

        <Button
          type="primary"
          size="large"
          icon={<RightOutlined />}
          onClick={handleNextDay}
          className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold rounded-md"
        >
          {dayId < totalDays ? "Next Day" : "Claim Certificate 🎉"}
        </Button>
      </div>

      {/* Solution Modal */}
      <Modal
        title={`Solution Code for Day ${lesson.day}`}
        open={solutionModalOpen}
        onCancel={() => setSolutionModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setSolutionModalOpen(false)}>
            Close
          </Button>,
          <Button
            key="apply"
            type="primary"
            className="bg-white text-black hover:bg-[#ff63f9] border-none font-bold"
            onClick={() => {
              setUserCode(lesson.exercise.solutionCode);
              setSolutionModalOpen(false);
            }}
          >
            Apply Solution Code to Editor
          </Button>
        ]}
      >
        <pre className="p-3 rounded-lg bg-[#000000] text-[#ff63f9] font-mono text-xs overflow-x-auto border border-[#ffffff15]">
          <code>{lesson.exercise.solutionCode}</code>
        </pre>
      </Modal>

      {/* Certificate of Completion Modal - Space Magenta Theme */}
      <Modal
        open={certModalOpen}
        onCancel={() => setCertModalOpen(false)}
        footer={null}
        width={650}
        centered
      >
        <div className="text-center py-6 px-4 space-y-6 bg-[#211327] text-white rounded-[24px] border border-[#ffffff25]">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#ff63f9] text-black flex items-center justify-center text-4xl shadow-[0_0_34px_rgba(255,99,249,0.3)]">
            🏆
          </div>

          <div>
            <Tag color="#ff63f9" className="font-extrabold px-3 py-1 text-xs uppercase mb-2 text-black border-none">OFFICIAL CERTIFICATE OF COMPLETION</Tag>
            <h2 className="text-2xl font-extrabold text-[#ff63f9]">100+ Days JavaScript Challenge Completed!</h2>
            <p className="text-sm text-white/80 max-w-md mx-auto">
              This certifies that <strong className="text-[#ff63f9]">{user?.name || "Student"}</strong> has successfully mastered all 43+ micro-concepts and 6 modules in JavaScript based on freeCodeCamp & W3Schools documentation.
            </p>
          </div>

          <div className="p-6 rounded-[19.2px] bg-[#000000] border border-[#ffffff15] text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#ffffff15] pb-2">
              <span className="text-white/50 font-semibold">Student Name:</span>
              <span className="font-bold text-white">{user?.name || "JS Student"}</span>
            </div>
            <div className="flex justify-between border-b border-[#ffffff15] pb-2">
              <span className="text-white/50 font-semibold">Curriculum:</span>
              <span className="font-bold text-[#ff63f9]">100+ Days JavaScript Micro-Learning</span>
            </div>
            <div className="flex justify-between border-b border-[#ffffff15] pb-2">
              <span className="text-white/50 font-semibold">Total Modules Completed:</span>
              <span className="font-bold text-white">6 Core Modules ({totalDays} Lessons)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50 font-semibold">Completion Date:</span>
              <span className="font-bold text-[#ff63f9]">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="primary"
              size="large"
              icon={<ShareAltOutlined />}
              onClick={() => {
                notification.success({
                  message: "Certificate Copied!",
                  description: "Share your JavaScript learning achievement on LinkedIn or Twitter!",
                  placement: "bottomRight"
                });
              }}
              className="bg-white text-black hover:bg-[#ff63f9] border-none font-bold rounded-md"
            >
              Share Certificate
            </Button>
            <Button size="large" onClick={() => setCertModalOpen(false)} className="bg-[#000000] text-white border border-[#ffffff25] rounded-md">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
