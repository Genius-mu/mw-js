"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CURRICULUM_DATA, LessonDay } from "@/lib/curriculum";

export interface User {
  email: string;
  name: string;
}

interface LearningContextType {
  user: User | null;
  completedDays: number[];
  themeMode: "light" | "dark";
  userNotes: Record<number, string>;
  login: (email: string, name?: string) => void;
  logout: () => void;
  markDayCompleted: (dayId: number) => void;
  markDayUncompleted: (dayId: number) => void;
  toggleDayCompleted: (dayId: number) => void;
  isDayCompleted: (dayId: number) => boolean;
  saveUserNote: (dayId: number, note: string) => void;
  getUserNote: (dayId: number) => string;
  toggleTheme: () => void;
  progressPercent: number;
  totalDays: number;
  completedCount: number;
  getNextUncompletedDay: () => number;
  resetProgress: () => void;
}

const STORAGE_KEYS = {
  USER: "js_hub_user",
  COMPLETED_DAYS: "js_hub_completed_days",
  THEME: "js_hub_theme",
  NOTES: "js_hub_user_notes"
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [userNotes, setUserNotes] = useState<Record<number, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const defaultUser = { name: "JS Student", email: "student@example.com" };
        setUser(defaultUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
      }

      const storedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
      if (storedCompleted) {
        setCompletedDays(JSON.parse(storedCompleted));
      } else {
        const initialCompleted = [1];
        setCompletedDays(initialCompleted);
        localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(initialCompleted));
      }

      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as "light" | "dark";
      if (storedTheme) {
        setThemeMode(storedTheme);
      }

      const storedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (storedNotes) {
        setUserNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const newUser = {
      email,
      name: name || email.split("@")[0] || "Student"
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const markDayCompleted = (dayId: number) => {
    setCompletedDays((prev) => {
      if (prev.includes(dayId)) return prev;
      const updated = [...prev, dayId];
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(updated));
      return updated;
    });
  };

  const markDayUncompleted = (dayId: number) => {
    setCompletedDays((prev) => {
      const updated = prev.filter((id) => id !== dayId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleDayCompleted = (dayId: number) => {
    if (completedDays.includes(dayId)) {
      markDayUncompleted(dayId);
    } else {
      markDayCompleted(dayId);
    }
  };

  const isDayCompleted = (dayId: number) => completedDays.includes(dayId);

  const saveUserNote = (dayId: number, note: string) => {
    setUserNotes((prev) => {
      const updated = { ...prev, [dayId]: note };
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updated));
      return updated;
    });
  };

  const getUserNote = (dayId: number) => userNotes[dayId] || "";

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      return next;
    });
  };

  const resetProgress = () => {
    setCompletedDays([1]);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify([1]));
  };

  const totalDays = CURRICULUM_DATA.length;
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  const getNextUncompletedDay = (): number => {
    const uncompleted = CURRICULUM_DATA.find((d) => !completedDays.includes(d.id));
    return uncompleted ? uncompleted.id : 1;
  };

  return (
    <LearningContext.Provider
      value={{
        user,
        completedDays,
        themeMode,
        userNotes,
        login,
        logout,
        markDayCompleted,
        markDayUncompleted,
        toggleDayCompleted,
        isDayCompleted,
        saveUserNote,
        getUserNote,
        toggleTheme,
        progressPercent,
        totalDays,
        completedCount,
        getNextUncompletedDay,
        resetProgress
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
