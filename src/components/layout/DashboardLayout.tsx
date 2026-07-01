"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 39, display: "none"
          }}
          className="mobile-overlay"
        />
      )}

      <Sidebar />

      <div className="main-content" style={{ flex: 1 }}>
        {children}
      </div>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" style={{
        display: "none",
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1A3A4A", zIndex: 50,
        padding: "8px 0 12px",
        justifyContent: "space-around"
      }}>
        {[
          { icon: "🏠", label: "Accueil" },
          { icon: "👥", label: "Patients" },
          { icon: "📅", label: "RDV" },
          { icon: "📊", label: "Stats" },
          { icon: "⚙️", label: "Config" },
        ].map((item) => (
          <button key={item.label} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 2, background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.6)", fontSize: 10
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
