"use client";

import React from "react";
import { menus } from "@/constants";
import Sidebar from "./SidebarLayout";
import NavigationLayout from "./NavigationLayout";
import { cn } from "@/lib/utils";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState<boolean>(false);

  return (
    <div className="space-y-4 h-full w-full dark:bg-[#1E1F22] bg-[#E3E5E8] ">
      <div className="min-h-full">
        <NavigationLayout
          menus={menus}
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />

        <header className="bg-white shadow flex mt-16">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Xem Bệnh Án Cá Nhân
            </h1>
          </div>
        </header>
        <main>
          <div className={cn("grid md:grid-cols-sidebar ")}>
            <div
              className={cn(
                "shadow-md bg-zinc-50 ease-in-out transition transition-transform duration-300 min-h-screen",
                isOpenSidebar ? "translate-x-0" : "-translate-x-full"
              )}>
              <Sidebar onClose={() => setIsOpenSidebar(false)} />
            </div>

            <div
              className={cn(
                "min-h-screen pl-6 w-full max-w-7xl py-6 sm:px-6 lg:px-8  ease-in-out transition transition-transform duration-300",
                // isOpenSidebar && "mx-auto",
                isOpenSidebar ? "translate-x-0" : "-translate-x-20"
              )}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
