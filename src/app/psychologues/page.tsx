import DashboardLayout from "@/components/layout/DashboardLayout";
import TopBar from "@/components/layout/TopBar";

const psychos = [
  { nom: "Dr. Kodjovi Amoussou", specialite: "Psychothérapie individuelle, Couples", experience: "12 ans", patients: 38, seances: 42, statut: "Disponible", color: "#2A7F7F", initials: "KA" },
  { nom: "Dr. Adjayi Hounkpatin", specialite: "Psychologie enfant & adolescent", experience: "8 ans", patients: 25, seances: 28, statut: "Disponible", color: "#4CAF7D", initials: "AH" },
  { nom: "Dr. Soumarou Bagoudou", specialite: "Orientation professionnelle, Entreprises", experience: "15 ans", patients: 18, seances: 19, statut: "En consultation", color: "#7B68EE", initials: "SB" },
];

export default function PsychologuesPage() {
  return (
    <DashboardLayout>
      <TopBar title="Psychologues" subtitle="Équipe et gestion des praticiens" />
      <main style={{ padding: "28px 28px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {psychos.map((p, i) => (
            <div key={i} className="card-white" style={{ overflow: "hidden" }}>
              {/* Banner */}
              <div style={{ height: 80, background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, position: "relative" }}>
                <div style={{
                  position: "absolute", bottom: -28, left: 20,
                  width: 56, height: 56, borderRadius: "50%",
                  background: p.color, border: "3px solid white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 700, color: "white"
                }}>{p.initials}</div>
              </div>
              <div style={{ padding: "36px 20px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: "#1A3A4A", margin: 0 }}>{p.nom}</h3>
                    <p style={{ fontSize: 12, color: "#5A7A8A", margin: "4px 0 0" }}>{p.specialite}</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                    background: p.statut === "Disponible" ? "#E8F6EF" : "#FFF8E8",
                    color: p.statut === "Disponible" ? "#4CAF7D" : "#F5A623"
                  }}>{p.statut}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 18 }}>
                  {[
                    { label: "Expérience", val: p.experience },
                    { label: "Patients", val: p.patients },
                    { label: "Séances/mois", val: p.seances },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: "center", padding: "10px 6px", background: "#F7F9FA", borderRadius: 10 }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 700, color: p.color }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: "#5A7A8A", marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <button style={{
                    flex: 1, padding: "9px", borderRadius: 8, border: "none",
                    background: p.color, color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer"
                  }}>Voir profil</button>
                  <button style={{
                    flex: 1, padding: "9px", borderRadius: 8,
                    border: `1px solid ${p.color}`,
                    background: "white", color: p.color, fontSize: 12, fontWeight: 600, cursor: "pointer"
                  }}>Planning</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
