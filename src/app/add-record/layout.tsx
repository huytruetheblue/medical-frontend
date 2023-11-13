import { AddPatientLayout } from "@/layout/AddPatientLayout";
import ReduxProvider from "@/reduxs/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AddPatientLayout>{children}</AddPatientLayout>
    </ReduxProvider>
  );
}
