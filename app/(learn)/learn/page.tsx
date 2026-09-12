"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "@/context/LearningContext";
import { Spin } from "antd";

export default function LearnIndexPage() {
  const router = useRouter();
  const { getNextUncompletedDay } = useLearning();

  useEffect(() => {
    const targetDay = getNextUncompletedDay();
    router.replace(`/learn/day/${targetDay}`);
  }, [router, getNextUncompletedDay]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Spin size="large" tip="Loading your JavaScript learning workspace..." />
    </div>
  );
}
