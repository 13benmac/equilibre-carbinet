"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { LayoutDashboard, Users, CalendarDays, BarChart3, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const toggle = () => setSidebarOpen((value) => !value);
    window.addEventListener("toggle-mobile-sidebar", toggle);
    return () => window.removeEventListener("toggle-mobile-sidebar", toggle);
  }, []);

  const mobileNavItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Accueil" },
    { href: "/patients", icon: Users, label: "Patients" },
    { href: "/rendez-vous", icon: CalendarDays, label: "RDV" },
    { href: "/statistiques", icon: BarChart3, label: "Stats" },
    { href: "/parametres", icon: Settings, label: "Config" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 39,
            display: "block",
          }}
        />
      )}

      <Sidebar onNavigate={() => setSidebarOpen(false)} isMobileOpen={sidebarOpen} />

      <div className="main-content" style={{ flex: 1 }}>
        {children}
      </div>

      <nav className="bottom-nav" style={{
        display: "none",
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1A3A4A", zIndex: 50,
        padding: "8px 0 12px",
        justifyContent: "space-around"
      }}>
        {mobileNavItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active ? "#ffffff" : "rgba(255,255,255,0.6)",
                fontSize: 10,
                textDecoration: "none",
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
