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
import GlassSurface from "@/components/reactbits/GlassSurface";
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

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
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
        title: `Project 1: ${lesson.title} - Real-World Utility`,
        description: `Build a production-ready utility module using ${lesson.title.toLowerCase()} for data processing and application logic.`,
        code: `// Project 1: Production Utility
function executeUtilityModule(inputVal) {
  console.log("⚡ Executing module for: ${lesson.title}");
  
  // Concept execution
  ${lesson.codeSnippet}

  return { status: "ACTIVE", result: inputVal };
}

console.log(executeUtilityModule("Test Payload"));`,
        outcome: `Demonstrates clean practical execution of ${lesson.title} in real-world JS applications.`
      },
      {
        title: `Project 2: Interactive Feature & State Engine`,
        description: `Construct an interactive feature engine integrating ${lesson.title.toLowerCase()} for modular JavaScript applications.`,
        code: `// Project 2: Feature Engine
const FeatureEngine = {
  name: "${lesson.title} Module",
  init() {
    console.log("🚀 Initializing ${lesson.title} Engine...");
    ${lesson.exercise.solutionCode}
  }
};

FeatureEngine.init();`,
        outcome: `Applies modular code design and state logic using ${lesson.title}.`
      }
    ];
  };

  const currentProjects = getProjectsForLesson();

  return (
    <div className="space-y-5 pb-12">
      {/* Header Banner wrapped in GlassSurface */}
      <GlassSurface borderRadius={16} className="p-5">
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
            <SpecularButton
              size="md"
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
      </GlassSurface>

      {/* Main Grid: Concept Blueprint + Sidebar Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Concept Deep Dive Card (Col-span 2) */}
        <div className="lg:col-span-2">
          <GlassSurface borderRadius={16} className="p-6 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="text-[#ff63f9] text-base" />
                <span className="font-bold text-sm text-white">Concept Architecture & Code Blueprint</span>
              </div>
              <Tag className="bg-white/10 text-white/90 border-none text-[10px]">ES2026 Core</Tag>
            </div>

            <p className="text-xs text-white/80 leading-relaxed m-0">
              {lesson.description} Below is the standard syntax structure used in modern JavaScript development:
            </p>

            {/* Code Snippet Box */}
            <div className="relative group">
              <pre className="p-4 rounded-[7px] bg-[#000000] text-white/90 font-mono text-xs overflow-x-auto border border-white/10 leading-relaxed">
                <code>{lesson.codeSnippet}</code>
              </pre>
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopySnippet(lesson.codeSnippet)}
                className="absolute top-3 right-3 text-[10px] font-medium bg-white/10 hover:bg-white/20 text-white border-none rounded-[5px] cursor-pointer"
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-white/60">
              <span className="flex items-center gap-1.5 text-[11px]">
                <BulbOutlined className="text-[#ff63f9]" /> Key takeaway: {lesson.summaryNotes[0]}
              </span>
              <a
                href={lesson.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-white hover:underline text-[11px] font-medium flex items-center gap-1"
              >
                MDN Documentation <ExportOutlined />
              </a>
            </div>
          </GlassSurface>
        </div>

        {/* Quick Lesson Specs Sidebar (Col-span 1) */}
        <div>
          <GlassSurface borderRadius={16} className="p-5">
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
                    className="no-underline inline-flex items-center gap-1.5 px-3 py-1 rounded-[7px] bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-colors"
                  >
                    MDN Docs <ExportOutlined />
                  </a>
                </div>
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
          </GlassSurface>
        </div>
      </div>

      {/* 2 REAL-WORLD PROJECTS SECTION wrapped in GlassSurface */}
      <GlassSurface borderRadius={18} className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 m-0">
              <FolderOpenOutlined className="text-[#ff63f9]" /> Real-World Hands-On Projects (2 Projects for Day {lesson.day})
            </h2>
            <p className="text-xs text-white/50 m-0 mt-0.5">
              Practice building full application modules using today's core concept.
            </p>
          </div>
          <Tag color="rgba(255, 99, 249, 0.15)" className="text-[#ff63f9] border-none font-semibold text-xs">
            2 Practical Projects
          </Tag>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentProjects.map((proj, idx) => (
            <GlassSurface key={idx} borderRadius={12} className="p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{proj.title}</span>
                  <Tag className="bg-white/10 text-white text-[9px] border-none">Project #{idx + 1}</Tag>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed m-0">{proj.description}</p>

                <div className="relative">
                  <pre className="p-3 rounded-[5px] bg-[#08080c] text-white/90 font-mono text-[11px] overflow-x-auto border border-white/10 max-h-40">
                    <code>{proj.code}</code>
                  </pre>
                </div>

                <div className="text-[11px] text-white/50 bg-white/5 p-2 rounded-[5px]">
                  💡 <strong>Outcome:</strong> {proj.outcome}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <SpecularButton
                  size="sm"
                  radius={8}
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
                  radius={8}
                  tint="#181824"
                  tintOpacity={0.8}
                  lineColor="#ffffff"
                  baseColor="#333344"
                  textColor="#ffffff"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopySnippet(proj.code)}
                >
                  Copy Code
                </SpecularButton>
              </div>
            </GlassSurface>
          ))}
        </div>
      </GlassSurface>

      {/* Tabs: Documentation, Interactive Code Practice & Personal Notes wrapped in GlassSurface */}
      <GlassSurface borderRadius={18} className="p-5">
        <Tabs
          defaultActiveKey="sandbox"
          items={[
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
                    message={<span className="font-semibold text-xs text-white">Micro-Exercise Challenge</span>}
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
                            className="text-[11px] bg-[#000000] text-white/80 border border-white/10 rounded-[5px] cursor-pointer"
                          >
                            Reset
                          </Button>
                          <Button
                            size="small"
                            icon={<BulbOutlined />}
                            onClick={() => setShowHint(!showHint)}
                            className="text-[11px] bg-[#000000] text-white/80 border border-white/10 rounded-[5px] cursor-pointer"
                          >
                            {showHint ? "Hide Hint" : "Hint"}
                          </Button>
                        </div>
                      </div>

                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-56 p-3 rounded-[7px] bg-[#000000] text-white font-mono text-xs border border-white/10 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none leading-relaxed"
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
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-white">Terminal Output (console.log)</span>
                      <div className="w-full h-56 p-3 rounded-[7px] bg-[#000000] text-white/90 font-mono text-xs border border-white/10 overflow-y-auto space-y-1">
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
                <span className="font-medium text-xs flex items-center gap-2 text-white">
                  <BookOutlined className="text-white/60" /> Lesson Takeaways & Notes
                </span>
              ),
              children: (
                <div className="space-y-5 pt-2">
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
                          className="no-underline inline-flex items-center gap-1 px-3 py-1 rounded-[7px] bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors shrink-0 shadow-sm"
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
                    <SpecularButton
                      size="sm"
                      radius={8}
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
                    rows={7}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your study notes here..."
                    className="font-sans text-xs rounded-[7px] p-3 bg-[#000000] text-white border-white/10"
                  />
                </div>
              )
            }
          ]}
        />
      </GlassSurface>

      {/* Navigation Footer wrapped in GlassSurface */}
      <GlassSurface borderRadius={14} className="p-3.5">
        <div className="flex items-center justify-between gap-4">
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

          <div className="text-xs text-white/50 font-medium hidden sm:block">
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
            {dayId < totalDays ? "Next Day" : "Claim Certificate 🎉"}
          </SpecularButton>
        </div>
      </GlassSurface>

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
