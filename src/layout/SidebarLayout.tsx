"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Sidebar() {
  return (
    <div>
      <Link href="/">
        <div
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 block px-3 py-4 text-sm  font-medium md:text-base"
          )}>
          Xem Bệnh Án Cá Nhân
        </div>
      </Link>
      <Link href="/">
        <div
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 block px-3 py-4 text-sm  font-medium md:text-base"
          )}>
          Xem Bệnh Án Bệnh Nhân
        </div>
      </Link>
      <Link href="/">
        <div
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 block px-3 py-4 text-sm  font-medium md:text-base"
          )}>
          Thêm Bệnh Án Bệnh Nhân
        </div>
      </Link>
    </div>
  );
}
