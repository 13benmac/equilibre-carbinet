"use client";

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
const seancesData = [42, 55, 48, 63, 71, 89];
const patientsData = [80, 88, 91, 98, 112, 124];
const maxSeances = Math.max(...seancesData);
const maxPatients = Math.max(...patientsData);

const kpis = [
  { label: "Taux de fidélisation", value: "78%", trend: "+5pts", positive: true, desc: "Patients revenant après 1ère séance" },
  { label: "Satisfaction moyenne", value: "4.7/5", trend: "+0.2", positive: true, desc: "Basé sur 64 retours" },
  { label: "Délai moyen RDV", value: "4 jours", trend: "-1j", positive: true, desc: "Entre demande et 1ère séance" },
  { label: "Taux d'absentéisme", value: "9%", trend: "+2%", positive: false, desc: "Séances non honorées" },
];

const psychoStats = [
  { name: "Dr. Kodjovi", seances: 42, patients: 38, satisfaction: 4.8, color: "#2A7F7F" },
  { name: "Dr. Adjayi", seances: 28, patients: 25, satisfaction: 4.6, color: "#4CAF7D" },
  { name: "Dr. Soumarou", seances: 19, patients: 18, satisfaction: 4.7, color: "#7B68EE" },
];

export default function StatsContent() {
  return (
    <main style={{ padding: "28px 28px 60px" }}>

      {/* Period selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {["7 jours", "30 jours", "3 mois", "6 mois", "1 an"].map((p, i) => (
          <button key={p} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: i === 3 ? "none" : "1px solid #D4E8E8",
            background: i === 3 ? "#2A7F7F" : "white",
            color: i === 3 ? "white" : "#5A7A8A"
          }}>{p}</button>
        ))}
      </div>

      {/* KPIs */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginBottom: 24
      }}>
        {kpis.map((kpi, i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A7A8A", marginBottom: 8 }}>
              {kpi.label}
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 32, fontWeight: 500, color: "#1A3A4A", lineHeight: 1
            }}>{kpi.value}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#5A7A8A" }}>{kpi.desc}</span>
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: kpi.positive ? "#4CAF7D" : "#E57373",
                background: kpi.positive ? "#E8F6EF" : "#FDEAEA",
                padding: "2px 8px", borderRadius: 6
              }}>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

        {/* Séances par mois */}
        <div className="card-white" style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: "#1A3A4A", margin: 0 }}>
              Évolution des séances
            </h3>
            <p style={{ fontSize: 12, color: "#5A7A8A", margin: "4px 0 0" }}>Janvier – Juin 2026</p>
          </div>

          {/* Line chart simulation */}
          <div style={{ position: "relative", height: 140 }}>
            {/* Y axis lines */}
            {[0, 25, 50, 75, 100].map(pct => (
              <div key={pct} style={{
                position: "absolute", left: 0, right: 0,
                top: `${100 - pct}%`,
                borderTop: "1px dashed #E8F4F4"
              }} />
            ))}
            {/* Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: "100%", position: "relative", zIndex: 2 }}>
              {seancesData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
                  <div style={{
                    width: "100%",
                    height: `${(val / maxSeances) * 100}%`,
                    background: i === 5 ? "#2A7F7F" : "linear-gradient(180deg, #7FCFCF, #B8E8E8)",
                    borderRadius: "6px 6px 0 0"
                  }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#5A7A8A" }}>{m}</div>
            ))}
          </div>
        </div>

        {/* Patients actifs */}
        <div className="card-white" style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: "#1A3A4A", margin: 0 }}>
              Croissance des patients
            </h3>
            <p style={{ fontSize: 12, color: "#5A7A8A", margin: "4px 0 0" }}>Patients actifs cumulés</p>
          </div>
          <div style={{ position: "relative", height: 140 }}>
            {[0, 25, 50, 75, 100].map(pct => (
              <div key={pct} style={{ position: "absolute", left: 0, right: 0, top: `${100 - pct}%`, borderTop: "1px dashed #E8F4F4" }} />
            ))}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: "100%", position: "relative", zIndex: 2 }}>
              {patientsData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                  <div style={{
                    width: "100%",
                    height: `${(val / maxPatients) * 100}%`,
                    background: i === 5 ? "#4CAF7D" : "linear-gradient(180deg, #80C7A0, #B8E8D0)",
                    borderRadius: "6px 6px 0 0"
                  }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {months.map(m => <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#5A7A8A" }}>{m}</div>)}
          </div>
        </div>
      </div>

      {/* Psychologue performance */}
      <div className="card-white">
        <div style={{ padding: "20px 20px 0" }}>
          <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: "#1A3A4A", margin: 0 }}>
            Performance par psychologue
          </h3>
        </div>
        <div style={{ padding: "16px 0" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Psychologue</th>
                <th>Séances (mois)</th>
                <th>Patients suivis</th>
                <th>Satisfaction</th>
                <th>Charge de travail</th>
              </tr>
            </thead>
            <tbody>
              {psychoStats.map((p, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: p.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: "white"
                      }}>
                        {p.name.split(" ").pop()?.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: p.color }}>{p.seances}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{p.patients}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, color: "#4CAF7D" }}>{p.satisfaction}</span>
                      <span style={{ color: "#F5A623", fontSize: 14 }}>★★★★★</span>
                    </div>
                  </td>
                  <td style={{ width: 180 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="progress-track" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{
                          width: `${(p.seances / 50) * 100}%`,
                          background: p.color
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: "#5A7A8A", minWidth: 32 }}>
                        {Math.round((p.seances / 50) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
