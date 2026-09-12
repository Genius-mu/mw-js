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
            colorPrimary: "#D7BE82",
            colorSuccess: "#755C1B",
            colorWarning: "#E5C989",
            colorError: "#400406",
            borderRadius: 8,
            fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            colorBgBase: isDark ? "#1A120B" : "#FAF4E8",
            colorTextBase: isDark ? "#D7BE82" : "#1A120B"
          },
          components: {
            Layout: {
              bodyBg: isDark ? "#1A120B" : "#FAF4E8",
              headerBg: isDark ? "#2B1D0E" : "#D7BE82",
              siderBg: isDark ? "#1A120B" : "#FAF4E8"
            },
            Menu: {
              darkItemBg: "#1A120B",
              darkSubMenuItemBg: "#2B1D0E"
            },
            Card: {
              colorBgContainer: isDark ? "#2B1D0E" : "#FFFFFF",
              colorBorderSecondary: isDark ? "#755C1B" : "#D7BE82"
            },
            Button: {
              colorPrimary: "#7A4419",
              colorPrimaryHover: "#93521E",
              colorTextLightSolid: "#D7BE82"
            }
          }
        }}
      >
        <div
          className={
            isDark
              ? "dark bg-[#1A120B] text-[#D7BE82] min-h-screen"
              : "bg-[#FAF4E8] text-[#1A120B] min-h-screen"
          }
        >
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
