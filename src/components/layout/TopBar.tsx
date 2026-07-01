"use client";
import { Bell, Search, Menu } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function TopBar({ title, subtitle, onMenuToggle }: TopBarProps) {
  return (
    <header style={{
      background: "white",
      borderBottom: "1px solid #D4E8E8",
      padding: "0 24px",
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 16,
      position: "sticky",
      top: 0,
      zIndex: 30,
    }}>
      {/* Mobile menu */}
      <button
        onClick={onMenuToggle}
        style={{ display: "none", border: "none", background: "none", cursor: "pointer", padding: 4 }}
        className="mobile-menu-btn"
      >
        <Menu size={22} color="#1A3A4A" />
      </button>

      {/* Title */}
      <div style={{ flex: 1 }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 400,
          color: "#1A3A4A",
          margin: 0,
          lineHeight: 1.2
        }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: 12, color: "#5A7A8A", margin: 0 }}>{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#F7F9FA", border: "1px solid #D4E8E8",
        borderRadius: 10, padding: "8px 14px", width: 220
      }}>
        <Search size={15} color="#5A7A8A" />
        <input
          placeholder="Rechercher..."
          style={{ border: "none", background: "none", outline: "none", fontSize: 13, color: "#1A3A4A", width: "100%" }}
        />
      </div>

      {/* Notifications */}
      <button style={{
        position: "relative", background: "#F7F9FA",
        borderRadius: 10, padding: "10px", cursor: "pointer",
        border: "1px solid #D4E8E8"
      } as React.CSSProperties}>
        <Bell size={18} color="#1A3A4A" />
        <span style={{
          position: "absolute", top: 6, right: 6,
          width: 8, height: 8, borderRadius: "50%",
          background: "#E57373", border: "2px solid white"
        }} />
      </button>

      {/* Date */}
      <div style={{ fontSize: 12, color: "#5A7A8A", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <span style={{ fontWeight: 600, color: "#1A3A4A" }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
        </span>
        <span>{new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </header>
  );
}
