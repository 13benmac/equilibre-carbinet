import DashboardLayout from "@/components/layout/DashboardLayout";
import TopBar from "@/components/layout/TopBar";
import PatientsContent from "./PatientsContent";

export default function PatientsPage() {
  return (
    <DashboardLayout>
      <TopBar title="Patients" subtitle="Gestion du dossier patients" />
      <PatientsContent />
    </DashboardLayout>
  );
}
