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
            colorTextBase: "#ffffff"
          },
          components: {
            Layout: {
              bodyBg: "#000000",
              headerBg: "#211327",
              siderBg: "#000000"
            },
            Menu: {
              darkItemBg: "#000000",
              darkSubMenuItemBg: "#211327"
            },
            Card: {
              colorBgContainer: "#211327",
              colorBorderSecondary: "#ffffff15"
            },
            Button: {
              colorPrimary: "#ffffff",
              colorTextLightSolid: "#000000"
            }
          }
        }}
      >
        <div className="dark bg-[#000000] text-[#ffffff] min-h-screen">
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
