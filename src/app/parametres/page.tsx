import DashboardLayout from "@/components/layout/DashboardLayout";
import TopBar from "@/components/layout/TopBar";

const sections = [
  {
    title: "Profil du cabinet",
    fields: [
      { label: "Nom du cabinet", value: "Équilibre — Cabinet de Psychologie", type: "text" },
      { label: "Adresse", value: "Godomey, Cotonou, Bénin", type: "text" },
      { label: "Téléphone", value: "61 40 11 69", type: "tel" },
      { label: "Email", value: "contact@equilibre-psy.bj", type: "email" },
    ]
  },
  {
    title: "Horaires d'ouverture",
    fields: [
      { label: "Lundi – Vendredi", value: "08:00 – 18:00", type: "text" },
      { label: "Samedi", value: "09:00 – 13:00", type: "text" },
      { label: "Dimanche", value: "Fermé", type: "text" },
    ]
  },
  {
    title: "Notifications",
    toggles: [
      { label: "Rappel RDV (24h avant)", enabled: true },
      { label: "Rappel RDV (1h avant)", enabled: true },
      { label: "Alerte absence patient", enabled: false },
      { label: "Rapport hebdomadaire", enabled: true },
    ]
  },
];

export default function ParametresPage() {
  return (
    <DashboardLayout>
      <TopBar title="Paramètres" subtitle="Configuration du cabinet" />
      <main style={{ padding: "28px 28px 60px", maxWidth: 740 }}>
        {sections.map((section, si) => (
          <div key={si} className="card-white" style={{ marginBottom: 20 }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #D4E8E8" }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 17, fontWeight: 400, color: "#1A3A4A", margin: 0
              }}>{section.title}</h3>
            </div>
            <div style={{ padding: "20px 24px" }}>
              {section.fields && section.fields.map((field, fi) => (
                <div key={fi} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#5A7A8A", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    style={{
                      width: "100%", padding: "10px 14px",
                      border: "1px solid #D4E8E8", borderRadius: 8,
                      fontSize: 14, color: "#1A3A4A",
                      background: "#F7F9FA", outline: "none",
                      fontFamily: "inherit"
                    }}
                  />
                </div>
              ))}
              {section.toggles && section.toggles.map((toggle, ti) => (
                <div key={ti} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0", borderBottom: ti < section.toggles!.length - 1 ? "1px solid #f0f5f5" : "none"
                }}>
                  <span style={{ fontSize: 14, color: "#1A3A4A" }}>{toggle.label}</span>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: toggle.enabled ? "#2A7F7F" : "#D4E8E8",
                    position: "relative", cursor: "pointer", transition: "background 0.2s"
                  }}>
                    <div style={{
                      position: "absolute",
                      width: 18, height: 18,
                      borderRadius: "50%", background: "white",
                      top: 3,
                      left: toggle.enabled ? 23 : 3,
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                    }} />
                  </div>
                </div>
              ))}
            </div>
            {section.fields && (
              <div style={{ padding: "0 24px 20px" }}>
                <button style={{
                  padding: "9px 20px", borderRadius: 8,
                  background: "#2A7F7F", color: "white",
                  border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer"
                }}>Enregistrer</button>
              </div>
            )}
          </div>
        ))}
      </main>
    </DashboardLayout>
  );
}
