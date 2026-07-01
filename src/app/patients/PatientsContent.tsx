"use client";
import { useEffect, useMemo, useState } from "react";
import { Plus, Filter, Download, Eye, MoreHorizontal } from "lucide-react";
import { Patient } from "@/lib/types";

const statutStyle: Record<string, { bg: string; text: string }> = {
  Actif: { bg: "#E8F6EF", text: "#4CAF7D" },
  Suspendu: { bg: "#FFF8E8", text: "#F5A623" },
  Clôturé: { bg: "#F0F0F0", text: "#888" },
};

const avatarColors = ["#2A7F7F", "#4CAF7D", "#7B68EE", "#E57373", "#F5A8A3", "#2A7F7F", "#4CAF7D"];

const statusLabels: Record<string, string> = {
  ACTIVE: "Actif",
  SUSPENDED: "Suspendu",
  CLOSED: "Clôturé",
};

function getAge(birthDate?: string | null) {
  if (!birthDate) return "—";
  const diff = Date.now() - new Date(birthDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function formatDate(dateString?: string | null) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(dateString));
}

function getNextAppointment(appointments: Patient["appointments"]) {
  const next = appointments
    .map((appointment) => ({ ...appointment, startAt: new Date(appointment.startAt) }))
    .filter((appointment) => appointment.startAt > new Date())
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())[0];
  return next ? formatDate(next.startAt.toISOString()) : "—";
}

export default function PatientsContent() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      try {
        const response = await fetch("/api/patients");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    if (filter === "ALL") return patients;
    return patients.filter((patient) => patient.status === filter);
  }, [filter, patients]);

  const counts = useMemo(
    () => ({
      ACTIVE: patients.filter((patient) => patient.status === "ACTIVE").length,
      SUSPENDED: patients.filter((patient) => patient.status === "SUSPENDED").length,
      CLOSED: patients.filter((patient) => patient.status === "CLOSED").length,
    }),
    [patients]
  );

  return (
    <main style={{ padding: "28px 28px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "Tous", value: "ALL", count: patients.length },
            { label: "Actifs", value: "ACTIVE", count: counts.ACTIVE },
            { label: "Suspendus", value: "SUSPENDED", count: counts.SUSPENDED },
            { label: "Clôturés", value: "CLOSED", count: counts.CLOSED },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: filter === item.value ? "none" : "1px solid #D4E8E8",
                background: filter === item.value ? "#2A7F7F" : "white",
                color: filter === item.value ? "white" : "#5A7A8A",
              }}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1px solid #D4E8E8", background: "white", fontSize: 13, color: "#5A7A8A", cursor: "pointer" }}>
            <Filter size={14} /> Filtrer
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1px solid #D4E8E8", background: "white", fontSize: 13, color: "#5A7A8A", cursor: "pointer" }}>
            <Download size={14} /> Exporter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2A7F7F", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Plus size={15} /> Nouveau patient
          </button>
        </div>
      </div>

      <div className="card-white">
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Âge</th>
                <th>Contact</th>
                <th>Psychologue</th>
                <th>Dernière séance</th>
                <th>Prochain RDV</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ padding: 24, textAlign: "center" }}>
                    Chargement...
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: 24, textAlign: "center" }}>
                    Aucun patient trouvé.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, i) => {
                  const label = statusLabels[patient.status] ?? patient.status;
                  const sc = statutStyle[label] ?? { bg: "#eee", text: "#888" };
                  const initials = `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`;

                  return (
                    <tr key={patient.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: avatarColors[i % avatarColors.length],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "white",
                          }}>
                            {initials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{patient.firstName} {patient.lastName}</div>
                            <div style={{ fontSize: 11, color: "#5A7A8A", fontFamily: "'DM Mono', monospace" }}>{patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#5A7A8A" }}>{getAge(patient.birthDate)} ans</td>
                      <td style={{ fontSize: 12, color: "#5A7A8A", fontFamily: "'DM Mono', monospace" }}>{patient.phone}</td>
                      <td style={{ fontSize: 13 }}>{patient.psychologist?.name ?? "—"}</td>
                      <td style={{ fontSize: 12, color: "#5A7A8A" }}>{formatDate(patient.appointments?.[0]?.startAt)}</td>
                      <td style={{ fontSize: 12, color: "#5A7A8A" }}>{getNextAppointment(patient.appointments)}</td>
                      <td>
                        <span className="badge-status" style={{ background: sc.bg, color: sc.text }}>
                          {label}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                            <Eye size={15} color="#2A7F7F" />
                          </button>
                          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                            <MoreHorizontal size={15} color="#5A7A8A" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
