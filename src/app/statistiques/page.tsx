import DashboardLayout from "@/components/layout/DashboardLayout";
import TopBar from "@/components/layout/TopBar";
import StatsContent from "./StatsContent";

export default function StatistiquesPage() {
  return (
    <DashboardLayout>
      <TopBar title="Statistiques" subtitle="Évolution et performance du cabinet" />
      <StatsContent />
    </DashboardLayout>
  );
}
