"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Layout,
  Menu,
  Progress,
  Button,
  Avatar,
  Dropdown,
  Input,
  Tag,
  Drawer
} from "antd";
import {
  CodeOutlined,
  CheckCircleFilled,
  PlayCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RocketOutlined,
  BookOutlined,
  TableOutlined,
  FunctionOutlined,
  AppstoreOutlined,
  SyncOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { MODULES_DATA } from "@/lib/curriculum";
import { useLearning } from "@/context/LearningContext";

import GlassSurface from "@/components/reactbits/GlassSurface";

const { Header, Sider, Content } = Layout;

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    logout,
    completedDays,
    progressPercent,
    completedCount,
    totalDays
  } = useLearning();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Match current day ID from URL
  const currentDayMatch = pathname.match(/\/learn\/day\/(\d+)/);
  const currentDayId = currentDayMatch ? parseInt(currentDayMatch[1], 10) : 1;

  // Module Icons Map
  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "CodeOutlined":
        return <CodeOutlined />;
      case "TableOutlined":
        return <TableOutlined />;
      case "FunctionOutlined":
        return <FunctionOutlined />;
      case "AppstoreOutlined":
        return <AppstoreOutlined />;
      case "SyncOutlined":
        return <SyncOutlined />;
      case "RocketOutlined":
        return <RocketOutlined />;
      default:
        return <BookOutlined />;
    }
  };

  // Filter lessons based on search query
  const filteredModules = MODULES_DATA.map((module) => {
    if (!searchQuery.trim()) return module;
    const matchingDays = module.days.filter((day) =>
      day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...module, days: matchingDays };
  }).filter((module) => module.days.length > 0);

  // Generate Ant Design Menu Items
  const menuItems = filteredModules.map((module) => ({
    key: module.id,
    icon: getModuleIcon(module.icon),
    label: <span className="font-semibold text-xs uppercase tracking-wider text-white">{module.title}</span>,
    children: module.days.map((day) => {
      const isCompleted = completedDays.includes(day.id);
      const isCurrent = day.id === currentDayId;

      return {
        key: `/learn/day/${day.id}`,
        icon: isCompleted ? (
          <CheckCircleFilled className="text-[#ff63f9] text-sm" />
        ) : isCurrent ? (
          <PlayCircleOutlined className="text-[#ff63f9] text-sm" />
        ) : (
          <span className="text-xs font-bold text-white/40">{day.day}</span>
        ),
        label: (
          <div className="flex items-center justify-between text-xs py-1">
            <span className={`truncate ${isCurrent ? "font-bold text-[#ff63f9]" : "text-white"}`}>
              {day.title}
            </span>
          </div>
        )
      };
    })
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
    setMobileDrawerOpen(false);
  };

  const userMenuItems = [
    {
      key: "user-info",
      label: (
        <div className="px-2 py-1">
          <div className="font-bold text-sm text-white">{user?.name || "Student"}</div>
          <div className="text-xs text-slate-400">{user?.email || "student@example.com"}</div>
        </div>
      )
    },
    { type: "divider" as const },
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Back to Home",
      onClick: () => router.push("/")
    },
    {
      key: "logout",
      icon: <LogoutOutlined className="text-[#ff63f9]" />,
      label: <span className="text-[#ff63f9] font-bold">Sign Out</span>,
      onClick: () => {
        logout();
        router.push("/");
      }
    }
  ];

  const SiderContent = (
    <div className="flex flex-col h-full bg-[#000000]">
      {/* Sider Header */}
      <div className="p-4 border-b border-[#ffffff15]">
        <Link href="/" className="flex items-center no-underline mb-4">
          <div className="w-9 h-9 rounded-xl bg-white/10 text-xl flex items-center justify-center border border-white/15 shadow-[0_0_15px_rgba(255,99,249,0.3)] hover:scale-105 transition-transform">
            💡
          </div>
        </Link>

        {!collapsed && (
          <GlassSurface borderRadius={12} className="p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white">Course Completion</span>
              <span className="text-[#ff63f9] font-bold">{progressPercent}%</span>
            </div>
            <Progress percent={progressPercent} strokeColor="#ff63f9" showInfo={false} size="small" />
            <div className="text-[11px] text-white/60 flex justify-between">
              <span>{completedCount} of {totalDays} completed</span>
              <span className="text-white/80 font-medium">Keep going!</span>
            </div>
          </GlassSurface>
        )}
      </div>

      {/* Search Input */}
      {!collapsed && (
        <div className="p-3 border-b border-white/10">
          <Input
            placeholder="Search chapters..."
            prefix={<SearchOutlined className="text-white/40" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            size="small"
            className="rounded-lg bg-[#08080c] text-white border-white/10"
          />
        </div>
      )}

      {/* Chapter Navigation Menu */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Menu
          mode="inline"
          selectedKeys={[`/learn/day/${currentDayId}`]}
          defaultOpenKeys={["basics-data-types", "arrays-logic", "functions-scope"]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none bg-transparent"
        />
      </div>
    </div>
  );

  return (
    <Layout className="min-h-screen bg-[#000000]">
      {/* Desktop Sider */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={320}
        theme="dark"
        className="hidden md:block border-r border-white/10 fixed top-0 left-0 bottom-0 z-50 h-screen"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {SiderContent}
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        width={300}
        bodyStyle={{ padding: 0 }}
        className="md:hidden"
      >
        {SiderContent}
      </Drawer>

      <Layout className={`flex-1 flex flex-col min-w-0 bg-[#000000] transition-all ${collapsed ? "md:ml-20" : "md:ml-[320px]"}`}>
        {/* Dashboard Top Header */}
        <Header className="sticky top-0 z-40 px-4 md:px-6 h-14 flex items-center justify-between border-b bg-[#08080c]/90 backdrop-blur-xl border-white/10">
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden text-white flex items-center justify-center"
            />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex items-center text-white"
            />
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold">
              <Link href="/" className="no-underline text-white/70 hover:text-white">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white">Learn Dashboard</span>
              <span className="text-white/30">/</span>
              <Tag color="rgba(255,99,249,0.2)" className="font-semibold m-0 text-[#ff63f9] border-none">Lesson Day {currentDayId}</Tag>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="bg-white/20 text-white font-bold" icon={<UserOutlined />}>
                  {user?.name?.[0]?.toUpperCase() || "S"}
                </Avatar>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold leading-tight text-white">{user?.name || "Student"}</div>
                  <div className="text-[10px] text-white/50 leading-tight">Student</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Content Area */}
        <Content className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
