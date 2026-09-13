import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LearningProvider } from "@/context/LearningContext";
import { AntdProvider } from "@/components/AntdProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "CODA | 100+ Days JavaScript Challenge",
  description: "Master JavaScript bite-sized micro-concepts with daily video tutorials, documentation guides, interactive exercises, and progress tracking on CODA."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col m-0 p-0">
        <LearningProvider>
          <AntdProvider>{children}</AntdProvider>
        </LearningProvider>
      </body>
    </html>
  );
}
