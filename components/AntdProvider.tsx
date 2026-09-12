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
            colorPrimary: "#00F6ED",
            colorSuccess: "#515A47",
            colorWarning: "#D7BE82",
            colorError: "#400406",
            borderRadius: 8,
            fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            colorBgBase: isDark ? "#0F1108" : "#FAF6EE",
            colorTextBase: isDark ? "#D7BE82" : "#241909"
          },
          components: {
            Layout: {
              bodyBg: isDark ? "#0F1108" : "#FAF6EE",
              headerBg: isDark ? "#241909" : "#D7BE82",
              siderBg: isDark ? "#0F1108" : "#FAF6EE"
            },
            Menu: {
              darkItemBg: "#0F1108",
              darkSubMenuItemBg: "#241909"
            },
            Card: {
              colorBgContainer: isDark ? "#241909" : "#FFFFFF",
              colorBorderSecondary: isDark ? "#755C1B" : "#D7BE82"
            },
            Button: {
              colorPrimary: "#00F6ED",
              colorPrimaryHover: "#33F8F0",
              colorTextLightSolid: "#0F1108"
            }
          }
        }}
      >
        <div
          className={
            isDark
              ? "dark bg-[#0F1108] text-[#D7BE82] min-h-screen"
              : "bg-[#FAF6EE] text-[#241909] min-h-screen"
          }
        >
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
