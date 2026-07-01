"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, CalendarDays, BarChart3,
  UserCheck, Settings, LogOut, Brain
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/patients", icon: Users, label: "Patients" },
  { href: "/rendez-vous", icon: CalendarDays, label: "Rendez-vous" },
  { href: "/statistiques", icon: BarChart3, label: "Statistiques" },
  { href: "/psychologues", icon: UserCheck, label: "Psychologues" },
  { href: "/parametres", icon: Settings, label: "Paramètres" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 40, height: 40,
            background: "rgba(42,127,127,0.25)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {/* Puzzle icon representing Equilibre's logo */}
            <Brain size={22} color="#7FD4D4" />
          </div>
          <div>
            <div style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 18,
              fontWeight: 400,
              color: "white",
              lineHeight: 1.1
            }}>Équilibre</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Cabinet de psychologie
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0 24px 16px" }} />

      {/* Nav section label */}
      <div style={{ padding: "0 24px 8px", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
        Navigation
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1 }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`}>
              <Icon size={18} />
              <span>{label}</span>
              {active && (
                <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #2A7F7F, #4CAF7D)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "white"
          }}>
            DK
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Dr. Kodjovi</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Administrateur</div>
          </div>
          <LogOut size={15} color="rgba(255,255,255,0.4)" style={{ cursor: "pointer" }} />
        </div>
      </div>
    </aside>
  );
}
