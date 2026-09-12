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
  Switch,
  Input,
  Tag,
  Tooltip,
  Drawer
} from "antd";
import {
  CodeOutlined,
  CheckCircleFilled,
  PlayCircleOutlined,
  BulbOutlined,
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

const { Header, Sider, Content } = Layout;

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    logout,
    themeMode,
    toggleTheme,
    completedDays,
    progressPercent,
    completedCount,
    totalDays
  } = useLearning();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isDark = themeMode === "dark";

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
    label: <span className="font-semibold text-xs uppercase tracking-wider text-[#D7BE82]">{module.title}</span>,
    children: module.days.map((day) => {
      const isCompleted = completedDays.includes(day.id);
      const isCurrent = day.id === currentDayId;

      return {
        key: `/learn/day/${day.id}`,
        icon: isCompleted ? (
          <CheckCircleFilled className="text-[#00F6ED] text-sm" />
        ) : isCurrent ? (
          <PlayCircleOutlined className="text-[#00F6ED] text-sm" />
        ) : (
          <span className="text-xs font-bold text-[#755C1B]">{day.day}</span>
        ),
        label: (
          <div className="flex items-center justify-between text-xs py-1">
            <span className={`truncate ${isCurrent ? "font-bold text-[#00F6ED]" : "text-[#D7BE82]"}`}>
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
          <div className="font-bold text-sm text-[#0F1108]">{user?.name || "Student"}</div>
          <div className="text-xs text-[#755C1B]">{user?.email || "student@example.com"}</div>
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
      icon: <LogoutOutlined className="text-[#400406]" />,
      label: <span className="text-[#400406] font-bold">Sign Out</span>,
      onClick: () => {
        logout();
        router.push("/");
      }
    }
  ];

  const SiderContent = (
    <div className="flex flex-col h-full bg-[#0F1108]">
      {/* Sider Header */}
      <div className="p-4 border-b border-[#755C1B]">
        <Link href="/" className="flex items-center gap-2.5 no-underline mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#7A4419] text-[#D7BE82] flex items-center justify-center text-lg font-bold">
            ⚡
          </div>
          {!collapsed && (
            <div>
              <div className="font-extrabold text-base tracking-tight leading-none text-[#D7BE82]">
                JS Learning <span className="text-[#00F6ED]">Hub</span>
              </div>
              <p className="text-[10px] text-[#755C1B] m-0 font-medium tracking-wide">100+ DAYS CHALLENGE</p>
            </div>
          )}
        </Link>

        {!collapsed && (
          <div className="bg-[#241909] p-3 rounded-xl border border-[#755C1B] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#D7BE82]">Course Completion</span>
              <span className="text-[#00F6ED] font-bold">{progressPercent}%</span>
            </div>
            <Progress percent={progressPercent} strokeColor="#00F6ED" showInfo={false} size="small" />
            <div className="text-[11px] text-[#D7BE82] flex justify-between">
              <span>{completedCount} of {totalDays} completed</span>
              <span className="text-[#00F6ED] font-medium">Keep going!</span>
            </div>
          </div>
        )}
      </div>

      {/* Search Input */}
      {!collapsed && (
        <div className="p-3 border-b border-[#755C1B]">
          <Input
            placeholder="Search chapters..."
            prefix={<SearchOutlined className="text-[#755C1B]" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            size="small"
            className="rounded-lg bg-[#241909] text-[#D7BE82] border-[#755C1B]"
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
    <Layout className="min-h-screen bg-[#0F1108]">
      {/* Desktop Sider */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={320}
        theme="dark"
        className="hidden md:block border-r border-[#755C1B]"
        style={{
          position: "sticky",
          top: 0,
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

      <Layout className="flex-1 flex flex-col min-w-0 bg-[#0F1108]">
        {/* Dashboard Top Header */}
        <Header
          className={`sticky top-0 z-40 px-4 md:px-6 h-16 flex items-center justify-between border-b ${
            isDark ? "bg-[#241909] border-[#755C1B]" : "bg-[#D7BE82] border-[#7A4419]"
          }`}
        >
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden text-[#D7BE82]"
            />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex items-center text-[#D7BE82]"
            />
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold">
              <Link href="/" className="no-underline text-[#D7BE82] hover:text-[#00F6ED]">Home</Link>
              <span className="text-[#755C1B]">/</span>
              <span className="text-[#00F6ED]">Learn Dashboard</span>
              <span className="text-[#755C1B]">/</span>
              <Tag color="#7A4419" className="font-semibold m-0 text-[#D7BE82] border-none">Day {currentDayId}</Tag>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <BulbOutlined className={isDark ? "text-[#00F6ED]" : "text-[#7A4419]"} />
                <Switch checked={isDark} onChange={toggleTheme} size="small" />
              </div>
            </Tooltip>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="bg-[#7A4419] text-[#D7BE82] font-bold" icon={<UserOutlined />}>
                  {user?.name?.[0]?.toUpperCase() || "S"}
                </Avatar>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold leading-tight text-[#D7BE82]">{user?.name || "Student"}</div>
                  <div className="text-[10px] text-[#00F6ED] leading-tight">Student</div>
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
