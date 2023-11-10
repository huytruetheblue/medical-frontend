import { MainLayout } from "@/layout/MainLayout";
import ReduxProvider from "@/reduxs/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <MainLayout>{children}</MainLayout>
    </ReduxProvider>
  );
}
