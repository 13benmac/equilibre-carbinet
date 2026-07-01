"use client";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const dates = [23, 24, 25, 26, 27, 28];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

interface RdvEvent {
  day: number;
  startHour: number;
  duration: number;
  label: string;
  patient: string;
  type: string;
  color: string;
  bg: string;
}

const rdvEvents: RdvEvent[] = [
  { day: 0, startHour: 1, duration: 1, label: "09:00", patient: "Fatima A.", type: "Individuel", color: "#2A7F7F", bg: "#E8F4F4" },
  { day: 0, startHour: 2, duration: 1, label: "10:30", patient: "Kofi M.", type: "Couple", color: "#7B68EE", bg: "#EEEAFD" },
  { day: 1, startHour: 1, duration: 2, label: "09:00", patient: "Ibrahim S.", type: "Bilan adulte", color: "#4CAF7D", bg: "#E8F6EF" },
  { day: 2, startHour: 3, duration: 1, label: "11:00", patient: "Aïssatou T.", type: "Enfant", color: "#F5A623", bg: "#FFF8E8" },
  { day: 3, startHour: 2, duration: 1, label: "10:00", patient: "Emmanuel D.", type: "Couple", color: "#7B68EE", bg: "#EEEAFD" },
  { day: 3, startHour: 6, duration: 1, label: "14:00", patient: "Martine A.", type: "Ado", color: "#E57373", bg: "#FDEAEA" },
  { day: 4, startHour: 1, duration: 1, label: "09:00", patient: "Fatima A.", type: "Suivi", color: "#2A7F7F", bg: "#E8F4F4" },
  { day: 4, startHour: 8, duration: 1, label: "16:00", patient: "Carine H.", type: "Pro", color: "#4CAF7D", bg: "#E8F6EF" },
];

const upcomingList = [
  { heure: "Aujourd'hui 09:00", nom: "Fatima Alassan", psy: "Dr. Kodjovi", type: "Individuel", avatar: "FA", color: "#2A7F7F" },
  { heure: "Aujourd'hui 14:00", nom: "Emmanuel Dossou", psy: "Dr. Kodjovi", type: "Couple", avatar: "ED", color: "#7B68EE" },
  { heure: "Demain 09:00", nom: "Ibrahim Sow", psy: "Dr. Adjayi", type: "Bilan", avatar: "IS", color: "#4CAF7D" },
  { heure: "28 juin 11:00", nom: "Martine Agossa", psy: "Dr. Soumarou", type: "Adolescent", avatar: "MA", color: "#E57373" },
];

export default function RdvContent() {
  return (
    <main style={{ padding: "28px 28px 60px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>

        {/* Calendar view */}
        <div className="card-white">
          {/* Calendar header */}
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #D4E8E8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ border: "1px solid #D4E8E8", borderRadius: 8, background: "white", cursor: "pointer", padding: "6px 10px" }}>
                <ChevronLeft size={16} color="#5A7A8A" />
              </button>
              <h3 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 18, fontWeight: 400, color: "#1A3A4A", margin: 0
              }}>Semaine du 23 Juin 2026</h3>
              <button style={{ border: "1px solid #D4E8E8", borderRadius: 8, background: "white", cursor: "pointer", padding: "6px 10px" }}>
                <ChevronRight size={16} color="#5A7A8A" />
              </button>
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 8,
              background: "#2A7F7F", color: "white",
              border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>
              <Plus size={14} /> Ajouter RDV
            </button>
          </div>

          {/* Grid */}
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 600 }}>
              {/* Day headers */}
              <div style={{ display: "grid", gridTemplateColumns: "60px repeat(6, 1fr)", borderBottom: "1px solid #D4E8E8" }}>
                <div />
                {weekDays.map((d, i) => (
                  <div key={d} style={{
                    textAlign: "center", padding: "12px 4px",
                    borderLeft: "1px solid #f0f5f5"
                  }}>
                    <div style={{ fontSize: 11, color: "#5A7A8A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{d}</div>
                    <div style={{
                      fontSize: 18, fontWeight: 700, marginTop: 2,
                      fontFamily: "'DM Mono', monospace",
                      color: i === 4 ? "white" : "#1A3A4A",
                      background: i === 4 ? "#2A7F7F" : "transparent",
                      width: 32, height: 32, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "2px auto 0"
                    }}>{dates[i]}</div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {hours.map((h, hi) => (
                <div key={h} style={{
                  display: "grid",
                  gridTemplateColumns: "60px repeat(6, 1fr)",
                  borderBottom: "1px solid #f0f5f5",
                  minHeight: 52
                }}>
                  <div style={{
                    padding: "4px 8px", fontSize: 11,
                    color: "#5A7A8A", fontFamily: "'DM Mono', monospace",
                    display: "flex", alignItems: "flex-start", paddingTop: 6
                  }}>{h}</div>
                  {weekDays.map((_, di) => {
                    const event = rdvEvents.find(e => e.day === di && e.startHour === hi);
                    return (
                      <div key={di} style={{ borderLeft: "1px solid #f0f5f5", padding: "3px", position: "relative" }}>
                        {event && (
                          <div style={{
                            background: event.bg, border: `1.5px solid ${event.color}`,
                            borderLeft: `4px solid ${event.color}`,
                            borderRadius: 6, padding: "4px 6px",
                            cursor: "pointer",
                            transition: "opacity 0.15s"
                          }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: event.color }}>{event.label}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "#1A3A4A" }}>{event.patient}</div>
                            <div style={{ fontSize: 10, color: "#5A7A8A" }}>{event.type}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Stats rapides */}
          <div className="card-white" style={{ padding: 18 }}>
            <h4 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 15, fontWeight: 400, color: "#1A3A4A", margin: "0 0 12px"
            }}>Cette semaine</h4>
            {[
              { label: "Séances planifiées", val: "18", color: "#2A7F7F" },
              { label: "Confirmées", val: "14", color: "#4CAF7D" },
              { label: "En attente", val: "3", color: "#F5A623" },
              { label: "Annulées", val: "1", color: "#E57373" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: "1px solid #f0f5f5"
              }}>
                <span style={{ fontSize: 13, color: "#5A7A8A" }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: item.color }}>{item.val}</span>
              </div>
            ))}
          </div>

          {/* Prochains RDV */}
          <div className="card-white" style={{ padding: 18 }}>
            <h4 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 15, fontWeight: 400, color: "#1A3A4A", margin: "0 0 12px"
            }}>Prochains rendez-vous</h4>
            {upcomingList.map((rdv, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, padding: "10px 0",
                borderBottom: i < upcomingList.length - 1 ? "1px solid #f0f5f5" : "none"
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: rdv.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0
                }}>{rdv.avatar}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1A3A4A" }}>{rdv.nom}</div>
                  <div style={{ fontSize: 11, color: "#5A7A8A" }}>{rdv.heure}</div>
                  <div style={{ fontSize: 11, color: "#5A7A8A" }}>{rdv.psy} · {rdv.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
