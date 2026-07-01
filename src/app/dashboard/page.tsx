import DashboardLayout from "@/components/layout/DashboardLayout";
import TopBar from "@/components/layout/TopBar";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <TopBar title="Tableau de bord" subtitle="Vue d'ensemble de l'activité du cabinet" />
      <DashboardContent />
    </DashboardLayout>
  );
}
