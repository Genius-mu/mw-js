"use client";

import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.darkAlgorithm,
          token: {
            colorPrimary: "#ff63f9",
            colorSuccess: "#ff63f9",
            colorWarning: "#ff63f9",
            colorError: "#ff63f9",
            borderRadius: 19,
            fontFamily: "Satoshi, 'Cabinet Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            colorBgBase: "#000000",
            colorTextBase: "#e2e2e2"
          },
          components: {
            Layout: {
              bodyBg: "#000000",
              headerBg: "#000000",
              siderBg: "#000000"
            },
            Menu: {
              darkItemBg: "#000000",
              darkSubMenuItemBg: "#08080c"
            },
            Card: {
              colorBgContainer: "#08080c",
              colorBorderSecondary: "rgba(255, 255, 255, 0.1)"
            },
            Button: {
              colorPrimary: "rgba(255, 255, 255, 0.75)",
              colorTextLightSolid: "#000000"
            }
          }
        }}
      >
        <div className="dark bg-[#000000] text-[#e2e2e2] min-h-screen">
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
