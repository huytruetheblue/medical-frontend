import { ModalProvider } from "@/components/provider/modalProvider";
import { PatientLayout } from "@/layout/PatientLayout";
import ReduxProvider from "@/reduxs/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <PatientLayout>
        <ModalProvider />
        {children}
      </PatientLayout>
    </ReduxProvider>
  );
}
