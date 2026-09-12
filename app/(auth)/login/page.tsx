"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Form, Input, Button, Divider } from "antd";
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
      className={`shadow-none border rounded-[19.2px] ${
        isDark ? "bg-[#211327] border-[#ffffff15]" : "bg-[#faf5ff] border-[#e9d5ff]"
      }`}
      title={
        <div className="text-center py-2">
          <h2 className="text-xl font-bold m-0 text-[#ff63f9]">Student Sign In</h2>
          <p className="text-xs text-white/70 font-normal m-0 mt-1">Access your 100+ Days JS Learning Dashboard</p>
        </div>
      }
    >
      <Form name="login_form" layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
        <Form.Item
          name="email"
          label={<span className="text-xs font-semibold text-white/90">Email Address</span>}
          rules={[
            { required: true, message: "Please input your email address!" },
            { type: "email", message: "Please enter a valid email address!" }
          ]}
        >
          <Input prefix={<MailOutlined className="text-white/40" />} placeholder="student@example.com" />
        </Form.Item>

        <Form.Item
          name="name"
          label={<span className="text-xs font-semibold text-white/90">Your Name (Optional)</span>}
        >
          <Input prefix={<UserOutlined className="text-white/40" />} placeholder="Alex Johnson" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-xs font-semibold text-white/90">Password</span>}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined className="text-white/40" />} placeholder="••••••••" />
        </Form.Item>

        <Form.Item className="mb-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            icon={<RocketOutlined />}
            className="bg-white text-black hover:bg-[#ff63f9] hover:text-black border-none font-bold h-11 rounded-md"
          >
            Sign In & Continue Learning
          </Button>
        </Form.Item>
      </Form>

      <Divider plain className="text-xs text-white/30 my-4">
        OR
      </Divider>

      <Button
        block
        size="large"
        onClick={handleDemoLogin}
        loading={loading}
        className="font-bold h-11 bg-[#000000] text-white border border-[#ffffff25] hover:border-[#ff63f9] rounded-md"
      >
        ⚡ Instant Quick Demo Login
      </Button>

      <div className="text-center mt-6 text-xs text-white/60">
        Back to <Link href="/" className="text-[#ff63f9] font-semibold no-underline">Home Landing Page</Link>
      </div>
    </Card>
  );
}
