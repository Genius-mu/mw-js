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
            colorPrimary: isDark ? "#ff63f9" : "#9333ea",
            colorSuccess: "#ff63f9",
            colorWarning: "#ff63f9",
            colorError: "#ff63f9",
            borderRadius: 19,
            fontFamily: "Satoshi, 'Cabinet Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            colorBgBase: isDark ? "#000000" : "#ffffff",
            colorTextBase: isDark ? "#ffffff" : "#211327"
          },
          components: {
            Layout: {
              bodyBg: isDark ? "#000000" : "#ffffff",
              headerBg: isDark ? "#211327" : "#faf5ff",
              siderBg: isDark ? "#000000" : "#ffffff"
            },
            Menu: {
              darkItemBg: "#000000",
              darkSubMenuItemBg: "#211327"
            },
            Card: {
              colorBgContainer: isDark ? "#211327" : "#faf5ff",
              colorBorderSecondary: isDark ? "#ffffff15" : "#e9d5ff"
            },
            Button: {
              colorPrimary: isDark ? "#ffffff" : "#211327",
              colorTextLightSolid: isDark ? "#000000" : "#ffffff"
            }
          }
        }}
      >
        <div
          className={
            isDark
              ? "dark bg-[#000000] text-[#ffffff] min-h-screen"
              : "bg-[#ffffff] text-[#211327] min-h-screen"
          }
        >
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
