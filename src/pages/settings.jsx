import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  PenSquare,
  Image,
  Video,
  FolderOpen,
  History,
  Settings,
  Sparkles,
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar() {
  const menus = [
    {
      title: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },
    {
      title: "AI Writer",
      icon: "✍️",
      path: "/dashboard/writer",
    },
    {
      title: "AI Images",
      icon: "🎨",
      path: "/dashboard/images",
    },
    {
      title: "AI Videos",
      icon: "🎬",
      path: "/dashboard/videos",
    },
    {
      title: "Projects",
      icon: "📁",
      path: "/dashboard/projects",
    },
    {
      title: "Favorites",
      icon: "⭐",
      path: "/dashboard/favorites",
    },
    {
      title: "Settings",
      icon: "⚙️",
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside
      style={{
        width: 260,
        background: "#0F172A",
        borderRight: "1px solid #1E293B",
        padding: 25,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: 5,
          fontSize: 28,
        }}
      >
        🧠 BrainSpark
      </h1>

      <p
        style={{
          color: "#94A3B8",
          marginBottom: 35,
        }}
      >
        AI Studio
      </p>

      {menus.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          style={({ isActive }) => ({
            display: "block",
            textDecoration: "none",
            width: "100%",
            padding: "15px",
            marginBottom: 12,
            borderRadius: 14,
            fontWeight: "600",
            background: isActive ? "#2563EB" : "#1E293B",
            color: "white",
          })}
        >
          {item.icon} {item.title}
        </NavLink>
      ))}

      <div
        style={{
          marginTop: "auto",
          color: "#64748B",
          fontSize: 13,
        }}
      >
        BrainSpark AI Studio
        <br />
        Version 2.0
      </div>
    </aside>
  );
}