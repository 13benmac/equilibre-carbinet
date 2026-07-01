"use client";
import { Users, CalendarCheck, TrendingUp, Clock, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    label: "Patients actifs",
    value: "124",
    change: "+8",
    positive: true,
    sub: "vs mois dernier",
    icon: Users,
    color: "#2A7F7F",
    bg: "#E8F4F4",
  },
  {
    label: "Séances ce mois",
    value: "89",
    change: "+12%",
    positive: true,
    sub: "vs mois dernier",
    icon: CalendarCheck,
    color: "#4CAF7D",
    bg: "#E8F6EF",
  },
  {
    label: "Taux de présence",
    value: "91%",
    change: "-2%",
    positive: false,
    sub: "vs mois dernier",
    icon: TrendingUp,
    color: "#E57373",
    bg: "#FDEAEA",
  },
  {
    label: "Durée moy. séance",
    value: "52 min",
    change: "Stable",
    positive: true,
    sub: "derniers 30 jours",
    icon: Clock,
    color: "#7B68EE",
    bg: "#EEEAFD",
  },
];

const rdvAujourdhui = [
  { heure: "09:00", nom: "Fatima Alassan", type: "Consultation individuelle", statut: "Confirmé", avatar: "FA" },
  { heure: "10:30", nom: "Kofi Mensah", type: "Suivi psychologique", statut: "Confirmé", avatar: "KM" },
  { heure: "12:00", nom: "Aïssatou Traoré", type: "Bilan enfant", statut: "En attente", avatar: "AT" },
  { heure: "14:00", nom: "Emmanuel Dossou", type: "Thérapie de couple", statut: "Confirmé", avatar: "ED" },
  { heure: "16:30", nom: "Carine Hounkpatin", type: "Orientation professionnelle", statut: "Annulé", avatar: "CH" },
];

const barData = [
  { jour: "Lun", val: 8 },
  { jour: "Mar", val: 12 },
  { jour: "Mer", val: 6 },
  { jour: "Jeu", val: 15 },
  { jour: "Ven", val: 10 },
  { jour: "Sam", val: 4 },
];

const maxVal = Math.max(...barData.map(d => d.val));

const statutColor: Record<string, { bg: string; text: string }> = {
  "Confirmé": { bg: "#E8F6EF", text: "#4CAF7D" },
  "En attente": { bg: "#FFF8E8", text: "#F5A623" },
  "Annulé": { bg: "#FDEAEA", text: "#E57373" },
};

const avatarColors = ["#2A7F7F", "#4CAF7D", "#7B68EE", "#E57373", "#F5A623"];

export default function DashboardContent() {
  return (
    <main style={{ padding: "28px 28px 60px" }}>

      {/* Welcome strip */}
      <div style={{
        background: "linear-gradient(135deg, #1A3A4A 0%, #2A7F7F 100%)",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 28,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        position: "relative"
      }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Bonjour
          </p>
          <h2 style={{
            margin: "4px 0 8px",
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 26,
            fontWeight: 400,
            color: "white"
          }}>Dr. Kodjovi 👋</h2>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
            Vous avez <strong style={{ color: "white" }}>5 rendez-vous</strong> aujourd'hui et <strong style={{ color: "white" }}>3 suivis</strong> en attente.
          </p>
        </div>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: -30, top: -30,
          width: 140, height: 140, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)"
        }} />
        <div style={{
          position: "absolute", right: 50, bottom: -40,
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(255,255,255,0.04)"
        }} />
        <div style={{
          background: "rgba(255,255,255,0.12)",
          borderRadius: 12, padding: "10px 18px",
          color: "white", fontSize: 13, fontWeight: 600,
          cursor: "pointer", position: "relative", zIndex: 2,
          whiteSpace: "nowrap"
        }}>
          Voir mon planning →
        </div>
      </div>

      {/* Stat cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        marginBottom: 28
      }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="stat-icon" style={{ background: s.bg }}>
                  <Icon size={20} color={s.color} />
                </div>
                <span style={{
                  display: "flex", alignItems: "center", gap: 3,
                  fontSize: 12, fontWeight: 600,
                  color: s.positive ? "#4CAF7D" : "#E57373"
                }}>
                  {s.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {s.change}
                </span>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 28, fontWeight: 500, color: "#1A3A4A",
                  lineHeight: 1
                }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1A3A4A", marginTop: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#5A7A8A", marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

        {/* Rendez-vous today */}
        <div className="card-white">
          <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 17, fontWeight: 400, color: "#1A3A4A", margin: 0
            }}>Rendez-vous d'aujourd'hui</h3>
            <button style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, fontWeight: 600, color: "#2A7F7F",
              background: "none", border: "none", cursor: "pointer"
            }}>
              Voir tout <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ padding: "12px 0" }}>
            {rdvAujourdhui.map((rdv, i) => {
              const colors = statutColor[rdv.statut] || { bg: "#f0f0f0", text: "#888" };
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 20px",
                  borderBottom: i < rdvAujourdhui.length - 1 ? "1px solid #f0f5f5" : "none",
                  transition: "background 0.15s",
                }} onMouseEnter={e => (e.currentTarget.style.background = "#F7FDFD")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  {/* Avatar */}
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: avatarColors[i % avatarColors.length],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0
                  }}>{rdv.avatar}</div>
                  {/* Time */}
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13, fontWeight: 500, color: "#2A7F7F",
                    minWidth: 42
                  }}>{rdv.heure}</div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A3A4A" }}>{rdv.nom}</div>
                    <div style={{ fontSize: 12, color: "#5A7A8A" }}>{rdv.type}</div>
                  </div>
                  {/* Badge */}
                  <span className="badge-status" style={{ background: colors.bg, color: colors.text }}>
                    {rdv.statut}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: mini chart + activité */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Bar chart - séances par jour */}
          <div className="card-white" style={{ padding: 20 }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 16, fontWeight: 400, color: "#1A3A4A", margin: "0 0 16px"
            }}>Séances cette semaine</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
              {barData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: "100%",
                    height: (d.val / maxVal) * 68,
                    background: i === 3 ? "#2A7F7F" : "#E8F4F4",
                    borderRadius: "6px 6px 0 0",
                    transition: "background 0.2s"
                  }} />
                  <span style={{ fontSize: 10, color: "#5A7A8A" }}>{d.jour}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: "10px 12px", background: "#F7F9FA", borderRadius: 8 }}>
              <span style={{ fontSize: 11, color: "#5A7A8A" }}>Total cette semaine : </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A3A4A", fontFamily: "'DM Mono', monospace" }}>
                {barData.reduce((a, b) => a + b.val, 0)} séances
              </span>
            </div>
          </div>

          {/* Types de consultations */}
          <div className="card-white" style={{ padding: 20 }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 16, fontWeight: 400, color: "#1A3A4A", margin: "0 0 14px"
            }}>Types de séances</h3>
            {[
              { label: "Individuel", pct: 58, color: "#2A7F7F" },
              { label: "Couple", pct: 22, color: "#4CAF7D" },
              { label: "Enfant / ado", pct: 14, color: "#7B68EE" },
              { label: "Entreprise", pct: 6, color: "#F5A623" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#1A3A4A" }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: item.color, fontWeight: 600 }}>{item.pct}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
