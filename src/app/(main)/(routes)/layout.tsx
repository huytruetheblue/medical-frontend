import { MainLayout } from "@/layout/mainLayout";
import ReduxProvider from "@/reduxs/ReduxProvider";
import { useAppSelector } from "@/reduxs/hooks";

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
