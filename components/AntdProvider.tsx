"use client";

import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useLearning } from "@/context/LearningContext";

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const { themeMode } = useLearning();

  const isDark = themeMode === "dark";

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 8,
            fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          components: {
            Layout: {
              bodyBg: isDark ? "#0f172a" : "#f8fafc",
              headerBg: isDark ? "#1e293b" : "#ffffff",
              siderBg: isDark ? "#0f172a" : "#ffffff"
            },
            Menu: {
              darkItemBg: "#0f172a",
              darkSubMenuItemBg: "#020617"
            },
            Card: {
              colorBgContainer: isDark ? "#1e293b" : "#ffffff"
            }
          }
        }}
      >
        <div className={isDark ? "dark bg-slate-950 text-slate-100 min-h-screen" : "bg-slate-50 text-slate-900 min-h-screen"}>
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
