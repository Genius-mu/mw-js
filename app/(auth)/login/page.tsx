"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Input, Divider } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, RocketOutlined } from "@ant-design/icons";
import { useLearning } from "@/context/LearningContext";
import GlassSurface from "@/components/reactbits/GlassSurface";
import SpecularButton from "@/components/reactbits/SpecularButton";

export default function LoginPage() {
  const router = useRouter();
  const { login, getNextUncompletedDay } = useLearning();
  const [loading, setLoading] = useState(false);

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
    <GlassSurface borderRadius={24} className="p-6 sm:p-8 shadow-2xl">
      <div className="text-center pb-4 mb-4 border-b border-white/10">
        <h2 className="text-xl font-bold m-0 text-white">Student Sign In</h2>
        <p className="text-xs text-white/60 font-normal m-0 mt-1">Access your 100+ Days CODA Dashboard</p>
      </div>

      <Form name="login_form" layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
        <Form.Item
          name="email"
          label={<span className="text-xs font-medium text-white/80">Email Address</span>}
          rules={[
            { required: true, message: "Please input your email address!" },
            { type: "email", message: "Please enter a valid email address!" }
          ]}
        >
          <Input prefix={<MailOutlined className="text-white/40" />} placeholder="student@example.com" className="bg-[#000000] text-white border-white/10" />
        </Form.Item>

        <Form.Item
          name="name"
          label={<span className="text-xs font-medium text-white/80">Your Name (Optional)</span>}
        >
          <Input prefix={<UserOutlined className="text-white/40" />} placeholder="Alex Johnson" className="bg-[#000000] text-white border-white/10" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-xs font-medium text-white/80">Password</span>}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined className="text-white/40" />} placeholder="••••••••" className="bg-[#000000] text-white border-white/10" />
        </Form.Item>

        <Form.Item className="mb-2">
          <SpecularButton
            type="submit"
            disabled={loading}
            size="lg"
            radius={10}
            tint="#ff63f9"
            tintOpacity={0.9}
            lineColor="#ffffff"
            baseColor="#ff63f9"
            textColor="#000000"
            icon={<RocketOutlined />}
            className="w-full justify-center"
          >
            {loading ? "Signing In..." : "Sign In & Continue Learning"}
          </SpecularButton>
        </Form.Item>
      </Form>

      <Divider plain className="text-xs text-white/30 my-3">
        OR
      </Divider>

      <SpecularButton
        type="button"
        disabled={loading}
        onClick={handleDemoLogin}
        size="md"
        radius={10}
        tint="#181824"
        tintOpacity={0.8}
        lineColor="#ff63f9"
        baseColor="#333344"
        textColor="#ffffff"
        className="w-full justify-center"
      >
        ⚡ Instant Quick Demo Login
      </SpecularButton>

      <div className="text-center mt-5 text-xs text-white/50">
        Back to <Link href="/" className="text-white/80 hover:text-white font-medium no-underline">Home Landing Page</Link>
      </div>
    </GlassSurface>
  );
}
