"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Form, Input, Button, Alert, Divider } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, RocketOutlined } from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, getNextUncompletedDay, themeMode } = useLearning();
  const [loading, setLoading] = useState(false);
  const isDark = themeMode === "dark";

  const onFinish = (values: { email: string; name?: string }) => {
    setLoading(true);
    setTimeout(() => {
      login(values.email, values.name);
      setLoading(false);
      const nextDay = getNextUncompletedDay();
      router.push(`/learn/day/${nextDay}`);
    }, 600);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login("student@example.com", "JS Student");
      setLoading(false);
      const nextDay = getNextUncompletedDay();
      router.push(`/learn/day/${nextDay}`);
    }, 500);
  };

  return (
    <Card
      className={`shadow-2xl border ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}
      title={
        <div className="text-center py-2">
          <h2 className="text-xl font-bold m-0">Student Sign In</h2>
          <p className="text-xs text-slate-400 font-normal m-0 mt-1">Access your 100+ Days JS Learning Dashboard</p>
        </div>
      }
    >
      <Form name="login_form" layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
        <Form.Item
          name="email"
          label={<span className="text-xs font-semibold">Email Address</span>}
          rules={[
            { required: true, message: "Please input your email address!" },
            { type: "email", message: "Please enter a valid email address!" }
          ]}
        >
          <Input prefix={<MailOutlined className="text-slate-400" />} placeholder="student@example.com" />
        </Form.Item>

        <Form.Item
          name="name"
          label={<span className="text-xs font-semibold">Your Name (Optional)</span>}
        >
          <Input prefix={<UserOutlined className="text-slate-400" />} placeholder="Alex Johnson" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-xs font-semibold">Password</span>}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined className="text-slate-400" />} placeholder="••••••••" />
        </Form.Item>

        <Form.Item className="mb-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            icon={<RocketOutlined />}
            className="bg-amber-500 hover:bg-amber-600 border-none font-semibold h-11"
          >
            Sign In & Continue Learning
          </Button>
        </Form.Item>
      </Form>

      <Divider plain className="text-xs text-slate-400 my-4">
        OR
      </Divider>

      <Button
        block
        size="large"
        onClick={handleDemoLogin}
        loading={loading}
        className={`font-semibold h-11 ${
          isDark ? "bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500" : "bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400"
        }`}
      >
        ⚡ Instant Quick Demo Login
      </Button>

      <div className="text-center mt-6 text-xs text-slate-400">
        Back to <Link href="/" className="text-amber-500 font-semibold no-underline">Home Landing Page</Link>
      </div>
    </Card>
  );
}
