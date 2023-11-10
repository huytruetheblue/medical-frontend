import { PatientLayout } from "@/layout/PatientLayout";
import ReduxProvider from "@/reduxs/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <PatientLayout>{children}</PatientLayout>
    </ReduxProvider>
  );
}
