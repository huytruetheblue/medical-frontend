import { ModalProvider } from "@/components/provider/modalProvider";
import { MainLayout } from "@/layout/mainLayout";
import ReduxProvider from "@/reduxs/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <MainLayout>
        <ModalProvider />

        {children}
      </MainLayout>
    </ReduxProvider>
  );
}
