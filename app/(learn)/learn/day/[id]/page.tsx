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
    <div className="space-y-5 pb-12">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl border bg-[#08080c] border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Tag color="rgba(255, 255, 255, 0.15)" className="font-semibold m-0 text-white border-none text-[10px]">{lesson.module}</Tag>
              <Tag color={isCompleted ? "rgba(255, 255, 255, 0.15)" : "#000000"} className="font-semibold m-0 border border-white/10 text-white/80 text-[10px]">
                {isCompleted ? <span className="flex items-center gap-1 text-white"><CheckCircleFilled /> Completed</span> : "In Progress"}
              </Tag>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight m-0 text-white">
              Day {lesson.day}: {lesson.title}
            </h1>
            <p className="text-xs mt-1 m-0 text-white/60">
              {lesson.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              type={isCompleted ? "default" : "primary"}
              size="medium"
              icon={isCompleted ? <CheckCircleFilled className="text-white" /> : <CheckCircleOutlined />}
              onClick={handleToggleComplete}
              className={!isCompleted ? "bg-white text-black hover:bg-white/90 border-none font-semibold text-xs rounded-[9px]" : "font-semibold border-white/10 text-white/80 rounded-[9px] text-xs"}
            >
              {isCompleted ? "Marked Completed" : "Mark as Completed"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Video + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Video Player (Col-span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border overflow-hidden bg-[#08080c] border-white/10">
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
            <div className="p-3.5 flex flex-wrap items-center justify-between gap-3 bg-[#000000] border-t border-white/10 text-xs text-white/80">
              <div className="flex items-center gap-2 font-medium text-[11px]">
                <FieldTimeOutlined className="text-white/60 text-xs" />
                <span>Timestamp: {formatTime(lesson.videoStartTime)} - {formatTime(lesson.videoEndTime)} ({durationSeconds} seconds)</span>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}&t=${lesson.videoStartTime}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-white/80 hover:text-white font-medium text-[11px] flex items-center gap-1"
              >
                Watch on YouTube <ExportOutlined />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Lesson Specs Sidebar (Col-span 1) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border bg-[#08080c] border-white/10">
            <span className="font-bold text-xs flex items-center gap-2 text-white mb-3.5"><BookOutlined /> Lesson Specs</span>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/40 font-medium text-[11px]">Lesson Concept:</span>
                <div className="font-semibold text-xs text-white mt-0.5">{lesson.title}</div>
              </div>

              <div>
                <span className="text-white/40 font-medium text-[11px]">Module Group:</span>
                <div className="font-medium text-xs text-white/80 mt-0.5">{lesson.module}</div>
              </div>

              <div>
                <span className="text-white/40 font-medium text-[11px]">Documentation Reference:</span>
                <div className="mt-1">
                  <a
                    href={lesson.docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline inline-flex items-center gap-1.5 px-3 py-1 rounded-[9px] bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-colors"
                  >
                    MDN Documentation <ExportOutlined />
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <Button
                  block
                  type="primary"
                  icon={<RocketOutlined />}
                  onClick={handleNextDay}
                  className="bg-white text-black hover:bg-white/90 border-none font-semibold h-9 text-xs rounded-[9px] shadow-sm"
                >
                  {dayId < totalDays ? "Complete & Go to Next Day" : "Claim Certificate 🎉"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Documentation, Interactive Code Practice & Personal Notes */}
      <div className="p-5 rounded-2xl border bg-[#08080c] border-white/10">
        <Tabs
          defaultActiveKey="docs"
          items={[
            {
              key: "docs",
              label: (
                <span className="font-medium text-xs flex items-center gap-2 text-white">
                  <BookOutlined className="text-white/60" /> Lesson Documentation & Notes
                </span>
              ),
              children: (
                <div className="space-y-5 pt-2">
                  {/* Summary Notes */}
                  <div>
                    <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white">
                      <BulbOutlined /> Key Concept Takeaways
                    </h3>
                    <ul className="space-y-1.5 text-xs list-disc pl-5 text-white/80">
                      {lesson.summaryNotes.map((note, i) => (
                        <li key={i} className="text-white/70">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Snippet Box */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold m-0 flex items-center gap-2 text-white">
                        <CodeOutlined /> Syntax & Code Example
                      </h3>
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={handleCopySnippet}
                        className="text-[11px] font-medium bg-[#000000] text-white/80 border border-white/10 rounded-[7px]"
                      >
                        {copied ? "Copied!" : "Copy Snippet"}
                      </Button>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-[#000000] text-white/90 font-mono text-xs overflow-x-auto border border-white/10 leading-relaxed">
                      <code>{lesson.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* Documentation Banner */}
                  <Alert
                    type="info"
                    showIcon
                    icon={<BookOutlined />}
                    message={<span className="font-semibold text-xs text-white">Official MDN Documentation Guide</span>}
                    description={
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
                        <span className="text-[11px] text-white/60">
                          Deepen your knowledge by exploring full documentation, parameters, and code examples.
                        </span>
                        <a
                          href={lesson.docsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex items-center gap-1 px-3 py-1 rounded-[9px] bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors shrink-0 shadow-sm"
                        >
                          Open MDN Documentation <ExportOutlined />
                        </a>
                      </div>
                    }
                    className="bg-[#000000] border-white/10"
                  />
                </div>
              )
            },
            {
              key: "sandbox",
              label: (
                <span className="font-medium text-xs flex items-center gap-2 text-white">
                  <CodeOutlined className="text-white/60" /> Interactive Exercise & Sandbox
                </span>
              ),
              children: (
                <div className="space-y-5 pt-2">
                  {/* Exercise Prompt */}
                  <Alert
                    type="warning"
                    showIcon
                    icon={<TrophyOutlined />}
                    message={<span className="font-semibold text-xs text-white">Micro-Exercise</span>}
                    description={<p className="text-xs m-0 mt-1 text-white/70">{lesson.exercise.prompt}</p>}
                    className="bg-[#000000] border-white/10"
                  />

                  {/* Code Textarea & Console Output Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Code Editor Area */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <span>JavaScript Editor</span>
                          <span className="text-[9px] text-white/70 font-mono bg-white/10 px-1.5 py-0.5 rounded">Ctrl + Enter to run</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="small"
                            icon={<ReloadOutlined />}
                            onClick={() => setUserCode(lesson.exercise.starterCode)}
                            className="text-[11px] bg-[#000000] text-white/80 border border-white/10 rounded-[7px]"
                          >
                            Reset Code
                          </Button>
                          <Button
                            size="small"
                            icon={<BulbOutlined />}
                            onClick={() => setShowHint(!showHint)}
                            className="text-[11px] bg-[#000000] text-white/80 border border-white/10 rounded-[7px]"
                          >
                            {showHint ? "Hide Hint" : "Show Hint"}
                          </Button>
                        </div>
                      </div>

                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-52 p-3 rounded-xl bg-[#000000] text-white font-mono text-xs border border-white/10 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none leading-relaxed"
                        placeholder="Write your JavaScript code here..."
                      />

                      {showHint && (
                        <Alert
                          type="info"
                          message={<span className="text-[11px] font-normal text-white/80">Hint: {lesson.exercise.hint}</span>}
                          className="py-1 px-3 bg-[#000000] border-white/10"
                        />
                      )}

                      <div className="flex items-center gap-2.5">
                        <Button
                          type="primary"
                          icon={<PlayCircleOutlined />}
                          onClick={handleRunCode}
                          className="bg-white text-black hover:bg-white/90 border-none font-semibold h-8 px-4 text-xs rounded-[9px] shadow-sm"
                        >
                          Run Code & Test Output
                        </Button>
                        <Button
                          icon={<CodeOutlined />}
                          onClick={() => setSolutionModalOpen(true)}
                          className="text-xs font-medium bg-[#000000] text-white/80 border border-white/10 rounded-[9px] h-8"
                        >
                          View Solution
                        </Button>
                      </div>
                    </div>

                    {/* Terminal Console Output */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-white">Terminal Output (console.log)</span>
                      <div className="w-full h-52 p-3 rounded-xl bg-[#000000] text-white/90 font-mono text-xs border border-white/10 overflow-y-auto space-y-1">
                        {consoleOutput.length === 0 ? (
                          <span className="text-white/30 italic">Click "Run Code" or press Ctrl+Enter to view console output here...</span>
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
              key: "notes",
              label: (
                <span className="font-medium text-xs flex items-center gap-2 text-white">
                  <FileTextOutlined className="text-white/60" /> Personal Study Notes
                </span>
              ),
              children: (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold m-0 flex items-center gap-2 text-white">
                        <FileTextOutlined /> Personal Notes for Day {lesson.day}
                      </h3>
                      <p className="text-[11px] text-white/50 m-0">Write down key observations or code snippets. Saved to browser localStorage.</p>
                    </div>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveNote}
                      className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs h-8 rounded-[9px] shadow-sm"
                    >
                      {noteSaved ? "Saved!" : "Save Notes"}
                    </Button>
                  </div>

                  <TextArea
                    rows={7}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your study notes here..."
                    className="font-sans text-xs rounded-xl p-3 bg-[#000000] text-white border-white/10"
                  />
                </div>
              )
            }
          ]}
        />
      </div>

      {/* Navigation Footer */}
      <div className="p-3.5 rounded-2xl border flex items-center justify-between gap-4 bg-[#08080c] border-white/10">
        <Button
          size="medium"
          icon={<LeftOutlined />}
          disabled={dayId <= 1}
          onClick={handlePrevDay}
          className="font-medium bg-[#000000] text-white/80 border border-white/10 rounded-[9px] text-xs disabled:opacity-30"
        >
          Previous Day
        </Button>

        <div className="text-xs text-white/50 font-medium hidden sm:block">
          Day {dayId} of {totalDays}
        </div>

        <Button
          type="primary"
          size="medium"
          icon={<RightOutlined />}
          onClick={handleNextDay}
          className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs rounded-[9px] shadow-sm"
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
        <div className="text-center py-5 px-3 space-y-5 bg-[#08080c] text-white rounded-2xl border border-white/10">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/15 text-white flex items-center justify-center text-3xl">
            🏆
          </div>

          <div>
            <Tag color="rgba(255,255,255,0.15)" className="font-semibold px-2.5 py-0.5 text-[10px] uppercase mb-2 text-white border-none">OFFICIAL CERTIFICATE OF COMPLETION</Tag>
            <h2 className="text-xl font-bold text-white">100+ Days JavaScript Challenge Completed!</h2>
            <p className="text-xs text-white/60 max-w-sm mx-auto mt-1">
              This certifies that <strong className="text-white">{user?.name || "Student"}</strong> has successfully mastered all 43+ micro-concepts and 6 modules in modern JavaScript core concepts and ES6 standards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#000000] border border-white/10 text-left space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 font-medium">Student Name:</span>
              <span className="font-semibold text-white">{user?.name || "JS Student"}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 font-medium">Curriculum:</span>
              <span className="font-semibold text-white">100+ Days JavaScript Micro-Learning</span>
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
              className="bg-white text-black hover:bg-white/90 border-none font-semibold text-xs rounded-[9px] h-9 px-4 shadow-sm"
            >
              Share Certificate
            </Button>
            <Button size="medium" onClick={() => setCertModalOpen(false)} className="bg-[#000000] text-white/80 border border-white/10 rounded-[9px] text-xs h-9 px-4">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
