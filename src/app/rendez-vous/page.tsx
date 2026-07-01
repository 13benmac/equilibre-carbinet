import DashboardLayout from "@/components/layout/DashboardLayout";
import TopBar from "@/components/layout/TopBar";
import RdvContent from "./RdvContent";

export default function RdvPage() {
  return (
    <DashboardLayout>
      <TopBar title="Rendez-vous" subtitle="Planning et gestion des séances" />
      <RdvContent />
    </DashboardLayout>
  );
}
